import { useState } from "react";

const prompts = [
  {
    id: "ai-ml-dl",
    prompt: "AI・機械学習・ディープラーニングの関係を白紙で書く",
    answer: ["AIが最も広い。", "機械学習はAIの実現手段の一つ。", "ディープラーニングは機械学習の一部で、多層ニューラルネットワークを使う。"],
  },
  {
    id: "learning-types",
    prompt: "教師あり・教師なし・強化学習を分類する",
    answer: ["教師あり: 正解ラベルあり。分類・回帰。", "教師なし: 正解ラベルなし。クラスタリング・次元削減。", "強化学習: 状態・行動・報酬から方策を学ぶ。"],
  },
  {
    id: "cnn-rnn-transformer",
    prompt: "CNN・RNN・Transformerの違いを書く",
    answer: ["CNN: 画像などの局所特徴。", "RNN: 時系列・文章など順序情報。", "Transformer: Self-Attentionで系列全体の関係を扱う。"],
  },
  {
    id: "overfit",
    prompt: "過学習とは何か、対策は何かを書く",
    answer: ["過学習: 訓練データには合うが未知データに弱い状態。", "対策: 正則化、Dropout、データ拡張、早期終了、交差検証。"],
  },
];

export default function RecallCheck() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState<Record<string, boolean>>({});

  return (
    <div className="learn-stack">
      {prompts.map((item) => (
        <article className={`card pad recall-card ${done[item.id] ? "done" : ""}`} key={item.id}>
          <h3>{item.prompt}</h3>
          <p>先に何も見ずに、紙かメモアプリへ30秒で書く。</p>
          <div className="btn-row">
            <button className="btn" onClick={() => setOpen((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}>
              {open[item.id] ? "答えを隠す" : "答えを見る"}
            </button>
            <button className={`btn ${done[item.id] ? "active" : ""}`} onClick={() => setDone((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}>
              {done[item.id] ? "説明できた" : "自己採点"}
            </button>
          </div>
          {open[item.id] && (
            <ul className="recall-answer">
              {item.answer.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}
