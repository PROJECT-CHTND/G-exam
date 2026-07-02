# G-exam 教材再構成 指示書(リポジトリ現状対応版)

**対象リポジトリ**: PROJECT-CHTND/G-exam
**実行者**: コーディングエージェント(Claude Code / Cursor 等)
**この文書の使い方**: 本書は `docs/RESTRUCTURE_PLAN.md` としてリポジトリに配置されている。エージェントには「`docs/RESTRUCTURE_PLAN.md` を読み、Phase 1 のみを実行して停止せよ」のようにフェーズ単位で依頼する。以降のフェーズも人間のレビューを挟んで1つずつ依頼する。**全フェーズの一括実行を依頼・実行してはならない。**

> **改訂メモ(2026-07-02)**: 本書の初版は「Markdown ファイル群(terms/, chapters/, spine/ …)による教材リポジトリ」を前提に書かれていた。しかし現在のリポジトリの実態は **React (Vite + TypeScript) 製のインタラクティブ学習アプリ**(`app/`)であり、用語カード・型付き関係グラフ・比較カード・ストーリー・白紙再現・16種の実データデモが**既に実装されている**。本改訂版は初版の設計思想(学習者プロファイル、2質問、型付きエッジ、2本の背骨、機械検証)を維持したまま、実装先を既存アプリのデータ層・UI 層に置き換えたものである。

---

## 0. 背景とゴール

### 0.1 学習者プロファイル(最重要の設計前提)

この教材の対象者は次の認知特性を持つ:

- **再認記憶が非常に強い**。問題集を周回すると、ページ配置や字面を「見たことがある」と判定できてしまい、内容を理解しないまま2周目以降の正答率だけが上がる
- **個々の用語は覚えられるが、用語間の関係・因果・ストーリーが構築されない**ため、初見の問われ方や関係を問う問題に対応できない
- 全体構造・空間配置の把握は得意(実務では視野の広さを評価されている)

したがってこの教材の役割は「用語の説明を並べること」ではない。**すべての用語を因果の線の上に配置し、「関係そのもの」を記憶と演習の対象にすること**である。以降のあらゆる設計判断はこの一点から導かれている。

### 0.2 現状の資産(2026-07-02 時点の監査サマリ)

リポジトリ構成:

```
/gkentei_ml_dl_concept_map.md   # Mermaid 図による概念整理メモ(初期資料。アプリに実質移植済み)
/app/                           # Vite + React + TypeScript 学習アプリ「gkentei-visual-lab」
  src/data/concepts.ts          #   用語カード 269枚 + 型付き関係 202本(単一の真実源)
  src/data/stories.ts           #   ストーリー 1本(ML→生成AI、8ステップ、問題→次への形式)
  src/data/comparisons.ts       #   対比カード 8枚
  src/data/iris.ts ほか         #   デモ用実データ(Iris / Palmer Penguins / MNIST)
  src/modules/learn/            #   OverviewMap, ComparisonDeck, StoryFlow, RecallCheck(白紙再現4問)
  src/modules/reference/        #   ReferenceHub(用語カード閲覧・検索), ConceptGraph(関係グラフ表示)
  src/modules/                  #   実データ駆動デモ 16種(分類・回帰・k-means・PCA・過学習・ROC・
                                #   NN・CNN・Attention・LSTM・word2vec・RAG/拡散・バンディット 等)
```

既に実現できていること:

- 用語カードは `Concept` 型(id / term / category(12分類) / summary / purpose / difference / examHint / demo)で構造化済み
- 関係は **7種の型付きエッジ**(`is_a` / `part_of` / `evolves_to` / `solves` / `used_for` / `contrasts_with` / `pipeline_next`)で 202 本定義済み
- ConceptGraph がカテゴリ別の概念地図を動的描画し、エッジ型を色分け表示する
- 「学ぶ → 動かす → まとめ」の3部構成のナビゲーションと、白紙再現(RecallCheck)・対比(ComparisonDeck)・ストーリー(StoryFlow)の学習形式が存在する

### 0.3 現状の課題(本計画で解決するもの)

1. **シラバスに対する網羅性が測定できない**。シラバスの機械可読データ(`syllabus.ts` 相当)が存在せず、269枚のカードがシラバス項目のどこを覆い、どこに穴があるか分からない
2. **2質問(§1 P2)が未整備**。`purpose` / `difference` の記入は約50語のみ(269枚中)で、残りは summary と examHint だけの「点の解説」になっている
3. **背骨(timeline / pipeline)が存在しない**。ストーリーは1本(8ステップ)のみで、技術史の「期待→壁→突破」の連鎖も、データ収集→運用の社会実装フローも表現されていない。カードに背骨アンカーのフィールドがない
4. **スコープの穴**: 「人工知能の概要」(第1次・第2次ブーム、探索・推論、エキスパートシステム、フレーム問題等)と「社会実装フロー」(CRISP-DM、PoC、アノテーション、データリーケージ等)の用語がほぼ未収録。人名カード(kind: person)も存在しない
5. **検証スクリプトがない**。id の一意性・エッジの参照整合性・網羅性は TypeScript の型検査では守れず、目視頼みになっている(実際に不整合が既に混入している。§6 Phase 0 の既知所見を参照)
6. **再認対策の演習が薄い**。白紙再現は全体で4問のみ。白地図(ノード名を伏せた概念地図)モードがない。2質問のセルフチェック表がない
7. **README.md が存在せず**、学習動線(何をどの順で使うか)が示されていない

### 0.4 ゴール

