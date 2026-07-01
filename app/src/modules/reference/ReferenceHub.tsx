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
import ConceptGraph from "./ConceptGraph";

function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, "");
}

const relationLabel: Record<RelationType, string> = {
  is_a: "上位・下位関係",
  part_of: "構成要素",
  evolves_to: "発展関係",
  solves: "解決する課題",
  used_for: "使われる場面",
  contrasts_with: "対比して覚える用語",
  pipeline_next: "手順上のつながり",
};

export default function ReferenceHub() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ConceptCategory | "all">("all");
  const [selectedId, setSelectedId] = useState("ml");

  const results = useMemo(() => {
    const q = normalize(query);
    return concepts.filter((concept) => {
      const categoryOk = category === "all" || concept.category === category;
      const queryOk =
        !q ||
        normalize(concept.term).includes(q) ||
        normalize(concept.summary).includes(q) ||
        normalize(concept.examHint).includes(q);
      return categoryOk && queryOk;
    });
  }, [query, category]);
  const selected = conceptById[selectedId] ?? results[0] ?? concepts[0];

  return (
    <div className="reference-hub">
      <div className="term-study-layout">
        <div className="card pad term-browser" id="term-search">
          <h3>用語を選ぶ</h3>
          <input
            className="term-search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例: RAG, 勾配消失, セグメンテーション"
          />
          <div className="category-tabs">
            <button className={`chip ${category === "all" ? "active" : ""}`} onClick={() => setCategory("all")}>
              すべて
            </button>
            {categoryMeta.map((item) => (
              <button
                key={item.id}
                className={`chip ${category === item.id ? "active" : ""}`}
                onClick={() => setCategory(item.id)}
              >
                {item.shortLabel}
              </button>
            ))}
          </div>
          <TermGrid concepts={results} selectedId={selected.id} onSelect={setSelectedId} />
        </div>

        <TermExplanation concept={selected} onSelect={setSelectedId} />
      </div>

      <details className="card pad map-details">
        <summary>関係マップで見る</summary>
        <ConceptGraph />
      </details>
    </div>
  );
}

function TermGrid({
  concepts,
  selectedId,
  onSelect,
}: {
  concepts: Concept[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="term-list">
      {concepts.map((concept) => (
        <button
          className={`term-list-item ${concept.id === selectedId ? "active" : ""}`}
          key={concept.id}
          onClick={() => onSelect(concept.id)}
        >
          <div className="term-card-head">
            <b>{concept.term}</b>
            <span>{categoryMeta.find((item) => item.id === concept.category)?.shortLabel}</span>
          </div>
          <small>{concept.summary}</small>
        </button>
      ))}
    </div>
  );
}

function TermExplanation({
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
  const category = categoryMeta.find((item) => item.id === concept.category);

  return (
    <article className="card pad term-explanation">
      <div className="term-explanation-head">
        <span className="tag">{category?.label}</span>
        <h3>{concept.term}</h3>
        {concept.reading && <p className="reading">{concept.reading}</p>}
      </div>

      <section>
        <h4>意味</h4>
        <p>{concept.summary}</p>
      </section>

      <section>
        <h4>試験での見分け方</h4>
        <p>{concept.examHint}</p>
      </section>

      {related.length > 0 && (
        <section>
          <h4>一緒に覚える用語</h4>
          <div className="related-term-chips">
            {related.slice(0, 10).map(({ relation, other }) => (
              <button key={`${relation.from}-${relation.to}-${other.id}`} onClick={() => onSelect(other.id)}>
                <span>{relationLabel[relation.type]}</span>
                <b>{other.term}</b>
              </button>
            ))}
          </div>
        </section>
      )}

      {concept.demo && (
        <a className="btn primary term-demo-link" href={concept.demo}>
          対応デモで確認する: {demoLabels[concept.demo]}
        </a>
      )}
    </article>
  );
}
