import { useState } from "react";
import { motion } from "framer-motion";
import { scaleLinear } from "../lib/scale";

const W = 560;
const H = 340;
const LAYERS = [3, 5, 4, 2];
const LABELS = ["入力層", "隠れ層", "隠れ層", "出力層"];

type Phase = 0 | 1 | 2 | 3 | 4;
const PHASES: { title: string; text: string; points: string[] }[] = [
  { title: "① データを入力", text: "特徴量が入力層のニューロンに入ります。", points: ["画像なら画素", "文章ならトークン埋め込み"] },
  { title: "② 順伝播", text: "各結合の重みを掛けて足し、活性化関数を通して次の層へ伝えます。", points: ["重み・バイアス", "ReLUなどの活性化関数", "非線形変換"] },
  { title: "③ 損失を計算", text: "出力(予測)と正解のズレを損失関数で1つの数値にします。", points: ["交差エントロピー", "MSE"] },
  { title: "④ 誤差逆伝播", text: "損失から各重みへの勾配を、出力側から入力側へ連鎖律で計算します。", points: ["勾配", "連鎖律", "勾配消失・爆発"] },
  { title: "⑤ 重みを更新", text: "最適化手法が勾配に沿って重みを更新し、①へ戻ります。", points: ["SGD / Adam", "学習率"] },
];

// activation functions
const ACT = {
  relu: { label: "ReLU", fn: (x: number) => Math.max(0, x), yr: [-1, 6] as [number, number] },
  sigmoid: { label: "シグモイド", fn: (x: number) => 1 / (1 + Math.exp(-x)), yr: [0, 1] as [number, number] },
  tanh: { label: "tanh", fn: (x: number) => Math.tanh(x), yr: [-1, 1] as [number, number] },
};
type ActKey = keyof typeof ACT;

