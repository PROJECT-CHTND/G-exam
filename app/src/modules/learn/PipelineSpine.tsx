import { pipelineScenario, stages } from "../../data/pipeline";
import { conceptById, selectTerm } from "../../data/concepts";

export default function PipelineSpine() {
  return (
    <div className="card pad pipeline-spine">
      <h3>社会実装パイプライン</h3>
      <p className="pipeline-scenario">題材: {pipelineScenario}</p>
      <div className="pipeline-flow">
        {stages.map((stage, index) => (
          <div className="pipeline-stage" key={stage.id}>
            <span className="story-index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h4>{stage.title}</h4>
              <p>{stage.description}</p>
              {stage.conceptIds.length > 0 && (
                <div className="era-links">
                  {stage.conceptIds.map((id) => {
                    const concept = conceptById[id];
                    if (!concept) return null;
                    return (
                      <button key={id} className="era-link" onClick={() => selectTerm(id)}>
                        {concept.term}
                      </button>
                    );
                  })}
                </div>
              )}
              <small>典型的な失敗: {stage.pitfalls}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