1. スコープ内(「人工知能の概要」〜「ディープラーニングの応用」+ 社会実装フロー)の全シラバス項目がカバーされ、**それが `cd app && npm run validate` で機械的に検証できる**
2. すべての用語カードが (a) 技術史タイムライン(era)、(b) データ収集→プロダクト運用のパイプライン(stage)、の**いずれか(または両方)にアンカーされている**
3. すべての用語カードが**2つの質問**——「①何の問題を解決するために生まれたか」「②その前は何が使われていて、何が足りなかったか」——に答えている
4. 「読む教材(ストーリー・地図)」と「思い出す教材(白地図・白紙再現)」がアプリ内で分離され、README に学習動線が記載されている

---

## 1. 設計原則(迷ったときの判断基準)

**P1: 用語は点ではなく線の上に置く。**
独立した用語解説を作らない。すべての用語は timeline(いつ・何の失敗を受けて生まれたか)か pipeline(実務フローのどの工程で使うか)のノードに必ずアンカーする。どちらにも置けない用語は、置き場所が見つかるまで `status: "draft"` とする。

**P2: 2つの質問に答えるまでカードは complete にしない。**
「①何の問題を解決するために生まれたか」「②その前は何が使われ、何がダメだったか」。この2つが埋まらない用語は「知っているが理解していない」用語であり、draft のまま残して可視化する。無理に埋めて捏造することを禁ずる。

**P3: 関係は自由記述ではなく型付きエッジで書く。**
これは既に `relations` 配列で実現されている。型のない「関連」を追加してはならない。エッジ型は §3.2 の10種に限定し、**方向の規約(from / to の意味)を厳守**する。

**P4: 網羅性は主観で判断しない。**
公式シラバスを機械可読データ(`app/src/data/syllabus.ts`)に落とし、全カードとの対応を `npm run validate` で照合する。「だいたい網羅した」は禁句。

**P5: 再認で解ける教材を作らない。**
読む教材(ストーリー・カード)とは別に、レイアウト記憶が使えない出力形式——白地図モードの穴埋め、白紙再現のお題——を各章に必ず付ける。選択式の演習問題より白紙再現を優先する。

原則同士が衝突する場合は **P2(捏造しない)> P4(網羅性)> その他** の優先順位とする。

---

## 2. 目標構成

大規模なディレクトリ再編は行わない。**アプリ(`app/`)を教材の本体、`app/src/data/` を知識グラフの単一の真実源**として維持し、以下を追加・拡張する。

```
/README.md                      # 【新規】学習の入口。教材の使い方と推奨学習動線
/docs/
  RESTRUCTURE_PLAN.md           # 本書
  audit-report.md               # 【新規】Phase 0 の成果物(シラバス突合・カバレッジ表)
  coverage-report.md            # 【新規】Phase 4 の最終カバレッジレポート
/gkentei_ml_dl_concept_map.md   # 初期資料として保全(削除禁止。Phase 4 で docs/ へ移動可)
/app/
  scripts/
    validate.ts                 # 【新規】整合性・網羅性チェック(付録D)。cd app && npm run validate で実行
  src/data/
    concepts.ts                 # 【拡張】Concept 型に kind / syllabus / timeline / pipeline /
                                #         bornToSolve / beforeAndGap / recall / status を追加
    syllabus.ts                 # 【新規】シラバス項目リスト(網羅性チェックの基準)
    timeline.ts                 # 【新規】背骨1: 技術史 era-01〜era-14(付録B)
    pipeline.ts                 # 【新規】背骨2: 社会実装フロー stage-1〜stage-7(付録C)
    stories.ts                  # 【拡張】章(カテゴリ)ごとのストーリーへ増補
  src/modules/learn/
    TimelineSpine.tsx           # 【新規】技術史ページ(期待→壁→突破の連鎖を描画)
    PipelineSpine.tsx           # 【新規】社会実装フローページ(題材で7工程を貫く)
    RecallCheck.tsx             # 【拡張】カードの recall フィールドから章別に集約
  src/modules/reference/
    ConceptGraph.tsx            # 【拡張】白地図モード(ノード名を ? に伏せ、エッジ型は残す)
    ReferenceHub.tsx            # 【拡張】2質問表示・era/stage フィルタ・2質問チェック表
```

既存ファイルの削除を禁止する。役目を終えたファイルは削除せず docs/ 配下へ移動する(移動は事前に対象一覧を提示して承認を得る)。

---

## 3. データ設計

### 3.1 用語カード(`app/src/data/concepts.ts` の `Concept` 型)

**frontmatter 相当は TypeScript の型で強制する。** 既存フィールドは維持し、次のように拡張する:

```ts
export type ConceptKind = "concept" | "problem" | "person";
export type ConceptStatus = "draft" | "complete";
export type EraId = `era-${string}`;      // era-01 〜 era-14(timeline.ts で定義)
export type StageId = `stage-${string}`;  // stage-1 〜 stage-7(pipeline.ts で定義)

export type Concept = {
  id: string;                 // 既存。英小文字ケバブケース。リポジトリ全体で一意
  term: string;               // 既存
  reading?: string;           // 既存
  category: ConceptCategory;  // 既存(12分類 + 新設2分類。§3.3)
  summary: string;            // 既存
  examHint: string;           // 既存(試験で狙われる誤解・ひっかけ)
  demo?: string;              // 既存(インタラクティブデモへのリンク)

  kind?: ConceptKind;         // 【新規】省略時 "concept"
  syllabus?: string[];        // 【新規】syllabus.ts の項目ID(複数可)
  timeline?: EraId;           // 【新規】背骨アンカー。concept は timeline / pipeline の少なくとも一方が必須
  pipeline?: StageId;         // 【新規】背骨アンカー
  bornToSolve?: string;       // 【新規】質問①: 何の問題を解決するために生まれたか(1〜3文)
  beforeAndGap?: string;      // 【新規】質問②: その前は何が使われていて、何が足りなかったか(1〜3文)
  recall?: string;            // 【新規】この用語を含む白紙再現のお題を1つ
  status?: ConceptStatus;     // 【新規】省略時 "draft"
};
```

