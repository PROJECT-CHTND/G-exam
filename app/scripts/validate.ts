/**
 * データ整合性・網羅性の検証スクリプト。
 * 実行: `cd app && npm run validate`
 *
 * チェック項目は docs/RESTRUCTURE_PLAN.md 付録D に準拠する。
 * エラー(exit 1)と警告(exit 0のまま)を分けて出力する。
 */
import { concepts, relations, demoLabels, type Concept } from "../src/data/concepts";
import { syllabus, syllabusItemById } from "../src/data/syllabus";
import { eras } from "../src/data/timeline";
import { stages } from "../src/data/pipeline";

type Issue = { area: string; message: string };

const errors: Issue[] = [];
const warnings: Issue[] = [];

function err(area: string, message: string) {
  errors.push({ area, message });
}
function warn(area: string, message: string) {
  warnings.push({ area, message });
}

const conceptIds = new Set(concepts.map((c) => c.id));
const conceptById = new Map(concepts.map((c) => [c.id, c]));
const eraIds = new Set(eras.map((e) => e.id));
const stageIds = new Set(stages.map((s) => s.id));
const syllabusIds = new Set(Object.keys(syllabusItemById));

function kindOf(concept: Concept) {
  return concept.kind ?? "concept";
}
function statusOf(concept: Concept) {
  return concept.status ?? "draft";
}

// ---------------------------------------------------------------------------
// 1. 一意性・必須フィールド
// ---------------------------------------------------------------------------
{
  const seen = new Map<string, number>();
  concepts.forEach((c) => seen.set(c.id, (seen.get(c.id) ?? 0) + 1));
  for (const [id, count] of seen) {
    if (count > 1) err("id一意性", `id "${id}" が ${count} 回重複して定義されている`);
  }

  for (const c of concepts) {
    if (statusOf(c) !== "complete") continue;
    const kind = kindOf(c);
    if (kind === "concept" || kind === "problem") {
      if (!c.bornToSolve) err("必須フィールド", `${c.id}: status=complete だが bornToSolve が空(kind=${kind})`);
      if (!c.beforeAndGap) err("必須フィールド", `${c.id}: status=complete だが beforeAndGap が空(kind=${kind})`);
    }
    // kind: person は2質問不要(proposedエッジの有無は §4節で別途チェック)
  }
}

// ---------------------------------------------------------------------------
// 2. アンカー必須(kind: concept の complete カードのみ)
// ---------------------------------------------------------------------------
for (const c of concepts) {
  if (statusOf(c) !== "complete") continue;
  if (kindOf(c) !== "concept") continue;
  if (!c.timeline && !c.pipeline) {
    err("背骨アンカー", `${c.id}: status=complete(kind=concept)だが timeline/pipeline のどちらも未設定`);
  }
}

// ---------------------------------------------------------------------------
// 3. 参照整合性
// ---------------------------------------------------------------------------
for (const rel of relations) {
  if (!conceptIds.has(rel.from)) err("参照整合性(relations)", `from="${rel.from}" が concepts に存在しない(to="${rel.to}", type=${rel.type})`);
  if (!conceptIds.has(rel.to)) err("参照整合性(relations)", `to="${rel.to}" が concepts に存在しない(from="${rel.from}", type=${rel.type})`);
}

for (const c of concepts) {
  if (c.timeline && !eraIds.has(c.timeline)) err("参照整合性(timeline)", `${c.id}: timeline="${c.timeline}" が timeline.ts に存在しない`);
  if (c.pipeline && !stageIds.has(c.pipeline)) err("参照整合性(pipeline)", `${c.id}: pipeline="${c.pipeline}" が pipeline.ts に存在しない`);
  if (c.syllabus) {
    for (const sid of c.syllabus) {
      if (!syllabusIds.has(sid)) err("参照整合性(syllabus)", `${c.id}: syllabus項目id="${sid}" が syllabus.ts に存在しない`);
    }
  }
}

