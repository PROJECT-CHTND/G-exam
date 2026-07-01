import { useState } from "react";

type Layer = "classification" | "detection" | "segmentation" | "pose";

const OPTIONS: { id: Layer; label: string; note: string }[] = [
  { id: "classification", label: "分類", note: "画像全体に「猫」など1ラベルを付ける" },
  { id: "detection", label: "検出", note: "物体のクラスとバウンディングボックスを出す" },
  { id: "segmentation", label: "セグメンテーション", note: "画素ごとに領域を塗り分ける" },
  { id: "pose", label: "姿勢推定", note: "関節点と骨格を推定する" },
];

export default function ImageTaskGranularity() {
  const [layer, setLayer] = useState<Layer>("classification");
  return (
    <div className="grid two">
      <div className="stage image-task-stage">
        <svg viewBox="0 0 520 340">
          <rect x="48" y="32" width="424" height="270" rx="24" fill="#1a2029" stroke="#2b3441" />
          <circle cx="228" cy="142" r="72" fill="#2f3a47" />
          <circle cx="292" cy="142" r="72" fill="#2f3a47" />
          <ellipse cx="260" cy="220" rx="96" ry="78" fill="#3a4655" />
          <circle cx="232" cy="148" r="10" fill="#0e1116" />
          <circle cx="288" cy="148" r="10" fill="#0e1116" />
          <path d="M246 184 Q260 197 274 184" fill="none" stroke="#0e1116" strokeWidth="6" strokeLinecap="round" />
          {layer === "classification" && (
            <g>
              <rect x="180" y="258" width="160" height="34" rx="17" fill="#58b0ff" />
              <text x="260" y="280" textAnchor="middle" fill="#05121f" fontWeight="800">猫: 0.94</text>
            </g>
          )}
          {layer === "detection" && (
            <g>
              <rect x="152" y="82" width="216" height="194" fill="none" stroke="#ffb84d" strokeWidth="4" />
              <rect x="152" y="52" width="106" height="30" fill="#ffb84d" />
              <text x="205" y="72" textAnchor="middle" fill="#0e1116" fontWeight="800">cat 0.94</text>
            </g>
          )}
          {layer === "segmentation" && (
            <path
              d="M174 222 C124 148 177 83 232 75 C291 44 382 103 345 205 C337 290 224 310 174 222Z"
              fill="rgba(41,211,194,0.35)"
              stroke="#29d3c2"
              strokeWidth="4"
            />
          )}
          {layer === "pose" && (
            <g stroke="#ff7ea8" strokeWidth="5" strokeLinecap="round">
              <line x1="260" y1="190" x2="260" y2="244" />
              <line x1="260" y1="202" x2="216" y2="230" />
              <line x1="260" y1="202" x2="304" y2="230" />
              <line x1="260" y1="244" x2="226" y2="280" />
              <line x1="260" y1="244" x2="294" y2="280" />
              {[260, 216, 304, 226, 294].map((x, i) => (
                <circle key={i} cx={x} cy={[190, 230, 230, 280, 280][i]} r="7" fill="#ff7ea8" stroke="none" />
              ))}
            </g>
          )}
        </svg>
      </div>
      <div className="controls">
        <div className="button-row">
          {OPTIONS.map((option) => (
            <button key={option.id} className={`chip ${layer === option.id ? "active" : ""}`} onClick={() => setLayer(option.id)}>
              {option.label}
            </button>
          ))}
        </div>
        <div className="note amber">
          <b>{OPTIONS.find((option) => option.id === layer)?.label}:</b> {OPTIONS.find((option) => option.id === layer)?.note}
        </div>
        <p className="reference-copy">
          同じ画像でも、分類は粗く、検出は位置、セグメンテーションは領域、姿勢推定は構造を返します。
          YOLO/SSD/Faster R-CNN/Mask R-CNN/U-Net/OpenPoseは、この粒度の違いで整理すると覚えやすくなります。
        </p>
      </div>
    </div>
  );
}
