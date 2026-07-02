import { childrenOf, conceptById, selectTerm } from "../../data/concepts";

const rootIds = ["ml", "neural-network", "cnn", "rnn", "transformer", "generative-model"];

function childIds(id: string) {
  return childrenOf(id)
    .filter((concept) =>
      [
        "supervised-learning",
        "unsupervised-learning",
        "reinforcement-learning",
        "regression-task",
        "classification-task",
        "clustering",
        "dimensionality-reduction",
        "cnn",
        "rnn",
        "lstm",
        "attention",
        "transformer",
        "bert",
        "gpt",
        "gan",
        "vae",
        "diffusion",
        "llm",
        "rag",
      ].includes(concept.id)
    )
    .map((concept) => concept.id);
}

export default function OverviewMap() {
  return (
    <div className="overview-map card pad">
      {rootIds.map((rootId) => {
        const root = conceptById[rootId];
        if (!root) return null;
        const children = childIds(rootId);
        return (
          <section className="overview-branch" key={rootId}>
            <button className="overview-root" onClick={() => selectTerm(root.id)}>{root.term}</button>
            <div className="overview-children">
              {children.map((id) => {
                const concept = conceptById[id];
                if (!concept) return null;
                return (
                  <button key={id} onClick={() => selectTerm(id)}>
                    {concept.term}
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
