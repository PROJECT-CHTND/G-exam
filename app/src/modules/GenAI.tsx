import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { lerp } from "../lib/scale";

// shared vocabulary axes: [過学習, 正則化, 画像, 畳み込み, 強化学習, 報酬, 生成, ノイズ]
type Doc = { title: string; vec: number[] };
const DOCS: Doc[] = [
  { title: "正則化とDropoutで過学習を防ぐ手法", vec: [1, 1, 0, 0, 0, 0, 0, 0] },
  { title: "CNNの畳み込み層が画像の特徴を抽出する", vec: [0, 0, 1, 1, 0, 0, 0, 0] },
  { title: "強化学習は報酬を最大化する行動を学ぶ", vec: [0, 0, 0, 0, 1, 1, 0, 0] },
  { title: "拡散モデルはノイズから画像を生成する", vec: [0, 0, 1, 0, 0, 0, 1, 1] },
  { title: "早期終了とデータ拡張も過学習対策になる", vec: [1, 0, 0, 0, 0, 0, 0, 0] },
];

const QUERIES = [
  { q: "深層学習の過学習を防ぐには？", vec: [1, 1, 0, 0, 0, 0, 0, 0] },
  { q: "画像認識はどう特徴を捉える？", vec: [0, 0, 1, 1, 0, 0, 0, 0] },
  { q: "報酬で学習するAIは？", vec: [0, 0, 0, 0, 1, 1, 0, 0] },
];

function cosine(a: number[], b: number[]) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

// diffusion target: a filled disc on a grid
const DN = 18;
function target(i: number, j: number) {
  const cx = DN / 2 - 0.5, cy = DN / 2 - 0.5;
  const d = Math.hypot(i - cx, j - cy);
  return d < DN / 3 ? 1 : d < DN / 2.4 ? 0.5 : 0;
}
function noiseSeed(i: number, j: number) {
  const x = Math.sin((i * 928.3 + j * 471.7)) * 10000;
  return x - Math.floor(x);
}

export default function GenAI() {
  const [tab, setTab] = useState<"rag" | "diffusion">("rag");
  const [qi, setQi] = useState(0);
  const [steps, setSteps] = useState(0);

  const ranked = useMemo(() => {
    const q = QUERIES[qi].vec;
    return DOCS.map((d) => ({ ...d, sim: cosine(q, d.vec) }))
      .map((d, idx) => ({ ...d, idx }))
      .sort((a, b) => b.sim - a.sim);
  }, [qi]);
  const topIdx = new Set(ranked.slice(0, 2).map((d) => d.idx));

  const t = steps / 10;

  return (
    <div className="card pad">
      <div className="btn-row" style={{ marginBottom: 16 }}>
        <button className={`btn ${tab === "rag" ? "active" : ""}`} onClick={() => setTab("rag")}>RAG (検索して答える)</button>
        <button className={`btn ${tab === "diffusion" ? "active" : ""}`} onClick={() => setTab("diffusion")}>拡散モデル (ノイズから生成)</button>
      </div>

      {tab === "rag" ? (
        <div className="grid two">
          <div className="stage">
            <div style={{ marginBottom: 12 }}>
              <div className="field">
                <label>質問を選ぶ</label>
                <div className="btn-row">
                  {QUERIES.map((qq, i) => (
                    <button key={i} className={`chip ${i === qi ? "active" : ""}`} onClick={() => setQi(i)}>{qq.q}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="metric-bars">
              {DOCS.map((d, i) => {
                const item = ranked.find((r) => r.idx === i)!;
                const retrieved = topIdx.has(i);
                return (
                  <div className="metric-bar" key={i} style={{ gridTemplateColumns: "1fr 90px 40px" }}>
                    <span style={{ color: retrieved ? "#29d3c2" : "#aeb8c6", fontWeight: retrieved ? 700 : 400, fontSize: 12.5 }}>
                      {retrieved ? "★ " : ""}{d.title}
                    </span>
                    <div className="bar-track">
                      <motion.div className="bar-fill" style={{ background: retrieved ? "#29d3c2" : "#3a4655" }} animate={{ width: `${item.sim * 100}%` }} transition={{ duration: 0.4 }} />
                    </div>
                    <b style={{ fontVariantNumeric: "tabular-nums", fontSize: 12 }}>{item.sim.toFixed(2)}</b>
                  </div>
                );
              })}
            </div>
            <p className="caption">質問と各文書のベクトルのコサイン類似度を実際に計算し、上位2件(★)を取り出しています。</p>
          </div>
          <div className="controls">
            <div className="stage" style={{ background: "#0b0e13" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["質問", "ベクトル化", "類似度で検索", "上位文書＋質問をLLMへ", "根拠つき回答"].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 22, height: 22, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700, background: i === 2 || i === 3 ? "#29d3c2" : "#212936", color: i === 2 || i === 3 ? "#05121f" : "#aeb8c6" }}>{i + 1}</span>
                    <span style={{ fontSize: 13, color: i === 2 || i === 3 ? "#eef2f7" : "#aeb8c6" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="note amber">
              <b>用語:</b> RAG(検索拡張生成)はモデルの重みを変えず、外部知識を<b>検索</b>して入力に足します。
              ファインチューニング(重みの追加学習)とは別物です。ハルシネーション低減に使われます。
            </div>
          </div>
        </div>
      ) : (
        <div className="grid two">
          <div className="stage" style={{ display: "grid", placeItems: "center" }}>
            <svg viewBox={`0 0 ${DN * 12} ${DN * 12}`} style={{ width: 300 }}>
              {Array.from({ length: DN * DN }, (_, idx) => {
                const i = Math.floor(idx / DN);
                const j = idx % DN;
                const v = lerp(noiseSeed(i, j), target(i, j), t);
                const g = Math.round(v * 255);
                return <rect key={idx} x={j * 12} y={i * 12} width={12} height={12} fill={`rgb(${g},${g},${g})`} />;
              })}
            </svg>
            <p className="caption" style={{ textAlign: "center" }}>ステップ {steps} / 10 ： ノイズ({steps === 0 ? "初期" : "→"})から少しずつ形が現れます。</p>
          </div>
          <div className="controls">
            <div className="field">
              <label>デノイジングのステップ <b>{steps} / 10</b></label>
              <input type="range" min={0} max={10} value={steps} onChange={(e) => setSteps(+e.target.value)} />
            </div>
            <div className="note amber">
              <b>用語:</b> 拡散モデルは学習時に画像へノイズを加える過程を学び、生成時は逆にノイズを少しずつ除去(デノイジング)して
              画像を作ります。GANやVAEと並ぶ代表的な生成モデルです。
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
