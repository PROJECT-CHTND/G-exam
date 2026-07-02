import type { StageId } from "./concepts";

/**
 * 社会実装パイプライン(横軸)。RESTRUCTURE_PLAN.md §4.2 / 付録C を参照。
 *
 * Phase 1 時点では ID・title の骨格のみを定義する。
 * description(題材に即した本文)・conceptIds(登場用語へのリンク)・pitfalls(典型的な失敗)は
 * Phase 2 で執筆する。全ステージを貫く題材は「製造ラインの外観検査AI(不良品の画像検知)」に固定する。
 */

export const pipelineScenario =
  "製造ラインの外観検査AI(不良品の画像検知)を、企画から運用まで一気通貫で見る。";

export type Stage = {
  id: StageId;
  title: string;
  /** この工程で何をするか(題材に即して2〜4文)。 */
  description: string;
  /** 登場する用語(カードへのリンク)。 */
  conceptIds: string[];
  /** 典型的な失敗と、試験で問われる論点。 */
  pitfalls: string;
};

const TODO_BODY = "(Phase 2で執筆)";

export const stages: Stage[] = [
  {
    id: "stage-1",
    title: "企画・課題定義",
    description: TODO_BODY,
    conceptIds: [],
    pitfalls: TODO_BODY,
  },
  {
    id: "stage-2",
    title: "データ収集",
    description: TODO_BODY,
    conceptIds: [],
    pitfalls: TODO_BODY,
  },
  {
    id: "stage-3",
    title: "データ加工・アノテーション",
    description: TODO_BODY,
    conceptIds: [],
    pitfalls: TODO_BODY,
  },
  {
    id: "stage-4",
    title: "モデル開発・学習",
    description: TODO_BODY,
    conceptIds: [],
    pitfalls: TODO_BODY,
  },
  {
    id: "stage-5",
    title: "評価",
    description: TODO_BODY,
    conceptIds: [],
    pitfalls: TODO_BODY,
  },
  {
    id: "stage-6",
    title: "実装・デプロイ",
    description: TODO_BODY,
    conceptIds: [],
    pitfalls: TODO_BODY,
  },
  {
    id: "stage-7",
    title: "運用・監視",
    description: TODO_BODY,
    conceptIds: [],
    pitfalls: TODO_BODY,
  },
];

export const stageById: Record<string, Stage> = Object.fromEntries(stages.map((stage) => [stage.id, stage]));
