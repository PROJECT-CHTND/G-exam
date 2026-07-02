import { useMemo, useState } from "react";
import { eras, type EraBranch } from "../../data/timeline";
import { conceptById, selectTerm } from "../../data/concepts";

const BRANCH_LABEL: Record<EraBranch, string> = {
  image: "画像",
  sequence: "系列",
  language: "言語",
  generative: "生成",
  rl: "強化学習",
  speech: "音声",
};

function ConceptLinks({ ids }: { ids: string[] }) {
  if (ids.length === 0) return null;
  return (
    <div className="era-links">
      {ids.map((id) => {
        const concept = conceptById[id];
        if (!concept) return null;
        return (
          <button key={id} className="era-link" onClick={() => selectTerm(id)}>
            {concept.term}
          </button>
        );
      })}
    </div>
  );
}

function goToStory(storyId: string) {
  window.location.hash = "story";
  window.setTimeout(() => {
    document.getElementById(`story-${storyId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}

function EraCard({ era }: { era: (typeof eras)[number] }) {
  return (
    <div className="era-card">
      <h4>{era.title}</h4>
      <p className="era-row">
        <span className="era-tag">期待</span>
        {era.expectation}
      </p>
      <p className="era-row">
        <span className="era-tag wall">壁</span>
        {era.wall}
      </p>
      <ConceptLinks ids={era.wallConceptIds} />
      <p className="era-row">
        <span className="era-tag breakthrough">突破</span>
        {era.breakthrough}
      </p>
      <ConceptLinks ids={era.breakthroughConceptIds} />
      <p className="era-row">
        <span className="era-tag next">次の壁</span>
        {era.nextWall}
      </p>
      {era.storyId && (
        <button className="text-link era-deep-dive" onClick={() => goToStory(era.storyId!)}>
          深掘り: 章ストーリーを読む
        </button>
      )}
    </div>
  );
}

export default function TimelineSpine() {
  const trunk = useMemo(() => eras.filter((era) => !era.branch), []);
  const branches = useMemo(() => eras.filter((era) => era.branch), []);
  const branchIds = useMemo(
    () => Array.from(new Set(branches.map((era) => era.branch as EraBranch))),
    [branches]
  );
  const [activeBranch, setActiveBranch] = useState<EraBranch>(branchIds[0]);

  return (
    <div className="timeline-spine">
      <div className="card pad">
        <h3>幹(era-01〜08) — 冬と春を繰り返した歴史の一本道</h3>
        <div className="era-trunk">
          {trunk.map((era) => (
            <EraCard era={era} key={era.id} />
          ))}
        </div>
      </div>

      <div className="card pad">
        <h3>枝(era-09〜) — 2012年AlexNet以降、分野ごとに分岐</h3>
        <div className="era-branch-tabs">
          {branchIds.map((branch) => (
            <button
              key={branch}
              className={`era-branch-tab ${branch === activeBranch ? "active" : ""}`}
              onClick={() => setActiveBranch(branch)}
            >
              {BRANCH_LABEL[branch]}
            </button>
          ))}
        </div>
        <div className="era-trunk">
          {branches
            .filter((era) => era.branch === activeBranch)
            .map((era) => (
              <EraCard era={era} key={era.id} />
            ))}
        </div>
      </div>
    </div>
  );
}
