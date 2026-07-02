export type ConceptCategory =
  | "ml-foundation"
  | "supervised"
  | "unsupervised"
  | "reinforcement"
  | "evaluation"
  | "dl-foundation"
  | "dl-tech"
  | "cnn-image"
  | "sequence-nlp-speech"
  | "deep-rl"
  | "generative-ai"
  | "xai-compression";

export type RelationType =
  | "is_a"
  | "part_of"
  | "evolves_to"
  | "solves"
  | "used_for"
  | "contrasts_with"
  | "pipeline_next";

export type Concept = {
  id: string;
  term: string;
  reading?: string;
  category: ConceptCategory;
  summary: string;
  purpose?: string;
  difference?: string;
  examHint: string;
  demo?: string;
};

export type ConceptRelation = {
  from: string;
  to: string;
  type: RelationType;
  label?: string;
};

export type ConceptCategoryMeta = {
  id: ConceptCategory;
  label: string;
  shortLabel: string;
  description: string;
};

export const categoryMeta: ConceptCategoryMeta[] = [
  {
    id: "ml-foundation",
    label: "機械学習の基礎・学習方式",
    shortLabel: "ML基礎",
    description: "教師あり・教師なし・強化学習の入口と、汎化や過学習など全手法に共通する考え方。",
  },
  {
    id: "supervised",
    label: "教師あり学習",
    shortLabel: "教師あり",
    description: "正解ラベル付きデータから、分類や回帰のルールを学ぶ手法群。",
  },
  {
    id: "unsupervised",
    label: "教師なし学習",
    shortLabel: "教師なし",
    description: "正解ラベルなしで、クラスタ・低次元構造・推薦・トピックを見つける手法群。",
  },
  {
    id: "reinforcement",
    label: "強化学習",
    shortLabel: "強化学習",
    description: "エージェントが環境と相互作用し、累積報酬を最大化する行動を学ぶ枠組み。",
  },
  {
    id: "evaluation",
    label: "モデル評価・選択",
    shortLabel: "評価",
    description: "分類・回帰・モデル選択に使う指標と、未知データへの汎化を確認する考え方。",
  },
  {
    id: "dl-foundation",
    label: "深層学習の基礎",
    shortLabel: "DL基礎",
    description: "ニューラルネットワークの構造、順伝播、損失、逆伝播、パラメータ更新の流れ。",
  },
  {
    id: "dl-tech",
    label: "深層学習の要素技術",
    shortLabel: "要素技術",
    description: "活性化関数、最適化、正則化、正規化、データ拡張など、学習を成立・安定化させる部品。",
  },
  {
    id: "cnn-image",
    label: "CNN・画像認識",
    shortLabel: "画像",
    description: "CNNの層構造、画像モデルの系譜、画像分類・検出・セグメンテーション・姿勢推定。",
  },
  {
    id: "sequence-nlp-speech",
    label: "系列・音声・自然言語処理",
    shortLabel: "系列/NLP",
    description: "RNN/LSTM/GRU、Attention/Transformer、音声特徴量、テキスト表現、事前学習済み言語モデル。",
  },
  {
    id: "deep-rl",
    label: "深層強化学習",
    shortLabel: "深層RL",
    description: "Q学習に深層学習を組み合わせたDQNと、その発展・ゲームAI・実システム制御。",
  },
  {
    id: "generative-ai",
    label: "生成モデル・生成AI",
    shortLabel: "生成AI",
    description: "VAE/GAN/拡散モデル、基盤モデル、LLM、RLHF、RAG、LoRA、マルチモーダル。",
  },
  {
    id: "xai-compression",
    label: "解釈性・軽量化・実装",
    shortLabel: "XAI/軽量化",
    description: "モデルを説明し、軽くし、運用しやすくするための技術。",
  },
];

const demoLinks: Record<string, string> = {
  classify: "#classify",
  regression: "#regression",
  cluster: "#cluster",
  overfit: "#overfit",
  metrics: "#metrics",
  nn: "#nn",
  cnn: "#cnn",
  attention: "#attention",
  genai: "#genai",
  pca: "#pca",
  lstm: "#lstm-gates",
  word2vec: "#word2vec",
  imageTasks: "#image-tasks",
  bandit: "#bandit",
};

