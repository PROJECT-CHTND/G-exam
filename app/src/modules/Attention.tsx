import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const TOKENS = ["彼女", "は", "赤い", "本", "を", "読む"];
// hand-designed 4-dim embeddings: [animate, object, particle, color]
const EMB = [
  [1.0, 0.1, 0.1, 0.1], // 彼女
  [0.1, 0.1, 0.9, 0.1], // は
  [0.1, 0.4, 0.1, 1.0], // 赤い
  [0.2, 1.0, 0.1, 0.5], // 本
  [0.1, 0.1, 0.9, 0.1], // を
  [0.8, 0.9, 0.1, 0.2], // 読む
];

function softmax(arr: number[]) {
  const m = Math.max(...arr);
  const ex = arr.map((v) => Math.exp(v - m));
  const s = ex.reduce((a, b) => a + b, 0);
  return ex.map((v) => v / s);
}

const attnMatrix = TOKENS.map((_, i) => {
  const scores = TOKENS.map((_, j) => {
    let dot = 0;
    for (let d = 0; d < EMB[i].length; d++) dot += EMB[i][d] * EMB[j][d];
    return dot / Math.sqrt(EMB[i].length);
  });
  return softmax(scores);
});

export default function Attention() {
  const [query, setQuery] = useState(5);
  const weights = attnMatrix[query];

  const CELL = 52;
  const grid = TOKENS.length * CELL;
  const strongest = useMemo(() => {
    const idx = weights.map((w, i) => ({ w, i })).sort((a, b) => b.w - a.w);
    return idx[0].i === query ? idx[1].i : idx[0].i;
  }, [weights, query]);

  return (
    <div className="grid two">
      <div className="stage">
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
          {/* attention matrix heatmap */}
          <svg viewBox={`0 0 ${grid + 60} ${grid + 30}`} style={{ maxWidth: 340 }}>
            {TOKENS.map((t, j) => (
              <text key={"col" + j} x={60 + j * CELL + CELL / 2} y={16} textAnchor="middle" fontSize={12} fill="#6f7a89">{t}</text>
            ))}
            {TOKENS.map((t, i) => (
              <text key={"row" + i} x={54} y={30 + i * CELL + CELL / 2 + 4} textAnchor="end" fontSize={12} fill={i === query ? "#58b0ff" : "#6f7a89"} fontWeight={i === query ? 700 : 400}>{t}</text>
            ))}
            {attnMatrix.map((row, i) =>
              row.map((w, j) => (
                <rect
                  key={`${i}-${j}`}
                  x={60 + j * CELL} y={22 + i * CELL}
                  width={CELL - 3} height={CELL - 3} rx={6}
                  fill={`rgba(88,176,255,${0.08 + w * 0.9})`}
                  stroke={i === query ? "#58b0ff" : "transparent"}
                  strokeWidth={2}
                  onClick={() => setQuery(i)}
                  style={{ cursor: "pointer" }}
                />
              ))
            )}
          </svg>
        </div>
        <p className="caption" style={{ textAlign: "center" }}>
          Attention行列。各行が「その単語が、どの単語をどれだけ参照するか」。行をクリックすると下のバーが切り替わります。
        </p>
      </div>

      <div className="controls">
        <div className="field">
          <label>注目する単語 (クエリ)</label>
          <div className="btn-row">
            {TOKENS.map((t, i) => (
              <button key={i} className={`chip ${i === query ? "active" : ""}`} onClick={() => setQuery(i)}>{t}</button>
            ))}
          </div>
        </div>

        <div className="metric-bars">
          {TOKENS.map((t, i) => (
            <div className="metric-bar" key={i}>
              <span style={{ color: i === query ? "#58b0ff" : "#aeb8c6" }}>{t}</span>
              <div className="bar-track">
                <motion.div className="bar-fill" style={{ background: "#7c8cff" }} animate={{ width: `${weights[i] * 100}%` }} transition={{ duration: 0.4 }} />
              </div>
              <b style={{ fontVariantNumeric: "tabular-nums" }}>{Math.round(weights[i] * 100)}%</b>
            </div>
          ))}
        </div>

        <div className="note">
          「<b>{TOKENS[query]}</b>」が最も強く参照しているのは「<b>{TOKENS[strongest]}</b>」です。
          動詞は主語や目的語に強く注目するよう、ベクトルの内積が大きくなっています。
        </div>

        <div className="note amber">
          <b>用語:</b> Attentionは各単語ベクトルの内積で「関連度」を測り、softmaxで合計1の重みに変換します。
          Transformerはこの自己注意(Self-Attention)を積み重ねて文全体の関係を捉えます(Q/K/V)。
        </div>
      </div>
    </div>
  );
}