export default function NeuralNet() {
  const [phase, setPhase] = useState<Phase>(0);
  const [act, setAct] = useState<ActKey>("relu");
  const [inputX, setInputX] = useState(1.2);

  const nodes: { x: number; y: number; layer: number }[] = [];
  LAYERS.forEach((count, li) => {
    const x = scaleLinear([0, LAYERS.length - 1], [70, W - 70])(li);
    for (let n = 0; n < count; n++) {
      const y = scaleLinear([-0.5, count - 0.5], [40, H - 60])(n);
      nodes.push({ x, y, layer: li });
    }
  });
  const nodeAt = (layer: number, idx: number) => {
    let base = 0;
    for (let l = 0; l < layer; l++) base += LAYERS[l];
    return nodes[base + idx];
  };

  const edges: { from: { x: number; y: number }; to: { x: number; y: number }; li: number }[] = [];
  for (let l = 0; l < LAYERS.length - 1; l++) {
    for (let a = 0; a < LAYERS[l]; a++) {
      for (let b = 0; b < LAYERS[l + 1]; b++) {
        edges.push({ from: nodeAt(l, a), to: nodeAt(l + 1, b), li: l });
      }
    }
  }

  const nodeActive = (layer: number) => {
    if (phase === 0) return layer === 0;
    if (phase === 1) return layer >= 1;
    if (phase === 2) return layer === LAYERS.length - 1;
    if (phase === 3) return true;
    return true;
  };
  const nodeColor = (layer: number) => {
    if (phase === 3) return "#b98bff";
    if (phase === 4) return "#29d3c2";
    if (phase === 0 && layer === 0) return "#58b0ff";
    if (phase === 1 && layer >= 1) return "#58b0ff";
    if (phase === 2 && layer === LAYERS.length - 1) return "#59d98a";
    return "#2b3441";
  };

  const a = ACT[act];
  const AW = 300, AH = 180, AM = 30;
  const ax = scaleLinear([-6, 6], [AM, AW - 12]);
  const ay = scaleLinear(a.yr, [AH - AM, 12]);
  const actPath = Array.from({ length: 120 }, (_, i) => {
    const x = -6 + (12 * i) / 119;
    return `${i === 0 ? "M" : "L"}${ax(x)},${ay(a.fn(x))}`;
  }).join(" ");

  return (
    <div className="grid two">
      <div className="grid" style={{ gap: 14 }}>
        <div className="stage">
          <svg viewBox={`0 0 ${W} ${H}`}>
            {edges.map((e, i) => {
              const isBack = phase === 3;
              const activeEdge = phase === 1 ? true : phase === 3 ? true : false;
              return (
                <motion.line
                  key={i}
                  x1={e.from.x} y1={e.from.y} x2={e.to.x} y2={e.to.y}
                  stroke={isBack ? "#b98bff" : "#3a4655"}
                  animate={{ opacity: activeEdge ? 0.6 : 0.18, strokeWidth: isBack ? 2 : 1 }}
                  transition={{ duration: 0.4 }}
                />
              );
            })}
            {LABELS.map((lb, i) => (
              <text key={lb + i} x={nodeAt(i, 0).x} y={24} textAnchor="middle" fontSize={11} fill="#6f7a89">{lb}</text>
            ))}
            {nodes.map((n, i) => (
              <motion.circle
                key={i}
                cx={n.x} cy={n.y} r={15}
                stroke="#0b0e13" strokeWidth={2}
                animate={{ fill: nodeColor(n.layer), opacity: nodeActive(n.layer) ? 1 : 0.4 }}
                transition={{ duration: 0.35 }}
              />
            ))}
            {phase === 2 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <rect x={W - 120} y={H - 46} width={108} height={32} rx={8} fill="rgba(255,107,107,0.16)" stroke="#ff6b6b" />
                <text x={W - 66} y={H - 25} textAnchor="middle" fontSize={12} fill="#ff6b6b" fontWeight={700}>損失を計算</text>
              </motion.g>
            )}
          </svg>
          <div className="btn-row" style={{ justifyContent: "space-between" }}>
            <button className="btn" onClick={() => setPhase((p) => ((p + 4) % 5) as Phase)}>← 前へ</button>
            <div className="legend" style={{ marginTop: 0 }}>
              {PHASES.map((_, i) => (
                <span key={i} className="dot" style={{ background: i === phase ? "#58b0ff" : "#2b3441", cursor: "pointer" }} onClick={() => setPhase(i as Phase)} />
              ))}
            </div>
            <button className="btn primary" onClick={() => setPhase((p) => ((p + 1) % 5) as Phase)}>次へ →</button>
          </div>
        </div>

        <div className="stage">
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <svg viewBox={`0 0 ${AW} ${AH}`} style={{ maxWidth: 260 }}>
              <line x1={AM} y1={ay(a.yr[0] < 0 ? 0 : a.yr[0])} x2={AW - 12} y2={ay(a.yr[0] < 0 ? 0 : a.yr[0])} stroke="#2b3441" />
              <line x1={ax(0)} y1={12} x2={ax(0)} y2={AH - AM} stroke="#2b3441" />
              <path d={actPath} fill="none" stroke="#b98bff" strokeWidth={2.5} />
              <circle cx={ax(inputX)} cy={ay(a.fn(inputX))} r={6} fill="#ff6b6b" stroke="#0b0e13" strokeWidth={2} />
              <text x={AW / 2} y={AH - 6} textAnchor="middle" fontSize={10} fill="#6f7a89">入力 x</text>
            </svg>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div className="btn-row" style={{ marginBottom: 10 }}>
                {(Object.keys(ACT) as ActKey[]).map((key) => (
                  <button key={key} className={`chip ${key === act ? "active" : ""}`} onClick={() => setAct(key)}>{ACT[key].label}</button>
                ))}
              </div>
              <div className="field">
                <label>入力 x <b>{inputX.toFixed(1)}</b></label>
                <input type="range" min={-6} max={6} step={0.1} value={inputX} onChange={(e) => setInputX(+e.target.value)} />
              </div>
              <div className="readout" style={{ marginTop: 8 }}>
                <div className="row"><span>{a.label}(x)</span><b className="accent">{a.fn(inputX).toFixed(3)}</b></div>
              </div>
            </div>
          </div>
          <p className="caption">活性化関数は各ニューロンの出力に非線形性を与えます。これがないと、層をいくら重ねても直線的な変換しか表現できません。</p>
        </div>
      </div>

      <div className="controls">
        <div className="note" style={{ borderLeftColor: "#58b0ff" }}>
          <b style={{ fontSize: 15 }}>{PHASES[phase].title}</b>
          <p style={{ marginTop: 6 }}>{PHASES[phase].text}</p>
        </div>
        <div className="readout">
          {PHASES[phase].points.map((p) => (
            <div className="row" key={p}><span>{p}</span><b>●</b></div>
          ))}
        </div>
        <div className="note amber">
          <b>学習ループ:</b> 順伝播 → 損失 → 逆伝播 → 更新 を何万回も繰り返して、少しずつ損失を下げます。
          「次へ」を押して一巡させてみてください。
        </div>
      </div>
    </div>
  );
}