const coreLearningNotes: Record<string, Pick<Concept, "purpose" | "difference">> = {
  ml: {
    purpose: "人が明示的なルールを書きにくい判断や予測を、データから学ばせるために使う。",
    difference: "通常のプログラムは人がルールを書く。機械学習はデータからルールに相当するモデルを作る。",
  },
  "supervised-learning": {
    purpose: "過去の正解付きデータを使って、未知データのラベルや数値を予測するために使う。",
    difference: "教師なし学習は正解ラベルなしで構造を見つける。強化学習は正解ラベルではなく報酬から行動を学ぶ。",
  },
  "unsupervised-learning": {
    purpose: "正解がないデータから、まとまり・軸・潜在トピック・推薦の手がかりを見つけるために使う。",
    difference: "教師あり学習は正解ラベルを使う。教師なし学習はラベルなしでデータの構造を探す。",
  },
  "reinforcement-learning": {
    purpose: "試行錯誤しながら、長期的な報酬が大きくなる行動の選び方を学ぶために使う。",
    difference: "教師あり学習は入力ごとの正解を学ぶ。強化学習は状態・行動・報酬の流れから方策を学ぶ。",
  },
  "regression-task": {
    purpose: "価格、体重、需要、温度など連続値を予測するために使う。",
    difference: "分類はカテゴリを当てる。回帰は数値を当てる。",
  },
  "classification-task": {
    purpose: "画像の種類、迷惑メール判定、陽性/陰性などカテゴリを予測するために使う。",
    difference: "回帰は連続値を予測する。分類は離散的なクラスを予測する。",
  },
  overfitting: {
    purpose: "モデルが訓練データだけを覚えていないかを判断し、汎化性能を守るために押さえる概念。",
    difference: "未学習は訓練データにも合わない。過学習は訓練データには合うが未知データに弱い。",
  },
  underfitting: {
    purpose: "モデルが単純すぎる、学習不足、特徴量不足などで性能が出ない状態を見分けるために使う。",
    difference: "過学習は訓練性能だけ高い。未学習は訓練性能もテスト性能も低い。",
  },
  generalization: {
    purpose: "試験や実務で本当に欲しい、未知データに対する性能を考えるための中心概念。",
    difference: "訓練精度は学習済みデータへの当てはまり。汎化は未見データへの強さ。",
  },
  regularization: {
    purpose: "モデルの複雑さを抑え、過学習を防ぐために使う。",
    difference: "Dropoutはニューロンをランダムに無効化する正則化手法。L1/L2正則化は損失にペナルティを足す。",
  },
  dropout: {
    purpose: "ニューラルネットワークが特定のニューロンに依存しすぎるのを防ぎ、過学習を抑えるために使う。",
    difference: "L1/L2正則化は重みにペナルティをかける。Dropoutは訓練時に一部ユニットを無効化する。",
  },
  "linear-regression": {
    purpose: "説明変数と目的変数の関係を直線や平面で近似し、連続値を予測するために使う。",
    difference: "ロジスティック回帰は名前に回帰とあるが分類に使う。線形回帰は連続値予測に使う。",
  },
  "logistic-regression": {
    purpose: "確率を出して二値分類や多クラス分類を行うために使う。",
    difference: "線形回帰は数値をそのまま予測する。ロジスティック回帰はシグモイドなどで確率に変換して分類する。",
  },
  svm: {
    purpose: "クラス間の境界を、最も余裕のある位置に引いて分類するために使う。",
    difference: "決定木は条件分岐で分類する。SVMはマージン最大化で境界を決める。",
  },
  "decision-tree": {
    purpose: "条件分岐で予測ルールを表し、解釈しやすい分類・回帰を行うために使う。",
    difference: "SVMは境界を数式的に決める。決定木はif文のような分岐で決める。",
  },
  "random-forest": {
    purpose: "多数の決定木を組み合わせ、単独の木より安定した予測をするために使う。",
    difference: "決定木は1本の木。ランダムフォレストは多数の木をバギングで作るアンサンブル。",
  },
  kmeans: {
    purpose: "ラベルなしデータを、近さにもとづいてk個のグループに分けるために使う。",
    difference: "階層的クラスタリングは樹形図を作る。k-meansは中心点と割り当てを反復更新する。",
  },
  pca: {
    purpose: "高次元データを情報をなるべく保ったまま少ない軸に圧縮・可視化するために使う。",
    difference: "クラスタリングはグループ化。PCAは軸を取り直して次元を減らす。",
  },
  "neural-network": {
    purpose: "入力から出力への複雑な非線形関係を、多数の重みで表現するために使う。",
    difference: "線形モデルは単純な関係を仮定する。ニューラルネットワークは層と活性化関数で非線形を表す。",
  },
  "gradient-descent": {
    purpose: "損失を小さくする方向へ重みを少しずつ更新するために使う。",
    difference: "誤差逆伝播法は勾配を計算する仕組み。勾配降下法はその勾配で重みを更新する方法。",
  },
  backprop: {
    purpose: "各重みが損失にどれだけ影響したかを効率よく計算するために使う。",
    difference: "勾配降下法は更新方法。誤差逆伝播法は更新に必要な勾配を後ろ向きに計算する方法。",
  },
  activation: {
    purpose: "ニューラルネットワークに非線形性を与え、複雑な関係を学習できるようにするために使う。",
    difference: "重み付き和だけでは線形変換の重ね合わせに近い。活性化関数を入れると非線形表現ができる。",
  },
  relu: {
    purpose: "中間層で計算を単純にしつつ、勾配消失を起こしにくくするために使う。",
    difference: "シグモイドは0〜1に圧縮する。ReLUは正の値をそのまま通し、負の値を0にする。",
  },
  cnn: {
    purpose: "画像の局所的な模様や形を段階的に捉えるために使う。",
    difference: "RNNは系列方向の依存を扱う。CNNは画像などの空間的・局所的特徴を扱う。",
  },
  "convolution-layer": {
    purpose: "小さなフィルタを画像上で動かし、エッジや模様などの局所特徴を取り出すために使う。",
    difference: "全結合層は全入力を結ぶ。畳み込み層は近い範囲に同じフィルタを適用する。",
  },
  pooling: {
    purpose: "特徴マップを縮小し、位置ずれへの強さと計算量削減を得るために使う。",
    difference: "畳み込みは特徴を抽出する。プーリングは抽出した特徴を要約する。",
  },
  rnn: {
    purpose: "文章、音声、時系列など、順序のあるデータを扱うために使う。",
    difference: "CNNは空間的特徴に強い。RNNは前の情報を隠れ状態として次へ渡す。",
  },
  lstm: {
    purpose: "長い系列でも重要な情報を保持し、長期依存を扱うために使う。",
    difference: "通常のRNNは長期依存で勾配消失しやすい。LSTMはゲートとセル状態で記憶を制御する。",
  },
  attention: {
    purpose: "系列の中で、今見るべき入力部分に重みを置くために使う。",
    difference: "RNNは順番に処理する。Attentionは入力同士の関係を重みとして直接見る。",
  },
  transformer: {
    purpose: "Self-Attentionで系列全体の関係を並列に扱い、大規模言語モデルの土台にするために使う。",
    difference: "RNNは逐次処理。TransformerはSelf-Attentionにより並列化しやすい。",
  },
  bert: {
    purpose: "文脈を双方向に読んで、文章理解系タスクに強い表現を作るために使う。",
    difference: "GPTは次トークンを生成するデコーダ型。BERTはマスク語を当てるエンコーダ型。",
  },
  gpt: {
    purpose: "直前までの文脈から次のトークンを予測し、文章を生成するために使う。",
    difference: "BERTは理解系のエンコーダ型。GPTは生成系のデコーダ型。",
  },
  word2vec: {
    purpose: "単語の意味的な近さや関係をベクトル空間で扱うために使う。",
    difference: "ワンホットは単語間の近さを表せない。word2vecは意味の近さを距離や方向で表す。",
  },
  "generative-model": {
    purpose: "学習したデータ分布から、新しい画像・文章・音などを作るために使う。",
    difference: "識別モデルは入力を分類する。生成モデルはデータそのものを生成する。",
  },
  gan: {
    purpose: "生成器と識別器を競わせて、リアルなデータを生成するために使う。",
    difference: "VAEは潜在分布から生成する。GANは生成器と識別器の敵対的学習で生成する。",
  },
  vae: {
    purpose: "データを潜在空間に圧縮し、その分布から新しいデータを生成するために使う。",
    difference: "GANは敵対的学習。VAEは確率的な潜在変数と再構成で学習する。",
  },
  diffusion: {
    purpose: "ノイズを少しずつ取り除く過程として、高品質な画像などを生成するために使う。",
    difference: "GANは生成器が一気に生成する。拡散モデルはノイズ除去を段階的に行う。",
  },
  llm: {
    purpose: "大量のテキストから言語パターンを学び、理解・生成・要約・対話を行うために使う。",
    difference: "従来の個別NLPモデルはタスクごとに作る。LLMは大規模事前学習で多様なタスクに使える。",
  },
  rag: {
    purpose: "外部文書を検索して回答に使い、知識不足やハルシネーションを減らすために使う。",
    difference: "ファインチューニングは重みを変える。RAGは検索結果を入力に足し、重みは基本的に変えない。",
  },
  "fine-tuning": {
    purpose: "学習済みモデルを特定タスクやデータに適応させるために使う。",
    difference: "転移学習は広い概念。ファインチューニングは学習済みモデルを追加学習する具体的手法。",
  },
  "transfer-learning": {
    purpose: "既に学んだ特徴や知識を別タスクに流用し、少ないデータでも性能を出すために使う。",
    difference: "ファインチューニングは転移学習の一形態で、学習済みモデルを追加で調整する。",
  },
  "confusion-matrix": {
    purpose: "分類結果の当たり外れをTP/FP/FN/TNに分け、指標を計算するために使う。",
    difference: "正解率は全体の正しさだけを見る。混同行列は誤検出と見逃しを分けて見る。",
  },
  precision: {
    purpose: "陽性と予測したものの信頼性を測るために使う。",
    difference: "再現率は実際の陽性をどれだけ拾えたか。適合率は陽性予測がどれだけ正しいか。",
  },
  recall: {
    purpose: "本当に陽性のものをどれだけ見逃さず拾えたかを測るために使う。",
    difference: "適合率は誤検出の少なさ。再現率は見逃しの少なさ。",
  },
  "cross-validation": {
    purpose: "データ分割の偶然に左右されにくく、汎化性能を見積もるために使う。",
    difference: "ホールドアウトは一度だけ分割する。交差検証は評価役を入れ替えて平均する。",
  },
  "q-learning": {
    purpose: "状態と行動の価値を学び、将来報酬が高い行動を選ぶために使う。",
    difference: "SARSAは実際に選んだ次行動で更新する。Q学習は次状態で最大のQ値を使う。",
  },
  dqn: {
    purpose: "Q学習の価値関数をニューラルネットワークで近似し、高次元状態を扱うために使う。",
    difference: "Q学習は表形式でも扱える。DQNは深層学習でQ値を近似する。",
  },
};

function c(
  id: string,
  term: string,
  category: ConceptCategory,
  summary: string,
  examHint: string,
  demo?: keyof typeof demoLinks
): Concept {
  return {
    id,
    term,
    category,
    summary,
    ...coreLearningNotes[id],
    examHint,
    demo: demo ? demoLinks[demo] : undefined,
  };
}

