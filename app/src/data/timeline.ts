import type { EraId } from "./concepts";

/**
 * 技術史タイムライン(縦軸)。RESTRUCTURE_PLAN.md §4.1 / 付録B を参照。
 *
 * Phase 1 時点では ID・title・branch の骨格のみを定義する。
 * expectation / wall / breakthrough / nextWall の本文執筆と
 * wallConceptIds / breakthroughConceptIds への実カード紐付けは Phase 2 で行う。
 *
 * era-01〜era-08 は一本道。era-09以降は era-08 を分岐点として
 * branch(image/sequence/language/generative/rl/speech)に分かれる。
 */

export type EraBranch = "image" | "sequence" | "language" | "generative" | "rl" | "speech";

export type Era = {
  id: EraId;
  title: string;
  /** 1. その時代に何が期待されたか */
  expectation: string;
  /** 2. 何が壁になったか */
  wall: string;
  /** 壁を表す problem カードへのリンク */
  wallConceptIds: string[];
  /** 3. 壁を破った技術 */
  breakthrough: string;
  /** 突破を表す concept カードへのリンク */
  breakthroughConceptIds: string[];
  /** 4. その技術が生んだ次の壁(次eraへの接続) */
  nextWall: string;
  /** era-09以降の枝。未指定は幹(era-01〜08)。 */
  branch?: EraBranch;
};

const TODO_BODY = "(Phase 2で執筆)";

export const eras: Era[] = [
  {
    id: "era-01",
    title: "黎明(1943〜1956) — 形式ニューロンから「人工知能」の命名まで",
    expectation: TODO_BODY,
    wall: TODO_BODY,
    wallConceptIds: [],
    breakthrough: TODO_BODY,
    breakthroughConceptIds: [],
    nextWall: TODO_BODY,
  },
  {
    id: "era-02",
    title: "第1次AIブーム — 探索・推論の時代",
    expectation: TODO_BODY,
    wall: TODO_BODY,
    wallConceptIds: [],
    breakthrough: TODO_BODY,
    breakthroughConceptIds: [],
    nextWall: TODO_BODY,
  },
  {
    id: "era-03",
    title: "(era-02と並走)パーセプトロンへの期待と最初の停滞",
    expectation: TODO_BODY,
    wall: TODO_BODY,
    wallConceptIds: [],
    breakthrough: TODO_BODY,
    breakthroughConceptIds: [],
    nextWall: TODO_BODY,
  },
  {
    id: "era-04",
    title: "第2次AIブーム — 知識を書き込めば賢くなるはずだった",
    expectation: TODO_BODY,
    wall: TODO_BODY,
    wallConceptIds: [],
    breakthrough: TODO_BODY,
    breakthroughConceptIds: [],
    nextWall: TODO_BODY,
  },
  {
    id: "era-05",
    title: "冬の間に蒔かれた種(1980年代〜1990年代)",
    expectation: TODO_BODY,
    wall: TODO_BODY,
    wallConceptIds: [],
    breakthrough: TODO_BODY,
    breakthroughConceptIds: [],
    nextWall: TODO_BODY,
  },
  {
    id: "era-06",
    title: "統計的機械学習の時代(1990年代〜2000年代)",
    expectation: TODO_BODY,
    wall: TODO_BODY,
    wallConceptIds: [],
    breakthrough: TODO_BODY,
    breakthroughConceptIds: [],
    nextWall: TODO_BODY,
  },
  {
    id: "era-07",
    title: "ブレイクスルーの3条件が揃う — ビッグデータ・GPU・アルゴリズム",
    expectation: TODO_BODY,
    wall: TODO_BODY,
    wallConceptIds: [],
    breakthrough: TODO_BODY,
    breakthroughConceptIds: [],
    nextWall: TODO_BODY,
  },
  {
    id: "era-08",
    title: "2012年 AlexNetがILSVRCを制し、第3次AIブーム開幕",
    expectation: TODO_BODY,
    wall: TODO_BODY,
    wallConceptIds: [],
    breakthrough: TODO_BODY,
    breakthroughConceptIds: [],
    nextWall: TODO_BODY,
  },
  {
    id: "era-09",
    title: "【画像の枝】CNNの系譜と物体検出・セグメンテーションへの拡張",
    expectation: TODO_BODY,
    wall: TODO_BODY,
    wallConceptIds: [],
    breakthrough: TODO_BODY,
    breakthroughConceptIds: [],
    nextWall: TODO_BODY,
    branch: "image",
  },
  {
    id: "era-10",
    title: "【系列の枝】RNNからAttention・Transformerへ",
    expectation: TODO_BODY,
    wall: TODO_BODY,
    wallConceptIds: [],
    breakthrough: TODO_BODY,
    breakthroughConceptIds: [],
    nextWall: TODO_BODY,
    branch: "sequence",
  },
  {
    id: "era-11",
    title: "【言語の枝】word2vecからLLM・生成AIブームへ",
    expectation: TODO_BODY,
    wall: TODO_BODY,
    wallConceptIds: [],
    breakthrough: TODO_BODY,
    breakthroughConceptIds: [],
    nextWall: TODO_BODY,
    branch: "language",
  },
  {
    id: "era-12",
    title: "【生成の枝】オートエンコーダからVAE・GAN・拡散モデルへ",
    expectation: TODO_BODY,
    wall: TODO_BODY,
    wallConceptIds: [],
    breakthrough: TODO_BODY,
    breakthroughConceptIds: [],
    nextWall: TODO_BODY,
    branch: "generative",
  },
  {
    id: "era-13",
    title: "【強化学習の枝】Q学習からAlphaGo・AlphaZeroへ",
    expectation: TODO_BODY,
    wall: TODO_BODY,
    wallConceptIds: [],
    breakthrough: TODO_BODY,
    breakthroughConceptIds: [],
    nextWall: TODO_BODY,
    branch: "rl",
  },
  {
    id: "era-14",
    title: "【音声の枝】隠れマルコフモデルから大規模音声モデルへ",
    expectation: TODO_BODY,
    wall: TODO_BODY,
    wallConceptIds: [],
    breakthrough: TODO_BODY,
    breakthroughConceptIds: [],
    nextWall: TODO_BODY,
    branch: "speech",
  },
];

export const eraById: Record<string, Era> = Object.fromEntries(eras.map((era) => [era.id, era]));
