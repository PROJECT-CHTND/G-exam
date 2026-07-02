# キーワード・バックログ(網羅性管理台帳)

`docs/audit-report.md` §2「主な未収録キーワード」列を正式なバックログとして台帳化したもの。
承認事項(Phase 3バッチ1レビュー #4)に基づき、以後の網羅性管理は **シラバス項目単位ではなく
この表のキーワード消し込み単位** で行う。1キーワード = 1カード とは限らない
(複数キーワードを1カードにまとめる場合はその旨を備考に記す)。

チェック済み(`[x]`)= 該当キーワードをカバーするカードが `concepts.ts` に存在し、
`syllabus` フィールドで当該項目に紐付いている状態を指す。`status: complete` であることまでは
求めない(complete化は別途「既存カードのdraft昇格バッチ」で扱う)。

凡例: ✅ 済 / 🟡 一部 / ⬜ 穴(Phase 0 audit-report.md §2 時点のステータス)

---

## personカード 保留・再判定リスト

キーワード表とは別に、personカード(kind: "person")の選定に関する保留事項をここで管理する。

- **松尾豊**: Phase 3バッチ4では「直結できるカードがない」として見送ったが、レビューにより
  「見送り」ではなく**項目1バッチで再判定**に変更。項目1バッチで人工知能の定義・ディープラーニングの
  定義・人工知能のレベル分類まわりのカード(artificial-intelligence, ai-effect, deep-learning,
  ai-level-classification 等)を作成し再判定した結果、**見送り継続**。日本におけるディープラーニング
  普及の文脈で語られることは多いが、「proposed(提案した)」と断定できる単一の技術的貢献
  (Hintonのように特定の技術を提案した、のような一文)を教科書的に確立した形で書けなかったため、
  無理に person 化せず本リストへ残置(P2)。次の再判定タイミングは、日本のAI政策・産学連携文脈の
  カード(項目35「AIプロジェクトの進め方」等)を作成するバッチ。

- **ロドニー・ブルックス(行動主義ロボティクス)**: `embodiment`(身体性)カードのcomplete昇格に
  2本目のエッジが必要になった際の正規の遅延追加ケース(Phase 3ミニバッチ再レビューで発動条件を確定)。
  **トリガー**: `embodiment`をdraftからcompleteへ再昇格させるバッチに着手する時点で、ブルックスの
  person カードを新規作成し `brooks → proposed → embodiment`(または相当のkind:person接続)を張る。
  それまでは新規作成しない。

---

## stories.ts「ml-to-genai」の吸収管理(未着手8ステップ)

`ml-to-genai`(機械学習から生成AIまでの流れ、8ステップ: manual-rule/ml/feature/neural-network/
cnn-rnn/attention/transformer/genai)は、削除禁止方針により `stories.ts` に保全したまま残置中。

- **トリガー**: 第3〜6章(機械学習基礎/教師あり・なし学習/深層学習基礎・要素技術/CNN・系列-NLP等)
  の章ストーリーを新規執筆するタイミングで、対応するステップの内容をその章ストーリーへ吸収する。
  吸収済みステップから順に `section` フィールドを付与し、吸収完了後に本行のステータスを更新する。
  **この執筆時に、項目27・28のタスクカード(sentiment-analysis / machine-translation /
  information-retrieval / text-summarization / speech-recognition / speech-synthesis /
  speaker-identification)の物語組み込みも合わせて行うこと**(タスクカードバッチレビューで確定。
  現時点でこれらのカードが章ストーリー未組み込みなのは恒久免除ではなく、この吸収作業までの
  繰り延べであることを明記する)。
- 現状: 8ステップ中0ステップ吸収済み(未着手)。

---

## 第1章 人工知能(AI)とは

### 項目1: 人工知能の定義 ✅ **(Phase 3バッチ6で完了)**
- [x] AI効果(`ai-effect`, kind: problem, unresolved: true — 技術的対策ではなく人間の認知傾向のため)
- [x] 単純な制御プログラム(`simple-control-program`, draft残置。AIブームの歴史的物語には属さないため
  timeline/pipelineアンカーを持たない教育用フレームワーク内の位置づけとして正直にdraftとする)
- [x] 人工知能のレベル分類(`ai-level-classification`, draft残置。4レベルが複数eraにまたがるため
  単一eraへの矮小化を避けdraft。`classical-ai`/`ml`/`deep-learning`/`simple-control-program`から
  part_ofエッジで接続し孤立は解消済み)
- [x] エージェント(AIとしての)(既存 `agent` カードが `syllabus: ["1", "9"]` で既にカバー済み。
  レビュー時点で新規作業は不要と判明)
- [x] 人工知能・機械学習・ディープラーニング(`artificial-intelligence`/`ml`(既存)/`deep-learning`の
  3枚で分割完了。AI ⊃ ML ⊃ DL の入れ子構造を is_a エッジで表現。あわせて `classical-ai`
  (レベル2・古典的な人工知能)も新設)

### 項目2: 人工知能分野で議論される問題 ✅ **(Phase 3バッチ1で完了)**
- [x] シンギュラリティ
- [x] シンボルグラウンディング問題
- [x] 身体性
- [x] ダートマス会議
- [x] トイ・プロブレム
- [x] 知識獲得のボトルネック
- [x] チューリングテスト
- [x] 中国語の部屋
- [x] 強いAIと弱いAI
- [x] 統計的機械翻訳
- [x] フレーム問題
- [x] ルールベース機械翻訳
- [x] ローブナーコンテスト

---

## 第2章 人工知能をめぐる動向

### 項目3: 探索・推論 ✅ **(Phase 3バッチ2で完了。掃討バッチAで組合せ爆発も解消)**
- [x] αβ法
- [x] Mini-Max法
- [x] SHRDLU
- [x] STRIPS
- [x] 探索木
- [x] ハノイの塔
- [x] 幅優先探索
- [x] 深さ優先探索
- [x] ブルートフォース
- [x] モンテカルロ法(新規`monte-carlo-method`カードを作成し、既存`mcts`から`is_a`エッジ+syllabus`3`を追加で接続)
- [x] 組合せ爆発(掃討バッチAで新設`combinatorial-explosion`。kind: problem, timeline: era-02。
  `brute-force → suffers_from`, `alpha-beta-pruning → solves` で系譜の鎖の受け皿にもなった)

### 項目4: 知識表現とエキスパートシステム ✅ **(Phase 3バッチ3で完了、レビュー反映バッチでeraアンカー再判定)**
- [x] Cycプロジェクト
- [x] DENDRAL
- [x] is-aの関係・has-aの関係・part-ofの関係
- [x] Question-Answering(draft残置。era-04/06/11の複数文脈にまたがるため、新設のeraアンカー意味規則でも単一era化しないのが正しいと判定)
- [x] 意味ネットワーク
- [x] イライザ(ELIZA)
- [x] インタビューシステム
- [x] ウェブマイニング(era-06にアンカー。データマイニングと同じ物語に属するため再判定でcomplete化)
- [x] オントロジー
- [x] セマンティックWeb(era-04にアンカー。オントロジーの後日談として再判定でcomplete化)
- [x] データマイニング
- [x] 東ロボくん(draft残置。era-04の壁の実例でもありera-06の技術到達点でもあるため単一eraに矮小化しないと判定)
- [x] マイシン(MYCIN)
- [x] ワトソン(era-06にアンカー。統計的手法の到達点として再判定でcomplete化)
- [x] (追加)エキスパートシステム — 明示キーワードではないが項目4の中心概念のため併せて作成

### 項目5: 機械学習(概要) ✅ **(掃討バッチAで完了)**
- [x] 次元の呪い(`curse-dimensionality`)
- [x] レコメンデーションエンジン(`recommendation`)
- [x] スパムフィルター(畳み込み → `classification-task`。examHintに「スパムフィルター(迷惑メール/正規メールの
  2クラス分類)は代表的な出題例。」を追記)
- [x] ビッグデータ(掃討バッチAで新設`big-data`。timeline: era-06)
- [x] 統計的自然言語処理(v1.3追加を確認。畳み込み → `statistical-machine-translation`。examHintに
  「統計的機械翻訳は『統計的自然言語処理』という分野全体...の代表例の一つとしても位置づけられる。」を追記)

### 項目6: ディープラーニング(発展の歴史) ✅(個別カードは済、物語化はPhase 2で対応済み)
- [x] ImageNet / ILSVRC(`ilsvrc`)
- [x] LeNet(`lenet`)
- [x] アルファ碁(`alphago`)
- [x] 人間の神経回路・ネオコグニトロン(`neocognitron`)
- [x] 生成AI(`llm`)
- [x] 歴史の連鎖としての物語化(Phase 2で `timeline.ts` era-05〜08として整備済み)

---

## 第3章 機械学習の具体的手法(ほぼ完了領域)

### 項目7: 教師あり学習 ✅ / 項目8: 教師なし学習 ✅ / 項目10: モデルの選択・評価 ✅
未収録キーワードなし(audit-report.md 時点)。

### 項目9: 強化学習 ✅ **(掃討バッチAで完了)**
- [x] UCB方策(掃討バッチAで新設`ucb`。timeline: era-13。ε-greedyとcontrasts_with)

---

## 第4章 ディープラーニングの概要

### 項目11: ニューラルネットワークとDL ✅ / 項目12: 活性化関数 ✅ / 項目14: 正則化 ✅ **(掃討バッチAで完了)**
- [x] CPUとGPU/TPUの明示的な対比カード(既存`gpu-tpu`をdraft→completeに昇格し、examHintに
  「少数コアで逐次処理が得意なCPUとの対比(多数コアによる並列処理)」を追記。coreLearningNotesに
  2質問を追加、`backprop`/`ml-dev-environment`とのエッジを追加)
- [x] L0正則化(畳み込み → `regularization`。examHintに「L0正則化(非ゼロ係数の個数そのものに
  ペナルティ)は組合せ最適化になり計算困難なため、緩和したL1で代用する」を追記)

### 項目13: 誤差関数 ✅ **(掃討バッチAで完了)**
- [x] Contrastive Loss / Triplet Loss(掃討バッチAでグループ化新設`metric-learning-loss`。
  距離学習の損失関数として1枚に集約)
- [x] KLダイバージェンス(掃討バッチAで新設`kl-divergence`。VAEとused_forで接続)

### 項目15: 誤差逆伝播法 ✅ **(掃討バッチAで完了)**
- [x] 信用割当問題(credit assignment problem)(掃討バッチAで新設`credit-assignment-problem`。
  kind: problem, timeline: era-05。`backprop → solves`で解決系譜を明示)

### 項目16: 最適化手法 ✅ **(掃討バッチAで完了)**
- [x] AdaBound・AdaDelta・AMSBound(掃討バッチAでグループ化新設`adaptive-optimizer-variants`。
  「適応的学習率法の派生」として1枚に集約、Adam/RMSPropとcontrasts_with)
- [x] グリッドサーチ・ランダムサーチ(掃討バッチAでグループ化新設`hyperparameter-search`)
- [x] 二重降下現象(double descent)(掃討バッチAで新設`double-descent`。バイアス-バリアンス
  トレードオフとcontrasts_with)
- [x] ノーフリーランチの定理(掃討バッチAで新設`no-free-lunch-theorem`。kind: problem,
  unresolved: true — 数学的に証明された恒久的制約であり技術で解決できるものではないため)
- [x] オンライン学習(掃討バッチAで新設`online-learning`。強化学習・交差検証と接続)

---

## 第5章 ディープラーニングの要素技術

### 項目17: 全結合層 ✅ / 項目18: 畳み込み層 ✅ / 項目20: プーリング層 ✅ / 項目21: スキップ結合 ✅ / 項目25: データ拡張 ✅
未収録キーワードなし、またはグループ化で許容範囲(audit-report.md 時点)。

### 項目19: 正規化層 ✅ **(掃討バッチBで完了)**
- [x] グループ正規化・インスタンス正規化(掃討バッチBでグループ化新設`group-instance-norm`。
  バッチ正規化とcontrasts_with)

### 項目22: 回帰結合層(RNN) ✅ **(掃討バッチBで完了)**
- [x] エルマンネットワーク・ジョルダンネットワーク(掃討バッチBでグループ化新設`elman-jordan-network`。
  現在のRNNの原型としてevolves_to)
- [x] 教師強制(teacher forcing)(掃討バッチBで新設`teacher-forcing`。Seq2Seq/RNNの学習で使われる)

### 項目23: Attention ✅ **(掃討バッチBで完了)**
- [x] クエリ・キー・バリューの明示カード(掃討バッチBで新設`qkv`。Self-Attention/Transformerの
  構成要素としてpart_of — part_ofの正しい用例: fromが無ければtoが定義として成立しないケース)

### 項目24: オートエンコーダ ✅ **(掃討バッチBで完了)**
- [x] VQ-VAE・InfoVAE・β-VAE(掃討バッチBでグループ化新設`vae-variants`。VAEからのevolves_to)
- [x] 積層オートエンコーダ(掃討バッチBで新設`stacked-autoencoder`。深層学習黎明期の事前学習の
  工夫として timeline: era-05)

---

## 第6章 ディープラーニングの応用例

### 項目26: 画像認識 ✅
- [ ] MnasNet(個別カード・軽微)
- [ ] PSPNet(個別カード・軽微)
- [ ] Wide ResNet(個別カード・軽微)

### 項目27: 自然言語処理 ✅ **(Phase 3バッチ8でタスク系5件完了。要素技術カードのBERT/word2vec等は既存draftのまま=別バッチ)**
- [x] 統計的機械翻訳(項目2バッチで作成、`syllabus: ["2","27"]`で二重紐付け済み)
- [x] 感情分析(新設`sentiment-analysis`。`syllabus: ["27","28"]`で二重紐付け)
- [x] 機械翻訳(新設`machine-translation`。statistical/rule-based-machine-translationからis_a接続)
- [x] 質問応答(既存`question-answering`に`syllabus: ["4","27"]`を追記して二重紐付け。新規カード化はせず)
- [x] 情報検索(新設`information-retrieval`)
- [x] 文書要約(新設`text-summarization`)
- [ ] 統計的自然言語処理(v1.3追加要確認。実体は項目5のキーワードであることを確認済み。項目27側の記載は誤転記のため次回整理時に削除予定)

### 項目28: 音声処理 ✅ **(Phase 3バッチ8で完了)**
- [x] 音声認識(新設`speech-recognition`)
- [x] 音声合成(新設`speech-synthesis`)
- [x] 話者識別(新設`speaker-identification`)
- [x] 感情分析(項目27の`sentiment-analysis`と共有、二重紐付け済み)

### 項目29: 深層強化学習 ✅
- [ ] Agent57
- [ ] APE-X
- [ ] 残差強化学習
- [ ] 状態表現学習
- [ ] 連続値制御

### 項目30: データ生成 ✅
- [ ] NeRF

### 項目31: 転移学習・ファインチューニング 🟡
- [ ] **破壊的忘却(catastrophic forgetting)** — 未収録が明確な重要語。優先度高
- [ ] One-shot学習

### 項目32: マルチモーダル 🟡
- [ ] DALL-E
- [ ] Flamingo
- [ ] Image Captioning
- [ ] VQA
- [ ] zero-shot(明示カード)
- [ ] マルチタスク学習

### 項目33: モデルの解釈性 ✅
- [ ] Permutation Importance

### 項目34: モデルの軽量化 ✅
- [ ] 宝くじ仮説(Lottery Ticket Hypothesis)

---

## 第7章 AIの社会実装に向けて

### 項目35: AIプロジェクトの進め方 ✅ **(Phase 3バッチ7で完了)**

キーワード消し込み対応表(syllabus.ts記載の公式キーワード19件、レビュー指摘により正式提示):

| # | キーワード(syllabus.ts) | 対応 | 備考・該当文 |
|---|---|---|---|
| 1 | AIのビジネス活用 | 新設 `ai-business-application` | 直接一致 |
| 2 | AIプロジェクトの進め方 | 畳み込み(個別カード化なし) | crisp-dm/poc/waterfall/agile等のカード群で表現(項目タイトル自体) |
| 3 | BPR | 畳み込み → `ai-business-application` | 「既存業務を単純に自動化するだけでなく、業務プロセス自体を見直す機会(BPR: ビジネスプロセス・リエンジニアリング)として捉える視点も含む。」(summary) |
| 4 | CRISP-DM | 新設 `crisp-dm` | 直接一致 |
| 5 | CRISP-ML | 新設 `crisp-ml` | 直接一致(CRISP-ML(Q)) |
| 6 | Docker | 畳み込み → `deployment-infra` | 「Dockerで実行環境を丸ごと配布し、Web APIとして推論機能を公開し、クラウド上でサーバーを管理する。」(summary) |
| 7 | Jupyter Notebook | 畳み込み → `ml-dev-environment` | 「プログラミング言語Pythonと、コードと実行結果を対話的に確認しながら分析を進められるJupyter Notebookという実行環境。」(summary) |
| 8 | MLOps | 既存 `mlops` | 今回`crisp-ml`とのused_forエッジを追加(2本目)。カード本文自体は今回未着手(既存draftのまま) |
| 9 | PoC | 新設 `poc` | 直接一致 |
| 10 | Python | 畳み込み → `ml-dev-environment` | #7と同文(summary) |
| 11 | Web API | 畳み込み → `deployment-infra` | #6と同文(summary) |
| 12 | アジャイル | 新設 `agile` | 直接一致 |
| 13 | ウォーターフォール | 新設 `waterfall` | 直接一致 |
| 14 | オープン・イノベーション | 新設 `open-innovation` | 直接一致 |
| 15 | クラウド | 畳み込み → `deployment-infra` | #6と同文(summary) |
| 16 | 産学連携 | 畳み込み → `open-innovation` | 「自社だけでなく大学や他企業・他業種と連携し、外部の技術・知見を取り込みながらイノベーションを進める考え方。産学連携や他企業・他業種との連携が代表例。」(summary)、「大学の研究知見(産学連携)や他業種の知見・データを取り込むことで、単独では実現しにくい取り組みを可能にするために広がった。」(bornToSolve) |
| 17 | ステークホルダーのニーズ | 新設 `stakeholder-needs` | 直接一致 |
| 18 | データサイエンティスト | 新設 `data-scientist` | 直接一致 |
| 19 | 他企業や他業種との連携 | 畳み込み → `open-innovation` | #16と同文(データ拡張の技法グループ化と同様、1カードに複数キーワードを集約) |

非公式項目(参考):
- **KPI(設計)**: syllabus.ts の項目35キーワード配列(19件、上表)に**存在しないことを確認**。
  stage-1本文中の既存の言及(「検出率・誤報率などのKPIを設計する」)のみで対応し、個別カード化・
  backlogの正式項目化はしない。

上記19件すべて対応済み(新設10枚・既存1枚へのエッジ追加1件・畳み込み8件)。

### 項目36: データの収集・加工・分析・学習 ✅
- [x] アノテーション(`annotation`, pipeline: stage-3)
- [x] オープンデータセット(`open-dataset`, pipeline: stage-2)
- [x] コーパス(`corpus`, pipeline: stage-2)
- [x] データリーケージ(`data-leakage`, kind: problem, pipeline: stage-3)

---

## 第8章 AIの法律と倫理(範囲外 `inScope: false`)

対象外。パイプラインのdraftスタブでのみ言及する方針(RESTRUCTURE_PLAN.md §3.3)。棚卸し・チェックボックス管理の対象外とする。

---

## 運用ルール

1. 新しいキーワードのカード化が完了したら、このファイルの該当行を `[x]` に更新するコミットを、
   カード追加のコミットと同一バッチ内で行う。
2. audit-report.md §2 に無い抜け(棚卸し漏れ)を発見した場合は、この表に追記し、
   audit-report.md 側は当時のスナップショットとして書き換えない(履歴として保全)。
3. Phase 3の残キュー(バッチ順序)は `docs/RESTRUCTURE_PLAN.md` Phase 3 節および
   チャット上の承認記録を正とする。本表はあくまで「消し込み対象の一覧」であり、実行順序は規定しない。
