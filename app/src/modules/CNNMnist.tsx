import { useMemo, useState } from "react";
import { mnistSamples } from "../data/mnist";
import { useLoop } from "../hooks/useLoop";

const N = 28;
const OUT = N - 2; // valid convolution with 3x3

const KERNELS = {
  vertical: { label: "縦エッジ", k: [1, 0, -1, 2, 0, -2, 1, 0, -1] },
  horizontal: { label: "横エッジ", k: [1, 2, 1, 0, 0, 0, -1, -2, -1] },
  laplace: { label: "輪郭", k: [0, -1, 0, -1, 4, -1, 0, -1, 0] },
  blur: { label: "ぼかし", k: [1, 1, 1, 1, 1, 1, 1, 1, 1].map((v) => v / 9) },
  sharpen: { label: "シャープ", k: [0, -1, 0, -1, 5, -1, 0, -1, 0] },
};
type KKey = keyof typeof KERNELS;

function convolve(img: number[], kernel: number[]) {
  const out = new Array(OUT * OUT).fill(0);
  for (let r = 0; r < OUT; r++) {
    for (let c = 0; c < OUT; c++) {
      let sum = 0;
      for (let dr = 0; dr < 3; dr++)
        for (let dc = 0; dc < 3; dc++)
          sum += (img[(r + dr) * N + (c + dc)] / 255) * kernel[dr * 3 + dc];
      out[r * OUT + c] = sum;
    }
  }
  return out;
}

function maxPool2(feat: number[]) {
  const P = OUT / 2; // 13
  const size = Math.floor(P);
  const out = new Array(size * size).fill(0);
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++) {
      let m = -Infinity;
      for (let dr = 0; dr < 2; dr++)
        for (let dc = 0; dc < 2; dc++)
          m = Math.max(m, feat[(r * 2 + dr) * OUT + (c * 2 + dc)]);
      out[r * size + c] = m;
    }
  return { out, size };
}

function heat(v: number, maxAbs: number) {
  const t = Math.max(-1, Math.min(1, v / (maxAbs || 1)));
  if (t >= 0) {
    const a = t;
    return `rgb(${Math.round(20 + 235 * a)}, ${Math.round(20 + 164 * a)}, ${Math.round(30 * (1 - a) + 30)})`;
  }
  const a = -t;
  return `rgb(${Math.round(20 + 40 * (1 - a))}, ${Math.round(20 + 100 * a)}, ${Math.round(30 + 225 * a)})`;
}

