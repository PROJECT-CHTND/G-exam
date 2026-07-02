export type ComparisonItem = {
  termId: string;
  label: string;
  point: string;
};

export type ComparisonCard = {
  id: string;
  question: string;
  examCue: string;
  items: ComparisonItem[];
};

export const comparisons: ComparisonCard[] = [
  {
    id: "supervised-vs-unsupervised",
    question: "教師あり学習と教師なし学習の違いは？",
    examCue: "正解ラベルの有無を見る。",
    items: [
      { termId: "supervised-learning", label: "教師あり学習", point: "入力と正解ラベルのペアから予測ルールを学ぶ。" },
      { termId: "unsupervised-learning", label: "教師なし学習", point: "正解ラベルなしで、まとまりや低次元構造を探す。" },
    ],
  },
  {
    id: "classification-vs-regression",
    question: "分類と回帰の違いは？",
    examCue: "出力がカテゴリか連続値かを見る。",
    items: [
      { termId: "classification-task", label: "分類", point: "犬/猫、陽性/陰性などクラスを予測する。" },
      { termId: "regression-task", label: "回帰", point: "価格、体重、需要など連続値を予測する。" },
    ],
  },
  {
    id: "overfit-vs-underfit",
    question: "過学習と未学習の違いは？",
    examCue: "訓練データへの当てはまりとテスト性能を分けて見る。",
    items: [
      { termId: "overfitting", label: "過学習", point: "訓練性能は高いが、未知データに弱い。" },
      { termId: "underfitting", label: "未学習", point: "訓練データにも十分合っていない。" },
    ],
  },
  {
    id: "regularization-vs-dropout",
    question: "正則化とDropoutの違いは？",
    examCue: "どちらも過学習対策だが、作用の仕方が違う。",
    items: [
      { termId: "regularization", label: "正則化", point: "損失にペナルティを加え、重みや複雑さを抑える。" },
      { termId: "dropout", label: "Dropout", point: "訓練時に一部ニューロンを無効化し、依存しすぎを防ぐ。" },
    ],
  },
  {
    id: "cnn-rnn-transformer",
    question: "CNN・RNN・Transformerの違いは？",
    examCue: "画像の局所特徴、系列、系列内の関係で分ける。",
    items: [
      { termId: "cnn", label: "CNN", point: "画像などの局所的・空間的特徴を捉える。" },
      { termId: "rnn", label: "RNN", point: "前の状態を次へ渡し、時系列や文章を扱う。" },
      { termId: "transformer", label: "Transformer", point: "Self-Attentionで系列全体の関係を並列に扱う。" },
    ],
  },
  {
    id: "generative-vs-discriminative",
    question: "生成モデルと識別モデルの違いは？",
    examCue: "分類するのか、データを作るのかを見る。",
    items: [
      { termId: "generative-model", label: "生成モデル", point: "データ分布を学び、新しいデータを生成する。" },
      { termId: "classification-task", label: "識別モデル", point: "入力がどのクラスか、境界や確率で判定する。" },
    ],
  },
  {
    id: "rl-vs-supervised",
    question: "強化学習と教師あり学習の違いは？",
    examCue: "正解ラベルか、報酬と行動かを見る。",
    items: [
      { termId: "reinforcement-learning", label: "強化学習", point: "状態・行動・報酬から、累積報酬が高い方策を学ぶ。" },
      { termId: "supervised-learning", label: "教師あり学習", point: "入力と正解ラベルの対応を学ぶ。" },
    ],
  },
  {
    id: "gd-vs-backprop",
    question: "勾配降下法と誤差逆伝播法の違いは？",
    examCue: "勾配を計算する話か、重みを更新する話かを見る。",
    items: [
      { termId: "backprop", label: "誤差逆伝播法", point: "損失から各重みへの勾配を後ろ向きに計算する。" },
      { termId: "gradient-descent", label: "勾配降下法", point: "計算した勾配を使い、損失が下がる方向へ重みを更新する。" },
    ],
  },
];
