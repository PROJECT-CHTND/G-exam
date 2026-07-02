import { stories, type Story } from "../../data/stories";
import { conceptById, selectTerm } from "../../data/concepts";

function StoryCard({ story }: { story: Story }) {
  return (
    <div className="card pad story-card" id={`story-${story.id}`}>
      <h3>{story.title}</h3>
      {story.eraRange && <p className="story-era-range">この章のtimeline上の位置: {story.eraRange}</p>}
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

export default function StoryFlow() {
  return (
    <div className="story-flow-list">
      {stories.map((story) => (
        <StoryCard story={story} key={story.id} />
      ))}
    </div>
  );
}