export const concepts: Concept[] = [
  c("ml", "機械学習", "ml-foundation", "データから規則性を学び、未知データに対して予測や判断を行うAIの方法。", "人がルールを書くのではなく、データからモデルがルールを獲得する。"),
  c("supervised-learning", "教師あり学習", "ml-foundation", "入力と正解ラベルのペアから対応関係を学ぶ方式。", "正解ラベルあり。カテゴリなら分類、連続値なら回帰。", "classify"),
  c("unsupervised-learning", "教師なし学習", "ml-foundation", "正解ラベルなしでデータの構造やまとまりを見つける方式。", "ラベルなし。クラスタリング・次元削減・推薦・トピック抽出。", "cluster"),
  c("reinforcement-learning", "強化学習", "ml-foundation", "環境との相互作用で報酬を最大化する行動を学ぶ方式。", "状態・行動・報酬・方策が出たら強化学習。", "bandit"),
  c("semi-supervised", "半教師あり学習", "ml-foundation", "少量のラベル付きデータと大量のラベルなしデータを併用する学習。", "ラベル付けコストが高い場面で有効。教師ありと教師なしの中間。"),
  c("generalization", "汎化", "ml-foundation", "訓練に使っていない未知データにも性能を発揮できる性質。", "モデル評価の目的は訓練精度ではなく汎化性能の確認。"),
  c("overfitting", "過学習", "ml-foundation", "訓練データに適合しすぎ、未知データで性能が落ちる状態。", "訓練誤差は低いがテスト誤差が高い。正則化やDropoutで抑える。", "overfit"),
  c("underfitting", "未学習", "ml-foundation", "モデルが単純すぎる、または学習不足で訓練データにも合わない状態。", "訓練誤差もテスト誤差も高い。"),
  c("bias-variance", "バイアス-バリアンストレードオフ", "ml-foundation", "単純すぎる偏りと複雑すぎるばらつきのバランス。", "未学習は高バイアス、過学習は高バリアンスで整理する。"),
  c("feature", "特徴量", "ml-foundation", "モデルに入力する観測値や加工した説明変数。", "良い特徴量はモデル性能に直結する。"),
  c("curse-dimensionality", "次元の呪い", "ml-foundation", "特徴量の次元が増えすぎるとデータが疎になり学習が難しくなる問題。", "PCAなどの次元削減と関連づける。"),

  c("regression-task", "回帰問題", "supervised", "連続値を予測する教師あり学習のタスク。", "出力が価格・重量・温度など数値なら回帰。", "regression"),
  c("classification-task", "分類問題", "supervised", "カテゴリを予測する教師あり学習のタスク。", "出力が犬/猫、陽性/陰性などクラスなら分類。", "classify"),
  c("linear-regression", "線形回帰", "supervised", "説明変数と目的変数の線形関係を仮定して連続値を予測する手法。", "直線・平面で数値を予測。最小二乗法とセット。", "regression"),
  c("multiple-regression", "重回帰分析", "supervised", "複数の説明変数で目的変数を予測する線形回帰。", "説明変数が複数ある回帰。"),
  c("least-squares", "最小二乗法", "supervised", "予測誤差の二乗和が最小になるようにパラメータを求める方法。", "線形回帰の代表的な推定方法。"),
  c("regularization", "正則化", "supervised", "損失にペナルティを加えてモデルの複雑さを抑える方法。", "過学習対策。L1/L2、ラッソ/リッジと対応。", "overfit"),
  c("lasso", "ラッソ回帰(L1)", "supervised", "L1正則化を加え、一部の係数を0にしやすい回帰。", "特徴選択の効果がある。"),
  c("ridge", "リッジ回帰(L2)", "supervised", "L2正則化を加え、係数を小さく抑える回帰。", "係数をなめらかに縮小する。"),
  c("ar", "自己回帰モデル(AR)", "supervised", "過去の値から現在・未来の値を予測する時系列モデル。", "時系列専用。過去の観測値を使う。"),
  c("var", "ベクトル自己回帰モデル(VAR)", "supervised", "複数の時系列を相互に用いて予測するARの多変量拡張。", "複数系列のAR。疑似相関にも注意。"),
  c("spurious-correlation", "疑似相関", "supervised", "直接の因果がないのに相関が見える現象。", "時系列や外部要因の影響で見かけの相関が出る。"),
  c("logistic-regression", "ロジスティック回帰", "supervised", "シグモイドで確率を出し、分類に使う手法。", "名前は回帰だが分類。二値分類で頻出。", "metrics"),
  c("sigmoid", "シグモイド関数", "supervised", "入力を0〜1の値に変換する関数。", "二値分類の確率出力で使う。"),
  c("softmax", "ソフトマックス関数", "supervised", "複数クラスのスコアを合計1の確率分布に変換する関数。", "多クラス分類の出力層で使う。"),
  c("multiclass", "多クラス分類", "supervised", "3つ以上のクラスを分類する問題。", "ソフトマックスやOne-vs-Restと関連。"),
  c("svm", "サポートベクターマシン(SVM)", "supervised", "クラス間のマージンを最大化する境界を学ぶ分類手法。", "マージン最大化・サポートベクトル・カーネルがキーワード。"),
  c("margin", "マージン最大化", "supervised", "境界と最も近いデータ点の距離を大きくする考え方。", "SVMの本質。"),
  c("kernel", "カーネル/カーネルトリック", "supervised", "高次元写像を明示せず内積計算だけで非線形境界を扱う工夫。", "SVMの非線形分類で問われる。"),
  c("decision-tree", "決定木", "supervised", "条件分岐を木構造で表す分類・回帰モデル。", "解釈しやすいが過学習しやすい。"),
  c("pruning", "プルーニング", "supervised", "決定木などの不要な枝を刈り、過学習を抑える方法。", "決定木では過学習対策、軽量化ではモデル圧縮の意味でも使う。"),
  c("random-forest", "ランダムフォレスト", "supervised", "多数の決定木をバギングで作り、多数決や平均で予測する手法。", "決定木＋バギング＋多数決。", "classify"),
  c("ensemble", "アンサンブル学習", "supervised", "複数のモデルを組み合わせて性能を高める方法。", "バギング・ブースティング・ランダムフォレストをまとめる上位概念。"),
  c("bagging", "バギング", "supervised", "データを復元抽出して複数モデルを独立に学習する方法。", "ランダムフォレストとセット。分散を下げる。"),
  c("bootstrap", "ブートストラップサンプリング", "supervised", "重複を許してデータを標本抽出する方法。", "バギングの土台。"),
  c("boosting", "ブースティング", "supervised", "弱学習器を逐次的に追加し、前の誤りを補正していく方法。", "逐次修正。AdaBoostや勾配ブースティング。"),
  c("adaboost", "AdaBoost", "supervised", "誤分類データに重みを付けながら弱学習器を順次学習するブースティング。", "重み付き多数決。"),
  c("gradient-boosting", "勾配ブースティング", "supervised", "損失の勾配方向に弱学習器を追加するブースティング。", "XGBoostなどの土台。"),
  c("knn", "k近傍法(k-NN)", "supervised", "近いk個のデータの多数決や平均で予測する手法。", "kを大きくすると境界がなめらか。", "classify"),

  c("clustering", "クラスタリング", "unsupervised", "似たデータ同士をグループ化する教師なし学習。", "正解ラベルなしでまとまりを作る。", "cluster"),
  c("cluster-analysis", "クラスタ分析", "unsupervised", "クラスタリング結果からデータ構造を解釈する分析。", "クラスタリングの結果を読む工程。"),
  c("kmeans", "k-means法", "unsupervised", "k個の中心と割り当てを反復してクラスタを作る手法。", "kを事前に決める、初期値依存。", "cluster"),
  c("ward", "ウォード法", "unsupervised", "クラスタ内分散の増加が小さいように結合する階層的クラスタリング。", "デンドログラムとセット。"),
  c("hierarchical-clustering", "階層的クラスタリング", "unsupervised", "クラスタを階層構造として作るクラスタリング。", "樹形図で可視化。"),
  c("dendrogram", "デンドログラム(樹形図)", "unsupervised", "階層的クラスタリングの結合過程を木で表した図。", "ウォード法などの結果表示。"),
  c("dimensionality-reduction", "次元削減", "unsupervised", "高次元データを低次元に変換して構造を見やすくする方法。", "可視化やノイズ低減、次元の呪いへの対策。", "pca"),
  c("pca", "主成分分析(PCA)", "unsupervised", "分散が最大になる方向へ軸を取り直す線形次元削減。", "分散最大・主成分・寄与率。", "pca"),
  c("svd", "特異値分解(SVD)", "unsupervised", "行列を特異値と特異ベクトルに分解する方法。", "PCAや潜在意味解析などの基礎。"),
  c("mds", "多次元尺度構成法(MDS)", "unsupervised", "データ間距離をなるべく保って低次元配置する方法。", "距離関係を保つ可視化。"),
  c("tsne", "t-SNE", "unsupervised", "近傍関係を保って高次元データを2D/3Dに可視化する非線形次元削減。", "可視化向け。クラスタが見えやすいが距離解釈に注意。"),
  c("umap", "UMAP", "unsupervised", "高次元データを高速に低次元可視化する非線形次元削減。", "t-SNEの後継的に扱われる。"),
  c("dbscan", "DBSCAN", "unsupervised", "密度に基づいて任意形状クラスタと外れ値を検出する手法。", "kを事前に指定せず、密度ベース。"),
  c("recommendation", "レコメンデーション", "unsupervised", "ユーザや商品の情報から推薦を行う技術。", "協調フィルタリング・コンテンツベースを対比。"),
  c("collaborative-filtering", "協調フィルタリング", "unsupervised", "ユーザや商品の類似性から未知の評価を推定する推薦手法。", "似たユーザ/商品を使う。コールドスタート問題あり。"),
  c("content-based-filtering", "コンテンツベースフィルタリング", "unsupervised", "商品の特徴や内容に基づいて推薦する手法。", "ユーザ行動が少なくても商品特徴を使える。"),
  c("cold-start", "コールドスタート問題", "unsupervised", "新規ユーザや新規商品で履歴が足りず推薦が難しい問題。", "協調フィルタリングの弱点として頻出。"),
  c("topic-model", "トピックモデル", "unsupervised", "文書集合から潜在的な話題を抽出するモデル。", "文書は複数トピックの混合と考える。"),
  c("lda", "潜在的ディリクレ配分法(LDA)", "unsupervised", "文書のトピック分布とトピックの単語分布を推定する代表的トピックモデル。", "教師なしNLP。Linear Discriminant Analysisとは別。"),
  c("silhouette", "シルエット係数", "unsupervised", "クラスタ内の近さとクラスタ間の遠さからクラスタリング品質を測る指標。", "教師なし評価の代表例。"),

  c("agent", "エージェント", "reinforcement", "環境の中で状態を観測し行動を選ぶ主体。", "強化学習の行動主体。", "bandit"),
  c("environment", "環境", "reinforcement", "エージェントが相互作用する外部世界。", "行動に応じて次状態と報酬を返す。", "bandit"),
  c("state", "状態", "reinforcement", "エージェントが置かれている状況を表す情報。", "MDPの構成要素。"),
  c("action", "行動", "reinforcement", "状態に対してエージェントが選ぶ操作。", "行動により状態と報酬が変わる。"),
  c("reward", "報酬", "reinforcement", "行動結果の良さを示す信号。", "累積報酬を最大化する。"),
  c("policy", "方策", "reinforcement", "状態から行動を選ぶルール。", "何をするかの戦略。"),
  c("state-value", "状態価値関数", "reinforcement", "状態から将来得られる報酬の期待値。", "V(s)で表すことが多い。"),
  c("action-value", "行動価値関数", "reinforcement", "状態と行動の組から将来得られる報酬の期待値。", "Q(s,a)。Q学習の中心。"),
  c("mdp", "マルコフ決定過程(MDP)", "reinforcement", "状態・行動・遷移確率・報酬で意思決定問題を表す枠組み。", "次状態が現在状態と行動だけで決まるマルコフ性。"),
  c("discount-rate", "割引率", "reinforcement", "将来報酬をどれだけ重視するかを決める係数。", "γ。長期報酬と短期報酬のバランス。"),
  c("q-learning", "Q学習", "reinforcement", "行動価値関数を更新して最適方策を学ぶオフポリシー手法。", "次状態の最大Q値で更新。"),
  c("sarsa", "SARSA", "reinforcement", "実際に選んだ次行動のQ値で更新するオンポリシー手法。", "Q学習との違いは次行動の扱い。"),
  c("policy-gradient", "方策勾配法", "reinforcement", "方策そのものを勾配で直接最適化する手法。", "連続行動や確率方策と相性が良い。"),
  c("reinforce", "REINFORCE", "reinforcement", "方策勾配法の基本アルゴリズム。", "エピソード報酬で方策を更新。"),
  c("actor-critic", "Actor-Critic", "reinforcement", "方策を担うActorと価値評価を担うCriticを組み合わせる手法。", "方策勾配と価値関数の融合。"),
  c("a3c", "A3C", "reinforcement", "複数エージェントが非同期に学習するActor-Critic系手法。", "Asynchronous Advantage Actor-Critic。"),
  c("bandit", "バンディット問題", "reinforcement", "状態遷移なしで複数の選択肢から報酬の高い腕を選ぶ問題。", "探索と活用の最小モデル。", "bandit"),
  c("exploration-exploitation", "探索と活用", "reinforcement", "未知の行動を試すことと既知の良い行動を選ぶことのトレードオフ。", "ε-greedyとセット。", "bandit"),
  c("epsilon-greedy", "ε-greedy", "reinforcement", "一定確率εで探索し、それ以外は最善行動を選ぶ方策。", "探索と活用の制御。", "bandit"),
  c("reward-shaping", "報酬成形", "reinforcement", "学習が進みやすいように報酬設計を工夫すること。", "報酬設計の良し悪しが学習結果に影響。"),

  c("train-valid-test", "訓練・検証・テストデータ", "evaluation", "学習・調整・最終評価のためにデータを分ける考え方。", "評価データで学習しないことが重要。"),
  c("holdout", "ホールドアウト法", "evaluation", "データを訓練用と評価用に一度だけ分割する評価方法。", "単純だが分割に依存する。"),
  c("cross-validation", "k分割交差検証", "evaluation", "データをk分割し、評価役を入れ替えながら性能を平均する方法。", "汎化性能を安定して見積もる。"),
  c("confusion-matrix", "混同行列", "evaluation", "分類結果をTP/FP/FN/TNで整理する表。", "適合率・再現率・F値の土台。", "metrics"),
  c("accuracy", "正解率", "evaluation", "全体のうち正しく分類した割合。", "クラス不均衡では過大評価に注意。", "metrics"),
  c("precision", "適合率", "evaluation", "陽性と予測したもののうち本当に陽性だった割合。", "誤検出(FP)を避けたい場面で重視。", "metrics"),
  c("recall", "再現率", "evaluation", "実際の陽性のうち見つけられた割合。", "見逃し(FN)を避けたい場面で重視。", "metrics"),
  c("f1", "F値", "evaluation", "適合率と再現率の調和平均。", "不均衡データでバランスを見る。", "metrics"),
  c("roc-auc", "ROC曲線とAUC", "evaluation", "しきい値を変えた分類性能をTPR/FPRで見る指標。", "AUCは1に近いほど良い。0.5はランダム。", "metrics"),
  c("type-errors", "第一種/第二種の過誤", "evaluation", "偽陽性と偽陰性に対応する統計的な誤り。", "FPとFNの意味を文脈で判断する。"),
  c("mse", "平均二乗誤差(MSE)", "evaluation", "誤差の二乗平均。大きな誤差を重く見る回帰指標。", "回帰評価。小さいほど良い。", "regression"),
  c("rmse", "RMSE", "evaluation", "MSEの平方根。目的変数と同じ単位で誤差を表す。", "回帰評価。外れ値に比較的敏感。"),
  c("mae", "MAE", "evaluation", "絶対誤差の平均。外れ値の影響がMSEより小さい。", "回帰評価。小さいほど良い。"),
  c("r2", "決定係数R²", "evaluation", "回帰モデルが目的変数の分散をどれだけ説明できるか。", "1に近いほど説明力が高い。"),
  c("error-function", "誤差関数", "evaluation", "予測と正解のズレを数値化する関数。", "損失関数とほぼ同じ文脈で使われる。"),
  c("occam", "オッカムの剃刀", "evaluation", "同程度に説明できるなら単純なモデルを選ぶ考え方。", "モデル選択・過学習対策と関連。"),
  c("aic-bic", "情報量規準(AIC/BIC)", "evaluation", "当てはまりとモデル複雑度のペナルティでモデルを選ぶ基準。", "値が小さいモデルを選ぶ。AIC/BICは複雑さを罰する。"),

  c("neural-network", "ニューラルネットワーク", "dl-foundation", "人工ニューロンを層状に結合したモデル。", "深層学習の土台。", "nn"),
  c("perceptron", "単純パーセプトロン", "dl-foundation", "入力の線形結合をしきい値で分類する初期のニューラルモデル。", "線形分離可能な問題のみ。"),
  c("mlp", "多層パーセプトロン(MLP)", "dl-foundation", "隠れ層を持つニューラルネットワーク。", "非線形問題を扱える。"),
  c("input-hidden-output", "入力層・隠れ層・出力層", "dl-foundation", "ニューラルネットワークを構成する層の役割。", "入力→特徴変換→予測。", "nn"),
  c("weight-bias", "重み・バイアス", "dl-foundation", "学習で更新されるパラメータ。", "損失を小さくするように調整される。", "nn"),
  c("forward", "順伝播", "dl-foundation", "入力から出力へ計算を進める処理。", "予測を出す前向き計算。", "nn"),
  c("loss-function", "損失関数", "dl-foundation", "予測と正解のズレを数値化する関数。", "MSEや交差エントロピー。", "nn"),
  c("cross-entropy", "交差エントロピー", "dl-foundation", "分類でよく使う損失関数。", "正解クラスの確率が低いほど損失が大きい。"),
  c("backprop", "誤差逆伝播法", "dl-foundation", "損失から各重みへの勾配を後ろ向きに効率計算する方法。", "Backpropagation。連鎖律とセット。", "nn"),
  c("chain-rule", "連鎖律", "dl-foundation", "合成関数の微分を分解する法則。", "誤差逆伝播法の数学的基盤。"),
  c("gradient", "勾配", "dl-foundation", "損失を増減させる方向と大きさを表す傾き。", "重み更新の方向を決める。"),
  c("gradient-descent", "勾配降下法", "dl-foundation", "損失が小さくなる方向へパラメータを更新する方法。", "学習率が大きすぎると発散。", "regression"),
  c("local-minimum", "局所最適・大域最適・鞍点・プラトー", "dl-foundation", "最適化中に出会う損失地形上の特徴。", "深層学習では鞍点やプラトーも学習停滞の原因。"),
  c("learning-rate", "学習率", "dl-foundation", "勾配方向へどれだけ大きく更新するかを決める値。", "大きすぎると発散、小さすぎると遅い。", "regression"),
  c("epoch-batch", "エポック・バッチ・ミニバッチ", "dl-foundation", "データを何周・どの単位で学習するかを表す用語。", "ミニバッチ学習は深層学習の標準。"),
  c("gpu-tpu", "GPU/TPU", "dl-foundation", "深層学習の並列計算を高速化するハードウェア。", "行列演算の高速化。"),

  c("activation", "活性化関数", "dl-tech", "ニューロン出力に非線形性を与える関数。", "中間層はReLU系、出力層は用途で選ぶ。", "nn"),
  c("step-function", "ステップ関数", "dl-tech", "しきい値で0/1を出す古典的な活性化関数。", "パーセプトロンで使われる。"),
  c("tanh", "tanh", "dl-tech", "-1〜1に出力する活性化関数。", "古典的RNNなどで使われる。"),
  c("relu", "ReLU", "dl-tech", "0以下を0、正の値をそのまま出す活性化関数。", "中間層の標準。勾配消失を緩和。", "nn"),
  c("leaky-relu", "Leaky ReLU", "dl-tech", "負の入力にも小さな傾きを残すReLUの派生。", "Dead ReLU問題対策。"),
  c("gelu", "GELU", "dl-tech", "入力を滑らかにゲートする活性化関数。", "Transformer系で使われることがある。"),
  c("vanishing-gradient", "勾配消失", "dl-tech", "層を逆伝播するうちに勾配が小さくなり学習が進まない問題。", "RNNや深いネットで頻出。ReLU/LSTM/ResNetで緩和。", "lstm"),
  c("exploding-gradient", "勾配爆発", "dl-tech", "勾配が大きくなりすぎて学習が不安定になる問題。", "勾配クリッピングで抑える。"),
  c("gradient-clipping", "勾配クリッピング", "dl-tech", "勾配の大きさを上限で切り詰める手法。", "勾配爆発対策。RNNで頻出。"),
  c("sgd", "SGD", "dl-tech", "一部データの勾配で確率的に更新する最適化手法。", "勾配降下法の基本。"),
  c("momentum", "Momentum", "dl-tech", "過去の勾配の勢いを加えて更新する手法。", "谷を滑るように進む。"),
  c("adagrad", "AdaGrad", "dl-tech", "パラメータごとに学習率を適応させる手法。", "頻出特徴の学習率が小さくなる。"),
  c("rmsprop", "RMSProp", "dl-tech", "勾配二乗の移動平均で学習率を調整する手法。", "AdaGradの学習率減衰しすぎを改善。"),
  c("adam", "Adam", "dl-tech", "MomentumとRMSPropの考えを組み合わせた代表的最適化手法。", "深層学習で標準的。"),
  c("adamw", "AdamW", "dl-tech", "Adamの重み減衰の扱いを改善した手法。", "LLMなどでも頻出。"),
  c("dropout", "Dropout", "dl-tech", "訓練時に一部ニューロンをランダムに無効化する正則化。", "過学習対策。推論時は使わない。", "overfit"),
  c("early-stopping", "早期終了", "dl-tech", "検証性能が悪化し始めたら学習を止める過学習対策。", "検証データを監視する。"),
  c("batchnorm", "バッチ正規化", "dl-tech", "ミニバッチ内で層入力を正規化し学習を安定化する手法。", "CNNなどで頻出。"),
  c("layernorm", "レイヤー正規化", "dl-tech", "サンプルごとに層内を正規化する手法。", "Transformerで頻出。", "attention"),
  c("data-augmentation", "データ拡張", "dl-tech", "既存データに変換を加えて学習データを増やす方法。", "画像の回転・反転・クロップなど。汎化性能を上げる。"),
  c("cutout-random-erasing", "Cutout / Random Erasing", "dl-tech", "画像の一部を隠して学習するデータ拡張。", "局所欠損に強くする。"),
  c("mixup-cutmix", "Mixup / CutMix", "dl-tech", "画像やラベルを混ぜるデータ拡張。", "Mixupは全体を混ぜ、CutMixは領域を切り貼り。"),
  c("autoencoder", "オートエンコーダ", "dl-tech", "入力を圧縮し再構成するニューラルネットワーク。", "表現学習・異常検知・VAEの基礎。"),
  c("pretraining", "事前学習", "dl-tech", "大規模データで先に汎用的な表現を学ぶこと。", "転移学習・基盤モデルの土台。", "genai"),

  c("cnn", "CNN", "cnn-image", "畳み込みとプーリングで画像の局所特徴を抽出するネットワーク。", "画像系= CNN。畳み込み層・プーリング層が核。", "cnn"),
  c("convolution-layer", "畳み込み層", "cnn-image", "フィルタをスライドして局所特徴を抽出する層。", "特徴マップを作る。", "cnn"),
  c("filter-kernel", "フィルタ/カーネル", "cnn-image", "畳み込みで使う小さな重み行列。", "エッジや模様など特定特徴に反応。", "cnn"),
  c("stride", "ストライド", "cnn-image", "フィルタを何ピクセルずつ動かすか。", "出力サイズに影響。"),
  c("padding", "パディング", "cnn-image", "入力の周囲に値を追加し出力サイズや端の扱いを調整する方法。", "same/valid畳み込みの違い。"),
  c("local-connectivity", "局所結合構造", "cnn-image", "画像の近い領域だけを結合して特徴を抽出する構造。", "CNNが画像に強い理由。"),
  c("pooling", "プーリング", "cnn-image", "特徴マップを縮約する操作。", "位置ずれ耐性と計算量削減。", "cnn"),
  c("max-pooling", "最大値プーリング", "cnn-image", "領域内の最大値を取るプーリング。", "強い特徴を残す。"),
  c("avg-pooling", "平均値プーリング", "cnn-image", "領域内の平均値を取るプーリング。", "特徴を平滑化する。"),
  c("gap", "グローバルアベレージプーリング(GAP)", "cnn-image", "特徴マップ全体の平均を取り全結合層を減らす方法。", "パラメータ削減・軽量化。"),
  c("fully-connected", "全結合層", "cnn-image", "前層の全ユニットと接続する層。", "分類器の最後で使われることが多い。"),
  c("neocognitron", "ネオコグニトロン", "cnn-image", "CNNの原型となる視覚認識モデル。", "LeNetより前の歴史的モデル。"),
  c("lenet", "LeNet", "cnn-image", "手書き数字認識で知られる初期CNN。", "CNNの元祖的モデル。", "cnn"),
  c("ilsvrc", "ILSVRC", "cnn-image", "ImageNetを用いた画像認識コンペティション。", "AlexNetによる第3次AIブームの契機。"),
  c("alexnet", "AlexNet", "cnn-image", "2012年ILSVRCで大きな性能向上を示したCNN。", "深層学習ブームの象徴。"),
  c("vgg", "VGG", "cnn-image", "3×3畳み込みを積み重ねたシンプルな深いCNN。", "小さな畳み込みの反復。"),
  c("googlenet", "GoogLeNet / Inception", "cnn-image", "複数サイズの畳み込みを並列するInceptionモジュールを持つCNN。", "計算効率と多尺度特徴。"),
  c("resnet", "ResNet", "cnn-image", "スキップ結合で超深層化を可能にしたCNN。", "勾配消失を残差接続で緩和。"),
  c("skip-connection", "スキップ結合", "cnn-image", "層を飛び越えて情報を足し合わせる接続。", "ResNetの核。勾配が流れやすくなる。"),
  c("densenet", "DenseNet", "cnn-image", "各層の出力を後続層に密に連結するCNN。", "特徴再利用。"),
  c("senet", "SENet", "cnn-image", "チャネルごとの重要度を学習して特徴を再重み付けするCNN。", "Attention的なチャネル重み。"),
  c("mobilenet", "MobileNet", "cnn-image", "Depthwise Separable Convolutionで軽量化したCNN。", "エッジ/モバイル向け。"),
  c("depthwise", "Depthwise Separable Convolution", "cnn-image", "チャネル方向と空間方向の畳み込みを分けて計算量を減らす手法。", "MobileNetの核。"),
  c("efficientnet", "EfficientNet", "cnn-image", "深さ・幅・解像度をバランスよく拡大するCNN。", "精度と効率のバランス。"),
  c("nas", "Neural Architecture Search(NAS)", "cnn-image", "ニューラルネットワーク構造を自動探索する技術。", "NASNet/MnasNet/EfficientNetと関連。"),
  c("transfer-learning", "転移学習", "cnn-image", "別タスクで学習済みの知識を新しいタスクに活用する方法。", "少ないデータで有効。", "genai"),
  c("fine-tuning", "ファインチューニング", "cnn-image", "学習済みモデルを特定タスクで追加学習して適応させる方法。", "転移学習の一種。"),
  c("image-classification", "画像分類", "cnn-image", "画像全体に1つのクラスラベルを付けるタスク。", "画像1枚→カテゴリ。", "imageTasks"),
  c("object-detection", "物体検出", "cnn-image", "画像中の物体の位置とクラスを同時に推定するタスク。", "矩形領域/バウンディングボックス。", "imageTasks"),
  c("rcnn", "R-CNN / Fast / Faster R-CNN", "cnn-image", "候補領域を用いて物体検出するモデル系列。", "二段階検出。Faster R-CNNはRPNを導入。"),
  c("yolo", "YOLO", "cnn-image", "画像を一度で処理する高速な物体検出モデル。", "一段階検出。You Only Look Once。"),
  c("ssd", "SSD", "cnn-image", "複数スケールの特徴マップで物体検出する一段階モデル。", "Single Shot MultiBox Detector。"),
  c("fpn-anchor", "FPN / アンカー", "cnn-image", "多階層特徴と基準ボックスで物体検出を行う仕組み。", "小物体や多尺度検出に関係。"),
  c("segmentation", "セグメンテーション", "cnn-image", "画像を画素単位で領域分割するタスク。", "分類より細かく、検出より領域を出す。", "imageTasks"),
  c("semantic-seg", "セマンティックセグメンテーション", "cnn-image", "画素ごとにクラスを割り当てるが個体は区別しない。", "同じクラスの複数物体は同じ領域。"),
  c("instance-seg", "インスタンスセグメンテーション", "cnn-image", "画素ごとに物体インスタンスを個別に区別する。", "同じクラスでも個体を分ける。"),
  c("panoptic-seg", "パノプティックセグメンテーション", "cnn-image", "セマンティックとインスタンスを統合したセグメンテーション。", "stuffとthingを同時に扱う。"),
  c("fcn-unet", "FCN / SegNet / U-Net", "cnn-image", "セグメンテーションの代表的ネットワーク。", "画素単位出力。U-Netは医用画像でも有名。"),
  c("deeplab", "DeepLab / Atrous Convolution", "cnn-image", "拡張畳み込みで広い文脈を扱うセグメンテーションモデル。", "Dilation/Atrous convolutionがキーワード。"),
  c("mask-rcnn", "Mask R-CNN", "cnn-image", "物体検出とインスタンスセグメンテーションを同時に行うモデル。", "マルチタスク学習の例。"),
  c("pose-estimation", "姿勢推定 / OpenPose", "cnn-image", "人体の関節位置を推定するタスク。", "Parts Affinity Fieldsと関連。", "imageTasks"),

  c("rnn", "RNN", "sequence-nlp-speech", "前時刻の隠れ状態を次へ渡す系列モデル。", "時系列・音声・文章など順序が重要なデータ。", "lstm"),
  c("bptt", "BPTT", "sequence-nlp-speech", "RNNを時間方向に展開して誤差逆伝播する学習方法。", "Backpropagation Through Time。"),
  c("lstm", "LSTM", "sequence-nlp-speech", "ゲートとCECで長期依存を扱いやすくしたRNN。", "入力/忘却/出力ゲート。勾配消失対策。", "lstm"),
  c("cec", "CEC", "sequence-nlp-speech", "LSTMで誤差を一定に保ち長期記憶を支える仕組み。", "Constant Error Carousel。"),
  c("gru", "GRU", "sequence-nlp-speech", "LSTMを簡略化したゲート付きRNN。", "リセット/更新ゲート。LSTMより軽量。"),
  c("bidirectional-rnn", "双方向RNN", "sequence-nlp-speech", "前向きと後ろ向きの両方向から系列を読むRNN。", "文脈理解で有効。"),
  c("seq2seq", "seq2seq / Encoder-Decoder", "sequence-nlp-speech", "入力系列を符号化し、出力系列を生成する構造。", "機械翻訳などで使う。"),
  c("attention", "Attention", "sequence-nlp-speech", "重要な入力部分に重みを置いて参照する仕組み。", "seq2seqの長系列問題を改善。", "attention"),
  c("source-target-attention", "Source-Target Attention", "sequence-nlp-speech", "出力側が入力系列のどこを見るかを計算するAttention。", "翻訳などのEncoder-Decoderで登場。"),
  c("self-attention", "Self-Attention", "sequence-nlp-speech", "同一系列内の要素同士の関係を重み付けするAttention。", "Transformerの核。", "attention"),
  c("multi-head", "Multi-Head Attention", "sequence-nlp-speech", "複数のAttentionを並列に行い異なる関係を捉える仕組み。", "Transformerで頻出。"),
  c("positional-encoding", "位置エンコーディング", "sequence-nlp-speech", "Transformerに系列順序を与えるための位置情報。", "RNNなしで順序を扱うため必要。"),
  c("transformer", "Transformer", "sequence-nlp-speech", "Self-Attentionを中心に系列全体の関係を並列に扱うモデル。", "BERT/GPTの基盤。RNNより並列化しやすい。", "attention"),
  c("bert", "BERT / Masked LM", "sequence-nlp-speech", "双方向Transformerでマスク語を予測して事前学習するモデル。", "理解系・エンコーダ型。Masked LM。"),
  c("gpt", "GPT系", "sequence-nlp-speech", "次トークン予測で事前学習するデコーダ型Transformer。", "生成系・自己回帰。", "genai"),
  c("t5", "T5", "sequence-nlp-speech", "あらゆるNLPタスクをText-to-Textとして扱うモデル。", "入力も出力もテキスト。"),
  c("glue", "GLUE", "sequence-nlp-speech", "自然言語理解モデルを評価するベンチマーク。", "事前学習済み言語モデルの評価。"),
  c("vit", "Vision Transformer", "sequence-nlp-speech", "画像をパッチ列としてTransformerで処理するモデル。", "Transformerの画像応用。"),
  c("ad-conversion", "A-D変換", "sequence-nlp-speech", "アナログ音声をデジタル信号へ変換する処理。", "音声処理パイプラインの入口。"),
  c("pcm", "PCM", "sequence-nlp-speech", "音声をサンプリング・量子化してデジタル表現する方法。", "パルス符号変調。"),
  c("fft", "FFT", "sequence-nlp-speech", "信号を周波数成分に高速変換する方法。", "音声特徴量抽出の基礎。"),
  c("spectral-envelope", "スペクトル包絡", "sequence-nlp-speech", "音声スペクトルの大まかな形状。", "声質や音韻特徴に関係。"),
  c("mfcc", "MFCC", "sequence-nlp-speech", "人間の聴覚特性を反映した音声特徴量。", "音声認識で頻出。"),
  c("mel-scale", "メル尺度", "sequence-nlp-speech", "人間の音高知覚に近い周波数尺度。", "MFCCの前処理で使う。"),
  c("formant", "フォルマント", "sequence-nlp-speech", "母音などの特徴を表す共鳴周波数。", "音声特徴。"),
  c("phoneme", "音素", "sequence-nlp-speech", "言語上意味を区別する最小の音単位。", "音声認識で扱う単位。"),
  c("hmm", "隠れマルコフモデル", "sequence-nlp-speech", "観測系列の背後にある隠れ状態遷移を扱う確率モデル。", "古典的音声認識で頻出。"),
  c("wavenet", "WaveNet", "sequence-nlp-speech", "音声波形を生成する深層生成モデル。", "音声生成。"),
  c("ctc", "CTC", "sequence-nlp-speech", "入力と出力の対応位置が未知の系列ラベリングで使う損失。", "音声認識で頻出。"),
  c("ngram", "N-gram", "sequence-nlp-speech", "連続するN個の単語や文字を単位にする表現。", "古典的言語モデル。"),
  c("bow", "BoW", "sequence-nlp-speech", "単語の出現回数で文書を表す表現。", "順序を無視する。"),
  c("one-hot", "ワンホットベクトル", "sequence-nlp-speech", "1箇所だけ1で他は0のカテゴリ表現。", "局所表現。意味の近さは表せない。"),
  c("tfidf", "TF-IDF", "sequence-nlp-speech", "単語頻度と文書頻度から単語の重要度を表す指標。", "文書検索・特徴量。"),
  c("local-distributed", "局所表現・分散表現", "sequence-nlp-speech", "ワンホットのような局所表現と、意味を多次元に埋め込む分散表現。", "word2vecは分散表現。", "word2vec"),
  c("word2vec", "word2vec", "sequence-nlp-speech", "単語を意味的なベクトルとして学習する手法。", "CBOW/Skip-gram。意味の近さを距離で表せる。", "word2vec"),
  c("cbow", "CBOW", "sequence-nlp-speech", "周辺語から中心語を予測するword2vecの学習方式。", "Skip-gramと対比。"),
  c("skip-gram", "スキップグラム", "sequence-nlp-speech", "中心語から周辺語を予測するword2vecの学習方式。", "CBOWと対比。"),
  c("fasttext", "fastText", "sequence-nlp-speech", "単語を文字n-gramに分解して埋め込みを学習する手法。", "未知語に比較的強い。"),
  c("elmo", "ELMo", "sequence-nlp-speech", "文脈に応じて単語表現を変える事前学習モデル。", "静的word2vecから文脈化表現への発展。"),
  c("morph-syntax", "形態素解析・構文解析", "sequence-nlp-speech", "文を単語単位に分けたり文法構造を解析したりする処理。", "日本語NLPの前処理として頻出。"),

  c("deep-rl", "深層強化学習", "deep-rl", "強化学習に深層学習を組み合わせ、価値関数や方策をNNで近似する手法。", "DQNやAlphaGoが代表。"),
  c("dqn", "DQN", "deep-rl", "Q学習のQ関数をニューラルネットワークで近似する手法。", "DeepMindのAtariで有名。"),
  c("experience-replay", "Experience Replay", "deep-rl", "経験を蓄積しランダムに再利用して学習を安定化する方法。", "DQNの重要技術。"),
  c("double-dqn", "ダブルDQN", "deep-rl", "行動選択と価値評価を分けてQ値の過大評価を抑えるDQN改良。", "DQNの発展。"),
  c("dueling-network", "デュエリングネットワーク", "deep-rl", "状態価値とアドバンテージを分けて推定するDQN改良。", "Dueling DQN。"),
  c("noisy-network", "ノイジーネットワーク", "deep-rl", "パラメータにノイズを入れて探索を促す手法。", "探索戦略の一つ。"),
  c("rainbow", "Rainbow", "deep-rl", "DQNの複数改良を統合した手法。", "Double/Dueling/Replayなどの統合。"),
  c("mcts", "モンテカルロ木探索", "deep-rl", "シミュレーションで有望な手を探索する木探索。", "AlphaGoで深層学習と組み合わせる。"),
  c("alphago", "AlphaGo / AlphaGo Zero", "deep-rl", "深層強化学習とMCTSで囲碁を攻略したシステム。", "AlphaGo Zeroは自己対局のみで学習。"),
  c("alphazero", "AlphaZero", "deep-rl", "囲碁以外のゲームにも適用可能な汎用強化学習システム。", "自己対局とMCTS。"),
  c("multi-agent", "マルチエージェント強化学習", "deep-rl", "複数エージェントが相互作用する強化学習。", "協調・競合がある。"),
  c("openai-five", "OpenAI Five", "deep-rl", "Dota 2で知られるマルチエージェント強化学習の成功例。", "ゲームAI。"),
  c("alphastar", "AlphaStar", "deep-rl", "StarCraft IIで成果を出した深層強化学習システム。", "ゲームAI。"),
  c("sim2real", "sim2real", "deep-rl", "シミュレーションで学習したモデルを実環境へ移す技術。", "ロボット制御で頻出。"),
  c("domain-randomization", "ドメインランダマイゼーション", "deep-rl", "シミュレーション条件をランダム化して実環境への汎化を高める方法。", "sim2realの工夫。"),
  c("offline-rl", "オフライン強化学習", "deep-rl", "事前に収集したデータだけで方策を学ぶ強化学習。", "実環境で試行錯誤しにくい場面。"),

  c("generative-model", "生成モデル", "generative-ai", "データ分布を学び、新しいデータを生成するモデル。", "識別モデルとの対比。", "genai"),
  c("vae", "VAE", "generative-ai", "潜在変数の確率分布から生成する変分オートエンコーダ。", "潜在空間・再構成・確率分布。"),
  c("latent-variable", "潜在変数", "generative-ai", "観測データの背後にある低次元の隠れた要因。", "VAEやトピックモデルと関連。"),
  c("gan", "GAN", "generative-ai", "ジェネレータとディスクリミネータを敵対的に学習する生成モデル。", "生成器vs識別器。", "genai"),
  c("generator-discriminator", "ジェネレータ/ディスクリミネータ", "generative-ai", "GANにおける生成側と真偽判定側のネットワーク。", "敵対的学習の2者。"),
  c("dcgan-pix2pix-cyclegan", "DCGAN / Pix2Pix / CycleGAN", "generative-ai", "GANの代表的な発展形。", "DCGANはCNN型、Pix2Pixは対応ペア、CycleGANは非対応変換。"),
  c("diffusion", "拡散モデル", "generative-ai", "ノイズ除去を逆過程として学習しデータを生成するモデル。", "Stable Diffusionなど。デノイジングがキーワード。", "genai"),
  c("denoising", "デノイジング", "generative-ai", "ノイズを取り除き元データに近づける処理。", "拡散モデルの生成過程。"),
  c("foundation-model", "基盤モデル", "generative-ai", "大規模データで事前学習され多様なタスクへ転用できるモデル。", "LLM・VLMなどの土台。"),
  c("llm", "LLM", "generative-ai", "大規模言語モデル。自然言語の理解・生成を行う。", "Transformerベース。GPTなど。", "genai"),
  c("scaling-law", "スケーリング則", "generative-ai", "モデル規模・データ量・計算量と性能の関係を表す経験則。", "大規模化の理論背景。"),
  c("emergence", "創発能力", "generative-ai", "規模が大きくなると突然現れるように見える能力。", "LLMの大規模化と関連。"),
  c("self-supervised", "自己教師あり学習", "generative-ai", "データ自身から擬似的な正解を作って学ぶ方法。", "MLMや次トークン予測。"),
  c("rlhf", "RLHF", "generative-ai", "人間のフィードバックを報酬モデル化し強化学習で調整する方法。", "ChatGPTのアライメントで頻出。"),
  c("reward-model", "報酬モデル", "generative-ai", "人間の好みを予測し報酬として使うモデル。", "RLHFの構成要素。"),
  c("ppo", "PPO", "generative-ai", "方策更新を安定化する強化学習アルゴリズム。", "RLHFで使われる代表手法。"),
  c("prompt", "プロンプト", "generative-ai", "生成AIへ与える指示や入力文。", "出力を制御する入口。", "genai"),
  c("few-shot", "Few-shotプロンプト", "generative-ai", "少数の例をプロンプト内に示してモデルにタスクを解かせる方法。", "重みを変えず文脈で学ばせる。"),
  c("cot", "Chain-of-Thought", "generative-ai", "推論過程を段階的に書かせるプロンプト技法。", "複雑な推論で有効。"),
  c("rag", "RAG", "generative-ai", "検索した外部文書を生成モデルの入力に加える手法。", "ファインチューニングと違い重みを変えない。", "genai"),
  c("lora", "LoRA", "generative-ai", "低ランク行列を追加し少ないパラメータでモデルを調整する方法。", "効率的ファインチューニング。"),
  c("clip", "CLIP", "generative-ai", "画像とテキストを同じ意味空間に対応付けるモデル。", "マルチモーダル・画像検索・生成AIで頻出。"),
  c("multimodal", "マルチモーダル", "generative-ai", "画像・テキスト・音声など複数種類の情報を扱うこと。", "CLIPやVLMと関連。"),
  c("hallucination", "ハルシネーション", "generative-ai", "生成AIが事実と異なる内容をもっともらしく生成する現象。", "RAGや検証で対策する。"),

  c("xai", "説明可能AI(XAI)", "xai-compression", "AIの判断根拠を人が理解できるようにする考え方。", "透明性・信頼性・公平性に関係。"),
  c("cam", "CAM", "xai-compression", "画像モデルが注目した領域を可視化する手法。", "Grad-CAMの前身。"),
  c("grad-cam", "Grad-CAM", "xai-compression", "CNNの勾配と特徴マップから注目領域を可視化する手法。", "画像のどこを見たか。", "cnn"),
  c("lime", "LIME", "xai-compression", "局所的な近似モデルで個別予測を説明する手法。", "モデル非依存の局所説明。"),
  c("shap", "SHAP", "xai-compression", "特徴量の寄与をゲーム理論のShapley値で説明する手法。", "特徴量寄与の説明。"),
  c("model-compression", "モデル圧縮", "xai-compression", "モデルサイズや計算量を削減する技術の総称。", "蒸留・量子化・プルーニング。"),
  c("distillation", "蒸留", "xai-compression", "大きな教師モデルの知識を小さな生徒モデルへ移す方法。", "軽量化と性能維持。"),
  c("quantization", "量子化", "xai-compression", "重みや演算の数値精度を下げてモデルを軽くする方法。", "メモリ削減・高速化。"),
  c("compression-pruning", "プルーニング(モデル圧縮)", "xai-compression", "重要でない重みや接続を削除してモデルを軽くする方法。", "決定木の枝刈りとは文脈で区別。"),
  c("edge-ai", "エッジAI", "xai-compression", "クラウドではなく端末側でAIを実行する技術。", "軽量化・低遅延・プライバシーと関連。"),
  c("mlops", "MLOps", "xai-compression", "機械学習モデルを継続的に開発・運用する仕組み。", "監視・再学習・デプロイ。"),
  c("data-drift", "データドリフト", "xai-compression", "運用時の入力データ分布が学習時から変わること。", "モデル監視で検知する。"),
];

