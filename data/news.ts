export type NewsItem = {
  date: string; // "2026-08-21"
  cat: string;
  title: string;
  body: string;
  source: string;
  url: string;
  image?: string; // "/news/xxxx.jpg" publicディレクトリ配下の相対パス
  credit?: string;
};

export type NewsFile = {
  updated: string; // ISO 8601
  items: NewsItem[];
};

export const NEWS_SEED: NewsFile = {
  updated: "2026-09-05T09:00:00+09:00",
  items: [
    { date: "2026-09-03", cat: "リリース", title: "OpenAI、次世代フラッグシップ「GPT-6 Astra」を発表", body: "OpenAIが新世代モデル「GPT-6 Astra」を発表した。コンテキストは105万トークン、価格は入力$10・出力$50/1Mトークンで前世代Sol系より高い水準。ブラウジングやソフトウェア開発など「コンピュータ操作」を前提にした設計が特徴で、社内のサイバー脅威評価は最上位の「Critical」に到達したという。当面は一部組織から段階的に提供する方針。", source: "MarkTechPost", url: "https://www.marktechpost.com/2026/09/03/openai-releases-gpt-6-astra-a-1-05m-context-computer-use-model-gated-behind-a-critical-cyber-threshold/" },
    { date: "2026-09-02", cat: "リリース", title: "Google、Gemini 3.8 Flashを一般提供開始", body: "Googleが「Gemini 3.8 Flash」の一般提供を開始した。料金は入力$0.75・出力$3.75/1Mトークン（2026年12月31日まで、以降は倍額）と7月の3.7 Flashから据え置きのまま、公表ベンチマークは軒並み上回ったという。コンテキストは入力100万・出力6.4万トークン。開発環境「Google Antigravity」では新たな既定モデルに設定された。", source: "eesel AI 他", url: "https://www.eesel.ai/blog/gemini-3-8-flash" },
    { date: "2026-09-02", cat: "リリース", title: "Meta、Muse Spark 1.3を公開", body: "Metaが「Muse Spark 1.3」を公開した。料金は前身の1.2から据え置き（入力$1.25・出力$4.25/1Mトークン）。長時間の共同作業や複数タスクの管理に対応できるよう訓練され、ツール呼び出しを約20%、トークン使用量を約25%削減したという。ザッカーバーグCEOは自身のXで「コーディング・エージェント分野で最大の進歩」と投稿した。", source: "Axios / Bloomberg", url: "https://www.axios.com/2026/09/02/meta-debuts-muse-spark-13-as-personal-agent-work-continues" },
    { date: "2026-09-04", cat: "ベンチマーク", title: "Claude Fable 5.1、独立集計のSWE-bench Proで首位に", body: "独立系ベンチマーク集計サイトBenchLM.aiの9月4日更新分で、Claude Fable 5.1がSWE-bench Proにおいて81.2%を記録し、Claude Mythos 5（80.3%）・Claude Fable 5（80%）を上回り首位に立った。ただしAnthropicの公式発表ではSWE-bench系のスコアは明かされておらず、この数値は第三者機関による測定値である点に留意が必要。", source: "BenchLM.ai", url: "https://benchlm.ai/benchmarks/swe-bench-pro" },
    { date: "2026-09-01", cat: "リリース", title: "Anthropic、Claude Fable 5.1とMythos 5.1を発表", body: "AnthropicがFable 5・Mythos 5の後継となる5.1版を、初代リリースからわずか3か月で公開した。コーディング・知識労働・長時間タスクでFable 5やOpus 5、GPT-5.6 Solを上回ると発表している。価格は入力$10・出力$50/1Mトークンで据え置きだが、キャッシュ読み取り単価を75%引き下げ、実運用コストは最大45%削減できるという。", source: "Anthropic公式", url: "https://www.anthropic.com/claude-fable-and-mythos-5-1", image: "/news/2026-09-01-fable51.jpg", credit: "イラスト: AI生成（Cloudflare Workers AI）" },
    { date: "2026-09-01", cat: "リリース", title: "米国防総省、ChatGPTとGrokを軍向けポータルに追加", body: "米国防総省の生成AIポータル「GenAI.mil」に、OpenAIの「ChatGPT Mil」とxAIの「Grok for Government」が新たに加わり、既存のGoogle Geminiと並んで利用できるようになった。対象は国防総省職員・軍人ら約300万人で、既に170万人が利用を開始している。3モデルともに非公開の機密性の高いデータを扱える「IL5」認証を取得済み。", source: "DefenseScoop", url: "https://defensescoop.com/2026/08/31/grok-chatgpt-added-to-genai-mil/", image: "/news/2026-09-01-genai-mil.jpg", credit: "イラスト: AI生成（Cloudflare Workers AI）" },
    { date: "2026-08-31", cat: "規制", title: "米商務省、タイ・シンガポール経由の「クラウド抜け穴」規制を検討", body: "米商務省が、中国企業が第三国のNvidia GPUサーバーへ遠隔アクセスしてAIモデルを訓練する手法の規制を検討していると報じられた。物理的なチップの国境越えではなく遠隔利用そのものを対象にする点が新しい。Moonshot AIがタイのサーバーを使ってKimi K3を訓練したとされる事例が具体例として挙げられており、新ルール案は9月初旬にも業界団体へ共有される見通し。", source: "Forbes", url: "https://www.forbes.com/sites/viviantoh/2026/08/31/the-ai-chip-wars-new-front-control-the-cloud-not-the-silicon/", image: "/news/2026-08-31-cloud-loophole.jpg", credit: "イラスト: AI生成（Cloudflare Workers AI）" },
    { date: "2026-08-29", cat: "価格", title: "Qwen3.7 Flash が有料APIの最安値に、$0.03 / $0.13", body: "BenchLM の価格表で、Qwen3.7 Flash が入力$0.03・出力$0.13（100万トークンあたり）と追跡中138モデル中の最安値になった。ただし最安の単価が最安の実運用コストとは限らず、出力量・キャッシュヒット率・リトライで結果は変わる。", source: "BenchLM.ai", url: "https://benchlm.ai/llm-pricing" },
    { date: "2026-08-28", cat: "リリース", title: "8月の確認済みモデルリリースは24件・18プロバイダ", body: "BenchLM の集計では、8月28日時点で18のプロバイダから24件のリリースが一次ソース付きで確認された。ラボの数と発表頻度がともに増え、月内でも順位が入れ替わる状態が続いている。", source: "BenchLM", url: "https://benchlm.ai/model-updates/releases/august-2026" },
    { date: "2026-08-26", cat: "リリース", title: "Z.ai が GLM-5.3-Flash を公開", body: "AI Release Tracker で最も新しいリリースとして GLM-5.3-Flash（Z.ai）が記録された。GLM-5.3 は事後学習のスケールのみで DeepSWE や Terminal-Bench 3.0 のスコアを大きく伸ばし、CyberGym では首位を主張している。", source: "AI Release Tracker / CodingFleet", url: "https://aireleasetracker.com/latest" },
    { date: "2026-08-26", cat: "終了・移行", title: "ChatGPT で o3 のサンセット期限が到来", body: "5月28日付の告知から90日のサンセット期間が8月26日に着地。あわせて7月31日告知の DALL·E GPT（単体GPT）の廃止も進む。いずれも ChatGPT 側の変更で、o3 の告知には「APIに変更なし」と明記されている。", source: "Digital Applied", url: "https://www.digitalapplied.com/blog/ai-model-releases-august-2026-tracker" },
    { date: "2026-08-21", cat: "ベンチマーク", title: "SWE-bench Pro：Fable 5 / Mythos 5 が80.3%で首位、Qwen3.8 Max が67.7%", body: "難易度の高い SWE-bench Pro で Claude Mythos 5 と Fable 5 が80.3%、Claude Opus 5 が79.2%。Qwen3.8 Max は67.7%を報告し、$2/$6 という価格で GPT-5.6 Sol（64.6%）を上回った。ベンダー自己申告値のため小差は方向性として見るべき。", source: "CodingFleet", url: "https://codingfleet.com/blog/swe-bench-pro-leaderboard-2026/" },
    { date: "2026-08-20", cat: "価格", title: "主要APIの入力単価の下限が $0.20 まで低下", body: "7月30日の OpenAI の値下げ（Luna を80%、Terra を20%）により、主要モデルの入力単価は GPT-5.6 Luna の $0.20/$1.20 が下限に。フラッグシップは入力$5〜$10帯（GPT-5.6 Sol $5/$30、Claude Opus 5 $5/$25、Claude Fable 5 $10/$50）。", source: "CloudZero", url: "https://www.cloudzero.com/blog/llm-api-pricing-comparison/" },
    { date: "2026-08-17", cat: "終了・移行", title: "Google が Imagen 4 の generate 系エンドポイントを停止", body: "停止対象は Imagen 4 の standard / ultra / fast の生成エンドポイントで、「Imagen」ブランド全体ではない。Imagen 3 の生成は2025年11月に、Imagen 4 のプレビュー版は2026年2月に停止済みで、呼び出し元は Gemini の画像モデルへ案内される。", source: "Digital Applied", url: "https://www.digitalapplied.com/blog/ai-model-releases-august-2026-tracker" },
    { date: "2026-08-14", cat: "オープンウェイト", title: "Qwen3.8-27B が Apache 2.0 で公開、クラス最高の SWE-bench Pro 61.7%", body: "Alibaba の27.8B密モデルが同クラス最高の SWE-bench Pro 61.7% を記録。Qwen3.7-Plus（57.6%）や Opus 4.6 Max（53.4%）を上回り、価格は $0.45/$3.20。8月10日には Meta 初のオープンウェイト Muse として Muse Glimmer（30B, Apache 2.0）も公開され、51.2%を報告している。", source: "CodingFleet", url: "https://codingfleet.com/blog/swe-bench-pro-leaderboard-2026/" },
    { date: "2026-08-11", cat: "価格", title: "Claude Sonnet 5 の $2/$10 が恒久価格に、9月1日の値上げは撤回", body: "導入価格として提示されていた $2.00/$10.00 を Anthropic が8月11日に恒久化。予定されていた9月1日からの $3.00/$15.00 への改定は行われないことになった。", source: "CloudZero", url: "https://www.cloudzero.com/blog/llm-api-pricing-comparison/" },
    { date: "2026-08-10", cat: "ベンチマーク", title: "SWE-bench Verified は飽和、上位5モデルが4ポイント差に収まる", body: "Claude Opus 5 が96.0%（vals.ai の実行では97.0%）、GPT-5.6 Sol が96.2%、Fable 5 が95.0%、Kimi K3 が93.4%、GPT-5.6 Luna が93.0%。上位が詰まったため、実力差の判断は SWE-bench Pro 側に移っている。", source: "Local AI Master / llm-stats", url: "https://llm-stats.com/benchmarks/swe-bench-verified" },
    { date: "2026-08-05", cat: "リリース", title: "Gemini 3.5 Transcribe は2つのエンドポイントで提供", body: "Google の音声認識モデルは単一APIではなく用途別の2エンドポイント構成。ストリーミング側は1秒未満の低遅延を実現する一方、話者分離（ダイアライゼーション）には対応しない。", source: "llm-stats", url: "https://llm-stats.com/ai-news" },
    { date: "2026-07-01", cat: "リリース", title: "Claude Fable 5 がグローバルに復旧", body: "6月12日に Fable 5 と Mythos 5 を停止させた輸出規制命令が6月30日に米商務省により解除され、7月1日に Fable 5 が Claude.ai・Claude Platform・Claude Code・Cowork で復旧。Mythos 5 は承認済みパートナー限定のまま。", source: "Morph LLM", url: "https://www.morphllm.com/swe-bench-pro" },
  ],
};
