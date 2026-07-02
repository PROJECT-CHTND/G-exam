# stories.ts 棚卸し表

RESTRUCTURE_PLAN.md §4.3 および承認者コメント「stories.ts / StoryFlow の扱い」に基づく棚卸し。
**削除は行わず、既存の `stories.ts` は現状のまま保全する**(承認事項7)。本表はPhase 3で
章ストーリーへ再編する際の設計資料として作成した。

## 1. 物語単位のマッピング

現在 `stories.ts` には物語が1本のみ存在する。

| story id | title | ステップ数 | 帰属する章 | 対応するera区間 |
|---|---|---|---|---|
| `ml-to-genai` | 機械学習から生成AIまでの流れ | 8 | **第2章 人工知能をめぐる動向**(sec-2 / ai-history) — 全史型のため承認事項1の方針どおりここに帰属させる | era-06 〜 era-11(幹06→07→08→枝09/10→11) |

`ml-to-genai` は「機械学習の基礎→特徴量の限界→ニューラルネット→CNN/RNN→Attention→Transformer→LLM」という、
第3章〜第6章の内容を横断する全史ダイジェストになっている。承認事項1の方針(全史型の物語は第2章を帰属先とする)
に従い、この物語自体は第2章(人工知能をめぐる動向)の章ストーリーの下敷きとして扱う。

## 2. ステップ単位のマッピング(Phase 3 章分割の設計資料)

Phase 3でこの1本の全史ストーリーを章単位の複数ストーリーに再編する際、各ステップがどの章・どのera区間の
内容に対応するかを以下に示す。**この表は分割方針の検討資料であり、実際の分割作業はPhase 3のバッチに畳み込む
(承認事項6)。**

| step id | conceptId | 概念のcategory | 分割後の帰属章(候補) | 対応するera区間 | 備考 |
|---|---|---|---|---|---|
| `manual-rule` | (なし) | - | 第2章(導入部) | era-01〜04相当(前史・機械学習以前) | 概念カードに紐付かない導入ステップ |
| `ml` | `ml` | ml-foundation | 第2章 or 第3章冒頭 | era-06 | カードのtimelineアンカーはera-06 |
| `feature` | `feature` | ml-foundation | 第3章 | era-06 | timeline.tsのera-06 wallConceptIdsに対応する「壁」そのもの |
| `neural-network` | `neural-network` | dl-foundation | 第4章 | era-03〜05相当(パーセプトロン〜誤差逆伝播) | カード自体のアンカーはpipeline stage-4のみ(timeline未設定)。章ストーリー側でera-03/05に言及して橋渡しする想定 |
| `cnn-rnn` | `cnn` | cnn-image | 第5章/第6章 | era-08〜09(CNN)、era-05/10(RNN・LSTM) | 1ステップに2系統(画像/系列)の内容が混在しているため、分割時は2ステップに分けるのが望ましい |
| `attention` | `attention` | sequence-nlp-speech | 第5章 | era-10 | |
| `transformer` | `transformer` | sequence-nlp-speech | 第5章 | era-10 | |
| `genai` | `llm` | generative-ai | 第6章 | era-11 | |

## 3. 役割分担の確認(承認事項2)

- **timeline.ts**: 因果の骨格。1 era ≤ 400字、期待→壁→突破のビートのみを持つ。上記ステップの詳細な比喩・
  具体例はtimeline側には持ち込まない。
- **章ストーリー(Phase 3で新設)**: 肉付け。上記ステップが持つ「なぜ次の技術が必要になったか」という
  具体的な問題意識・比喩は、分割後の章ストーリー側にすべて残す。

## 4. 重複解消の方向性(承認事項3)

現時点で `stories.ts`(`ml-to-genai`)と `timeline.ts` が同じ史実(例: CNN→Attention→Transformerの流れ)を
語っている箇所がある。Phase 3で章ストーリーを新設する際は、

1. 史実の記述は章ストーリー側を正とする
2. `timeline.ts` 側は該当eraの `breakthrough` 等を要約1〜2文に留め、章ストーリーへのリンク導線を
   UI側(TimelineSpine → 深掘りリンク)に追加する

という方向で統合する。本表の時点ではまだ `timeline.ts` の記述量を削っていない(次のPhase 3バッチで実施)。

## 5. 相互リンクの設計メモ(承認事項4)

- 各章ストーリー冒頭: 「この章のtimeline上の位置(era-XX〜YY)」を表示する
- 各era(TimelineSpineの表示): 「深掘り: 第N章ストーリー」へのリンクを表示する

具体的なコンポーネント改修はPhase 3のバッチ(章ストーリー新設のタイミング)で行う。

## 6. UIの導線(承認事項5)

`StoryFlow` コンポーネントは章ストーリーのレンダラとして再利用する。ただし「学ぶ」ナビ上で
`TimelineSpine` と並ぶ「全史の入口」としては残さない(物語の入口を2つ作らない)。章単位の導線
(各章のカード一覧・ReferenceHubのカテゴリフィルタ等)からリンクする形に、Phase 3で付け替える。
現時点では `App.tsx` の「ストーリー」ページはそのまま残しており、ナビ構成の変更はまだ行っていない。