function r(from: string, to: string, type: RelationType, label?: string): ConceptRelation {
  return { from, to, type, label };
}

export const relations: ConceptRelation[] = [
  r("supervised-learning", "ml", "is_a"),
  r("unsupervised-learning", "ml", "is_a"),
  r("reinforcement-learning", "ml", "is_a"),
  r("semi-supervised", "ml", "is_a"),
  r("regression-task", "supervised-learning", "is_a"),
  r("classification-task", "supervised-learning", "is_a"),
  r("linear-regression", "regression-task", "is_a"),
  r("multiple-regression", "linear-regression", "is_a"),
  r("least-squares", "linear-regression", "part_of"),
  r("lasso", "linear-regression", "is_a"),
  r("ridge", "linear-regression", "is_a"),
  r("regularization", "overfitting", "solves"),
  r("logistic-regression", "classification-task", "is_a"),
  r("sigmoid", "logistic-regression", "part_of"),
  r("softmax", "multiclass", "part_of"),
  r("svm", "classification-task", "is_a"),
  r("margin", "svm", "part_of"),
  r("kernel", "svm", "part_of"),
  r("decision-tree", "classification-task", "is_a"),
  r("pruning", "decision-tree", "solves"),
  r("random-forest", "ensemble", "is_a"),
  r("random-forest", "decision-tree", "part_of"),
  r("bagging", "ensemble", "is_a"),
  r("bootstrap", "bagging", "part_of"),
  r("boosting", "ensemble", "is_a"),
  r("adaboost", "boosting", "is_a"),
  r("gradient-boosting", "boosting", "is_a"),
  r("knn", "classification-task", "is_a"),
  r("clustering", "unsupervised-learning", "is_a"),
  r("kmeans", "clustering", "is_a"),
  r("ward", "hierarchical-clustering", "is_a"),
  r("dendrogram", "hierarchical-clustering", "part_of"),
  r("pca", "dimensionality-reduction", "is_a"),
  r("svd", "pca", "part_of"),
  r("tsne", "dimensionality-reduction", "is_a"),
  r("umap", "dimensionality-reduction", "is_a"),
  r("dbscan", "clustering", "is_a"),
  r("collaborative-filtering", "recommendation", "is_a"),
  r("content-based-filtering", "recommendation", "is_a"),
  r("cold-start", "collaborative-filtering", "solves", "課題"),
  r("lda", "topic-model", "is_a"),
  r("agent", "reinforcement-learning", "part_of"),
  r("environment", "reinforcement-learning", "part_of"),
  r("state", "mdp", "part_of"),
  r("action", "mdp", "part_of"),
  r("reward", "mdp", "part_of"),
  r("policy", "reinforcement-learning", "part_of"),
  r("state-value", "reinforcement-learning", "part_of"),
  r("action-value", "q-learning", "part_of"),
  r("q-learning", "reinforcement-learning", "is_a"),
  r("sarsa", "reinforcement-learning", "is_a"),
  r("q-learning", "sarsa", "contrasts_with"),
  r("policy-gradient", "reinforcement-learning", "is_a"),
  r("actor-critic", "policy-gradient", "is_a"),
  r("bandit", "exploration-exploitation", "used_for"),
  r("epsilon-greedy", "exploration-exploitation", "used_for"),
  r("confusion-matrix", "classification-task", "used_for"),
  r("accuracy", "confusion-matrix", "part_of"),
  r("precision", "confusion-matrix", "part_of"),
  r("recall", "confusion-matrix", "part_of"),
  r("f1", "precision", "part_of"),
  r("f1", "recall", "part_of"),
  r("roc-auc", "classification-task", "used_for"),
  r("mse", "regression-task", "used_for"),
  r("rmse", "mse", "is_a"),
  r("mae", "regression-task", "used_for"),
  r("aic-bic", "occam", "used_for"),
  r("neural-network", "ml", "is_a"),
  r("perceptron", "neural-network", "is_a"),
  r("mlp", "neural-network", "is_a"),
  r("input-hidden-output", "neural-network", "part_of"),
  r("weight-bias", "neural-network", "part_of"),
  r("forward", "neural-network", "pipeline_next"),
  r("forward", "loss-function", "pipeline_next"),
  r("loss-function", "backprop", "pipeline_next"),
  r("backprop", "gradient-descent", "pipeline_next"),
  r("chain-rule", "backprop", "part_of"),
  r("gradient", "gradient-descent", "part_of"),
  r("learning-rate", "gradient-descent", "part_of"),
  r("activation", "neural-network", "part_of"),
  r("relu", "activation", "is_a"),
  r("sigmoid", "activation", "is_a"),
  r("tanh", "activation", "is_a"),
  r("softmax", "activation", "is_a"),
  r("relu", "vanishing-gradient", "solves"),
  r("leaky-relu", "relu", "is_a"),
  r("gradient-clipping", "exploding-gradient", "solves"),
  r("sgd", "gradient-descent", "is_a"),
  r("momentum", "sgd", "is_a"),
  r("adagrad", "sgd", "is_a"),
  r("rmsprop", "adagrad", "evolves_to"),
  r("adam", "rmsprop", "evolves_to"),
  r("adamw", "adam", "evolves_to"),
  r("dropout", "overfitting", "solves"),
  r("early-stopping", "overfitting", "solves"),
  r("data-augmentation", "overfitting", "solves"),
  r("batchnorm", "neural-network", "part_of"),
  r("layernorm", "transformer", "part_of"),
  r("autoencoder", "pretraining", "used_for"),
  r("cnn", "neural-network", "is_a"),
  r("convolution-layer", "cnn", "part_of"),
  r("filter-kernel", "convolution-layer", "part_of"),
  r("stride", "convolution-layer", "part_of"),
  r("padding", "convolution-layer", "part_of"),
  r("pooling", "cnn", "part_of"),
  r("max-pooling", "pooling", "is_a"),
  r("avg-pooling", "pooling", "is_a"),
  r("gap", "pooling", "is_a"),
  r("fully-connected", "cnn", "part_of"),
  r("lenet", "neocognitron", "evolves_to"),
  r("alexnet", "lenet", "evolves_to"),
  r("vgg", "alexnet", "evolves_to"),
  r("googlenet", "vgg", "evolves_to"),
  r("resnet", "googlenet", "evolves_to"),
  r("skip-connection", "resnet", "part_of"),
  r("skip-connection", "vanishing-gradient", "solves"),
  r("mobilenet", "depthwise", "part_of"),
  r("mobilenet", "model-compression", "used_for"),
  r("efficientnet", "nas", "used_for"),
  r("transfer-learning", "cnn", "used_for"),
  r("fine-tuning", "transfer-learning", "is_a"),
  r("image-classification", "cnn", "used_for"),
  r("object-detection", "cnn", "used_for"),
  r("rcnn", "object-detection", "is_a"),
  r("yolo", "object-detection", "is_a"),
  r("ssd", "object-detection", "is_a"),
  r("segmentation", "cnn", "used_for"),
  r("semantic-seg", "segmentation", "is_a"),
  r("instance-seg", "segmentation", "is_a"),
  r("panoptic-seg", "segmentation", "is_a"),
  r("fcn-unet", "segmentation", "used_for"),
  r("deeplab", "segmentation", "used_for"),
  r("mask-rcnn", "object-detection", "used_for"),
  r("mask-rcnn", "instance-seg", "used_for"),
  r("pose-estimation", "cnn", "used_for"),
  r("rnn", "neural-network", "is_a"),
  r("bptt", "rnn", "part_of"),
  r("lstm", "rnn", "evolves_to"),
  r("cec", "lstm", "part_of"),
  r("lstm", "vanishing-gradient", "solves"),
  r("gru", "lstm", "evolves_to"),
  r("bidirectional-rnn", "rnn", "is_a"),
  r("seq2seq", "rnn", "used_for"),
  r("attention", "seq2seq", "evolves_to"),
  r("self-attention", "attention", "is_a"),
  r("multi-head", "self-attention", "part_of"),
  r("positional-encoding", "transformer", "part_of"),
  r("transformer", "attention", "evolves_to"),
  r("bert", "transformer", "is_a"),
  r("gpt", "transformer", "is_a"),
  r("t5", "transformer", "is_a"),
  r("vit", "transformer", "is_a"),
  r("ad-conversion", "pcm", "pipeline_next"),
  r("pcm", "fft", "pipeline_next"),
  r("fft", "mfcc", "pipeline_next"),
  r("mel-scale", "mfcc", "part_of"),
  r("hmm", "phoneme", "used_for"),
  r("ctc", "hmm", "contrasts_with"),
  r("one-hot", "local-distributed", "contrasts_with"),
  r("word2vec", "local-distributed", "is_a"),
  r("cbow", "word2vec", "is_a"),
  r("skip-gram", "word2vec", "is_a"),
  r("fasttext", "word2vec", "evolves_to"),
  r("elmo", "word2vec", "evolves_to"),
  r("dqn", "q-learning", "evolves_to"),
  r("experience-replay", "dqn", "part_of"),
  r("double-dqn", "dqn", "evolves_to"),
  r("dueling-network", "dqn", "evolves_to"),
  r("rainbow", "dqn", "evolves_to"),
  r("mcts", "alphago", "part_of"),
  r("alphago", "deep-rl", "used_for"),
  r("alphazero", "alphago", "evolves_to"),
  r("domain-randomization", "sim2real", "part_of"),
  r("generative-model", "unsupervised-learning", "is_a"),
  r("vae", "generative-model", "is_a"),
  r("latent-variable", "vae", "part_of"),
  r("gan", "generative-model", "is_a"),
  r("generator-discriminator", "gan", "part_of"),
  r("diffusion", "generative-model", "is_a"),
  r("denoising", "diffusion", "part_of"),
  r("llm", "foundation-model", "is_a"),
  r("foundation-model", "pretraining", "used_for"),
  r("self-supervised", "foundation-model", "used_for"),
  r("rlhf", "llm", "used_for"),
  r("reward-model", "rlhf", "part_of"),
  r("ppo", "rlhf", "part_of"),
  r("prompt", "llm", "used_for"),
  r("few-shot", "prompt", "is_a"),
  r("cot", "prompt", "is_a"),
  r("rag", "llm", "used_for"),
  r("rag", "hallucination", "solves"),
  r("lora", "fine-tuning", "is_a"),
  r("clip", "multimodal", "part_of"),
  r("grad-cam", "xai", "is_a"),
  r("cam", "grad-cam", "evolves_to"),
  r("lime", "xai", "is_a"),
  r("shap", "xai", "is_a"),
  r("distillation", "model-compression", "is_a"),
  r("quantization", "model-compression", "is_a"),
  r("compression-pruning", "model-compression", "is_a"),
  r("edge-ai", "model-compression", "used_for"),
  r("data-drift", "mlops", "part_of"),
];

