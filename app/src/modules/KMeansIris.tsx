import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { irisData, irisSpecies } from "../data/iris";
import { kmeansInit, kmeansStep } from "../lib/ml";
import type { KMeansState } from "../lib/ml";
import { scaleLinear, extent } from "../lib/scale";
import { useLoop } from "../hooks/useLoop";

const CLUSTER_COLORS = ["#58b0ff", "#ffb84d", "#b98bff"];
const W = 520;
const H = 360;
const M = { top: 16, right: 16, bottom: 44, left: 48 };

const points = irisData.map((d) => ({ x: d.petalLength, y: d.petalWidth }));
const trueLabels = irisData.map((d) => irisSpecies.indexOf(d.species));
const SEEDS = [
  { x: 1.2, y: 0.2 },
  { x: 3.5, y: 1.0 },
  { x: 5.0, y: 1.6 },
];

export default function KMeansIris() {
  const [state, setState] = useState<KMeansState>(() => kmeansInit(3, SEEDS));
  const [running, setRunning] = useState(false);
  const [reveal, setReveal] = useState(false);

  const converged = state.iteration > 0 && state.moved < 0.001 && state.phase === "assign";

  function step() {
    setState((s) => kmeansStep(points, s));
  }
  function reset() {
    setRunning(false);
    setReveal(false);
    setState(kmeansInit(3, SEEDS));
  }

  useLoop(running && !converged, 550, () => {
    setState((s) => {
      const next = kmeansStep(points, s);
      if (next.iteration > 0 && next.moved < 0.001 && next.phase === "assign") {
        setRunning(false);
      }
      return next;
    });
  });

  const xDomain = extent(points.map((p) => p.x), 0.08);
  const yDomain = extent(points.map((p) => p.y), 0.1);
  const sx = scaleLinear(xDomain, [M.left, W - M.right]);
  const sy = scaleLinear(yDomain, [H - M.bottom, M.top]);

  // cluster purity vs true species (best matching)
  const purity = useMemo(() => {
    if (state.assignments.length === 0) return null;
    let correct = 0;
    for (let c = 0; c < 3; c++) {
      const counts = [0, 0, 0];
      state.assignments.forEach((a, i) => {
        if (a === c) counts[trueLabels[i]]++;
      });
      correct += Math.max(...counts);
    }
    return correct / points.length;
  }, [state.assignments]);

  const nextAction =
    state.phase === "assign"
      ? "各点を最も近い中心に割り当てる"
      : "各中心をクラスタの平均位置へ動かす";

  return (
    <div className="grid two">
      <div className="stage">
        <svg viewBox={`0 0 ${W} ${H}`}>
          <line x1={M.left} y1={H - M.bottom} x2={W - M.right} y2={H - M.bottom} stroke="#2b3441" />
          <line x1={M.left} y1={M.top} x2={M.left} y2={H - M.bottom} stroke="#2b3441" />
          <text x={W / 2} y={H - 8} textAnchor="middle" fontSize={12} fill="#6f7a89">花びらの長さ (cm)</text>
          <text x={-H / 2} y={14} transform="rotate(-90)" textAnchor="middle" fontSize={12} fill="#6f7a89">花びらの幅 (cm)</text>

          {points.map((p, i) => {
            const cluster = state.assignments[i] ?? -1;
            const fill = cluster === -1 ? "#6f7a89" : CLUSTER_COLORS[cluster];
            return (
              <circle
                key={i}
                cx={sx(p.x)}
                cy={sy(p.y)}
                r={5}
                fill={fill}
                opacity={0.9}
                stroke={reveal ? CLUSTER_COLORS[trueLabels[i]] : "#0b0e13"}
                strokeWidth={reveal ? 2.4 : 1}
              />
            );
          })}

          {state.centroids.map((c, i) => (
            <motion.rect
              key={i}
              width={16}
              height={16}
              fill={CLUSTER_COLORS[i]}
              stroke="#0b0e13"
              strokeWidth={2}
              animate={{ x: sx(c.x) - 8, y: sy(c.y) - 8 }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
              style={{ rotate: 45, transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
        </svg>
        <div className="legend">
          <span><span className="dot" style={{ background: "#58b0ff" }} />クラスタ1</span>
          <span><span className="dot" style={{ background: "#ffb84d" }} />クラスタ2</span>
          <span><span className="dot" style={{ background: "#b98bff" }} />クラスタ3</span>
          <span>■ ひし形 = クラスタ中心</span>
        </div>
        <p className="caption">
          {reveal
            ? "点の塗り = k-meansが見つけたクラスタ、外枠の色 = 実際の品種。枠と塗りの色が一致していれば、ラベルなしでも品種をほぼ再現できたことになります。"
            : "正解ラベルは使いません。中心に近い点をまとめ、中心を平均へ動かす、を繰り返します。"}
        </p>
      </div>

      <div className="controls">
        <div className="btn-row">
          <button className="btn primary" onClick={() => setRunning((r) => !r)} disabled={converged}>
            {running ? "一時停止" : "自動で反復"}
          </button>
          <button className="btn" onClick={step} disabled={running || converged}>次のステップ</button>
          <button className="btn" onClick={reset}>リセット</button>
        </div>
        <button
          className={`chip ${reveal ? "active" : ""}`}
          onClick={() => setReveal((v) => !v)}
        >
          {reveal ? "正解の品種を隠す" : "正解の品種と比べる"}
        </button>

        <div className="readout">
          <div className="row"><span>反復回数</span><b>{state.iteration}</b></div>
          <div className="row"><span>次の操作</span><b style={{ fontSize: 12 }}>{converged ? "収束済み" : nextAction}</b></div>
          {purity != null && (
            <div className="row"><span>品種との一致率</span><b className="accent">{Math.round(purity * 100)}%</b></div>
          )}
        </div>

        <div className="note amber">
          <b>用語:</b> これは「教師なし学習」の「クラスタリング(k-means)」です。正解を与えなくても、
          データの構造だけで3つのまとまりが現れ、実際の品種とほぼ一致します。
        </div>
      </div>
    </div>
  );
}
