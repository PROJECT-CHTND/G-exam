import { useMemo, useState } from "react";
import { irisData } from "../data/iris";
import { trainLogistic, sigmoid, standardizeStats } from "../lib/ml";
import { scaleLinear } from "../lib/scale";

const SW = 560;
const SH = 150;
const RW = 260;
const RH = 260;
const RM = 34;

// versicolor (0) vs virginica (1=positive). These overlap -> realistic ROC.
const scored = (() => {
  const subset = irisData.filter(
    (d) => d.species === "versicolor" || d.species === "virginica"
  );
  const pl = standardizeStats(subset.map((d) => d.petalLength));
  const pw = standardizeStats(subset.map((d) => d.petalWidth));
  const data = subset.map((d) => ({
    x: (d.petalLength - pl.mean) / pl.std,
    y: (d.petalWidth - pw.mean) / pw.std,
    label: d.species === "virginica" ? 1 : 0,
  }));
  const model = trainLogistic(data, 600, 0.4);
  return data.map((d) => ({
    score: sigmoid(model.w1 * d.x + model.w2 * d.y + model.b),
    label: d.label,
  }));
})();

function confusion(threshold: number) {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  for (const s of scored) {
    const pred = s.score >= threshold ? 1 : 0;
    if (pred === 1 && s.label === 1) tp++;
    else if (pred === 1 && s.label === 0) fp++;
    else if (pred === 0 && s.label === 1) fn++;
    else tn++;
  }
  return { tp, fp, fn, tn };
}

const rocCurve = (() => {
  const pts: { fpr: number; tpr: number }[] = [];
  for (let t = 1.001; t >= -0.001; t -= 0.02) {
    const { tp, fp, fn, tn } = confusion(t);
    pts.push({ tpr: tp / (tp + fn || 1), fpr: fp / (fp + tn || 1) });
  }
  let auc = 0;
  for (let i = 1; i < pts.length; i++) {
    auc += (pts[i].fpr - pts[i - 1].fpr) * (pts[i].tpr + pts[i - 1].tpr) / 2;
  }
  return { pts, auc };
})();