for (const era of eras) {
  for (const id of era.wallConceptIds) {
    if (!conceptIds.has(id)) err("参照整合性(timeline)", `${era.id}: wallConceptIds に未知のid "${id}"`);
  }
  for (const id of era.breakthroughConceptIds) {
    if (!conceptIds.has(id)) err("参照整合性(timeline)", `${era.id}: breakthroughConceptIds に未知のid "${id}"`);
  }
}

for (const stage of stages) {
  for (const id of stage.conceptIds) {
    if (!conceptIds.has(id)) err("参照整合性(pipeline)", `${stage.id}: conceptIds に未知のid "${id}"`);
  }
}

// ---------------------------------------------------------------------------
// 4. 対称性
// ---------------------------------------------------------------------------
{
  const contrastPairs = new Set<string>();
  for (const rel of relations) {
    if (rel.type !== "contrasts_with") continue;
    const key = [rel.from, rel.to].sort().join("::");
    if (contrastPairs.has(key)) {
      warn("対称性(contrasts_with)", `${rel.from} <-> ${rel.to} が両方向で重複登録されている(1本に統一すること)`);
    }
    contrastPairs.add(key);
  }

  for (const rel of relations) {
    if (rel.type !== "proposed") continue;
    const fromConcept = conceptById.get(rel.from);
    if (!fromConcept || kindOf(fromConcept) !== "person") {
      err("対称性(proposed)", `proposed の from="${rel.from}" が kind:person ではない(to="${rel.to}")`);
    }
  }
}

// ---------------------------------------------------------------------------
// 5. 孤立ノード
// ---------------------------------------------------------------------------
{
  const referenced = new Set<string>();
  for (const rel of relations) {
    referenced.add(rel.from);
    referenced.add(rel.to);
  }
  for (const c of concepts) {
    if (!referenced.has(c.id)) warn("孤立ノード", `${c.id}: エッジが1本も張られていない`);
  }
}

// ---------------------------------------------------------------------------
// 6. 未解決問題
// ---------------------------------------------------------------------------
{
  const solvesFrom = new Set(relations.filter((r) => r.type === "solves").map((r) => r.from));
  const solvesTo = new Set(relations.filter((r) => r.type === "solves").map((r) => r.to));
  for (const c of concepts) {
    if (kindOf(c) !== "problem") continue;
    if (solvesFrom.has(c.id)) {
      err("未解決問題", `${c.id}: kind=problem のカード自身が solves の from になっている(禁止)`);
    }
    if (!solvesTo.has(c.id)) {
      warn("未解決問題", `${c.id}: kind=problem だがこの問題を解決する solves エッジが1本もない`);
    }
  }
}

// ---------------------------------------------------------------------------
// 7. 網羅性(syllabus カバレッジ)
// ---------------------------------------------------------------------------
type CoverageRow = {
  sectionTitle: string;
  itemId: string;
  itemTitle: string;
  inScope: boolean;
  complete: number;
  draft: number;
};
const coverageRows: CoverageRow[] = [];
for (const section of syllabus) {
  for (const item of section.items) {
    if (!section.inScope) {
      coverageRows.push({
        sectionTitle: section.title,
        itemId: item.id,
        itemTitle: item.title,
        inScope: false,
        complete: 0,
        draft: 0,
      });
      continue;
    }
    const linked = concepts.filter((c) => c.syllabus?.includes(item.id));
    const complete = linked.filter((c) => statusOf(c) === "complete").length;
    const draft = linked.filter((c) => statusOf(c) === "draft").length;
    coverageRows.push({
      sectionTitle: section.title,
      itemId: item.id,
      itemTitle: item.title,
      inScope: true,
      complete,
      draft,
    });
    if (complete === 0 && draft === 0) {
      warn("網羅性", `項目${item.id}「${item.title}」: 対応カードが1枚もない(未着手)`);
    } else if (complete === 0) {
      warn("網羅性", `項目${item.id}「${item.title}」: draftカードのみで complete カードが0枚`);
    }
  }
}

