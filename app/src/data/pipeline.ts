import type { StageId } from "./concepts";

/**
 * 社会実装パイプライン(横軸)。RESTRUCTURE_PLAN.md §4.2 / 付録C を参照。
 *
 * 全ステージを貫く題材は「製造ラインの外観検査AI(不良品の画像検知)」に固定する。
 */

export const pipelineScenario =
  "製造ラインの外観検査AI(不良品の画像検知)を、企画から運用まで一気通貫で見る。";

export type Stage = {
  id: StageId;
  title: string;
  /** この工程で何をするか(題材に即して2〜4文)。 */
  description: string;
  /** 登場する用語(カードへのリンク)。 */
  conceptIds: string[];
  /** 典型的な失敗と、試験で問われる論点。 */
  pitfalls: string;
};

export const stages: Stage[] = [
  {
    id: "stage-1",
    title: "企画・課題定義",
    description:
      "「不良品を人手で目視検査している工程を自動化し、検査時間と見逃しを減らす」という" +
      "ビジネス課題を、AIで解けるデータ課題に翻訳する段階。ルールベースの画像処理で足りるか、" +
      "学習ベースのAIが本当に必要かをまず見極め、CRISP-DMのような進行の型に沿って小規模な" +
      "PoC(概念実証)で実現可能性を確認しながら、検出率・誤報率などのKPIを設計する。",
    conceptIds: [],
    pitfalls:
      "「AIを使うこと」自体が目的化し、コストに見合う効果(KPI)を事前に定義しないまま" +
      "開発が始まってしまう失敗が典型的。試験ではCRISP-DMの工程順やPoCの位置づけが問われる。",
  },
  {
    id: "stage-2",
    title: "データ収集",
    description:
      "検査対象製品を撮影したカメラ画像を収集する段階。生産ラインの様々な照明条件・角度・" +
      "製品バリエーションを網羅するようサンプリング設計を行い、不良品データが少ない" +
      "(クラス不均衡)場合は過去の検品記録なども補助的に活用する。",
    conceptIds: ["open-dataset", "corpus"],
    pitfalls:
      "特定の時間帯・照明条件でしか撮影しないとサンプリングバイアスが生じ、本番運用時の画像分布と" +
      "ズレる。撮影対象に人が映り込む場合の個人情報保護や、他社データセットを流用する場合の" +
      "著作権上の注意点も、法律・倫理の章と合わせて問われる。",
  },
  {
    id: "stage-3",
    title: "データ加工・アノテーション",
    description:
      "収集した画像に「良品/不良品」および不良の種類・位置のラベルを人手で付与する" +
      "(アノテーション)段階。学習・検証・テストにデータを分割し、必要に応じて正規化などの" +
      "前処理を施す。",
    conceptIds: ["train-valid-test", "annotation", "data-leakage"],
    pitfalls:
      "アノテーション基準が作業者間で揺れると学習データの質がばらつく。同一ロット・同一撮影" +
      "セッションの画像が訓練セットとテストセットの両方に混入すると、実際より高い精度が" +
      "出てしまう「データリーケージ」が典型的な失敗として問われる。",
  },
  {
    id: "stage-4",
    title: "モデル開発・学習",
    description:
      "まずは決定木やロジスティック回帰のような単純なベースラインで見込みを確認し、次にCNNベースの" +
      "画像分類モデルへ発展させる段階。ゼロから学習するのではなく、大規模データセットで事前学習済みの" +
      "モデルを転移学習・ファインチューニングして少ないデータでも精度を出す。過学習を防ぐため" +
      "Dropoutやデータ拡張を、学習を安定させるためバッチ正規化や適切な最適化手法(Adam等)を用いる。",
    conceptIds: [
      "decision-tree",
      "logistic-regression",
      "cnn",
      "transfer-learning",
      "fine-tuning",
      "overfitting",
      "dropout",
      "data-augmentation",
      "batchnorm",
      "adam",
    ],
    pitfalls:
      "いきなり複雑なモデルから着手して過学習を見逃したり、ハイパーパラメータ探索を" +
      "テストデータで行ってしまい性能を過大評価する失敗が典型。",
  },
  {
    id: "stage-5",
    title: "評価",
    description:
      "検証用データで混同行列を作り、正解率だけでなく適合率・再現率・F値・ROC-AUCを確認する段階。" +
      "外観検査では不良品の見逃し(偽陰性)が重大事故につながりうるため、再現率を優先する" +
      "しきい値設計を行い、ビジネスKPI(見逃し率・誤報率の目標値)と結びつける。",
    conceptIds: ["confusion-matrix", "accuracy", "precision", "recall", "f1", "roc-auc", "cross-validation"],
    pitfalls:
      "不良品が少ないクラス不均衡データで正解率だけを見ると、「すべて良品と判定」するだけで" +
      "高い正解率が出てしまう。目的に応じてどの指標を優先すべきかを問う設問が定番。",
  },
  {
    id: "stage-6",
    title: "実装・デプロイ",
    description:
      "学習済みモデルを検査ラインのカメラ横の端末(エッジ)に配置するか、クラウドへ推論リクエストを" +
      "送るかを選ぶ段階。エッジで動かす場合は量子化・プルーニング・蒸留といったモデル圧縮で軽量化し、" +
      "新モデルは一部のラインだけに導入するA/Bテストで既存の検査プロセスと比較してから全ライン展開する。",
    conceptIds: ["edge-ai", "quantization", "compression-pruning", "distillation", "model-compression"],
    pitfalls:
      "軽量化のしすぎで精度が実用水準を下回ったり、A/Bテストの比較期間・条件が不公平で正しい" +
      "効果測定ができない失敗が典型。",
  },
  {
    id: "stage-7",
    title: "運用・監視",
    description:
      "運用開始後も、製品ラインナップの変更や照明環境の変化によって入力データの分布が学習時から" +
      "変わっていないか(データドリフト)を継続的に監視し、必要に応じて再学習する段階(MLOps)。" +
      "判定に納得感を持たせるため、Grad-CAMなどのXAIでモデルがどこに注目して不良と判定したかを" +
      "検査担当者に提示する。",
    conceptIds: ["mlops", "data-drift", "grad-cam", "xai"],
    pitfalls:
      "一度デプロイしたモデルを放置し、データドリフトによる精度劣化に気づかないまま運用を" +
      "続けてしまう失敗が典型。継続的な監視・再学習の必要性を問う設問が定番。",
  },
];

export const stageById: Record<string, Stage> = Object.fromEntries(stages.map((stage) => [stage.id, stage]));