**既存フィールドとの関係:**

- 既存の `purpose`(何のために使うか)/ `difference`(何と違うか)は約50語に記入済み。これらは `bornToSolve` / `beforeAndGap` の**暫定値として改名移行**する(機械的リネーム。Phase 1)。ただし記述の contract は2質問に変わるため、Phase 2 で2質問に答えているかをレビューし、満たさないカードは `status: "draft"` のままにする
- `examHint` は初版の `exam_traps` に相当する。1文で足りない場合のみ配列化を検討する(任意)

**kind 別の読み替え(フィールドは共通、意味を切り替える):**

- `problem`(過学習、勾配消失、フレーム問題、コールドスタート問題等): `bornToSolve` には**なぜ起きるか(cause)**、`beforeAndGap` には**放置すると何が困るか(consequence)**を書く。UI のラベルも kind で切り替える。**問題は一級のノード**であり、`solves` エッジの受け皿になる。G検定は「問題と解決策の対応」を執拗に問うため、問題を用語と同格に扱うことが本設計の要である。既存カードでは overfitting / underfitting / vanishing-gradient / exploding-gradient / cold-start / hallucination / curse-dimensionality / spurious-correlation / local-minimum などが problem 化の候補
- `person`(ヒントン、ルカン、福島邦彦 等。**現状0枚**): 2質問は不要。`proposed` エッジで業績と結ぶ。人名と業績のマッチング問題への対策
- パイプライン側の**工程用語**(アノテーション、データ拡張、A/B テスト等)は、①を「この工程は何の問題を防ぐために存在するか」、②を「これを省く/雑にやると何が壊れるか」と読み替えて書く

### 3.2 エッジ型(この10種以外を使わない)

既存7種を維持し、3種を追加する。**方向の規約(from → to)を明文化し厳守する**こと。

| type | 状態 | 意味(from → to) | 例 |
|---|---|---|---|
| `is_a` | 既存 | from は to の一種(下位 → 上位) | dropout → regularization |
| `part_of` | 既存 | from は to の構成要素 | self-attention → transformer |
| `solves` | 既存 | from は to という問題を解決・緩和する | resnet(skip-connection) → vanishing-gradient |
| `suffers_from` | **追加** | from は to という問題を抱える | sigmoid → vanishing-gradient |
| `evolves_to` | 既存 | **from は to を改良して生まれた(from=後継、to=前身)** | lstm → rnn |
| `contrasts_with` | 既存 | 試験で対比されがち(対称関係。1本だけ張る) | bagging ↔ boosting |
| `requires` | **追加** | from は to を前提とする | fine-tuning → pretraining |
| `used_for` | 既存 | from は to で採用・応用される/〜に使う | relu → activation の用途文脈 |
| `pipeline_next` | 既存 | 手順上、from の次に to が来る | forward → loss-function |
| `proposed` | **追加** | (person 専用)from は to を提案した | hinton → backprop |

**注意:**

- `evolves_to` は初版の `improves-on` に相当する。既存 202 本の大半はこの規約(from=後継)に従っているが、**逆向きの混入が確認されている**(§6 Phase 0 既知所見)。Phase 1 で規約を `concepts.ts` のコメントに明記し、Phase 2 で全数レビューする
- **`suffers_from` と `evolves_to` の組が「前の技術の失敗を直すために次が生まれた」というストーリーの最小単位**になる。系譜上の用語(RNN→LSTM→…、CNN の各世代、SGD→…→AdamW など)には、この組を途切れなく張ること。鎖が切れている箇所は Phase 3 で最優先の増補対象とする
- `contrasts_with` は対称関係なので1方向1本だけ登録し、UI・validate 側で両方向として扱う(既存の `contrastsOf()` はこの挙動になっている)

### 3.3 カテゴリ(章)

既存の12カテゴリ(`categoryMeta`)を「章」として扱う。スコープの穴を埋めるため2カテゴリを新設する:

- `ai-history`: 人工知能の概要・歴史(第1次〜第3次ブーム、探索・推論、知識表現、ブームの壁)
- `ai-project`: AIプロジェクト・社会実装(企画〜運用の工程用語。法律・契約・倫理は**スタブのみ**)

Phase 0 で公式シラバスの章・項目と categoryMeta の対応表を作成し、章の粒度を確定させる。

### 3.4 シラバスデータ(`app/src/data/syllabus.ts`)

公式シラバスの全項目を列挙する。**項目 ID・章立ては Phase 0 で JDLA 公式サイトの最新シラバス PDF と必ず突合し、正式な章・項目名・キーワードで確定させること。**(2026年時点の現行が どの改訂版かも確認対象)

```ts
export type SyllabusItem = { id: string; title: string; keywords: string[] };
export type SyllabusSection = {
  id: string;
  title: string;
  inScope: boolean;
  items: SyllabusItem[];
};

export const syllabusVersion = "要確認: JDLA 公式の最新シラバス版を Phase 0 で確定";
export const syllabus: SyllabusSection[] = [
  // 公式シラバスの章・項目・キーワードを網羅的に転記
];
```