// ---------------------------------------------------------------------------
// 8. 系譜の鎖(evolves_to の一覧出力 + 簡易チェック)
// ---------------------------------------------------------------------------
const evolvesToEdges = relations.filter((r) => r.type === "evolves_to");
const suffersFromEdges = relations.filter((r) => r.type === "suffers_from");
const solvesEdges = relations.filter((r) => r.type === "solves");
for (const edge of evolvesToEdges) {
  // from=後継, to=前身。前身が抱える問題を後継が解決している、という鎖が繋がっているかを軽くチェックする。
  const predecessorProblems = suffersFromEdges.filter((r) => r.from === edge.to).map((r) => r.to);
  const successorSolves = solvesEdges.filter((r) => r.from === edge.from).map((r) => r.to);
  const linked = predecessorProblems.some((p) => successorSolves.includes(p));
  if (!linked) {
    warn(
      "系譜の鎖(参考情報)",
      `${edge.from} → ${edge.to}(evolves_to): suffers_from/solves の対応する組がまだ登録されていない(Phase 2/3で系譜のproblemカードとエッジを充実させる想定。suffers_fromは現時点で0本のため全件が対象)`
    );
  }
}

// ---------------------------------------------------------------------------
// 9. UI整合(demoリンク)
// ---------------------------------------------------------------------------
const demoKeys = new Set(Object.keys(demoLabels));
for (const c of concepts) {
  if (c.demo && !demoKeys.has(c.demo)) {
    err("UI整合(demo)", `${c.id}: demo="${c.demo}" が demoLabels に存在しない`);
  }
}
// recallフィールドの章あたり3個以上チェックはPhase4以降のUI仕上げ後に有効化する(現時点ではスキップ)。

// ---------------------------------------------------------------------------
// 出力
// ---------------------------------------------------------------------------
function printIssues(title: string, issues: Issue[]) {
  console.log(`\n### ${title}(${issues.length}件)`);
  if (issues.length === 0) {
    console.log("  なし");
    return;
  }
  for (const issue of issues) {
    console.log(`  [${issue.area}] ${issue.message}`);
  }
}

console.log("=== G-exam データ検証 (app/scripts/validate.ts) ===");
console.log(`concepts: ${concepts.length}枚 / relations: ${relations.length}本 / eras: ${eras.length} / stages: ${stages.length}`);

const completeCount = concepts.filter((c) => statusOf(c) === "complete").length;
const draftCount = concepts.length - completeCount;
console.log(`status: complete=${completeCount} / draft(省略時含む)=${draftCount}`);

console.log("\n--- カバレッジサマリ(syllabus inScope項目) ---");
const inScopeRows = coverageRows.filter((r) => r.inScope);
const outOfScopeRows = coverageRows.filter((r) => !r.inScope);
const covered = inScopeRows.filter((r) => r.complete > 0).length;
const partial = inScopeRows.filter((r) => r.complete === 0 && r.draft > 0).length;
const uncovered = inScopeRows.filter((r) => r.complete === 0 && r.draft === 0).length;
console.log(`inScope項目: ${inScopeRows.length} 件中 complete達成=${covered} / draftのみ=${partial} / 未着手=${uncovered}`);
console.log(`対象外(inScope:false)項目: ${outOfScopeRows.length} 件 — ${outOfScopeRows.map((r) => `${r.itemId}(${r.itemTitle})`).join(", ")}`);

console.log("\n--- evolves_to エッジ一覧(方向規約 from=後継 / to=前身 の目視レビュー用) ---");
for (const edge of evolvesToEdges) {
  console.log(`  ${edge.from} → ${edge.to}`);
}

printIssues("ERROR", errors);
printIssues("WARNING", warnings);

console.log(`\n合計: ERROR ${errors.length}件 / WARNING ${warnings.length}件`);

if (errors.length > 0) {
  console.error("\n検証失敗: ERRORを解消してください。");
  process.exit(1);
} else {
  console.log("\n検証成功(ERRORなし)。WARNINGは今後のPhaseで解消していきます。");
}
