/**
 * 「動かす」セクションのデモ棚卸しデータ。
 *
 * UI改善バッチ(承認者より §3)で新設。デモ↔概念のマッピングを一元化する:
 * - 概念側 → デモ側の紐付け(どのデモを見ればよいか)は、既存の `Concept.demo` フィールド
 *   (concepts.ts の `c()` ヘルパー第6引数、または個別オブジェクトの `demo:` プロパティ)を
 *   唯一の一次情報源として維持する(散在ハードコードを避けるため、ここでは複製しない)。
 * - デモ側 → 概念側の逆引き(`conceptIds`)は、その一次情報源から本ファイルの末尾で
 *   自動導出する(手打ちの二重管理をしない)。
 *
 * 各デモの3行構造(見るもの/動かすもの/気づくこと)は表示用のみの追加データであり、
 * デモ自体のロジック・計算・idは一切変更しない(App.tsx の id と一致させている)。
 */
import { concepts, demoLinks, type Concept } from "./concepts";

export type DemoCategory =
  | "supervised"
  | "unsupervised"
  | "reinforcement"
  | "evaluation"
  | "neural-net"
  | "sequence-language"
  | "generative";

export const demoCategoryMeta: Record<DemoCategory, { label: string; order: number }> = {
  supervised: { label: "教師あり学習", order: 1 },
  unsupervised: { label: "教師なし学習", order: 2 },
  reinforcement: { label: "強化学習", order: 3 },
  evaluation: { label: "モデル評価・汎化", order: 4 },
  "neural-net": { label: "ニューラルネットワークの基礎", order: 5 },
  "sequence-language": { label: "系列・言語モデル", order: 6 },
  generative: { label: "生成AI", order: 7 },
};

type DemoDef = {
  /** App.tsx の PAGES[].id と一致させる(内部idは変更しない)。 */
  id: string;
  /** concepts.ts の demoLinks の値と一致するハッシュ。 */
  hash: string;
  navLabel: string;
  /** 問いの形のタイトル。 */
  title: string;
  category: DemoCategory;
  /** カテゴリ内での表示順。 */
  order: number;
  whatYouSee: string;
  whatYouMove: string;
  whatYouNotice: string;
};