export default function CNNMnist() {
  const [sampleIdx, setSampleIdx] = useState(12);
  const [kernelKey, setKernelKey] = useState<KKey>("vertical");
  const [pos, setPos] = useState(0);
  const [running, setRunning] = useState(false);
  const [pool, setPool] = useState(false);

  const sample = mnistSamples[sampleIdx];
  const kernel = KERNELS[kernelKey].k;
  const feature = useMemo(() => convolve(sample.pixels, kernel), [sample, kernel]);
  const maxAbs = useMemo(() => Math.max(...feature.map((v) => Math.abs(v)), 0.01), [feature]);
  const pooled = useMemo(() => maxPool2(feature), [feature]);

  useLoop(running, 22, () => {
    setPos((p) => {
      const next = p + 1;
      if (next >= OUT * OUT) {
        setRunning(false);
        return OUT * OUT - 1;
      }
      return next;
    });
  });

  const or = Math.floor(pos / OUT);
  const oc = pos % OUT;

  const cell = 8; // px per input cell in viewBox
  const IW = N * cell;
  const OWpx = OUT * cell;

  return (
    <div className="grid two">
      <div className="stage">
        <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>
          {/* input */}
          <div>
            <svg viewBox={`0 0 ${IW} ${IW}`} style={{ width: 224 }}>
              {sample.pixels.map((v, i) => {
                const r = Math.floor(i / N);
                const c = i % N;
                const g = Math.round(v);
                return <rect key={i} x={c * cell} y={r * cell} width={cell} height={cell} fill={`rgb(${g},${g},${g})`} />;
              })}
              <rect x={oc * cell} y={or * cell} width={cell * 3} height={cell * 3} fill="none" stroke="#ffb84d" strokeWidth={2} />
            </svg>
            <p className="caption" style={{ textAlign: "center" }}>入力: 実物のMNIST「{sample.label}」 (28×28)</p>
          </div>

          {/* kernel */}
          <div style={{ alignSelf: "center" }}>
            <svg viewBox="0 0 96 96" style={{ width: 96 }}>
              {kernel.map((v, i) => {
                const r = Math.floor(i / 3);
                const c = i % 3;
                return (
                  <g key={i}>
                    <rect x={c * 32} y={r * 32} width={31} height={31} rx={5} fill="rgba(255,184,77,0.14)" stroke="#ffb84d" />
                    <text x={c * 32 + 15.5} y={r * 32 + 20} textAnchor="middle" fontSize={12} fill="#ffb84d" fontWeight={700}>
                      {Math.round(v * 100) / 100}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="caption" style={{ textAlign: "center" }}>カーネル 3×3</p>
          </div>

          {/* output */}
          <div>
            <svg viewBox={`0 0 ${OWpx} ${OWpx}`} style={{ width: 208 }}>
              {(pool ? [] : feature).map((v, i) => {
                const r = Math.floor(i / OUT);
                const c = i % OUT;
                const done = i <= pos || !running;
                return <rect key={i} x={c * cell} y={r * cell} width={cell} height={cell} fill={done ? heat(v, maxAbs) : "#0b0e13"} />;
              })}
              {pool &&
                pooled.out.map((v, i) => {
                  const r = Math.floor(i / pooled.size);
                  const c = i % pooled.size;
                  const cs = OWpx / pooled.size;
                  return <rect key={i} x={c * cs} y={r * cs} width={cs} height={cs} fill={heat(v, maxAbs)} />;
                })}
              {!pool && <rect x={oc * cell} y={or * cell} width={cell} height={cell} fill="none" stroke="#fff" strokeWidth={1.5} />}
            </svg>
            <p className="caption" style={{ textAlign: "center" }}>{pool ? `プーリング後 (${pooled.size}×${pooled.size})` : "特徴マップ (26×26)"}</p>
          </div>
        </div>
        <p className="caption">
          黄色の枠がフィルタの位置。その3×3領域とカーネルの積の合計が、右の特徴マップの1マス(白枠)になります。「畳み込みを再生」で全マスを走査します。
        </p>
      </div>

      <div className="controls">
        <div className="field">
          <label>フィルタ (カーネル)</label>
          <div className="btn-row">
            {(Object.keys(KERNELS) as KKey[]).map((key) => (
              <button key={key} className={`chip ${key === kernelKey ? "active" : ""}`} onClick={() => setKernelKey(key)}>
                {KERNELS[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>手書き数字のサンプル</label>
          <div className="btn-row">
            <button className="btn" onClick={() => setSampleIdx((i) => (i + mnistSamples.length - 1) % mnistSamples.length)}>← 前</button>
            <span className="chip active" style={{ fontSize: 15 }}>「{sample.label}」</span>
            <button className="btn" onClick={() => setSampleIdx((i) => (i + 1) % mnistSamples.length)}>次 →</button>
          </div>
        </div>

        <div className="field">
          <label>フィルタの位置 <b>{or},{oc}</b></label>
          <input type="range" min={0} max={OUT * OUT - 1} value={pos} onChange={(e) => setPos(+e.target.value)} />
        </div>

        <div className="btn-row">
          <button className="btn primary" onClick={() => { if (pos >= OUT * OUT - 1) setPos(0); setRunning((r) => !r); }}>
            {running ? "一時停止" : "畳み込みを再生"}
          </button>
          <button className={`chip ${pool ? "active" : ""}`} onClick={() => setPool((v) => !v)}>
            {pool ? "プーリングを解除" : "プーリングを適用"}
          </button>
        </div>

        <div className="readout">
          <div className="row"><span>この位置の出力値</span><b className="accent">{feature[pos].toFixed(2)}</b></div>
        </div>

        <div className="note amber">
          <b>用語:</b> CNNは小さなフィルタを画像上でスライドさせ、局所的な特徴(縦・横のエッジなど)を「特徴マップ」として抽出します。
          プーリングは特徴マップを縮約し、位置ずれに強くします。フィルタを変えると検出される特徴が変わります。
        </div>
      </div>
    </div>
  );
}
