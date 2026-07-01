import { useState } from "react";
import { motion } from "framer-motion";

type Key = "ai" | "ml" | "dl" | "app";
const DETAIL: Record<Key, { title: string; body: string; terms: string[] }> = {
  ai: {
    title: "人工知能 (AI)",
    body: "知的な振る舞いを機械で実現しようとする最も広い分野。機械学習はその実現手段の一つです。",
    terms: ["探索・推論", "知識表現", "エキスパートシステム", "機械学習"],
  },
  ml: {
    title: "機械学習 (ML)",
    body: "データから規則性を学ぶ手法。正解ラベルの有無や報酬の有無で、教師あり・教師なし・強化学習に分かれます。",
    terms: ["教師あり学習", "教師なし学習", "強化学習", "汎化と過学習"],
  },
  dl: {
    title: "深層学習 (DL)",
    body: "多層ニューラルネットワークで特徴表現そのものを学習する手法。CNN・RNN・Transformerなどの構造があります。",
    terms: ["順伝播・逆伝播", "CNN", "RNN / LSTM", "Transformer"],
  },
  app: {
    title: "応用と社会実装",
    body: "画像・言語・音声・生成AIなどの応用領域と、説明可能性・軽量化・ガバナンスなど社会で使うための技術。",
    terms: ["画像認識", "自然言語処理", "生成AI", "XAI / 軽量化"],
  },
};

const ORBIT: { key: Key; label: string; angle: number }[] = [
  { key: "app", label: "画像認識", angle: -35 },
  { key: "app", label: "自然言語処理", angle: 15 },
  { key: "app", label: "生成AI", angle: 60 },
  { key: "app", label: "社会実装", angle: 110 },
];

export default function ConceptMap() {
  const [sel, setSel] = useState<Key>("ai");
  const cx = 210, cy = 190;

  const ring = (key: Key, r: number, fill: string, label: string, sub: string, ly: number) => (
    <g onClick={() => setSel(key)} style={{ cursor: "pointer" }}>
      <motion.circle
        cx={cx} cy={cy} r={r}
        fill={fill}
        stroke={sel === key ? "#58b0ff" : "#2b3441"}
        strokeWidth={sel === key ? 2.5 : 1.5}
        whileHover={{ scale: 1.01 }}
      />
      <text x={cx} y={ly} textAnchor="middle" fontSize={13} fontWeight={700} fill="#eef2f7">{label}</text>
      <text x={cx} y={ly + 16} textAnchor="middle" fontSize={10} fill="#aeb8c6">{sub}</text>
    </g>
  );

  return (
    <div className="grid two">
      <div className="stage">
        <svg viewBox="0 0 420 380">
          {ORBIT.map((o, i) => {
            const rad = (o.angle * Math.PI) / 180;
            const ox = cx + Math.cos(rad) * 195;
            const oy = cy + Math.sin(rad) * 150;
            return (
              <g key={i} onClick={() => setSel("app")} style={{ cursor: "pointer" }}>
                <line x1={cx + Math.cos(rad) * 150} y1={cy + Math.sin(rad) * 118} x2={ox} y2={oy} stroke="#2b3441" />
                <rect x={ox - 46} y={oy - 15} width={92} height={30} rx={9} fill="#212936" stroke="#2b3441" />
                <text x={ox} y={oy + 4} textAnchor="middle" fontSize={11} fontWeight={600} fill="#aeb8c6">{o.label}</text>
              </g>
            );
          })}
          {ring("ai", 150, "#141b26", "人工知能 AI", "", cy - 118)}
          {ring("ml", 108, "#182231", "機械学習 ML", "", cy - 78)}
          {ring("dl", 62, "#1d2942", "深層学習 DL", "CNN/Transformer", cy - 6)}
        </svg>
        <p className="caption">丸をクリックすると、その階層で押さえる代表用語が右に出ます。「AI ⊃ 機械学習 ⊃ 深層学習」という包含関係が土台です。</p>
      </div>
      <motion.div className="controls" key={sel} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <h3 style={{ fontSize: 20, color: "#58b0ff" }}>{DETAIL[sel].title}</h3>
        <p style={{ color: "#aeb8c6", fontSize: 14.5 }}>{DETAIL[sel].body}</p>
        <div className="readout">
          {DETAIL[sel].terms.map((t) => (
            <div className="row" key={t}><span>{t}</span><b>●</b></div>
          ))}
        </div>
        <div className="note">下の各セクションで、これらの概念を実データを使って動かしながら確認できます。</div>
      </motion.div>
    </div>
  );
}
