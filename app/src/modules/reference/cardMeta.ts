/**
 * 用語カードの表示メタデータ(UI改善バッチ §1)。
 * カード本文・エッジのデータ自体は変更せず、表示用の補助情報のみをここに定義する。
 */
import type { Concept, ConceptKind, RelationType } from "../../data/concepts";
import { eras } from "../../data/timeline";
import { stages } from "../../data/pipeline";

export const kindMeta: Record<ConceptKind, { label: string; className: string }> = {
  concept: { label: "概念", className: "kind-concept" },
  problem: { label: "問題", className: "kind-problem" },
  person: { label: "人物", className: "kind-person" },
};

export function kindOf(concept: Concept): ConceptKind {
  return concept.kind ?? "concept";
}

export function statusOf(concept: Concept): "draft" | "complete" {
  return concept.status ?? "draft";
}

/** era.title は1文が長いため、チップ表示用の短いラベルを別途持つ(timeline.tsのtitleは変更しない)。 */
const eraShortLabel: Record<string, string> = {
  "era-01": "黎明期",
  "era-02": "第1次AIブーム",
  "era-03": "パーセプトロンの停滞",
  "era-04": "第2次AIブーム",
  "era-05": "AIの冬(1980〜90年代)",
  "era-06": "統計的機械学習",
  "era-07": "ブレイクスルー前夜",
  "era-08": "第3次AIブーム開幕",
  "era-09": "画像の枝",
  "era-10": "系列の枝",
  "era-11": "言語の枝",
  "era-12": "生成の枝",
  "era-13": "強化学習の枝",
  "era-14": "音声の枝",
};

const eraById = Object.fromEntries(eras.map((e) => [e.id, e]));
const stageById = Object.fromEntries(stages.map((s) => [s.id, s]));

export function anchorInfo(concept: Concept): { text: string; title: string } | null {
  if (concept.timeline) {
    const era = eraById[concept.timeline];
    const short = eraShortLabel[concept.timeline] ?? concept.timeline;
    return { text: `${concept.timeline} ${short}`, title: era?.title ?? concept.timeline };
  }
  if (concept.pipeline) {
    const stage = stageById[concept.pipeline];
    return { text: `${concept.pipeline} ${stage?.title ?? ""}`.trim(), title: stage?.title ?? concept.pipeline };
  }
  return null;
}

/**
 * エッジ型ごとに、方向(このカードがfrom側かto側か)で読み下し見出しを変える。
 * 「無型の関連用語」を作らないための唯一の関連表示経路として使う。
 */
export const relationGroupHeading: Record<RelationType, { forward: string; reverse: string }> = {
  is_a: { forward: "上位概念(このカードが属するもの)", reverse: "下位概念(このカードに属するもの)" },
  part_of: { forward: "全体(このカードが構成要素であるもの)", reverse: "構成要素(このカードを構成するもの)" },
  evolves_to: { forward: "発展元(このカードの前身)", reverse: "発展先(このカードの後継)" },
  solves: { forward: "このカードが解決する問題", reverse: "この問題を解決する手段" },
  suffers_from: { forward: "このカードが抱えている問題", reverse: "この問題を抱えているもの" },
  used_for: { forward: "このカードが使われる場面", reverse: "この場面で使われる技術" },
  contrasts_with: { forward: "対比して問われるもの", reverse: "対比して問われるもの" },
  requires: { forward: "このカードが前提とするもの", reverse: "このカードを前提とするもの" },
  pipeline_next: { forward: "次の手順", reverse: "前の手順" },
  proposed: { forward: "この人物が提案したもの", reverse: "提案した人物" },
};

/** 見出し表示順(前提→解決→課題→用途→対比→階層→系譜→手順→人物、の順に並べる)。 */
export const relationGroupOrder: RelationType[] = [
  "requires",
  "solves",
  "suffers_from",
  "used_for",
  "contrasts_with",
  "is_a",
  "part_of",
  "evolves_to",
  "pipeline_next",
  "proposed",
];