export default function ThresholdROC() {
  const [threshold, setThreshold] = useState(0.5);
  const { tp, fp, fn, tn } = confusion(threshold);
  const total = tp + fp + fn + tn;
  const accuracy = (tp + tn) / total;
  const precision = tp / (tp + fp || 1);
  const recall = tp / (tp + fn || 1);
  const f1 = (2 * precision * recall) / (precision + recall || 1);

  const sxScore = scaleLinear([0, 1], [40, SW - 20]);
  const jitter = useMemo(
    () => scored.map(() => (Math.random() - 0.5) * 34),
    []
  );

  const rx = scaleLinear([0, 1], [RM, RW - 14]);
  const ry = scaleLinear([0, 1], [RH - RM, 14]);
  const rocPath = rocCurve.pts.map((p, i) => `${i === 0 ? "M" : "L"}${rx(p.fpr)},${ry(p.tpr)}`).join(" ");
  const curFpr = fp / (fp + tn || 1);
  const curTpr = tp / (tp + fn || 1);

  const metrics: [string, number, string][] = [
    ["正解率", accuracy, "#58b0ff"],
    ["適合率", precision, "#ffb84d"],
    ["再現率", recall, "#b98bff"],
    ["F値", f1, "#29d3c2"],
  ];

  return (
    <div className="grid two">
      <div className="grid" style={{ gap: 14 }}>
        <div className="stage">
          <svg viewBox={`0 0 ${SW} ${SH}`}>
            <text x={40} y={SH - 6} fontSize={11} fill="#6f7a89">0.0</text>
            <text x={SW - 34} y={SH - 6} fontSize={11} fill="#6f7a89">1.0</text>
            <text x={SW / 2} y={SH - 6} textAnchor="middle" fontSize={11} fill="#6f7a89">モデルが出したスコア (陽性である確率)</text>
            {scored.map((s, i) => {
              const y = (s.label === 1 ? 52 : 100) + jitter[i];
              const pred = s.score >= threshold ? 1 : 0;
              return (
                <circle
                  key={i}
                  cx={sxScore(s.score)}
                  cy={y}
                  r={6}
                  fill={pred === 1 ? "#58b0ff" : "#ffb84d"}
                  stroke={s.label === 1 ? "#eef2f7" : "#6f7a89"}
                  strokeWidth={2}
                  opacity={0.9}
                />
              );
            })}
            <line x1={sxScore(threshold)} y1={10} x2={sxScore(threshold)} y2={SH - 24} stroke="#fff" strokeWidth={2} strokeDasharray="6 4" />
          </svg>
          <div className="legend">
            <span><span className="dot" style={{ background: "#58b0ff" }} />陽性と予測</span>
            <span><span className="dot" style={{ background: "#ffb84d" }} />陰性と予測</span>
            <span>白枠=実際に陽性 / 灰枠=実際に陰性</span>
          </div>
          <p className="caption">白い破線がしきい値。左右にずらすと、線より右が「陽性」判定になり、下の混同行列と指標が変わります。</p>
        </div>

        <div className="stage" style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <svg viewBox={`0 0 ${RW} ${RH}`} style={{ maxWidth: 240 }}>
            <line x1={RM} y1={RH - RM} x2={RW - 14} y2={RH - RM} stroke="#2b3441" />
            <line x1={RM} y1={14} x2={RM} y2={RH - RM} stroke="#2b3441" />
            <line x1={RM} y1={RH - RM} x2={RW - 14} y2={14} stroke="#2b3441" strokeDasharray="4 4" opacity={0.5} />
            <path d={rocPath} fill="none" stroke="#29d3c2" strokeWidth={2.5} />
            <circle cx={rx(curFpr)} cy={ry(curTpr)} r={6} fill="#ff6b6b" stroke="#0b0e13" strokeWidth={2} />
            <text x={RW / 2} y={RH - 8} textAnchor="middle" fontSize={10} fill="#6f7a89">偽陽性率 FPR</text>
            <text x={-RH / 2} y={12} transform="rotate(-90)" textAnchor="middle" fontSize={10} fill="#6f7a89">真陽性率 TPR</text>
          </svg>
          <div>
            <div className="readout">
              <div className="row"><span>ROC の AUC</span><b className="accent">{rocCurve.auc.toFixed(3)}</b></div>
            </div>
            <p className="caption" style={{ maxWidth: 200 }}>ROC曲線は全しきい値での性能。赤い点が今のしきい値の位置です。左上に近く、AUCが1に近いほど良い分類器です。</p>
          </div>
        </div>
      </div>

      <div className="controls">
        <div className="field">
          <label>分類しきい値 <b>{threshold.toFixed(2)}</b></label>
          <input type="range" min={0} max={1} step={0.01} value={threshold} onChange={(e) => setThreshold(+e.target.value)} />
        </div>

        <table className="matrix">
          <thead>
            <tr><th></th><th>実際: 陽性</th><th>実際: 陰性</th></tr>
          </thead>
          <tbody>
            <tr>
              <th>予測: 陽性</th>
              <td style={{ background: "rgba(41,211,194,0.18)", color: "#29d3c2" }}>TP<small>{tp}</small></td>
              <td style={{ background: "rgba(255,107,107,0.16)", color: "#ff6b6b" }}>FP<small>{fp}</small></td>
            </tr>
            <tr>
              <th>予測: 陰性</th>
              <td style={{ background: "rgba(255,107,107,0.16)", color: "#ff6b6b" }}>FN<small>{fn}</small></td>
              <td style={{ background: "rgba(41,211,194,0.18)", color: "#29d3c2" }}>TN<small>{tn}</small></td>
            </tr>
          </tbody>
        </table>

        <div className="metric-bars">
          {metrics.map(([label, v, color]) => (
            <div className="metric-bar" key={label}>
              <span style={{ color: "#aeb8c6" }}>{label}</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${v * 100}%`, background: color }} /></div>
              <b style={{ fontVariantNumeric: "tabular-nums" }}>{Math.round(v * 100)}%</b>
            </div>
          ))}
        </div>

        <div className="note amber">
          <b>用語:</b> しきい値を上げると見逃し(FN)が増え再現率が下がり、下げると誤検出(FP)が増え適合率が下がります。
          このトレードオフを1枚で表すのがROC曲線とAUCです。
        </div>
      </div>
    </div>
  );
}
