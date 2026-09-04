// ＡＩモデル最強比較：ニュース記事用イラスト生成API + 静的サイト配信
//
// /api/generate-image 以外は env.ASSETS（静的アセット）にフォールバックする。
// 画像生成は Cloudflare Workers AI を使用。外部ベンダーのAPIキーを一切必要としない
// （アカウント自身の権限で完結する＝移管前提ルールを崩さない）。
//
// 2026-09-04：flux-1-schnell から Leonardo 系へ切り替えられるようにした。
//   旧構成の問題は3つ：
//     ① flux-1-schnell はステップ数が最大8で品質の上限が低い
//     ② 画像サイズを指定できず1024四方固定。表示枠は4:3なので噛み合っていなかった
//     ③ guidance も seed も無く、記事ごとに絵柄がバラバラだった
//   Leonardo 系はいずれも解決できる（最大40ステップ・任意サイズ・guidance・seed）。

const MODELS = {
  // プロンプト忠実度が高く、Leonardo系では安いほう。既定にしている
  phoenix: "@cf/leonardo/phoenix-1.0",
  // グラフィックデザイン的な描き込みに強い。phoenixと見比べる用
  lucid: "@cf/leonardo/lucid-origin",
  // 旧構成。速くて非常に安いが品質上限が低い。緊急時のフォールバック用に残す
  flux: "@cf/black-forest-labs/flux-1-schnell",
};
const DEFAULT_MODEL = "phoenix";
const MAX_PROMPT_LEN = 2048;

// ニュースカードの表示枠は4:3（実際の表示は最大148x110px）。生成時点で比率を
// 合わせておく（後からの切り抜きで主題が欠けるのを防ぐため）。
// 768x576 は表示に対して縦横2.6倍あり高精細画面でも十分。かつ1枚あたり
// 約1,310ニューロンで、無料枠（1日10,000）に1日7枚ぶん収まる。
// 1024x768 まで上げると約1,840〜2,370へ増える割に、表示品質は変わらない。
const DEFAULTS = { width: 768, height: 576, steps: 25, guidance: 4.5 };

function clamp(v, min, max, fallback) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : fallback;
}

/** ArrayBuffer を base64 に変換する。大きい画像でも壊れないよう分割して処理する */
function base64FromBuffer(buf) {
  const bytes = new Uint8Array(buf);
  let binary = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/generate-image" && request.method === "POST") {
      const secret = request.headers.get("X-Pipeline-Secret");
      if (!secret || !env.PIPELINE_SECRET || secret !== env.PIPELINE_SECRET) {
        return new Response("Unauthorized", { status: 401 });
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return new Response("Invalid JSON body", { status: 400 });
      }

      const prompt = typeof body.prompt === "string" ? body.prompt.slice(0, MAX_PROMPT_LEN) : "";
      if (!prompt) {
        return new Response("`prompt` is required", { status: 400 });
      }

      // モデルは許可リストからのみ選ばせる（任意のモデルを走らせられないように）
      const key = typeof body.model === "string" ? body.model : DEFAULT_MODEL;
      const model = MODELS[key];
      if (!model) {
        return new Response(
          `Unknown model "${key}". Use one of: ${Object.keys(MODELS).join(", ")}`,
          { status: 400 }
        );
      }

      const inputs = { prompt };
      if (key === "flux") {
        // flux-1-schnell はサイズ指定に対応せず、ステップも最大8
        inputs.steps = clamp(body.steps, 1, 8, 4);
      } else {
        inputs.width = clamp(body.width, 256, 2500, DEFAULTS.width);
        inputs.height = clamp(body.height, 256, 2500, DEFAULTS.height);
        inputs.num_steps = clamp(body.steps, 1, 40, DEFAULTS.steps);
        const g = Number(body.guidance);
        inputs.guidance = Number.isFinite(g) ? Math.min(10, Math.max(0, g)) : DEFAULTS.guidance;
        // seed を渡すと同じ指定で同じ絵柄を再現できる。記事ごとの作風を揃えるのに使う
        if (body.seed !== undefined && body.seed !== null) {
          inputs.seed = clamp(body.seed, 0, 4294967295, 0);
        }
        if (typeof body.negative_prompt === "string" && body.negative_prompt) {
          inputs.negative_prompt = body.negative_prompt.slice(0, MAX_PROMPT_LEN);
        }
      }

      let result;
      try {
        result = await env.AI.run(model, inputs);
      } catch (err) {
        return new Response(
          "Image generation failed: " + (err && err.message ? err.message : String(err)),
          { status: 502 }
        );
      }

      // 応答形式はモデルによって異なる。
      // flux系は { image: "<base64>" }、Leonardo系は画像バイナリのストリームを
      // そのまま返すことがあるため、どちらでも受けられるようにしている。
      let image;
      try {
        if (result && typeof result.image === "string") {
          image = result.image;
        } else if (result instanceof ReadableStream) {
          image = base64FromBuffer(await new Response(result).arrayBuffer());
        } else if (result instanceof ArrayBuffer) {
          image = base64FromBuffer(result);
        } else if (result && result.image) {
          image = base64FromBuffer(await new Response(result.image).arrayBuffer());
        }
      } catch (err) {
        return new Response(
          "Failed to read image: " + (err && err.message ? err.message : String(err)),
          { status: 502 }
        );
      }

      if (!image) {
        return new Response("Model returned no image", { status: 502 });
      }

      return new Response(JSON.stringify({ image, model, inputs }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
