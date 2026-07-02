import { stories } from "../../data/stories";
import { conceptById, selectTerm } from "../../data/concepts";

export default function StoryFlow() {
  const story = stories[0];

  return (
    <div className="card pad story-card">
      <h3>{story.title}</h3>
      <div className="story-flow">
        {story.steps.map((step, index) => {
          const concept = step.conceptId ? conceptById[step.conceptId] : undefined;
          return (
            <div className="story-step" key={step.id}>
              <span className="story-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h4>{step.title}</h4>
                <p>{step.problem}</p>
                <small>{step.next}</small>
                {concept && (
                  <button className="text-link" onClick={() => selectTerm(concept.id)}>
                    用語カード: {concept.term}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
