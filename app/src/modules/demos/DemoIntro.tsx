import { conceptById, selectTerm } from "../../data/concepts";
import { demoCategoryMeta, type Demo } from "../../data/demos";

/**
 * 「動かす」セクションの各デモ入口カード(UI改善バッチ §2)。
 * 【見るもの】【動かすもの】【気づくこと】の3行構造で統一し、対応する用語カードへの
 * 逆引きリンクを自動表示する(デモ↔概念のマッピングは demos.ts の conceptIds が一次情報源)。
 */
export default function DemoIntro({ demo }: { demo: Demo }) {
  const relatedConcepts = demo.conceptIds.map((id) => conceptById[id]).filter(Boolean);

  return (
    <div className="card pad demo-intro">
      <p className="demo-intro-purpose">
        「動かす」の目的: 各手法がどう動くかを、実例を操作して視覚的に理解する。
      </p>
      <span className="chip demo-category-chip">{demoCategoryMeta[demo.category].label}</span>
      <dl className="demo-intro-grid">
        <div>
          <dt>【見るもの】</dt>
          <dd>{demo.whatYouSee}</dd>
        </div>
        <div>
          <dt>【動かすもの】</dt>
          <dd>{demo.whatYouMove}</dd>
        </div>
        <div>
          <dt>【気づくこと】</dt>
          <dd>{demo.whatYouNotice}</dd>
        </div>
      </dl>
      {relatedConcepts.length > 0 && (
        <div className="demo-intro-concepts">
          <span className="demo-intro-concepts-label">関連する用語カード:</span>
          <div className="related-term-chips">
            {relatedConcepts.map((concept) => (
              <button key={concept.id} onClick={() => selectTerm(concept.id)}>
                <b>{concept.term}</b>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