**スコープ**: 「人工知能の概要」〜「ディープラーニングの応用」に該当する章を `inScope: true`。数理・統計、法律・契約、倫理・ガバナンスの章は `false`。ただしパイプライン軸(stage-2, 3, 7)に登場する法律・契約用語は、**アンカーだけ張った draft スタブを置いてよい**(詳細解説は書かない。将来の拡張点として位置だけ確保する)。

---

## 4. 2本の背骨の仕様

### 4.1 `app/src/data/timeline.ts` + `TimelineSpine.tsx`(縦軸: 技術史)

- 全体を **「期待 → 壁 → 突破 → 新たな壁」の連鎖**として一本の物語で表現する。各 era ノードは必ず次の4要素を持つ:

```ts
export type Era = {
  id: EraId;             // "era-01" 〜 "era-14"
  title: string;         // 例: "第2次ブーム — 知識を書き込めば賢くなるはずだった"
  expectation: string;   // 1. その時代に何が期待されたか
  wall: string;          // 2. 何が壁になったか
  wallConceptIds: string[];         // problem カードへのリンク
  breakthrough: string;  // 3. 壁を破った技術
  breakthroughConceptIds: string[]; // concept カードへのリンク
  nextWall: string;      // 4. その技術が生んだ次の壁(次 era への接続)
  branch?: "image" | "sequence" | "language" | "generative" | "rl" | "speech";
                         // era-09 以降の枝。未指定は幹
};
```

- 用語の詳細説明はカードに任せ、timeline 本体は**因果の流れ**に集中する(1ノードあたり本文200〜400字+リンク)
- 年号・人名は確実なもののみ記載。不確かな場合は `// TODO: 要出典確認` を付す
- 最小ノードセットは付録B。これを下回らないこと(追加は自由)。era-08 までを**一本道**とし、era-09 以降は「幹から分かれる枝」として `branch` で明示する(枝の分岐点はすべて era-08)
- 既存 `stories.ts` の「ml-to-genai」ストーリー(8ステップ)は timeline の幹に内容が重なるため、Phase 2 で timeline に統合するか、章ストーリーとして再編する(削除はしない)

### 4.2 `app/src/data/pipeline.ts` + `PipelineSpine.tsx`(横軸: データ→プロダクト)

- **架空だが具体的な題材を1つ最初に固定し、全ステージをその題材で通す**。推奨題材: 「製造ラインの外観検査AI(不良品の画像検知)を企画から運用まで」。抽象論の羅列にしないこと
- 7ステージ(付録C)。各ステージに:
  1. この工程で何をするか(題材に即して2〜4文)
  2. 登場する用語(カードへのリンク = conceptIds)
  3. 典型的な失敗と、試験で問われる論点
- 法律・契約・倫理の用語は該当ステージにアンカー(draft スタブ)だけ張る
- **この軸の狙い**: 「ディープラーニングの社会実装」系の設問は工程順の並べ替えや工程と論点の対応で問われる。学習者には「工程の空間配置」として覚えさせるのが最も適合する。また stage-4/5 の用語群は timeline 側にも登場するため、**両軸からアンカーされる用語は交差点として ConceptGraph 上で強調**する(二重枠にする等)

---

## 5. 学習用コンポーネント

### 5.1 章ストーリー(`stories.ts` + StoryFlow の拡張)

- 章(カテゴリ)ごとにストーリーを1本以上持たせる(現状は全体で1本)
- 既存の StoryStep 形式(problem → next)は初版の「因果接続詞で繋いだ物語」の要件をほぼ満たしている。これを維持し、各ステップは必ず「前の何が足りなかったか」から書き始める
- 章の冒頭に3〜10文の「この章のストーリー」(何が問題で、どう解決されていく章なのか)を持たせる
- **「1章=1ストーリー」原則の例外(Phase 3バッチ5レビューで確定)**: 第7章(AIの社会実装に向けて、
  項目35・36)は `stories.ts` に専用の章ストーリーを持たない。`pipeline.ts` の stage-1〜7 本文
  (外観検査AIという一貫した題材で企画からデプロイ・運用まで語る読み物)が、この章にとっての
  「章ストーリー」を実質的に兼ねると判断したため。条件: ①stage-1〜7が一貫した題材で語られていること
  (現状: 外観検査AIで統一、満たしている) ②項目35バッチ完了時にstage-1(企画・課題定義)本文の
  厚みを再点検すること(未実施・要確認) ③本項目としてこの例外をここに明記すること(本項目)。

### 5.2 概念地図と白地図(ConceptGraph の拡張)

- ConceptGraph は既にカテゴリ別の概念地図をエッジ型の色分き付きで描画している。これに**白地図モード**を追加する: 同じグラフでノードラベルを `?` に置換する(エッジと型ラベル・色は残す)。学習者が「位置と関係から名前を復元する」演習に使う。これはページ配置の記憶が通用しない、関係の理解だけを問う演習形式である
- 白地図モードでノードをクリックすると答え(用語名)を1つずつ開示できるようにする
- 静的な Mermaid ファイル生成(初版の `build_maps.py`)は行わない。アプリの動的描画がこれを代替する

### 5.3 白紙再現(RecallCheck の拡張)

- お題のハードコード(現状4問)をやめ、**カードの `recall` フィールドから章別に集約**する。章ごとにお題3〜7個
- 形式は「〜の原因と対策を知っている限り全部書け」「A から B までの系譜を、各段階で何が問題になったかと共に書け」
- **模範解答は書かない**。代わりに「答え合わせに使うカード・地図へのリンク」を置く(解答の二重管理を避け、カードを真実源に保つ)。既存の `answer` 配列はカードへの参照リンクに置き換える

