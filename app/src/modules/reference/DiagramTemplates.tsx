import type { ReactNode } from "react";

type TreeGroup = {
  title: string;
  items: string[];
};

export function TaxonomyTree({ root, groups }: { root: string; groups: TreeGroup[] }) {
  return (
    <div className="diagram taxonomy-tree">
      <div className="diagram-root">{root}</div>
      <div className="taxonomy-groups">
        {groups.map((group) => (
          <div className="taxonomy-group" key={group.title}>
            <div className="taxonomy-title">{group.title}</div>
            <div className="taxonomy-items">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type TimelineItem = {
  label: string;
  sub?: string;
};

export function LineageTimeline({ title, items }: { title: string; items: TimelineItem[] }) {
  return (
    <div className="diagram">
      <div className="diagram-title">{title}</div>
      <div className="lineage">
        {items.map((item, index) => (
          <div className="lineage-item" key={`${item.label}-${index}`}>
            <div className="lineage-dot">{index + 1}</div>
            <div>
              <b>{item.label}</b>
              {item.sub && <span>{item.sub}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type FlowStep = {
  label: string;
  note?: string;
};

export function PipelineFlow({ title, steps }: { title: string; steps: FlowStep[] }) {
  return (
    <div className="diagram">
      <div className="diagram-title">{title}</div>
      <div className="pipeline-flow">
        {steps.map((step, index) => (
          <div className="flow-step" key={`${step.label}-${index}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{step.label}</b>
            {step.note && <small>{step.note}</small>}
          </div>
        ))}
      </div>
    </div>
  );
}

type LadderItem = {
  label: string;
  note: string;
};

export function TaskLadder({ title, items }: { title: string; items: LadderItem[] }) {
  return (
    <div className="diagram">
      <div className="diagram-title">{title}</div>
      <div className="task-ladder">
        {items.map((item, index) => (
          <div className="ladder-rung" key={item.label} style={{ marginLeft: `${index * 22}px` }}>
            <b>{item.label}</b>
            <span>{item.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type CompareColumn = {
  title: string;
  body: ReactNode;
};

export function CompareGrid({ title, columns }: { title: string; columns: CompareColumn[] }) {
  return (
    <div className="diagram">
      <div className="diagram-title">{title}</div>
      <div className="compare-grid">
        {columns.map((column) => (
          <div className="compare-card" key={column.title}>
            <b>{column.title}</b>
            <div>{column.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

type MetricRow = {
  task: string;
  metrics: string[];
  when: string;
};

export function MetricMatrix({ rows }: { rows: MetricRow[] }) {
  return (
    <div className="diagram">
      <div className="diagram-title">タスク別の評価指標</div>
      <div className="metric-matrix">
        <div className="metric-head">タスク</div>
        <div className="metric-head">指標</div>
        <div className="metric-head">見る場面</div>
        {rows.map((row) => (
          <div className="metric-row" key={row.task}>
            <b>{row.task}</b>
            <span>{row.metrics.join(" / ")}</span>
            <small>{row.when}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SyllabusDiagrams() {
  return (
    <div className="diagram-stack">
      <TaxonomyTree
        root="機械学習"
        groups={[
          { title: "教師あり", items: ["回帰", "分類", "SVM", "決定木", "アンサンブル"] },
          { title: "教師なし", items: ["クラスタリング", "PCA", "推薦", "トピックモデル"] },
          { title: "強化学習", items: ["MDP", "Q学習", "SARSA", "方策勾配"] },
        ]}
      />
      <LineageTimeline
        title="画像モデルの系譜"
        items={[
          { label: "LeNet", sub: "手書き数字/CNN初期" },
          { label: "AlexNet", sub: "ILSVRC 2012" },
          { label: "VGG", sub: "3x3畳み込みを深く積む" },
          { label: "GoogLeNet", sub: "Inception" },
          { label: "ResNet", sub: "スキップ結合" },
          { label: "MobileNet/EfficientNet", sub: "軽量・効率化" },
        ]}
      />
      <PipelineFlow
        title="音声処理のパイプライン"
        steps={[
          { label: "A-D変換", note: "アナログをデジタル化" },
          { label: "PCM", note: "サンプリング/量子化" },
          { label: "FFT", note: "周波数へ変換" },
          { label: "MFCC", note: "聴覚特性を反映" },
          { label: "音声認識", note: "HMM/CTC/WaveNetなど" },
        ]}
      />
      <TaskLadder
        title="画像タスクの粒度"
        items={[
          { label: "画像分類", note: "画像全体に1ラベル" },
          { label: "物体検出", note: "クラス＋矩形領域" },
          { label: "セグメンテーション", note: "画素単位の領域" },
          { label: "姿勢推定", note: "関節点と骨格" },
        ]}
      />
      <CompareGrid
        title="混同しやすい概念の対比"
        columns={[
          { title: "GAN", body: "生成器と識別器を敵対的に学習する。" },
          { title: "VAE", body: "潜在変数の確率分布から生成する。" },
          { title: "拡散モデル", body: "ノイズ除去を逆過程として生成する。" },
        ]}
      />
      <MetricMatrix
        rows={[
          { task: "分類", metrics: ["正解率", "適合率", "再現率", "F値", "AUC"], when: "クラス判定の良し悪しを見る" },
          { task: "回帰", metrics: ["MSE", "RMSE", "MAE", "R²"], when: "数値予測のズレを見る" },
          { task: "モデル選択", metrics: ["交差検証", "AIC", "BIC"], when: "汎化と複雑さのバランスを見る" },
        ]}
      />
    </div>
  );
}
