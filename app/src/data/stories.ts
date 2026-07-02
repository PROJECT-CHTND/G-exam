export type StoryStep = {
  id: string;
  conceptId?: string;
  title: string;
  problem: string;
  next: string;
};

export type Story = {
  id: string;
  title: string;
  steps: StoryStep[];
};

export const stories: Story[] = [
  {
    id: "ml-to-genai",
    title: "機械学習から生成AIまでの流れ",
    steps: [
      {
        id: "manual-rule",
        title: "人間がルールを書くのが難しい",
        problem: "画像、文章、音声のようなデータは、if文だけでルール化しにくい。",
        next: "データからルールを学ばせる発想が必要になる。",
      },
      {
        id: "ml",
        conceptId: "ml",
        title: "機械学習",
        problem: "データから予測ルールを学べるが、特徴量は人間が設計することが多い。",
        next: "特徴量設計の負担を減らしたくなる。",
      },
      {
        id: "feature",
        conceptId: "feature",
        title: "特徴量設計",
        problem: "何を入力にするかで性能が大きく変わり、領域知識が必要になる。",
        next: "特徴そのものをモデルに学ばせる深層学習につながる。",
      },
      {
        id: "neural-network",
        conceptId: "neural-network",
        title: "ニューラルネットワーク",
        problem: "多層化すると表現力は上がるが、学習の安定化が必要になる。",
        next: "誤差逆伝播、活性化関数、正規化、最適化が重要になる。",
      },
      {
        id: "cnn-rnn",
        conceptId: "cnn",
        title: "画像・系列への専用構造",
        problem: "画像は局所特徴、文章や音声は順序依存を扱う必要がある。",
        next: "CNN、RNN、LSTMのような構造が使われる。",
      },
      {
        id: "attention",
        conceptId: "attention",
        title: "Attention",
        problem: "長い系列では、どこを参照すべきかを直接扱いたい。",
        next: "Self-Attentionを中心にしたTransformerへ発展する。",
      },
      {
        id: "transformer",
        conceptId: "transformer",
        title: "Transformer",
        problem: "系列全体の関係を並列に扱えるため、大規模事前学習と相性が良い。",
        next: "BERT、GPT、LLM、生成AIの土台になる。",
      },
      {
        id: "genai",
        conceptId: "llm",
        title: "LLM・生成AI",
        problem: "生成はできるが、事実誤りや専門知識不足が起きる。",
        next: "RAG、ファインチューニング、RLHFなどで用途に合わせる。",
      },
    ],
  },
];