### 5.4 2質問チェック表(ReferenceHub または章ページ)

- 章内全用語 × 質問①② の ☑ 欄(学習者のセルフチェック用)。チェック状態は localStorage に保存する
- 「答えられない用語」を特定し、そのカードだけ読み直して白地図に戻る、という動線(§Phase 4 の README)の起点になる

### 5.5 索引・検索(ReferenceHub の拡張)

- 既存のカテゴリ別・全文検索に加え、**era 別 / stage 別のフィルタ**を追加する(背骨からの逆引き)
- カード詳細に bornToSolve / beforeAndGap / recall / status / 背骨アンカーを表示する。draft カードにはバッジを付けて「未理解の可視化」とする

---

## 6. 作業フェーズ(必ずこの順で。各フェーズ末で停止して報告し、承認を待つ)

### Phase 0: 監査(リポジトリへの変更は docs/audit-report.md の追加のみ)

1. JDLA 公式サイトから最新シラバスを確認する(Web アクセス不可なら本書付録の仮置きを使い、その旨を明記)
2. `docs/audit-report.md` を作成する:
   - シラバス項目 × 既存269カードの暫定カバレッジ表(カバー済 / 部分的 / 未カバー)
   - 公式シラバス章 ↔ categoryMeta(章)の対応表と、新設カテゴリ(ai-history / ai-project)の項目割り当て案
   - 既存 202 エッジの方向・型の全数レビュー結果(下記の既知所見の確認と追加検出)
   - **確認事項リスト**(スコープの解釈、シラバス版、章の粒度など、人間の判断が必要な点をすべて列挙する。**勝手に仮定して進めない**)
3. 停止して報告する

**既知の監査所見(本改訂時に検出済み。Phase 0 で確認し、Phase 1〜2 で修正する):**

- `evolves_to` の方向規約(from=後継、to=前身)に対し、`cam → grad-cam` が逆向き(CAM が前身)
- `cold-start → collaborative-filtering (solves)` は意味が逆。協調フィルタリングがコールドスタート問題を**抱える**関係であり、`suffers_from` 追加後に `collaborative-filtering → cold-start (suffers_from)` へ修正すべき
- `pruning → decision-tree (solves)` は「問題でないもの」への solves。solves の to は problem カードに限定する規約とし、`decision-tree → overfitting (suffers_from)` + `pruning → overfitting (solves)` 型に張り替える
- `purpose` / `difference` の記入は 269 枚中約 50 枚。残り約 220 枚は2質問が未記入(= 事実上の draft)

### Phase 1: スキーマと検証基盤

1. `Concept` 型の拡張(§3.1)、エッジ型3種の追加(§3.2)、方向規約のコメント明記、`purpose`/`difference` → `bornToSolve`/`beforeAndGap` の機械的リネーム
2. **型変更に UI の利用箇所を同一コミットで追随させる**(これを怠ると `tsc -b` が通らず、手順5の完了条件を満たせない):
   - `ConceptGraph.tsx` / `ReferenceHub.tsx` の `relationLabel` / `relationColor` は `Record<RelationType, …>` で**網羅的**なため、追加3種(`suffers_from` / `requires` / `proposed`)のラベルと色を追加する
   - `ReferenceHub.tsx` の用語カード表示は `concept.purpose` / `concept.difference` を参照しているため、新フィールド名(`bornToSolve` / `beforeAndGap`)に更新する
   - ここでは**コンパイルが通る最小限の追随**にとどめる(kind 別ラベル切替や2質問チェック表などの UI 磨き込みは Phase 4)
3. `app/src/data/syllabus.ts`(Phase 0 の確定版)、`app/src/data/timeline.ts` / `pipeline.ts` の**型と骨格のみ**(era/stage の ID と title。本文は Phase 2)
4. `app/scripts/validate.ts` を作成(チェック項目は付録D)。`tsx` を devDependency に追加し、`app/package.json` に `"validate": "tsx scripts/validate.ts"` を登録する
5. 見本カードを3枚整備: concept 1枚(dropout を拡張)、problem 1枚(vanishing-gradient を kind: "problem" 化)、person 1枚(新規。付録Aを流用してよい)
6. `npm run validate` と `npm run build` がエラーなく通ることを確認し、停止して報告。**npm スクリプトはすべて `app/` ディレクトリで実行する**(package.json は `app/` にのみ存在する。以降のフェーズも同様)

### Phase 2: 背骨の執筆と既存カードの接続

1. `timeline.ts` の era-01〜era-14 の本文(付録B)、`pipeline.ts` の stage-1〜stage-7 の本文(付録C)を執筆し、`TimelineSpine.tsx` / `PipelineSpine.tsx` をナビゲーション「学ぶ」グループに追加する
2. 既存269カードに **1章(カテゴリ)ぶんずつ** 背骨アンカー(timeline / pipeline)と syllabus ID を付与する。2質問がその場で埋められないカードは `status: "draft"` のまま残す(無理に埋めない。捏造禁止)
3. 既知所見のエッジ修正(§Phase 0)と `evolves_to` 全数の方向統一、系譜への `suffers_from` 張り
4. 1章ごとに validate 実行 → コミット。全章終了で停止し、draft 残数を含めて報告

### Phase 3: 網羅性の増補

