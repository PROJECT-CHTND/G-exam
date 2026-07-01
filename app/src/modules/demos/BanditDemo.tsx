import { useMemo, useState } from "react";

const TRUE_RATES = [0.28, 0.48, 0.68, 0.42];

type Arm = {
  pulls: number;
  reward: number;
};

function nextRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

function run(epsilon: number, rounds: number): Arm[] {
  const arms = TRUE_RATES.map(() => ({ pulls: 0, reward: 0 }));
  for (let t = 1; t <= rounds; t++) {
    const explore = nextRandom(t + epsilon * 17) < epsilon;
    const estimates = arms.map((arm) => (arm.pulls === 0 ? 0.5 : arm.reward / arm.pulls));
    const armIndex = explore
      ? Math.floor(nextRandom(t * 3 + 9) * arms.length)
      : estimates.reduce((best, value, index) => (value > estimates[best] ? index : best), 0);
    const gotReward = nextRandom(t * 7 + armIndex * 13) < TRUE_RATES[armIndex];
    arms[armIndex].pulls += 1;
    arms[armIndex].reward += gotReward ? 1 : 0;
  }
  return arms;
}

export default function BanditDemo() {
  const [epsilon, setEpsilon] = useState(0.2);
  const [rounds, setRounds] = useState(120);
  const arms = useMemo(() => run(epsilon, rounds), [epsilon, rounds]);
  const totalReward = arms.reduce((s, arm) => s + arm.reward, 0);

  return (
    <div className="grid two">
      <div className="stage bandit-stage">
        <svg viewBox="0 0 520 320">
          {arms.map((arm, index) => {
            const x = 70 + index * 112;
            const estimated = arm.pulls ? arm.reward / arm.pulls : 0;
            return (
              <g key={index}>
                <rect x={x - 36} y={250 - arm.pulls * 1.4} width="72" height={arm.pulls * 1.4} rx="8" fill="#212936" stroke="#2b3441" />
                <rect x={x - 36} y={250 - estimated * 180} width="72" height={estimated * 180} rx="8" fill="rgba(88,176,255,0.55)" />
                <line x1={x - 44} y1={250 - TRUE_RATES[index] * 180} x2={x + 44} y2={250 - TRUE_RATES[index] * 180} stroke="#ffb84d" strokeWidth="3" />
                <text x={x} y="280" textAnchor="middle" fill="#eef2f7" fontWeight="800">腕{index + 1}</text>
                <text x={x} y="300" textAnchor="middle" fill="#aeb8c6" fontSize="11">{arm.pulls}回 / 推定{Math.round(estimated * 100)}%</text>
              </g>
            );
          })}
        </svg>
        <div className="legend">
          <span><span className="dot" style={{ background: "#58b0ff" }} />推定報酬率</span>
          <span><span className="dot" style={{ background: "#ffb84d" }} />真の報酬率</span>
        </div>
      </div>
      <div className="controls">
        <label>ε: {epsilon.toFixed(2)}（探索の割合）</label>
        <input type="range" min="0" max="0.8" step="0.05" value={epsilon} onChange={(e) => setEpsilon(Number(e.target.value))} />
        <label>試行回数: {rounds}</label>
        <input type="range" min="20" max="300" step="10" value={rounds} onChange={(e) => setRounds(Number(e.target.value))} />
        <div className="readout">
          <div className="row">
            <span>累積報酬</span>
            <b className="accent">{totalReward}</b>
          </div>
          <div className="row">
            <span>最も選ばれた腕</span>
            <b>腕{arms.reduce((best, arm, i) => (arm.pulls > arms[best].pulls ? i : best), 0) + 1}</b>
          </div>
        </div>
        <div className="note amber">
          <b>用語:</b> ε-greedyはεの確率で探索し、それ以外では推定値が最大の腕を活用します。
          強化学習の「探索と活用」を最小構成で体験できます。
        </div>
      </div>
    </div>
  );
}
