import { useMemo, useState } from "react";
import {
  categoryMeta,
  conceptById,
  concepts,
  childrenOf,
  contrastsOf,
  demoLabels,
  parentsOf,
  relatedConcepts,
  relations,
  siblingsOf,
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
  suffers_from: "抱えている課題",
  used_for: "使われる場面",
  contrasts_with: "対比して覚える用語",
  requires: "前提となる技術",
  pipeline_next: "手順上のつながり",
  proposed: "提案した人物",
};

export default function ReferenceHub() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ConceptCategory | "all">("all");
  const [selectedId, setSelectedId] = useState(() => window.sessionStorage.getItem("selectedTermId") ?? "ml");

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

        <TermCard concept={selected} onSelect={setSelectedId} />
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
          onClick={() => {
            window.sessionStorage.setItem("selectedTermId", concept.id);
            onSelect(concept.id);
          }}
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

function TermCard({
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
  const parents = parentsOf(concept.id);
  const children = childrenOf(concept.id).slice(0, 10);
  const similar = [...contrastsOf(concept.id), ...siblingsOf(concept.id)]
    .filter((item, index, array) => array.findIndex((other) => other.id === item.id) === index)
    .slice(0, 10);

  function select(id: string) {
    window.sessionStorage.setItem("selectedTermId", id);
    onSelect(id);
  }

  return (
    <article className="card pad term-explanation">
      <div className="term-explanation-head">
        <span className="tag">{category?.label}</span>
        <h3>{concept.term}</h3>
        {concept.reading && <p className="reading">{concept.reading}</p>}
      </div>

      <section>
        <h4>一言でいうと</h4>
        <p>{concept.summary}</p>
      </section>

      <section>
        <h4>何の問題を解決するために生まれた？</h4>
        <p>{concept.bornToSolve ?? category?.description}</p>
      </section>

      <section>
        <h4>上位概念</h4>
        <ConceptChips concepts={parents} empty="このデータ内では上位概念なし" onSelect={select} />
      </section>

      <section>
        <h4>下位概念</h4>
        <ConceptChips concepts={children} empty="この用語の下位概念は未登録" onSelect={select} />
      </section>

      <section>
        <h4>似ているもの</h4>
        <ConceptChips concepts={similar} empty="比較対象は未登録" onSelect={select} />
      </section>

      {concept.beforeAndGap && (
        <section>
          <h4>その前は何が使われ、何が足りなかった？</h4>
          <p>{concept.beforeAndGap}</p>
        </section>
      )}

      <section>
        <h4>試験で聞かれそうな形</h4>
        <p>{concept.examHint}</p>
      </section>

      {related.length > 0 && (
        <details className="related-details">
          <summary>関係エッジを見る</summary>
          <div className="related-term-chips">
            {related.slice(0, 10).map(({ relation, other }) => (
              <button key={`${relation.from}-${relation.to}-${other.id}`} onClick={() => select(other.id)}>
                <span>{relationLabel[relation.type]}</span>
                <b>{other.term}</b>
              </button>
            ))}
          </div>
        </details>
      )}

      {concept.demo && (
        <a className="btn primary term-demo-link" href={concept.demo}>
          対応デモで確認する: {demoLabels[concept.demo]}
        </a>
      )}
    </article>
  );
}

function ConceptChips({
  concepts,
  empty,
  onSelect,
}: {
  concepts: Concept[];
  empty: string;
  onSelect: (id: string) => void;
}) {
  if (concepts.length === 0) {
    return <p className="empty-copy">{empty}</p>;
  }
  return (
    <div className="related-term-chips">
      {concepts.map((concept) => (
        <button key={concept.id} onClick={() => onSelect(concept.id)}>
          <span>{categoryMeta.find((item) => item.id === concept.category)?.shortLabel}</span>
          <b>{concept.term}</b>
        </button>
      ))}
    </div>
  );
}
