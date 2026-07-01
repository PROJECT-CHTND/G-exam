import { useMemo } from "react";
import { irisData, irisSpecies } from "../../data/iris";
import { scaleLinear, extent } from "../../lib/scale";

const COLORS = ["#58b0ff", "#ffb84d", "#b98bff"];

function dot(a: number[], b: number[]) {
  return a.reduce((s, v, i) => s + v * b[i], 0);
}

function norm(v: number[]) {
  return Math.sqrt(dot(v, v)) || 1;
}

function matVec(m: number[][], v: number[]) {
  return m.map((row) => dot(row, v));
}

function powerIteration(m: number[][], seed: number[]) {
  let v = seed.slice();
  for (let i = 0; i < 80; i++) {
    const next = matVec(m, v);
    const n = norm(next);
    v = next.map((x) => x / n);
  }
  return v;
}

export default function PCAIris() {
  const result = useMemo(() => {
    const rows = irisData.map((d) => [d.sepalLength, d.sepalWidth, d.petalLength, d.petalWidth]);
    const mean = rows[0].map((_, j) => rows.reduce((s, r) => s + r[j], 0) / rows.length);
    const centered = rows.map((r) => r.map((v, j) => v - mean[j]));
    const cov = Array.from({ length: 4 }, (_, i) =>
      Array.from({ length: 4 }, (_, j) => centered.reduce((s, r) => s + r[i] * r[j], 0) / (rows.length - 1))
    );
    const pc1 = powerIteration(cov, [1, 0.2, 0.5, 0.1]);
    const lambda1 = dot(pc1, matVec(cov, pc1));
    const deflated = cov.map((row, i) => row.map((v, j) => v - lambda1 * pc1[i] * pc1[j]));
    const pc2 = powerIteration(deflated, [0.1, 1, -0.2, 0.4]);
    const lambda2 = dot(pc2, matVec(cov, pc2));
    const total = cov.reduce((s, row, i) => s + row[i], 0);
    return {
      points: centered.map((r, i) => ({
        x: dot(r, pc1),
        y: dot(r, pc2),
        species: irisSpecies.indexOf(irisData[i].species),
      })),
      variance: [lambda1 / total, lambda2 / total],
    };
  }, []);

  const x = scaleLinear(extent(result.points.map((p) => p.x), 0.08), [38, 462]);
  const y = scaleLinear(extent(result.points.map((p) => p.y), 0.08), [292, 18]);

  return (
    <div className="grid two">
      <div className="stage">
        <svg viewBox="0 0 500 320">
          <line x1={38} y1={292} x2={462} y2={292} stroke="#2b3441" />
          <line x1={38} y1={18} x2={38} y2={292} stroke="#2b3441" />
          <text x={250} y={314} textAnchor="middle" fontSize={11} fill="#6f7a89">
            第1主成分 PC1
          </text>
          <text x={-160} y={13} transform="rotate(-90)" textAnchor="middle" fontSize={11} fill="#6f7a89">
            第2主成分 PC2
          </text>
          {result.points.map((p, i) => (
            <circle key={i} cx={x(p.x)} cy={y(p.y)} r={4.3} fill={COLORS[p.species]} opacity={0.86} />
          ))}
        </svg>
        <div className="legend">
          {irisSpecies.map((s, i) => (
            <span key={s}>
              <span className="dot" style={{ background: COLORS[i] }} />
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="controls">
        <div className="readout">
          <div className="row">
            <span>PC1の寄与率</span>
            <b className="accent">{Math.round(result.variance[0] * 100)}%</b>
          </div>
          <div className="row">
            <span>PC2の寄与率</span>
            <b>{Math.round(result.variance[1] * 100)}%</b>
          </div>
          <div className="row">
            <span>2次元で保持する情報</span>
            <b>{Math.round((result.variance[0] + result.variance[1]) * 100)}%</b>
          </div>
        </div>
        <div className="note amber">
          <b>用語:</b> PCAは「分散が最大になる方向」を新しい軸として選びます。4特徴量のIrisを2次元に落としても、
          品種の分離がかなり残ることが見えます。
        </div>
      </div>
    </div>
  );
}
