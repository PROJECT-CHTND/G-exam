import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { irisData, irisFeatures, irisSpecies } from "../data/iris";
import type { IrisSample } from "../data/iris";
import { knnClassify } from "../lib/ml";
import { scaleLinear, extent } from "../lib/scale";

const CLASS_COLORS = ["#58b0ff", "#ffb84d", "#b98bff"];
const CLASS_NAMES_JA = ["セトサ", "バーシカラー", "バージニカ"];
type FeatureKey = (typeof irisFeatures)[number]["key"];

const W = 560;
const H = 380;
const M = { top: 16, right: 16, bottom: 44, left: 48 };

export default function IrisClassifier() {
  const [fx, setFx] = useState<FeatureKey>("petalLength");
  const [fy, setFy] = useState<FeatureKey>("petalWidth");
  const [k, setK] = useState(5);
  const [query, setQuery] = useState<{ x: number; y: number } | null>(null);

  const pts = useMemo(
    () =>
      irisData.map((d: IrisSample) => ({
        x: d[fx],
        y: d[fy],
        label: irisSpecies.indexOf(d.species),
      })),
    [fx, fy]
  );

  const xDomain = useMemo(() => extent(pts.map((p) => p.x), 0.08), [pts]);
  const yDomain = useMemo(() => extent(pts.map((p) => p.y), 0.08), [pts]);
  const sx = scaleLinear(xDomain, [M.left, W - M.right]);
  const sy = scaleLinear(yDomain, [H - M.bottom, M.top]);

  // decision-boundary background grid (real kNN over the real data)
  const GX = 44;
  const GY = 30;
  const cells = useMemo(() => {
    const out: { x: number; y: number; w: number; h: number; c: number }[] = [];
    const cw = (W - M.left - M.right) / GX;
    const ch = (H - M.top - M.bottom) / GY;
    for (let i = 0; i < GX; i++) {
      for (let j = 0; j < GY; j++) {
        const px = M.left + (i + 0.5) * cw;
        const py = M.top + (j + 0.5) * ch;
        const dx = xDomain[0] + ((px - M.left) / (W - M.left - M.right)) * (xDomain[1] - xDomain[0]);
        const dy = yDomain[1] - ((py - M.top) / (H - M.top - M.bottom)) * (yDomain[1] - yDomain[0]);
        const c = knnClassify(pts, dx, dy, k, 3);
        out.push({ x: M.left + i * cw, y: M.top + j * ch, w: cw + 0.5, h: ch + 0.5, c });
      }
    }
    return out;
  }, [pts, k, xDomain, yDomain]);

  const queryClass =
    query != null ? knnClassify(pts, query.x, query.y, k, 3) : null;

  function handleClick(e: React.MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const py = ((e.clientY - rect.top) / rect.height) * H;
    if (px < M.left || px > W - M.right || py < M.top || py > H - M.bottom)
      return;
    const dx = xDomain[0] + ((px - M.left) / (W - M.left - M.right)) * (xDomain[1] - xDomain[0]);
    const dy = yDomain[1] - ((py - M.top) / (H - M.top - M.bottom)) * (yDomain[1] - yDomain[0]);
    setQuery({ x: dx, y: dy });
  }

  const xLabel = irisFeatures.find((f) => f.key === fx)!.label;
  const yLabel = irisFeatures.find((f) => f.key === fy)!.label;

  return (
    <div className="grid two">
      <div className="stage">
        <svg viewBox={`0 0 ${W} ${H}`} onClick={handleClick} style={{ cursor: "crosshair" }}>
          {/* decision regions */}
          <g opacity={0.16}>
            {cells.map((c, i) => (
              <rect key={i} x={c.x} y={c.y} width={c.w} height={c.h} fill={CLASS_COLORS[c.c]} />
            ))}
          </g>
          {/* axes */}
          <line x1={M.left} y1={H - M.bottom} x2={W - M.right} y2={H - M.bottom} stroke="#2b3441" />
          <line x1={M.left} y1={M.top} x2={M.left} y2={H - M.bottom} stroke="#2b3441" />
          <text x={(W) / 2} y={H - 8} textAnchor="middle" fontSize={12} fill="#6f7a89">
            {xLabel}
          </text>
          <text x={-H / 2} y={14} transform="rotate(-90)" textAnchor="middle" fontSize={12} fill="#6f7a89">
            {yLabel}
          </text>
          {/* data points */}
          {pts.map((p, i) => (
            <circle
              key={i}
              cx={sx(p.x)}
              cy={sy(p.y)}
              r={4.5}
              fill={CLASS_COLORS[p.label]}
              stroke="#0b0e13"
              strokeWidth={1}
              opacity={0.92}
            />
          ))}
          {/* query point */}
          {query && queryClass != null && (
            <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <circle cx={sx(query.x)} cy={sy(query.y)} r={11} fill="none" stroke={CLASS_COLORS[queryClass]} strokeWidth={2.5} />
              <circle cx={sx(query.x)} cy={sy(query.y)} r={5.5} fill="#fff" stroke={CLASS_COLORS[queryClass]} strokeWidth={2} />
            </motion.g>
          )}
        </svg>
        <div className="legend">
          {irisSpecies.map((s, i) => (
            <span key={s}>
              <span className="dot" style={{ background: CLASS_COLORS[i] }} />
              {CLASS_NAMES_JA[i]} ({s})
            </span>
          ))}
        </div>
        <p className="caption">
          背景の色分けが「kNNが引いた分類の境界」です。プロット上をクリックすると、その位置の花が何と分類されるかを実際にk個の近傍から判定します。
        </p>
      </div>

      <div className="controls">
        <div className="field">
          <label>横軸の特徴</label>
          <select value={fx} onChange={(e) => setFx(e.target.value as FeatureKey)}>
            {irisFeatures.map((f) => (
              <option key={f.key} value={f.key}>{f.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>縦軸の特徴</label>
          <select value={fy} onChange={(e) => setFy(e.target.value as FeatureKey)}>
            {irisFeatures.map((f) => (
              <option key={f.key} value={f.key}>{f.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>近傍数 k <b>{k}</b></label>
          <input type="range" min={1} max={25} step={2} value={k} onChange={(e) => setK(+e.target.value)} />
        </div>

        {query && queryClass != null ? (
          <div className="note">
            クリックした点は近い {k} 個の花の多数決で
            <b style={{ color: CLASS_COLORS[queryClass] }}> {CLASS_NAMES_JA[queryClass]} </b>
            と分類されました。
          </div>
        ) : (
          <div className="note">プロットをクリックして、未知の花を分類させてみてください。</div>
        )}

        <div className="note amber">
          <b>用語:</b> これは「教師あり学習」の「分類」です。正解ラベル(3品種)付きの実データ150件から、
          k近傍法(kNN)が特徴空間を色分けしています。kを大きくすると境界がなめらかになります。
        </div>
      </div>
    </div>
  );
}
