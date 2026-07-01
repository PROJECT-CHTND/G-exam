import { useMemo, useState } from "react";

const WORDS = [
  { w: "王", x: 0.78, y: 0.72, group: "royal" },
  { w: "女王", x: 0.38, y: 0.72, group: "royal" },
  { w: "男", x: 0.72, y: 0.26, group: "gender" },
  { w: "女", x: 0.32, y: 0.26, group: "gender" },
  { w: "皇帝", x: 0.84, y: 0.62, group: "royal" },
  { w: "王女", x: 0.3, y: 0.63, group: "royal" },
  { w: "医師", x: 0.58, y: 0.42, group: "job" },
  { w: "看護師", x: 0.42, y: 0.43, group: "job" },
  { w: "猫", x: 0.2, y: 0.12, group: "animal" },
  { w: "犬", x: 0.27, y: 0.1, group: "animal" },
];

const GROUP_COLORS: Record<string, string> = {
  royal: "#ffb84d",
  gender: "#58b0ff",
  job: "#29d3c2",
  animal: "#b98bff",
};

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export default function WordEmbedding() {
  const [formula, setFormula] = useState<"queen" | "princess">("queen");
  const target = useMemo(() => {
    const king = WORDS.find((w) => w.w === "王")!;
    const man = WORDS.find((w) => w.w === "男")!;
    const woman = WORDS.find((w) => w.w === "女")!;
    const emperor = WORDS.find((w) => w.w === "皇帝")!;
    const base = formula === "queen" ? king : emperor;
    const point = { x: base.x - man.x + woman.x, y: base.y - man.y + woman.y };
    const nearest = WORDS.filter((w) => !["王", "男", "女", "皇帝"].includes(w.w)).sort(
      (a, b) => dist(a, point) - dist(b, point)
    )[0];
    return { point, nearest };
  }, [formula]);

  return (
    <div className="grid two">
      <div className="stage">
        <svg viewBox="0 0 520 330">
          <rect x="35" y="20" width="450" height="270" rx="16" fill="#151a22" stroke="#2b3441" />
          <text x="260" y="314" textAnchor="middle" fill="#6f7a89" fontSize="11">性別方向</text>
          <text x="-155" y="18" transform="rotate(-90)" textAnchor="middle" fill="#6f7a89" fontSize="11">王族性/役割方向</text>
          {WORDS.map((word) => (
            <g key={word.w}>
              <circle cx={35 + word.x * 450} cy={290 - word.y * 270} r="18" fill={GROUP_COLORS[word.group]} opacity="0.25" />
              <text x={35 + word.x * 450} y={295 - word.y * 270} textAnchor="middle" fill="#eef2f7" fontSize="13" fontWeight="700">
                {word.w}
              </text>
            </g>
          ))}
          <circle cx={35 + target.point.x * 450} cy={290 - target.point.y * 270} r="9" fill="#ff7ea8" />
          <text x={35 + target.point.x * 450} y={274 - target.point.y * 270} textAnchor="middle" fill="#ff7ea8" fontSize="11">
            計算結果
          </text>
        </svg>
      </div>
      <div className="controls">
        <div className="button-row">
          <button className={`chip ${formula === "queen" ? "active" : ""}`} onClick={() => setFormula("queen")}>
            王 - 男 + 女
          </button>
          <button className={`chip ${formula === "princess" ? "active" : ""}`} onClick={() => setFormula("princess")}>
            皇帝 - 男 + 女
          </button>
        </div>
        <div className="readout">
          <div className="row">
            <span>最近傍の単語</span>
            <b className="accent">{target.nearest.w}</b>
          </div>
          <div className="row">
            <span>距離</span>
            <b>{dist(target.nearest, target.point).toFixed(2)}</b>
          </div>
        </div>
        <div className="note amber">
          <b>用語:</b> word2vecの分散表現では、単語の意味や関係がベクトルの方向として現れます。
          試験ではCBOW/Skip-gram、局所表現との対比も押さえます。
        </div>
      </div>
    </div>
  );
}