1. validate の未カバーレポートに基づき、未カバー項目のカードを新規作成する。優先順位: ①系譜の鎖(`evolves_to` / `suffers_from`)が切れている箇所 ②シラバスの明示キーワード ③その周辺
2. 特に穴が確定している領域: **ai-history**(第1次・第2次ブームの用語群、フレーム問題、シンボルグラウンディング問題等)、**ai-project**(CRISP-DM、PoC、アノテーション、データリーケージ、A/Bテスト等)、**person カード**(人名と業績のマッチング対策)
3. 1バッチ = シラバス1節。バッチごとに validate → コミット
4. draft カードの complete 昇格(2質問 + エッジ2本 + 背骨アンカーが揃ったもののみ)

### Phase 4: 学習UIの仕上げと検証

1. validate 全項目をエラー0で通過させる
2. ConceptGraph の白地図モード、RecallCheck の recall フィールド集約、2質問チェック表、ReferenceHub の era/stage フィルタを実装する(§5)
3. `README.md` を新規作成し、**学習動線**を記載する:
   ① 技術史(TimelineSpine)を通読(まず物語を1本、頭に入れる)→ ② 章ストーリーとカードを読む → ③ 白地図モードを埋める → ④ 白紙再現のお題で書き出す → ⑤ 2質問チェック表で「答えられない用語」を特定し、そのカードだけ読み直して ③ に戻る。「動かす」の16デモは各章の該当箇所からリンクする
4. 最終カバレッジレポートを `docs/coverage-report.md` に出力し、完了報告

---

## 7. 制約・禁止事項

- **実在の過去問・市販問題集・公式例題の文面を転載しない**(著作権)。演習を作る場合は完全オリジナルとし、選択式よりも白紙再現・白地図を優先する
- 事実(年号、人名、数値)に確信が持てない場合は、記載を避けるか `// TODO: 要出典確認` を付す。**もっともらしい捏造は本プロジェクト最悪の失敗**として扱う
- 既存ファイルの削除を禁止する(役目を終えたものは docs/ へ移動)。大規模リネーム・移動を伴う操作は、事前に対象一覧を提示して承認を得る
- **既存のインタラクティブデモ(16種)と既存ページを壊さない**。各フェーズの完了条件に `npm run build`(tsc + vite build)の成功を含める。npm スクリプトは `app/` ディレクトリで実行する(ルートに package.json は存在しない)
- **全フェーズの一括実行を禁止する**。フェーズ内でもコンテキストが長くなったら、区切りのよい所でコミットして停止し、新しいセッションで再開できる状態を保つ(本書 + audit-report + validate の出力を読めば再開可能であること)
- 表記: 日本語。用語は初出時に英語併記。文体は既存アプリの文体(です・ます調の簡潔な説明)に合わせる
- カード本文(summary + 2質問)は合計300〜600字目安。公式テキストの要約コピーにしない。「なぜ」から書き始める
- コミットメッセージは `phase1: スキーマ拡張と validate 追加` のようにフェーズ接頭辞を付ける

---

## 8. 完了条件(Definition of Done)

- [ ] `cd app && npm run validate` が全チェックをエラー0で通過する
- [ ] `cd app && npm run build` が成功する(既存デモ・ページの非破壊)
- [ ] `inScope` のシラバス項目カバレッジ100%(各項目に complete カード1枚以上)
- [ ] 全 concept カード: 2質問記入済み・型付きエッジ2本以上・背骨アンカー1つ以上
- [ ] 系譜用語(付録Bの各系列)に `evolves_to` / `suffers_from` の鎖が途切れなく張られている
- [ ] 各章: ストーリー導入・概念地図・白地図モード・白紙再現お題3個以上・2質問チェック表を備える
- [ ] README に学習動線が記載され、初期資料(gkentei_ml_dl_concept_map.md)が保全されている

---

## 付録A: 用語カード記入例(3枚)

既存の `c()` ヘルパは拡張フィールドに対応させる(オブジェクトリテラル直書きでもよい)。

### A-1: concept の例 — dropout(既存カードの拡張)

```ts
{
  id: "dropout",
  term: "Dropout",
  category: "dl-tech",
  kind: "concept",
  syllabus: ["5-XX"],   // Phase 0 で確定した項目IDに置換
  timeline: "era-07",
  pipeline: "stage-4",
  summary: "訓練時に一部ニューロンをランダムに無効化する正則化。",
  bornToSolve:
    "多層ニューラルネットワークが訓練データに過剰適合(過学習)し、未知データで性能が落ちる問題。" +
    "特に大きなネットワークでは特定のニューロン同士が共適応し、訓練データにしか通用しない特徴の拾い方を覚えてしまう。",
  beforeAndGap:
    "L2正則化や早期終了は存在したが、ニューロン間の共適応そのものを直接壊す手段がなかった。" +
    "複数モデルの平均を取るアンサンブルは有効だが、巨大NNを何個も訓練するのは計算コストが高すぎた。",
  examHint: "学習時にランダムに無効化し、推論時は全ニューロンを使う——推論時にも無効化する、と誤らせる選択肢が定番。",
  recall: "過学習への対策を知っている限り挙げ、それぞれが「何を抑え込んでいるのか」を一言ずつ添えよ。",
  demo: "#overfit",
  status: "complete",
}
// edges(relations 配列に追加):
// { from: "dropout", to: "overfitting", type: "solves" }        // 既存
// { from: "dropout", to: "regularization", type: "is_a" }
// { from: "dropout", to: "batchnorm", type: "contrasts_with" }
```

### A-2: problem の例 — vanishing-gradient(既存カードの kind 変更)