export const demoLabels: Record<string, string> = {
  "#classify": "Iris分類デモ",
  "#regression": "Penguins回帰デモ",
  "#cluster": "k-meansデモ",
  "#overfit": "過学習デモ",
  "#metrics": "しきい値・ROCデモ",
  "#nn": "NN学習ループ",
  "#cnn": "MNIST畳み込み",
  "#attention": "Attentionデモ",
  "#genai": "RAG/拡散デモ",
  "#pca": "PCAデモ",
  "#lstm-gates": "LSTMゲートデモ",
  "#word2vec": "word2vecデモ",
  "#image-tasks": "画像タスク粒度デモ",
  "#bandit": "バンディットデモ",
};

export const conceptById = Object.fromEntries(concepts.map((concept) => [concept.id, concept])) as Record<
  string,
  Concept
>;

export function conceptsByCategory(category: ConceptCategory): Concept[] {
  return concepts.filter((concept) => concept.category === category);
}

export function relatedConcepts(id: string): ConceptRelation[] {
  return relations.filter((relation) => relation.from === id || relation.to === id);
}

const hierarchyTypes: RelationType[] = ["is_a", "part_of"];

function uniqueConcepts(ids: string[]): Concept[] {
  return Array.from(new Set(ids))
    .map((id) => conceptById[id])
    .filter(Boolean);
}

export function parentsOf(id: string): Concept[] {
  return uniqueConcepts(
    relations
      .filter((relation) => relation.from === id && hierarchyTypes.includes(relation.type))
      .map((relation) => relation.to)
  );
}

export function childrenOf(id: string): Concept[] {
  return uniqueConcepts(
    relations
      .filter((relation) => relation.to === id && hierarchyTypes.includes(relation.type))
      .map((relation) => relation.from)
  );
}

export function contrastsOf(id: string): Concept[] {
  return uniqueConcepts(
    relations
      .filter((relation) => relation.type === "contrasts_with" && (relation.from === id || relation.to === id))
      .map((relation) => (relation.from === id ? relation.to : relation.from))
  );
}

export function siblingsOf(id: string): Concept[] {
  const parentIds = new Set(parentsOf(id).map((concept) => concept.id));
  return uniqueConcepts(
    relations
      .filter(
        (relation) =>
          relation.from !== id &&
          hierarchyTypes.includes(relation.type) &&
          parentIds.has(relation.to)
      )
      .map((relation) => relation.from)
  ).slice(0, 8);
}

export function selectTerm(id: string) {
  window.sessionStorage.setItem("selectedTermId", id);
  window.location.hash = "terms";
}
