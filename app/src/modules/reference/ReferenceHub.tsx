import { useEffect, useMemo, useRef, useState } from "react";
import {
  categoryMeta,
  conceptById,
  concepts,
  relatedConcepts,
  type Concept,
  type ConceptCategory,
  type ConceptRelation,
} from "../../data/concepts";
import { demoByHash } from "../../data/demos";
import ConceptGraph from "./ConceptGraph";
import { anchorInfo, kindMeta, kindOf, relationGroupHeading, relationGroupOrder, statusOf } from "./cardMeta";

function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, "");
}

export default function ReferenceHub() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ConceptCategory | "all">("all");
  const [selectedId, setSelectedId] = useState(() => window.sessionStorage.getItem("selectedTermId") ?? "ml");
  const [highlightPing, setHighlightPing] = useState(0);

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

  function selectFromMap(id: string) {
    setSelectedId(id);
    setHighlightPing((n) => n + 1);
  }

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

        <TermCard concept={selected} onSelect={setSelectedId} highlightSignal={highlightPing} />
      </div>

      <details className="card pad map-details">
        <summary>関係マップで見る</summary>
        <p className="graph-sync-note">丸をクリックすると、上の用語カードがその用語に切り替わり、強調表示されます。</p>
        <ConceptGraph onNodeSelect={selectFromMap} />
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
      {concepts.map((concept) => {
        const kind = kindMeta[kindOf(concept)];
        const anchor = anchorInfo(concept);
        return (
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
            <div className="term-list-meta">
              <span className={`kind-dot ${kind.className}`} title={kind.label} />
              {anchor && <span className="mini-chip mini-chip-anchor">{anchor.text}</span>}
              {statusOf(concept) === "draft" && <span className="mini-chip mini-chip-draft">整備中</span>}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/** エッジ型×方向でグループ化した関係一覧。矢印の向き(from/to)は見出しの区別として保存する。 */
function useRelationGroups(concept: Concept) {
  return useMemo(() => {
    const groups = new Map<string, { heading: string; items: { relation: ConceptRelation; other: Concept }[] }>();
    for (const relation of relatedConcepts(concept.id)) {
      const isFrom = relation.from === concept.id;
      const otherId = isFrom ? relation.to : relation.from;
      const other = conceptById[otherId];
      if (!other) continue;
      // contrasts_with は方向によらず見出し文が同一(対称関係)のため、fwd/revを1グループに統合する。
      const isSymmetric = relation.type === "contrasts_with";
      const heading = isFrom ? relationGroupHeading[relation.type].forward : relationGroupHeading[relation.type].reverse;
      const key = isSymmetric ? `${relation.type}:sym` : `${relation.type}:${isFrom ? "fwd" : "rev"}`;
      if (!groups.has(key)) groups.set(key, { heading, items: [] });
      groups.get(key)!.items.push({ relation, other });
    }
    return relationGroupOrder
      .flatMap((type) => (type === "contrasts_with" ? [`${type}:sym`] : [`${type}:fwd`, `${type}:rev`]))
      .map((key) => groups.get(key))
      .filter((g): g is NonNullable<typeof g> => !!g && g.items.length > 0);
  }, [concept.id]);
}

function TermCard({
  concept,
  onSelect,
  highlightSignal,
}: {
  concept: Concept;
  onSelect: (id: string) => void;
  highlightSignal?: number;
}) {
  const relationGroups = useRelationGroups(concept);
  const category = categoryMeta.find((item) => item.id === concept.category);
  const kind = kindMeta[kindOf(concept)];
  const anchor = anchorInfo(concept);
  const status = statusOf(concept);
  const articleRef = useRef<HTMLElement>(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!highlightSignal) return;
    articleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setFlash(true);
    const timer = setTimeout(() => setFlash(false), 1400);
    return () => clearTimeout(timer);
    // highlightSignalが増分するたびに再スクロール・再強調する(concept.idの変化だけでは反応しない)。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightSignal]);

  function select(id: string) {
    window.sessionStorage.setItem("selectedTermId", id);
    onSelect(id);
  }

  const demo = concept.demo ? demoByHash[concept.demo] : undefined;

  return (
    <article ref={articleRef} className={`card pad term-explanation ${flash ? "term-explanation-flash" : ""}`}>
      <div className="term-explanation-head">
        <span className="tag">{category?.label}</span>
        <span className={`tag kind-tag ${kind.className}`}>{kind.label}</span>
        {anchor && (
          <span className="tag anchor-tag" title={anchor.title}>
            {anchor.text}
          </span>
        )}
        <span className={`tag status-tag ${status === "draft" ? "status-draft" : "status-complete"}`}>
          {status === "draft" ? "整備中(draft)" : "整備済み"}
        </span>
        {concept.unresolved && concept.unresolvedReason === "proven-limit" ? (
          <span className="tag tag-unresolved" title="数学的に証明された恒久的な制約であり、技術の進歩によって将来解消される性質のものではない。">
            原理的制約(証明済み)
          </span>
        ) : (
          concept.unresolved && (
            <span className="tag tag-unresolved" title="議論・部分的緩和が続くのみで、決着していない問題。">
              本質的に未解決
            </span>
          )
        )}
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

      {relationGroups.length > 0 && (
        <section className="relation-groups">
          <h4>つながり</h4>
          {relationGroups.map((group) => (
            <div className="relation-group" key={group.heading}>
              <p className="relation-group-heading">{group.heading}</p>
              <div className="related-term-chips">
                {group.items.map(({ relation, other }) => (
                  <button key={`${relation.from}-${relation.to}-${other.id}`} onClick={() => select(other.id)}>
                    <span>{categoryMeta.find((item) => item.id === other.category)?.shortLabel}</span>
                    <b>{other.term}</b>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {demo && (
        <a className="btn primary term-demo-link" href={demo.hash}>
          ▶ 動かして理解: {demo.title}
        </a>
      )}
    </article>
  );
}
