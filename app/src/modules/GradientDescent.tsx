import { useMemo, useRef, useState } from "react";
import { penguinData } from "../data/penguins";
import type { PenguinSample } from "../data/penguins";
import { gdStep, olsFit, mse, standardizeStats } from "../lib/ml";
import { scaleLinear, extent } from "../lib/scale";
import { useLoop } from "../hooks/useLoop";

const W = 460;
const H = 300;
const M = { top: 16, right: 16, bottom: 42, left: 54 };
const LW = 460;
const LH = 220;
const LM = { top: 16, right: 16, bottom: 40, left: 54 };

type Pred = "flipperLength" | "billLength";
const PRED_LABEL: Record<Pred, string> = {
  flipperLength: "翼の長さ (mm)",
  billLength: "くちばしの長さ (mm)",
};

export default function GradientDescent() {
  const [pred, setPred] = useState<Pred>("flipperLength");
  const [lr, setLr] = useState(0.08);
  const [state, setState] = useState({ w: 0, b: 0, iter: 0 });
  const [running, setRunning] = useState(false);
  const historyRef = useRef<number[]>([]);
  const [, force] = useState(0);

  // real data -> standardized x, mass in kg
  const { pts, xStats, raw } = useMemo(() => {
    const raw = penguinData.map((d: PenguinSample) => ({
      xr: d[pred],
      yr: d.bodyMass,
    }));
    const xStats = standardizeStats(raw.map((r) => r.xr));
    const pts = raw.map((r) => ({
      x: (r.xr - xStats.mean) / xStats.std,
      y: r.yr / 1000,
    }));
    return { pts, xStats, raw };
  }, [pred]);

  const optimum = useMemo(() => olsFit(pts), [pts]);
  const optimumLoss = useMemo(
    () => mse(pts, (x) => optimum.w * x + optimum.b),
    [pts, optimum]
  );

  function reset(nextPred?: Pred) {
    historyRef.current = [];
    setState({ w: 0, b: 0, iter: 0 });
    setRunning(false);
    if (nextPred) setPred(nextPred);
  }

  function doStep() {
    setState((s) => {
      const next = gdStep(pts, s.w, s.b, lr);
      const loss = mse(pts, (x) => next.w * x + next.b);
      historyRef.current = [...historyRef.current, loss].slice(-160);
      return { ...next, iter: s.iter + 1 };
    });
  }

  useLoop(running, 60, () => {
    doStep();
    force((n) => n + 1);
    if (historyRef.current.length > 2) {
      const last = historyRef.current[historyRef.current.length - 1];
      if (Math.abs(last - optimumLoss) < optimumLoss * 0.002) setRunning(false);
    }
  });

  const xDomain = extent(raw.map((r) => r.xr), 0.06);
  const yDomain = extent(raw.map((r) => r.yr), 0.08);
  const sx = scaleLinear(xDomain, [M.left, W - M.right]);
  const sy = scaleLinear(yDomain, [H - M.bottom, M.top]);

  const predMass = (xr: number) =>
    (state.w * ((xr - xStats.mean) / xStats.std) + state.b) * 1000;
  const optMass = (xr: number) =>
    (optimum.w * ((xr - xStats.mean) / xStats.std) + optimum.b) * 1000;

  const curLoss =
    historyRef.current[historyRef.current.length - 1] ??
    mse(pts, (x) => state.w * x + state.b);

  // loss curve
  const maxLoss = Math.max(...historyRef.current, optimumLoss * 1.2, 1);
  const lx = scaleLinear([0, Math.max(historyRef.current.length - 1, 1)], [LM.left, LW - LM.right]);
  const ly = scaleLinear([0, maxLoss], [LH - LM.bottom, LM.top]);
  const lossPath = historyRef.current
    .map((v, i) => `${i === 0 ? "M" : "L"}${lx(i)},${ly(v)}`)
    .join(" ");

  return (
    <div className="grid two">
      <div className="grid" style={{ gap: 14 }}>
        <div className="stage">
          <svg viewBox={`0 0 ${W} ${H}`}>
            <line x1={M.left} y1={H - M.bottom} x2={W - M.right} y2={H - M.bottom} stroke="#2b3441" />
            <line x1={M.left} y1={M.top} x2={M.left} y2={H - M.bottom} stroke="#2b3441" />
            <text x={W / 2} y={H - 8} textAnchor="middle" fontSize={11} fill="#6f7a89">{PRED_LABEL[pred]}</text>
            <text x={-H / 2} y={14} transform="rotate(-90)" textAnchor="middle" fontSize={11} fill="#6f7a89">体重 (g)</text>
            {raw.map((r, i) => (
              <circle key={i} cx={sx(r.xr)} cy={sy(r.yr)} r={3.6} fill="#58b0ff" opacity={0.55} />
            ))}
            {/* optimum (target) line */}
            <line
              x1={sx(xDomain[0])} y1={sy(optMass(xDomain[0]))}
              x2={sx(xDomain[1])} y2={sy(optMass(xDomain[1]))}
              stroke="#29d3c2" strokeWidth={1.5} strokeDasharray="5 5" opacity={0.7}
            />
            {/* current model line */}
            <line
              x1={sx(xDomain[0])} y1={sy(predMass(xDomain[0]))}
              x2={sx(xDomain[1])} y2={sy(predMass(xDomain[1]))}
              stroke="#ffb84d" strokeWidth={3}
            />
          </svg>
          <div className="legend">
            <span><span className="dot" style={{ background: "#58b0ff" }} />実データ (344匹)</span>
            <span><span className="dot" style={{ background: "#ffb84d" }} />現在のモデル</span>
            <span><span className="dot" style={{ background: "#29d3c2" }} />最小二乗解(目標)</span>
          </div>
        </div>

        <div className="stage">
          <svg viewBox={`0 0 ${LW} ${LH}`}>
            <line x1={LM.left} y1={LH - LM.bottom} x2={LW - LM.right} y2={LH - LM.bottom} stroke="#2b3441" />
            <line x1={LM.left} y1={LM.top} x2={LM.left} y2={LH - LM.bottom} stroke="#2b3441" />
            <text x={LW / 2} y={LH - 8} textAnchor="middle" fontSize={11} fill="#6f7a89">更新回数 (イテレーション)</text>
            <text x={-LH / 2} y={14} transform="rotate(-90)" textAnchor="middle" fontSize={11} fill="#6f7a89">損失 (MSE)</text>
            <line x1={LM.left} y1={ly(optimumLoss)} x2={LW - LM.right} y2={ly(optimumLoss)} stroke="#29d3c2" strokeDasharray="4 4" opacity={0.6} />
            {lossPath && <path d={lossPath} fill="none" stroke="#ff6b6b" strokeWidth={2.5} />}
          </svg>
          <p className="caption">損失曲線。オレンジの直線がデータに近づくほど、この損失(MSE)が下がり、点線(最小二乗解の損失)に収束します。</p>
        </div>
      </div>

      <div className="controls">
        <div className="field">
          <label>予測に使う特徴 (体重を予測)</label>
          <select value={pred} onChange={(e) => reset(e.target.value as Pred)}>
            <option value="flipperLength">翼の長さ</option>
            <option value="billLength">くちばしの長さ</option>
          </select>
        </div>
        <div className="field">
          <label>学習率 (learning rate) <b>{lr.toFixed(3)}</b></label>
          <input type="range" min={0.005} max={0.9} step={0.005} value={lr} onChange={(e) => setLr(+e.target.value)} />
        </div>
        <div className="btn-row">
          <button className="btn primary" onClick={() => setRunning((r) => !r)}>
            {running ? "一時停止" : "自動で学習"}
          </button>
          <button className="btn" onClick={doStep} disabled={running}>1ステップ</button>
          <button className="btn" onClick={() => reset()}>リセット</button>
        </div>
        <div className="readout">
          <div className="row"><span>更新回数</span><b>{state.iter}</b></div>
          <div className="row"><span>現在の損失 (MSE)</span><b className="accent">{curLoss.toFixed(3)}</b></div>
          <div className="row"><span>最小可能な損失</span><b>{optimumLoss.toFixed(3)}</b></div>
        </div>
        <div className="note amber">
          <b>用語:</b> 「勾配降下法」で重みとバイアスを少しずつ更新し、損失(予測と実測のズレ)を最小化します。
          学習率を上げすぎると損失が下がらず<b>発散</b>します。スライダーを 0.8 などにして試してください。
        </div>
      </div>
    </div>
  );
}
