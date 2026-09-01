// ＡＩモデル最強比較：ニュース記事用イラスト生成API + 静的サイト配信
//
// /api/generate-image 以外は env.ASSETS（静的アセット）にフォールバックする。
// 画像生成は Cloudflare Workers AI（flux-1-schnell）を使用。外部ベンダーの
// APIキーを一切必要としない（アカウント自身の権限で完結する）。

const MODEL = "@cf/black-forest-labs/flux-1-schnell";
const MAX_PROMPT_LEN = 2048;

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

      let result;
      try {
        result = await env.AI.run(MODEL, { prompt });
      } catch (err) {
        return new Response("Image generation failed: " + (err && err.message ? err.message : String(err)), {
          status: 502,
        });
      }

      return new Response(JSON.stringify({ image: result.image }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
