import { useMemo, useState } from "react";
import { polyFit, polyEval, mse } from "../lib/ml";
import { scaleLinear } from "../lib/scale";

const W = 480;
const H = 320;
const M = { top: 16, right: 16, bottom: 40, left: 46 };
const EW = 480;
const EH = 200;
const EM = { top: 16, right: 16, bottom: 40, left: 46 };
const MAX_DEG = 12;

// seeded RNG for a reproducible dataset
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const trueFn = (x: number) => Math.sin(x * 2.4) * 0.7 + x * 0.25;

const { train, test } = (() => {
  const rnd = mulberry32(42);
  const all: { x: number; y: number }[] = [];
  for (let i = 0; i < 30; i++) {
    const x = -1 + (2 * i) / 29;
    const y = trueFn(x) + (rnd() - 0.5) * 0.5;
    all.push({ x, y });
  }
  const train: typeof all = [];
  const test: typeof all = [];
  all.forEach((p, i) => (i % 3 === 0 ? test : train).push(p));
  return { train, test };
})();

export default function Overfitting() {
  const [degree, setDegree] = useState(1);

  const errorsByDegree = useMemo(() => {
    const out: { deg: number; train: number; test: number }[] = [];
    for (let d = 1; d <= MAX_DEG; d++) {
      const coefs = polyFit(train, d);
      out.push({
        deg: d,
        train: mse(train, (x) => polyEval(coefs, x)),
        test: mse(test, (x) => polyEval(coefs, x)),
      });
    }
    return out;
  }, []);

  const coefs = useMemo(() => polyFit(train, degree), [degree]);
  const cur = errorsByDegree[degree - 1];

  const sx = scaleLinear([-1.05, 1.05], [M.left, W - M.right]);
  const sy = scaleLinear([-1.6, 1.6], [H - M.bottom, M.top]);
  const fitPath = Array.from({ length: 120 }, (_, i) => {
    const x = -1.05 + (2.1 * i) / 119;
    return `${i === 0 ? "M" : "L"}${sx(x)},${sy(polyEval(coefs, x))}`;
  }).join(" ");
  const truePath = Array.from({ length: 120 }, (_, i) => {
    const x = -1.05 + (2.1 * i) / 119;
    return `${i === 0 ? "M" : "L"}${sx(x)},${sy(trueFn(x))}`;
  }).join(" ");

  const maxErr = Math.max(...errorsByDegree.flatMap((e) => [e.train, e.test]));
  const ex = scaleLinear([1, MAX_DEG], [EM.left, EW - EM.right]);
  const ey = scaleLinear([0, maxErr * 1.05], [EH - EM.bottom, EM.top]);
  const trainErrPath = errorsByDegree.map((e, i) => `${i === 0 ? "M" : "L"}${ex(e.deg)},${ey(e.train)}`).join(" ");
  const testErrPath = errorsByDegree.map((e, i) => `${i === 0 ? "M" : "L"}${ex(e.deg)},${ey(e.test)}`).join(" ");

  const bestTestDeg = errorsByDegree.reduce((a, b) => (b.test < a.test ? b : a)).deg;
  const status =
    degree < bestTestDeg
      ? { label: "未学習ぎみ (underfitting)", color: "#58b0ff" }
      : degree > bestTestDeg + 1
      ? { label: "過学習 (overfitting)", color: "#ff6b6b" }
      : { label: "ちょうど良い", color: "#59d98a" };

  return (
    <div className="grid two">
      <div className="grid" style={{ gap: 14 }}>
        <div className="stage">
          <svg viewBox={`0 0 ${W} ${H}`}>
            <line x1={M.left} y1={H - M.bottom} x2={W - M.right} y2={H - M.bottom} stroke="#2b3441" />
            <line x1={M.left} y1={M.top} x2={M.left} y2={H - M.bottom} stroke="#2b3441" />
            <path d={truePath} fill="none" stroke="#29d3c2" strokeWidth={1.5} strokeDasharray="5 5" opacity={0.6} />
            <path d={fitPath} fill="none" stroke="#ffb84d" strokeWidth={3} />
            {train.map((p, i) => (
              <circle key={`tr${i}`} cx={sx(p.x)} cy={sy(p.y)} r={4.5} fill="#58b0ff" />
            ))}
            {test.map((p, i) => (
              <circle key={`te${i}`} cx={sx(p.x)} cy={sy(p.y)} r={4.5} fill="none" stroke="#ff7ea8" strokeWidth={2} />
            ))}
          </svg>
          <div className="legend">
            <span><span className="dot" style={{ background: "#58b0ff" }} />訓練データ</span>
            <span><span className="dot" style={{ border: "2px solid #ff7ea8", background: "transparent" }} />テストデータ</span>
            <span><span className="dot" style={{ background: "#ffb84d" }} />学習した曲線</span>
            <span><span className="dot" style={{ background: "#29d3c2" }} />本当の関数</span>
          </div>
        </div>

        <div className="stage">
          <svg viewBox={`0 0 ${EW} ${EH}`}>
            <line x1={EM.left} y1={EH - EM.bottom} x2={EW - EM.right} y2={EH - EM.bottom} stroke="#2b3441" />
            <line x1={EM.left} y1={EM.top} x2={EM.left} y2={EH - EM.bottom} stroke="#2b3441" />
            <text x={EW / 2} y={EH - 8} textAnchor="middle" fontSize={11} fill="#6f7a89">モデルの複雑さ (多項式の次数)</text>
            <text x={-EH / 2} y={13} transform="rotate(-90)" textAnchor="middle" fontSize={11} fill="#6f7a89">誤差 (MSE)</text>
            <path d={trainErrPath} fill="none" stroke="#58b0ff" strokeWidth={2.5} />
            <path d={testErrPath} fill="none" stroke="#ff7ea8" strokeWidth={2.5} />
            <line x1={ex(degree)} y1={EM.top} x2={ex(degree)} y2={EH - EM.bottom} stroke="#eef2f7" strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
          </svg>
          <div className="legend">
            <span><span className="dot" style={{ background: "#58b0ff" }} />訓練誤差</span>
            <span><span className="dot" style={{ background: "#ff7ea8" }} />テスト誤差</span>
          </div>
          <p className="caption">次数を上げると訓練誤差は下がり続けますが、テスト誤差はある点から上昇に転じます。この乖離が過学習です。</p>
        </div>
      </div>

      <div className="controls">
        <div className="field">
          <label>多項式の次数 <b>{degree}</b></label>
          <input type="range" min={1} max={MAX_DEG} step={1} value={degree} onChange={(e) => setDegree(+e.target.value)} />
        </div>
        <div className="note" style={{ borderLeftColor: status.color, background: "transparent" }}>
          現在の状態: <b style={{ color: status.color }}>{status.label}</b>
        </div>
        <div className="readout">
          <div className="row"><span>訓練誤差</span><b>{cur.train.toFixed(3)}</b></div>
          <div className="row"><span>テスト誤差</span><b className="accent">{cur.test.toFixed(3)}</b></div>
          <div className="row"><span>テスト誤差が最小の次数</span><b>{bestTestDeg}</b></div>
        </div>
        <div className="note amber">
          <b>用語:</b> 訓練データにだけ合わせすぎて未知データで性能が落ちるのが「過学習」。逆に単純すぎるのが「未学習」。
          正則化・Dropout・データ拡張・早期終了は、この過学習を抑えるための手法です。
        </div>
      </div>
    </div>
  );
}