```ts
{
  id: "vanishing-gradient",
  term: "勾配消失問題",
  category: "dl-tech",
  kind: "problem",
  syllabus: ["5-XX"],
  timeline: "era-05",
  summary: "層を逆伝播するうちに勾配が小さくなり学習が進まない問題。",
  bornToSolve:  // problem では cause(なぜ起きるか)として読む
    "誤差逆伝播では勾配を出力層から入力層へ層ごとの微分の掛け算で伝える。" +
    "シグモイド関数の微分は最大0.25なので、層が深いほど勾配が指数的に小さくなる。",
  beforeAndGap: // problem では consequence(放置すると何が困るか)として読む
    "入力に近い層の重みがほぼ更新されず、層を深くしても学習が進まない。" +
    "第3次ブーム以前に「深層化」を阻んだ最大の技術的障壁。",
  examHint: "解決策の系譜を順不同で問われる: 事前学習 → ReLU → スキップ結合(ResNet)、系列方向では LSTM のゲート機構。",
  recall: "勾配消失はなぜ起きるかを式を使わずに説明し、これを解決・緩和した技術を系譜順に4つ挙げよ。",
  status: "complete",
}
// problem カード自身は solves エッジを持たない。解決側の concept から
// { from: "relu", to: "vanishing-gradient", type: "solves" } などを張り(既存)、
// validate が「この問題を解く技術が1つも登録されていない」ケースを警告する(付録D-6)。
```

### A-3: パイプライン工程用語の例 — annotation(新規。timeline アンカーなしでよい例)

```ts
{
  id: "annotation",
  term: "アノテーション",
  category: "ai-project",
  kind: "concept",
  syllabus: ["7-XX"],
  pipeline: "stage-3",
  summary: "収集した生データに人手で正解ラベルを付与する工程。",
  bornToSolve:
    "教師あり学習には正解ラベル付きデータが必要だが、収集した生データにはラベルがない。" +
    "人手で正解を付与する工程がアノテーション。",
  beforeAndGap: // 工程用語なので読み替え: これを雑にやると何が壊れるか
    "ラベルの品質が低い・付与基準が作業者間で揺れると、以降どれだけモデルを改良しても精度が頭打ちになる。" +
    "garbage in, garbage out の入口。",
  examHint: "アノテーションコストを下げる手法群(転移学習、データ拡張、半教師あり学習、自己教師あり学習)との組み合わせで問われる。",
  recall: "外観検査AIの教師データ作成で、アノテーション起因で精度が頭打ちになる失敗を2つ挙げ、それぞれの予防策を述べよ。",
  status: "complete",
}
// edges:
// { from: "annotation", to: "supervised-learning", type: "used_for" }
// { from: "annotation", to: "self-supervised", type: "contrasts_with" }
```

---

## 付録B: タイムライン最小ノードセット(timeline.ts の骨格)

各 era は「期待 → 壁 → 突破」の連鎖で書く。**壁(→)の部分が problem カード、突破の部分が concept カードになる。**
年号・人名は執筆時に一次情報で確認し、不確かなものは TODO マークを付けること。
`(既存)` は現在の concepts.ts に対応カードが存在するもの。無印は Phase 3 の新規作成対象。

| era | 内容(期待 → 壁 → 突破) |
|---|---|
| era-01 | 黎明(1943〜56): 形式ニューロン、チューリングテスト、ダートマス会議で「人工知能」命名 |
| era-02 | 第1次ブーム = 探索・推論: 探索木、ハノイの塔、STRIPS、SHRDLU、ELIZA → 壁: トイプロブレム、組合せ爆発、フレーム問題 → 第1次冬 |
| era-03 | (era-02 と並走)パーセプトロン(既存)への期待 → 壁: 線形分離不可能の指摘 → NN研究の停滞 |
| era-04 | 第2次ブーム = 知識表現: エキスパートシステム(MYCIN、DENDRAL)、意味ネットワーク、オントロジー、Cyc → 壁: 知識獲得のボトルネック、シンボルグラウンディング問題、常識の壁 → 第2次冬 |
| era-05 | 冬の間に蒔かれた種(1980s〜90s): 誤差逆伝播法(既存)、ネオコグニトロン(既存)、LeNet(既存)、LSTM(既存) → 壁: 勾配消失(既存)、計算資源不足、データ不足 |
| era-06 | 統計的機械学習の時代(1990s〜2000s): SVM とカーネル法(既存)、決定木(既存)、アンサンブル(既存: バギング/ブースティング/ランダムフォレスト) → 壁: 特徴量設計が人手依存(特徴量(既存)エンジニアリングの限界) |
| era-07 | ブレイクスルーの3条件が揃う: ビッグデータ(ILSVRC/ImageNet(既存))、GPU(既存)、アルゴリズム(オートエンコーダ(既存)による事前学習、ReLU(既存)、Dropout(既存)) |
| era-08 | 2012 AlexNet(既存)が ILSVRC を制し、第3次ブーム開幕(深層学習が特徴量設計を自動化) |
| era-09 | 【枝: 画像】CNN の系譜(既存: VGG → GoogLeNet → ResNet、スキップ結合)/ 物体検出(既存: R-CNN 系 → YOLO・SSD)/ セグメンテーション(既存: FCN、U-Net) |
| era-10 | 【枝: 系列】RNN(既存) → 壁: 系列方向の勾配消失 → LSTM / GRU(既存) → seq2seq(既存) → 壁: 固定長ベクトルのボトルネック → Attention(既存) → 壁: 逐次処理で並列化できない → Transformer(既存) |
| era-11 | 【枝: 言語】word2vec(既存) → ELMo(既存) → BERT(既存)/ GPT(既存) → スケーリング則(既存) → LLM・基盤モデル(既存) → インストラクションチューニング・RLHF(既存) → 生成AIブーム |
| era-12 | 【枝: 生成】オートエンコーダ(既存) → VAE(既存)/ GAN(既存) → 拡散モデル(既存) |
| era-13 | 【枝: 強化学習】Q学習(既存) → DQN(既存) → AlphaGo(既存) → AlphaZero(既存)/ AlphaFold |
| era-14 | 【枝: 音声】隠れマルコフモデル(既存) → DNN-HMM → End-to-End(CTC(既存)) → 大規模音声モデル |