const demoDefs: DemoDef[] = [
  {
    id: "classify",
    hash: demoLinks.classify,
    navLabel: "分類",
    category: "supervised",
    order: 1,
    title: "似ているデータを、どうやって1つのカテゴリに分類する?",
    whatYouSee: "Iris実データ(150件)の特徴空間上で、品種ごとに色分けされた領域。",
    whatYouMove: "分類したい未知の点の位置。",
    whatYouNotice: "近傍のデータがどう「多数決」されて1つのクラスに決まるか。",
  },
  {
    id: "regression",
    hash: demoLinks.regression,
    navLabel: "回帰",
    category: "supervised",
    order: 2,
    title: "直線は、データにどう近づいていく?",
    whatYouSee: "Palmer Penguins実データに対する回帰直線と、そのズレ(損失)。",
    whatYouMove: "勾配降下法のステップ(1手ずつ進める)。",
    whatYouNotice: "1ステップごとに直線がデータへ近づき、損失が下がっていく様子。",
  },
  {
    id: "cluster",
    hash: demoLinks.cluster,
    navLabel: "クラスタリング",
    category: "unsupervised",
    order: 1,
    title: "正解ラベルなしで、似たものはまとまるのか?",
    whatYouSee: "Iris実データにk-meansを適用した際のクラスタの中心と割り当て。",
    whatYouMove: "反復回数(中心の再計算を1ステップずつ進める)。",
    whatYouNotice: "正解ラベルを使わなくても、品種にほぼ対応するまとまりができること。",
  },
  {
    id: "pca",
    hash: demoLinks.pca,
    navLabel: "PCA",
    category: "unsupervised",
    order: 2,
    title: "4次元の情報を、2次元に圧縮しても意味は残るのか?",
    whatYouSee: "Irisの4特徴量を主成分空間へ射影した2次元散布図。",
    whatYouMove: "採用する主成分の数。",
    whatYouNotice: "少ない軸数でもデータの分散の何割を説明できているか(寄与率)。",
  },
  {
    id: "bandit",
    hash: demoLinks.bandit,
    navLabel: "強化学習",
    category: "reinforcement",
    order: 1,
    title: "未知の選択肢を試すか、今の最善を選ぶか?",
    whatYouSee: "複数の腕(選択肢)から報酬を得ていく多腕バンディットの試行過程。",
    whatYouMove: "ε(探索する確率)の大きさ。",
    whatYouNotice: "探索(exploration)と活用(exploitation)のバランスで報酬の集まり方がどう変わるか。",
  },
  {
    id: "overfit",
    hash: demoLinks.overfit,
    navLabel: "過学習",
    category: "evaluation",
    order: 1,
    title: "モデルを複雑にするほど、本当に良くなるのか?",
    whatYouSee: "多項式の次数を変えたときの訓練誤差とテスト誤差の推移。",
    whatYouMove: "多項式の次数(モデルの複雑さ)。",
    whatYouNotice: "訓練誤差は下がり続けるのに、テスト誤差はある点から増加に転じること。",
  },
  {
    id: "metrics",
    hash: demoLinks.metrics,
    navLabel: "評価",
    category: "evaluation",
    order: 2,
    title: "しきい値を変えると、評価指標はどう動く?",
    whatYouSee: "ロジスティック回帰の予測スコアと、それに基づく混同行列・ROC曲線。",
    whatYouMove: "分類のしきい値。",
    whatYouNotice: "しきい値を動かすと適合率・再現率がトレードオフの関係で変化すること。",
  },
  {
    id: "nn",
    hash: demoLinks.nn,
    navLabel: "NN",
    category: "neural-net",
    order: 1,
    title: "ニューラルネットワークは、どうやって重みを更新する?",
    whatYouSee: "順伝播→損失計算→逆伝播→重み更新という学習ループの1手。",
    whatYouMove: "学習ループを進めるステップと、活性化関数の種類。",
    whatYouNotice: "誤差が逆向きに伝わり、各層の重みがどの方向に調整されるか。",
  },
  {
    id: "cnn",
    hash: demoLinks.cnn,
    navLabel: "CNN",
    category: "neural-net",
    order: 2,
    title: "畳み込みは、画像から何を取り出しているのか?",
    whatYouSee: "実物のMNIST手書き数字に対する畳み込みフィルタの処理結果(特徴マップ)。",
    whatYouMove: "スライドさせるフィルタの種類・位置。",
    whatYouNotice: "フィルタが縦線・横線などの局所的な特徴をどう検出するか。",
  },
  {
    id: "image-tasks",
    hash: demoLinks.imageTasks,
    navLabel: "画像タスク",
    category: "neural-net",
    order: 3,
    title: "同じ画像でも、タスクが違うと答えの粒度はどう変わる?",
    whatYouSee: "分類・検出・セグメンテーション・姿勢推定という4つのタスクの出力を重ね表示。",
    whatYouMove: "表示するタスクの切り替え。",
    whatYouNotice: "「何がある(分類)」「どこにある(検出)」「どの画素か(セグメンテーション)」の違い。",
  },
  {
    id: "attention",
    hash: demoLinks.attention,
    navLabel: "Attention",
    category: "sequence-language",
    order: 1,
    title: "単語は、どの単語に注目して意味を決めているのか?",
    whatYouSee: "単語ベクトルの内積とsoftmaxから計算されるAttentionの重み。",
    whatYouMove: "注目元にする単語の選択。",
    whatYouNotice: "文脈によって、同じ単語でも注目する相手(重みの分布)が変わること。",
  },
  {
    id: "lstm-gates",
    hash: demoLinks.lstm,
    navLabel: "LSTM",
    category: "sequence-language",
    order: 2,
    title: "LSTMは、何を覚えて何を忘れているのか?",
    whatYouSee: "系列を1ステップずつ処理したときのセル状態とゲートの値。",
    whatYouMove: "系列の入力(1ステップずつ選択)。",
    whatYouNotice: "忘却・入力・出力の3つのゲートがセル状態をどう書き換えるか。",
  },
  {
    id: "word2vec",
    hash: demoLinks.word2vec,
    navLabel: "word2vec",
    category: "sequence-language",
    order: 3,
    title: "単語の意味は、ベクトルの計算として扱えるのか?",
    whatYouSee: "単語を2次元に埋め込んだ分散表現の散布図。",
    whatYouMove: "ベクトル演算(例: 王 − 男 + 女)に使う単語の組み合わせ。",
    whatYouNotice: "意味的な関係がベクトル空間の「方向」として一貫して現れること。",
  },
  {
    id: "genai",
    hash: demoLinks.genai,
    navLabel: "生成AI",
    category: "generative",
    order: 1,
    title: "生成AIは、検索と生成をどう組み合わせている?",
    whatYouSee: "質問と文書の類似度検索(RAG)、およびノイズから画像が現れる拡散モデルの過程。",
    whatYouMove: "検索するクエリ、拡散モデルのノイズ除去ステップ。",
    whatYouNotice: "重みを変えずに外部知識を使うRAGと、段階的に生成する拡散モデルの違い。",
  },
];

export type Demo = DemoDef & { conceptIds: string[] };

export const demos: Demo[] = demoDefs.map((def) => ({
  ...def,
  conceptIds: concepts.filter((c: Concept) => c.demo === def.hash).map((c) => c.id),
}));

export const demoById: Record<string, Demo> = Object.fromEntries(demos.map((d) => [d.id, d]));

/** ハッシュ(例: "#classify")からデモを引く。用語カード側の逆引きリンクで使う。 */
export const demoByHash: Record<string, Demo> = Object.fromEntries(demos.map((d) => [d.hash, d]));

export function demosForConcept(conceptId: string): Demo[] {
  return demos.filter((d) => d.conceptIds.includes(conceptId));
}
