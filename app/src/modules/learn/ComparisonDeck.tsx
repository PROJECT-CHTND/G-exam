import { useState } from "react";
import { comparisons } from "../../data/comparisons";
import { conceptById, selectTerm } from "../../data/concepts";

export default function ComparisonDeck() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([comparisons[0].id]));

  function toggle(id: string) {
    const next = new Set(openIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setOpenIds(next);
  }

  return (
    <div className="learn-stack">
      {comparisons.map((card) => {
        const open = openIds.has(card.id);
        return (
          <article className="card pad comparison-card" key={card.id}>
            <button className="comparison-question" onClick={() => toggle(card.id)}>
              <span>{open ? "閉じる" : "答えを見る"}</span>
              <b>{card.question}</b>
            </button>
            {open && (
              <div className="comparison-answer">
                <p className="exam-cue">{card.examCue}</p>
                <div className="comparison-items">
                  {card.items.map((item) => (
                    <div className="comparison-item" key={item.termId}>
                      <button onClick={() => selectTerm(item.termId)}>{item.label}</button>
                      <p>{item.point}</p>
                      {conceptById[item.termId]?.demo && (
                        <a href={conceptById[item.termId].demo}>対応デモ</a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
