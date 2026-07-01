import { useState } from "react";

const TOKENS = [
  { text: "昨日", signal: 0.1 },
  { text: "とても", signal: 0.2 },
  { text: "重要", signal: 0.95 },
  { text: "な", signal: 0.25 },
  { text: "単語", signal: 0.9 },
  { text: "を", signal: 0.25 },
  { text: "覚える", signal: 0.7 },
];

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

export default function LSTMGates() {
  const [step, setStep] = useState(0);
  let cell = 0;
  const states = TOKENS.map((token, index) => {
    const forget = sigmoid(1.2 - token.signal + index * 0.03);
    const input = sigmoid(token.signal * 3 - 1.2);
    const candidate = token.signal * 2 - 1;
    cell = forget * cell + input * candidate;
    const output = sigmoid(cell + token.signal - 0.2);
    return { ...token, forget, input, candidate, cell, output };
  });
  const current = states[step];

  return (
    <div className="grid two">
      <div className="stage">
        <div className="lstm-tokens">
          {states.map((state, index) => (
            <button key={state.text} className={`token-node ${index === step ? "active" : ""}`} onClick={() => setStep(index)}>
              {state.text}
            </button>
          ))}
        </div>
        <svg viewBox="0 0 560 260">
          <rect x="42" y="78" width="476" height="90" rx="18" fill="#151a22" stroke="#2b3441" />
          <text x="90" y="112" fontSize="12" fill="#aeb8c6">忘却ゲート</text>
          <text x="238" y="112" fontSize="12" fill="#aeb8c6">入力ゲート</text>
          <text x="382" y="112" fontSize="12" fill="#aeb8c6">出力ゲート</text>
          <circle cx="110" cy="140" r={18 + current.forget * 16} fill="rgba(88,176,255,0.35)" stroke="#58b0ff" />
          <circle cx="260" cy="140" r={18 + current.input * 16} fill="rgba(255,184,77,0.35)" stroke="#ffb84d" />
          <circle cx="410" cy="140" r={18 + current.output * 16} fill="rgba(185,139,255,0.35)" stroke="#b98bff" />
          <path d="M60 205 H500" stroke="#2b3441" strokeWidth="8" strokeLinecap="round" />
          <path d={`M60 205 H${60 + Math.max(0, Math.min(1, (current.cell + 1) / 2)) * 440}`} stroke="#29d3c2" strokeWidth="8" strokeLinecap="round" />
          <text x="280" y="232" textAnchor="middle" fontSize="12" fill="#aeb8c6">セル状態 C_t: 長く保持する記憶</text>
        </svg>
      </div>
      <div className="controls">
        <h3>現在の入力: {current.text}</h3>
        <div className="metric-bars">
          <Gate label="忘却" value={current.forget} color="#58b0ff" />
          <Gate label="入力" value={current.input} color="#ffb84d" />
          <Gate label="出力" value={current.output} color="#b98bff" />
        </div>
        <div className="note amber">
          <b>用語:</b> LSTMは忘却・入力・出力ゲートで「何を忘れ、何を記憶し、何を出力するか」を制御します。
          RNNの長期依存や勾配消失を緩和するための構造です。
        </div>
      </div>
    </div>
  );
}

function Gate({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="metric-bar">
      <span>{label}</span>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${value * 100}%`, background: color }} />
      </div>
      <b>{Math.round(value * 100)}%</b>
    </div>
  );
}