timeline は era-08 までを**一本道**として書き、era-09 以降は「幹から分かれる枝」として `branch` フィールドで明示的に構成すること(枝の分岐点はすべて era-08)。era-01〜04 の用語群はほぼ全て新規作成(ai-history カテゴリ)となる。

---

## 付録C: パイプラインステージ定義(pipeline.ts の骨格)

題材例「製造ラインの外観検査AI」で全ステージを貫くこと。`(既存)` は対応カードが存在するもの。

| stage | 工程 | アンカーする代表用語(例。網羅はシラバスに従う) |
|---|---|---|
| stage-1 | 企画・課題定義 | AIプロジェクトの進め方、CRISP-DM、PoC、AI適用可否の判断、KPI設計 |
| stage-2 | データ収集 | オープンデータセット、Webスクレイピング、IoT/センサ、サンプリングバイアス、〔法律スタブ: 著作権法30条の4、個人情報保護法、カメラ画像利活用ガイドブック〕 |
| stage-3 | データ加工・アノテーション | 前処理(欠損値・外れ値・正規化/標準化)、データ拡張(既存)、アノテーション、train/val/test 分割(既存)、データリーケージ、〔契約スタブ: AI・データ契約ガイドライン〕 |
| stage-4 | モデル開発・学習 | ベースライン、転移学習・ファインチューニング(既存)、ハイパーパラメータ探索(グリッド/ランダム/ベイズ)、過学習と正則化(既存)、最適化手法(既存: SGD → Adam)、バッチ正規化(既存) |
| stage-5 | 評価 | ホールドアウト法(既存)、交差検証(既存)、混同行列(既存)、正解率/適合率/再現率/F値(既存)、ROC-AUC(既存)、回帰指標(既存: MSE/RMSE/MAE)、ビジネスKPIとの接続 |
| stage-6 | 実装・デプロイ | クラウド/エッジ推論(既存: エッジAI)、モデル圧縮(既存: 量子化・プルーニング・蒸留)、API化、A/Bテスト |
| stage-7 | 運用・監視 | MLOps(既存)、データドリフト(既存)/コンセプトドリフト、再学習、XAI(既存: LIME・SHAP・Grad-CAM)、〔ガバナンススタブ: 透明性・アカウンタビリティ〕 |

stage-1〜3, 6 の工程用語は大半が新規作成(ai-project カテゴリ)となる。stage-4/5 は既存カードへのアンカー付与が中心。

---

## 付録D: validate.ts のチェック項目

`app/scripts/validate.ts`。`concepts.ts` / `syllabus.ts` / `timeline.ts` / `pipeline.ts` を import して検査し、エラー(exit 1)と警告を分けて出力する。

1. **一意性・必須フィールド**: 全カードの id 一意性(TS では強制されないため必須)。complete カードは kind に応じた必須フィールド(concept: bornToSolve / beforeAndGap、problem: 同フィールドを cause / consequence として記入)を持つこと
2. **アンカー必須**: kind: concept の complete カードは timeline / pipeline の少なくとも一方を持つ
3. **参照整合性**: relations の from / to が存在する id を指す(dangling エッジの検出)。concepts の timeline / pipeline / syllabus が timeline.ts / pipeline.ts / syllabus.ts の定義済み ID を指す。era ノードの wallConceptIds / breakthroughConceptIds、stage の conceptIds も同様
4. **対称性**: `contrasts_with` が両方向に重複登録されている場合は警告(1本に統一)。`proposed` の from が kind: person でない場合はエラー
5. **孤立ノード**: エッジ0本かつ被参照0回のカードを警告
6. **未解決問題**: kind: problem のカードが、どの concept からも `solves` で参照されていない場合は警告(「解決策が未整理の問題」として Phase 3 の対象に)。problem カード自身が `solves` の from になっている場合はエラー
7. **網羅性**: syllabus.ts の inScope 項目それぞれについて、対応するカード(syllabus フィールドで紐づく)の有無と status を集計し、未カバー一覧・draft 一覧をレポート出力
8. **系譜の鎖**: `evolves_to` で繋がる系列(付録Bの各枝)について、from(後継)側の前身ノードに `suffers_from` → 後継の `solves` の対応があるかを確認(ストーリーの断絶検出)。また `evolves_to` 全エッジの一覧を出力し、方向規約(from=後継)の目視レビューに使う
9. **UI 整合**: demo フィールドの値が demoLinks / App.tsx のページ hash に存在すること。recall フィールドを持つカードが章あたり3個以上あること(Phase 4 以降)

---

## 実行モデルへの補足

- 本書を読了したら、まず**本書の要約と依頼されたフェーズの実行計画を3〜5行で提示**してから作業を開始すること(理解の齟齬をここで検出する)
- 各フェーズの完了条件に `npm run validate`(Phase 1 以降)と `npm run build` の成功を含める(いずれも `app/` ディレクトリで実行)
- 迷ったら §1 の設計原則に立ち返る。優先順位は P2(捏造しない)> P4(網羅性)> その他
