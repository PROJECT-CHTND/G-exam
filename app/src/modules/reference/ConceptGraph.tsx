import { useMemo, useState } from "react";
import {
  categoryMeta,
  conceptById,
  concepts,
  demoLabels,
  relatedConcepts,
  relations,
  type Concept,
  type ConceptCategory,
  type RelationType,
} from "../../data/concepts";

const relationLabel: Record<RelationType, string> = {
  is_a: "分類",
  part_of: "構成",
  evolves_to: "発展",
  solves: "解決",
  suffers_from: "課題",
  used_for: "用途",
  contrasts_with: "対比",
  requires: "前提",
  pipeline_next: "手順",
  proposed: "提案",
};

const relationColor: Record<RelationType, string> = {
  is_a: "#58b0ff",
  part_of: "#29d3c2",
  evolves_to: "#b98bff",
  solves: "#ffb84d",
  suffers_from: "#ff6a6a",
  used_for: "#59d98a",
  contrasts_with: "#ff7ea8",
  requires: "#f2d94e",
  pipeline_next: "#aeb8c6",
  proposed: "#7ee0ff",
};

function categoryLabel(category: ConceptCategory) {
  return categoryMeta.find((item) => item.id === category)?.shortLabel ?? category;
}

export default function ConceptGraph() {
  const [category, setCategory] = useState<ConceptCategory>("ml-foundation");
  const [selectedId, setSelectedId] = useState("ml");

  const scoped = useMemo(() => concepts.filter((concept) => concept.category === category), [category]);
  const scopedIds = useMemo(() => new Set(scoped.map((concept) => concept.id)), [scoped]);
  const scopedRelations = useMemo(
    () =>
      relations.filter(
        (relation) =>
          scopedIds.has(relation.from) ||
          scopedIds.has(relation.to) ||
          conceptById[relation.from]?.category === category ||
          conceptById[relation.to]?.category === category
      ),
    [category, scopedIds]
  );

  const nodes = useMemo(() => {
    const pool = new Map<string, Concept>();
    scoped.slice(0, 22).forEach((concept) => pool.set(concept.id, concept));
    scopedRelations.forEach((relation) => {
      if (conceptById[relation.from]) pool.set(relation.from, conceptById[relation.from]);
      if (conceptById[relation.to]) pool.set(relation.to, conceptById[relation.to]);
    });
    return Array.from(pool.values()).slice(0, 32);
  }, [scoped, scopedRelations]);

  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    const cx = 330;
    const cy = 230;
    const center = nodes.find((node) => node.id === selectedId) ?? nodes[0];
    if (center) map.set(center.id, { x: cx, y: cy });
    const others = nodes.filter((node) => node.id !== center?.id);
    others.forEach((node, index) => {
      const ring = index < 12 ? 145 : 215;
      const angle = (Math.PI * 2 * index) / Math.max(others.length, 1) - Math.PI / 2;
      map.set(node.id, { x: cx + Math.cos(angle) * ring, y: cy + Math.sin(angle) * ring });
    });
    return map;
  }, [nodes, selectedId]);

  const visibleRelations = scopedRelations.filter(
    (relation) => positions.has(relation.from) && positions.has(relation.to)
  );
  const selected = conceptById[selectedId] ?? nodes[0];
  const otherCategoryCount = nodes.filter((node) => node.category !== category).length;

  function selectCategory(next: ConceptCategory) {
    setCategory(next);
    const first = concepts.find((concept) => concept.category === next);
    if (first) setSelectedId(first.id);
  }

  return (
    <div className="reference-layout">
      <div className="reference-main card pad">
        <div className="category-tabs">
          {categoryMeta.map((item) => (
            <button
              key={item.id}
              className={`chip ${item.id === category ? "active" : ""}`}
              onClick={() => selectCategory(item.id)}
            >
              {item.shortLabel}
            </button>
          ))}
        </div>

        <p className="graph-intro">
          丸(ノード)が用語、線(エッジ)がその間の関係です。丸をクリックすると、その用語を中心に置き直され、
          関係する線に矢印とラベルが表示されます。矢印の向きは「from → to」の意味の向き(例:
          「AはBの一種」なら A → B)を表します。線にマウスを重ねると、選んでいない関係も内容を確認できます。
          現在は「{categoryMeta.find((item) => item.id === category)?.label}」を中心に{nodes.length}件のノードを表示中
          {otherCategoryCount > 0 && `(うち${otherCategoryCount}件は関連する他カテゴリの用語)`}。
        </p>

        <svg viewBox="0 0 660 460" className="concept-graph" role="img" aria-label="用語関係マップ">
          <defs>
            {Object.entries(relationColor).map(([key, color]) => (
              <marker
                key={key}
                id={`arrow-${key}`}
                viewBox="0 0 10 10"
                refX="8.5"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={color} />
              </marker>
            ))}
          </defs>
          {visibleRelations.map((relation, index) => {
            const a = positions.get(relation.from)!;
            const b = positions.get(relation.to)!;
            const active = relation.from === selectedId || relation.to === selectedId;
            const fromTerm = conceptById[relation.from]?.term ?? relation.from;
            const toTerm = conceptById[relation.to]?.term ?? relation.to;
            const label = relation.label ?? relationLabel[relation.type];
            return (
              <g key={`${relation.from}-${relation.to}-${index}`} className="graph-edge">
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={relationColor[relation.type]}
                  strokeWidth={active ? 2.4 : 1.3}
                  opacity={active ? 0.9 : 0.35}
                  markerEnd={`url(#arrow-${relation.type})`}
                />
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="transparent"
                  strokeWidth={14}
                  className="graph-edge-hitbox"
                >
                  <title>{`${fromTerm} → (${label}) → ${toTerm}`}</title>
                </line>
                {active && (
                  <text
                    x={(a.x + b.x) / 2}
                    y={(a.y + b.y) / 2 - 4}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={700}
                    fill={relationColor[relation.type]}
                  >
                    {label}
                  </text>
                )}
              </g>
            );
          })}
          {nodes.map((node) => {
            const p = positions.get(node.id)!;
            const active = node.id === selectedId;
            const sameCategory = node.category === category;
            return (
              <g
                key={node.id}
                onClick={() => setSelectedId(node.id)}
                style={{ cursor: "pointer", transform: `translate(${p.x}px, ${p.y}px)`, transition: "transform 0.35s ease" }}
              >
                <title>{`${node.term}(${categoryLabel(node.category)})— クリックして中心に表示`}</title>
                <circle
                  r={active ? 34 : 27}
                  fill={active ? "#58b0ff" : sameCategory ? "#212936" : "#171c24"}
                  stroke={active ? "#dff0ff" : sameCategory ? "#58b0ff" : "#3a4452"}
                  strokeDasharray={sameCategory ? undefined : "3 2"}
                  strokeWidth={active ? 2.6 : 1.2}
                />
                <text
                  y={node.term.length > 10 ? -2 : 4}
                  textAnchor="middle"
                  fontSize={node.term.length > 11 ? 9 : 10.5}
                  fontWeight={700}
                  fill={active ? "#05121f" : "#eef2f7"}
                >
                  {node.term.length > 12 ? `${node.term.slice(0, 11)}…` : node.term}
                </text>
                {node.term.length > 10 && (
                  <text y={13} textAnchor="middle" fontSize={8.5} fill={active ? "#05121f" : "#aeb8c6"}>
                    {categoryLabel(node.category)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="legend legend-nodes">
          <span>
            <span className="dot dot-node dot-node-active" />
            選択中の用語(クリックで切り替え)
          </span>
          <span>
            <span className="dot dot-node dot-node-same" />
            現在のカテゴリの用語
          </span>
          <span>
            <span className="dot dot-node dot-node-other" />
            関連する他カテゴリの用語(点線の丸)
          </span>
        </div>
        <p className="graph-legend-caption">線の色 = 関係の種類。矢印の元(from)→先(to)の向きに意味がある(例: 「解決」なら 元が解決策、先が解決される課題)。</p>
        <div className="legend">
          {Object.entries(relationLabel).map(([key, label]) => (
            <span key={key}>
              <span className="dot" style={{ background: relationColor[key as RelationType] }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <TermDetail concept={selected} onSelect={setSelectedId} />
    </div>
  );
}

export function TermDetail({
  concept,
  onSelect,
}: {
  concept: Concept;
  onSelect: (id: string) => void;
}) {
  const related = relatedConcepts(concept.id)
    .map((relation) => {
      const otherId = relation.from === concept.id ? relation.to : relation.from;
      const other = conceptById[otherId];
      return other ? { relation, other } : null;
    })
    .filter(Boolean) as { relation: (typeof relations)[number]; other: Concept }[];

  return (
    <aside className="term-detail card pad">
      <span className="tag">{categoryLabel(concept.category)}</span>
      <h3>{concept.term}</h3>
      <p className="term-summary">{concept.summary}</p>
      <div className="note">
        <b>試験での見分け方:</b> {concept.examHint}
      </div>
      {concept.demo && (
        <a className="btn primary" href={concept.demo}>
          対応デモへ: {demoLabels[concept.demo]}
        </a>
      )}
      <div>
        <h4>つながる用語</h4>
        <div className="related-list">
          {related.slice(0, 12).map(({ relation, other }) => (
            <button key={`${relation.from}-${relation.to}-${other.id}`} onClick={() => onSelect(other.id)}>
              <span style={{ color: relationColor[relation.type] }}>{relation.label ?? relationLabel[relation.type]}</span>
              <b>{other.term}</b>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
