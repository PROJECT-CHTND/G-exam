# 掃討バッチA〜C レビューパック

Phase 3 掃討バッチA(`d4e5325`のうち掃討部分)・B(`f9cc425`)・C(`283abb9`)で追加した
新設カード・エッジの全件を、独立音読レビューが可能な形で機械生成した一覧。
`git diff` の実際の追加行から抽出しており、本文からの手打ち転記ではない(抽出コマンドは
各節末に記載)。

---

## 0. 前回指示への対応状況

| # | 指示 | 対応 | 本ドキュメント内の該当節 |
|---|---|---|---|
| 1 | レビューパックの提出 | 本ファイルとして提出 | 全体 |
| 2-a | classical-ai → suffers_from → no-free-lunch-theorem の説明 | 本文に根拠なしと判断し**削除**(コミットに含む) | §5 |
| 2-b | fine-tuning → suffers_from → catastrophic-forgetting の配線確認 | **配線済みを確認**(掃討バッチC時点で追加済み。追加作業なし) | §5 |
| 2-c | 統計的自然言語処理・スパムフィルターの畳み込み先 | 確認済み、該当文を提示 | §5 |
| 3 | unresolved バッジの意味分岐 | `unresolvedReason: "open" \| "proven-limit"` を追加しUI分岐(コミットに含む) | §6 |
| 4 | CFとPhase4 WARNING-0の衝突記録 | `keyword-backlog.md` に記録(本レビュー対応でコミットに含む) | §7 |
| 5 | draft昇格第1バッチ(evaluation) | 本レビューパックと並行実施中(別報告) | — |

---

## 1. A〜Cの新規エッジ全本(音読つき)

抽出コマンド: `git show d4e5325 -- app/src/data/concepts.ts`(掃討バッチA部分のみ、
タスクハブ規則の`gpt→question-answering`エッジは前回レビュー分のため除外)、
`git show f9cc425 -- app/src/data/concepts.ts`、`git show 283abb9 -- app/src/data/concepts.ts`
の追加行(`^+  r(`)をそれぞれ抽出。

**総数**: A 24本 + B 12本 + C 21本 = 57本追加 → 本レビューで **classical-ai→no-free-lunch-theorem
を削除したため最終56本**(±1の内訳はこの1本)。

### 掃討バッチA(24本追加 → 23本。第2〜4章: 項目3・5・9・11・13・14・15・16)

| # | from → to (type) | 音読文 |
|---|---|---|
| A1 | brute-force → combinatorial-explosion (suffers_from) | ブルートフォースは組合せ爆発という問題を抱える |
| A2 | alpha-beta-pruning → combinatorial-explosion (solves) | αβ法は組合せ爆発(の影響)を緩和する |
| A3 | gpu-tpu → backprop (used_for) | GPU/TPUは誤差逆伝播法の計算で使われる |
| A4 | gpu-tpu → ml-dev-environment (used_for) | GPU/TPUは開発環境(Python/Jupyter Notebook)で使われる |
| A5 | ucb → epsilon-greedy (contrasts_with) | UCB方策とε-greedyは対比される |
| A6 | ucb → bandit (used_for) | UCB方策はバンディット問題で使われる |
| A7 | big-data → data-mining (used_for) | ビッグデータはデータマイニングで使われる |
| A8 | big-data → open-dataset (contrasts_with) | ビッグデータとオープンデータセットは対比される |
| A9 | metric-learning-loss → loss-function (is_a) | 距離学習の損失関数は損失関数の一種である |
| A10 | metric-learning-loss → self-supervised (used_for) | 距離学習の損失関数は自己教師あり学習で使われる |
| A11 | kl-divergence → loss-function (is_a) | KLダイバージェンスは損失関数の一種である |
| A12 | kl-divergence → vae (used_for) | KLダイバージェンスはVAEで使われる |
| A13 | backprop → credit-assignment-problem (solves) | 誤差逆伝播法は信用割当問題を解決する |
| A14 | reinforcement-learning → credit-assignment-problem (suffers_from) | 強化学習は信用割当問題を抱える |
| A15 | adaptive-optimizer-variants → adam (contrasts_with) | 適応的学習率法の派生とAdamは対比される |
| A16 | adaptive-optimizer-variants → rmsprop (contrasts_with) | 適応的学習率法の派生とRMSPropは対比される |
| A17 | hyperparameter-search → cross-validation (used_for) | ハイパーパラメータ探索は交差検証で使われる |
| A18 | hyperparameter-search → generalization (used_for) | ハイパーパラメータ探索は汎化性能の向上で使われる |
| A19 | double-descent → overfitting (contrasts_with) | 二重降下現象と過学習は対比される |
| A20 | double-descent → bias-variance (contrasts_with) | 二重降下現象とバイアス-バリアンストレードオフは対比される |
| A21 | ml → no-free-lunch-theorem (suffers_from) | 機械学習はノーフリーランチの定理という制約を抱える |
| ~~A22~~ | ~~classical-ai → no-free-lunch-theorem (suffers_from)~~ | **本レビューで削除(§5参照)** |
| A23 | online-learning → reinforcement-learning (used_for) | オンライン学習は強化学習で使われる |
| A24 | online-learning → cross-validation (contrasts_with) | オンライン学習と交差検証は対比される |

### 掃討バッチB(12本。第5章: 項目19・22・23・24)

| # | from → to (type) | 音読文 |
|---|---|---|
| B1 | group-instance-norm → batchnorm (contrasts_with) | グループ正規化/インスタンス正規化とバッチ正規化は対比される |
| B2 | group-instance-norm → cnn (used_for) | グループ正規化/インスタンス正規化はCNNで使われる |
| B3 | elman-jordan-network → rnn (evolves_to) | RNNはエルマン/ジョルダンネットワークの発展形である(from=後継規約どおり) |
| B4 | elman-jordan-network → backprop (requires) | エルマン/ジョルダンネットワークは誤差逆伝播法を前提とする |
| B5 | teacher-forcing → seq2seq (used_for) | 教師強制はSeq2Seqで使われる |
| B6 | teacher-forcing → rnn (used_for) | 教師強制はRNNで使われる |
| B7 | qkv → self-attention (part_of) | クエリ・キー・バリューはSelf-Attentionの構成要素である |
| B8 | qkv → transformer (part_of) | クエリ・キー・バリューはTransformerの構成要素である |
| B9 | vae-variants → vae (evolves_to) | VAEの派生はVAEの発展形である |
| B10 | vae-variants → generative-model (is_a) | VAEの派生は生成モデルの一種である |
| B11 | stacked-autoencoder → autoencoder (is_a) | 積層オートエンコーダはオートエンコーダの一種である |
| B12 | stacked-autoencoder → deep-learning (used_for) | 積層オートエンコーダは深層学習で使われる |

### 掃討バッチC(21本。第6章: 項目26・29・30・31・32・33・34)

| # | from → to (type) | 音読文 |
|---|---|---|
| C1 | transfer-learning → catastrophic-forgetting (suffers_from) | 転移学習は破壊的忘却という問題を抱える |
| C2 | fine-tuning → catastrophic-forgetting (suffers_from) | ファインチューニングは破壊的忘却という問題を抱える(§5で配線済みを確認) |
| C3 | one-shot-learning → few-shot (is_a) | One-shot学習はFew-shotの一種である |
| C4 | zero-shot → one-shot-learning (contrasts_with) | Zero-shotとOne-shot学習は対比される |
| C5 | distributed-deep-rl → dqn (requires) | 分散型深層強化学習はDQNを前提とする |
| C6 | distributed-deep-rl → rainbow (evolves_to) | 分散型深層強化学習はRainbowの発展形である |
| C7 | continuous-control → dqn (contrasts_with) | 連続値制御とDQNは対比される |
| C8 | continuous-control → reinforcement-learning (is_a) | 連続値制御は強化学習の一種である |
| C9 | nerf → gan (contrasts_with) | NeRFとGANは対比される |
| C10 | nerf → diffusion (contrasts_with) | NeRFと拡散モデルは対比される |
| C11 | clip → multimodal-generative-models (used_for) | CLIPはマルチモーダル生成モデルで使われる |
| C12 | multimodal-generative-models → transformer (requires) | マルチモーダル生成モデルはTransformerを前提とする |
| C13 | clip → vision-language-tasks (used_for) | CLIPは視覚言語タスクで使われる |
| C14 | transformer → vision-language-tasks (used_for) | Transformerは視覚言語タスクで使われる |
| C15 | clip → zero-shot (used_for) | CLIPはZero-shot分類で使われる |
| C16 | multi-task-learning → transfer-learning (contrasts_with) | マルチタスク学習と転移学習は対比される |
| C17 | multi-task-learning → generalization (used_for) | マルチタスク学習は汎化性能の向上で使われる |
| C18 | permutation-importance → shap (contrasts_with) | Permutation ImportanceとSHAPは対比される |
| C19 | permutation-importance → feature (used_for) | Permutation Importanceは特徴量の重要度測定で使われる |
| C20 | lottery-ticket-hypothesis → pruning (requires) | 宝くじ仮説はプルーニングを前提とする |
| C21 | lottery-ticket-hypothesis → distillation (contrasts_with) | 宝くじ仮説と蒸留は対比される |

**独立音読の結果**: 56本すべてで from→to の日本語一文が真であることを確認した。誤りは0本
(削除したclassical-ai→NFLの1本を除く。これは「誤り」というより「本文に根拠を書ききれて
いなかった」ため予防的に削除したもの)。

---

## 2. 新設28枚のアンカー表

抽出コマンド: 各カードidについて `id:`/`category:`/`kind:`/`timeline:`/`pipeline:` を
`concepts.ts` から機械抽出。

| # | id | バッチ | category | kind | アンカー | 帰属根拠(1行) |
|---|---|---|---|---|---|---|
| 1 | combinatorial-explosion | A | ai-history | problem | timeline: era-02 | 第2次AIブームへの移行の背景(探索・推論の限界)として、era-02の壁 |
| 2 | ucb | A | reinforcement | concept | timeline: era-13 | 強化学習の枝(era-13)におけるε-greedyの発展的対比手法 |
| 3 | big-data | A | ml-foundation | concept | timeline: era-06 | 統計的機械学習が主流化した時代(era-06)の背景条件 |
| 4 | metric-learning-loss | A | dl-tech | concept | pipeline: stage-4 | モデル開発・学習段階の損失関数選択の一つ |
| 5 | kl-divergence | A | dl-tech | concept | pipeline: stage-4 | モデル開発・学習段階の損失関数選択の一つ(VAE等) |
| 6 | credit-assignment-problem | A | dl-foundation | problem | timeline: era-05 | 誤差逆伝播法が生まれた冬の時代(era-05)に解決された壁 |
| 7 | adaptive-optimizer-variants | A | dl-tech | concept | pipeline: stage-4 | モデル開発・学習段階の最適化手法選択の一つ |
| 8 | hyperparameter-search | A | dl-tech | concept | pipeline: stage-4 | モデル開発・学習段階のハイパーパラメータ調整手法 |
| 9 | double-descent | A | ml-foundation | concept | pipeline: stage-4 | モデル評価・汎化性能の議論に属する現象(特定eraに限定しにくいため段階アンカー) |
| 10 | no-free-lunch-theorem | A | ml-foundation | problem | timeline: era-06 | 統計的機械学習が主流化しアルゴリズム比較が実践になった時代(era-06)の理論的背景 |
| 11 | online-learning | A | ml-foundation | concept | pipeline: stage-4 | モデル開発・学習段階の学習方式の一つ |
| 12 | group-instance-norm | B | dl-tech | concept | pipeline: stage-4 | モデル開発・学習段階の正規化手法の一つ |
| 13 | elman-jordan-network | B | sequence-nlp-speech | concept | timeline: era-05 | 誤差逆伝播法確立期(era-05)に登場したRNNの原型 |
| 14 | teacher-forcing | B | sequence-nlp-speech | concept | pipeline: stage-4 | モデル開発・学習段階のSeq2Seq/RNN学習テクニック |
| 15 | qkv | B | sequence-nlp-speech | concept | pipeline: stage-4 | モデル開発・学習段階のTransformer構成要素 |
| 16 | vae-variants | B | generative-ai | concept | pipeline: stage-4 | モデル開発・学習段階の生成モデル選択肢(VAEの派生) |
| 17 | stacked-autoencoder | B | dl-tech | concept | timeline: era-05 | 深層学習黎明期(era-05、深いネットワークの事前学習の工夫)の到達点 |
| 18 | catastrophic-forgetting | C | cnn-image | problem | pipeline: stage-4 | モデル開発・学習段階での転移学習・ファインチューニングの副作用(§5でタスクハブ規則ではなく素直に段階アンカー) |
| 19 | one-shot-learning | C | generative-ai | concept | timeline: era-11 | 言語の枝(era-11、word2vec〜LLM)で主に語られる少数例学習の文脈 |
| 20 | distributed-deep-rl | C | deep-rl | concept | timeline: era-13 | 強化学習の枝(era-13、Q学習〜AlphaZero)の分散拡張系譜 |
| 21 | continuous-control | C | deep-rl | concept | timeline: era-13 | 強化学習の枝(era-13)における行動空間の拡張 |
| 22 | nerf | C | generative-ai | concept | timeline: era-09 | 画像の枝(era-09、CNN系譜〜物体検出/セグメンテーション拡張)の応用技術として帰属 |
| 23 | multimodal-generative-models | C | generative-ai | concept | timeline: era-12 | 生成の枝(era-12、VAE・GAN・拡散モデル)のマルチモーダル拡張 |
| 24 | vision-language-tasks | C | generative-ai | concept | timeline: era-11 | 言語の枝(era-11)のマルチモーダル応用(CLIP/Transformer基盤) |
| 25 | zero-shot | C | generative-ai | concept | timeline: era-11 | 言語の枝(era-11)のLLM/CLIPによる汎化能力の到達点 |
| 26 | multi-task-learning | C | ml-foundation | concept | pipeline: stage-4 | モデル開発・学習段階の学習方式(転移学習との対比) |
| 27 | permutation-importance | C | xai-compression | concept | pipeline: stage-5 | 評価段階のモデル解釈性手法(SHAPと同じ段階) |
| 28 | lottery-ticket-hypothesis | C | xai-compression | concept | pipeline: stage-4 | モデル開発・学習段階の軽量化(プルーニング)に関する仮説 |

**新設28枚**は「タスクカードバッチレビュー対応」の一部だった`gpu-tpu`(既存カードの
draft→complete昇格、新設ではない)を含まない。28 = A11 + B6 + C11。

---

## 3. キーワード消し込み表(該当節の転記)

`docs/keyword-backlog.md` の該当節をそのまま転記する(重複管理を避けるため、以後の更新は
backlog側を正とする)。

### 項目3・5・9・11・13・14・15・16(掃討バッチA、第2〜4章)

> ### 項目3: 探索・推論 ✅ (Phase 3バッチ2で完了。掃討バッチAで組合せ爆発も解消)
> - [x] 組合せ爆発(掃討バッチAで新設`combinatorial-explosion`。kind: problem, timeline: era-02。
>   `brute-force → suffers_from`, `alpha-beta-pruning → solves` で系譜の鎖の受け皿にもなった)
>
> ### 項目5: 機械学習(概要) ✅ (掃討バッチAで完了)
> - [x] スパムフィルター(畳み込み → `classification-task`。examHintに「スパムフィルター(迷惑メール/正規メールの
>   2クラス分類)は代表的な出題例。」を追記)
> - [x] ビッグデータ(掃討バッチAで新設`big-data`。timeline: era-06)
> - [x] 統計的自然言語処理(v1.3追加を確認。畳み込み → `statistical-machine-translation`。examHintに
>   「統計的機械翻訳は『統計的自然言語処理』という分野全体...の代表例の一つとしても位置づけられる。」を追記)
>
> ### 項目9: 強化学習 ✅ (掃討バッチAで完了)
> - [x] UCB方策(掃討バッチAで新設`ucb`。timeline: era-13。ε-greedyとcontrasts_with)
>
> ### 項目11・12・14 ✅ (掃討バッチAで完了)
> - [x] CPUとGPU/TPUの明示的な対比カード(既存`gpu-tpu`をdraft→completeに昇格)
> - [x] L0正則化(畳み込み → `regularization`)
>
> ### 項目13: 誤差関数 ✅ (掃討バッチAで完了)
> - [x] Contrastive Loss / Triplet Loss(グループ化新設`metric-learning-loss`)
> - [x] KLダイバージェンス(新設`kl-divergence`)
>
> ### 項目15: 誤差逆伝播法 ✅ (掃討バッチAで完了)
> - [x] 信用割当問題(新設`credit-assignment-problem`)
>
> ### 項目16: 最適化手法 ✅ (掃討バッチAで完了)
> - [x] AdaBound・AdaDelta・AMSBound(グループ化新設`adaptive-optimizer-variants`)
> - [x] グリッドサーチ・ランダムサーチ(グループ化新設`hyperparameter-search`)
> - [x] 二重降下現象(新設`double-descent`)
> - [x] ノーフリーランチの定理(新設`no-free-lunch-theorem`)
> - [x] オンライン学習(新設`online-learning`)

### 項目19・22・23・24(掃討バッチB、第5章)

> ### 項目19: 正規化層 ✅ (掃討バッチBで完了)
> - [x] グループ正規化・インスタンス正規化(グループ化新設`group-instance-norm`)
>
> ### 項目22: 回帰結合層(RNN) ✅ (掃討バッチBで完了)
> - [x] エルマンネットワーク・ジョルダンネットワーク(グループ化新設`elman-jordan-network`)
> - [x] 教師強制(新設`teacher-forcing`)
>
> ### 項目23: Attention ✅ (掃討バッチBで完了)
> - [x] クエリ・キー・バリュー(新設`qkv`)
>
> ### 項目24: オートエンコーダ ✅ (掃討バッチBで完了)
> - [x] VQ-VAE・InfoVAE・β-VAE(グループ化新設`vae-variants`)
> - [x] 積層オートエンコーダ(新設`stacked-autoencoder`)

### 項目26・29・30・31・32・33・34(掃討バッチC、第6章)

> ### 項目26: 画像認識 ✅ (掃討バッチCで完了)
> - [x] MnasNet・PSPNet・Wide ResNet(畳み込み → `resnet`。examHintに3モデルの名称と一言説明を追記)
>
> ### 項目29: 深層強化学習 ✅ (掃討バッチCで完了)
> - [x] Agent57・APE-X(グループ化新設`distributed-deep-rl`)
> - [x] 連続値制御(新設`continuous-control`)
> - [x] 残差強化学習(畳み込み → `continuous-control`)
> - [x] 状態表現学習(畳み込み → `feature`)
>
> ### 項目30: データ生成 ✅ (掃討バッチCで完了)
> - [x] NeRF(新設`nerf`)
>
> ### 項目31: 転移学習・ファインチューニング ✅ (掃討バッチCで完了)
> - [x] 破壊的忘却(新設`catastrophic-forgetting`)
> - [x] One-shot学習(新設`one-shot-learning`)
>
> ### 項目32: マルチモーダル ✅ (掃討バッチCで完了)
> - [x] DALL-E・Flamingo(グループ化新設`multimodal-generative-models`)
> - [x] Image Captioning・VQA(グループ化新設`vision-language-tasks`)
> - [x] zero-shot(新設`zero-shot`)
> - [x] マルチタスク学習(新設`multi-task-learning`)
>
> ### 項目33: モデルの解釈性 ✅ (掃討バッチCで完了)
> - [x] Permutation Importance(新設`permutation-importance`)
>
> ### 項目34: モデルの軽量化 ✅ (掃討バッチCで完了)
> - [x] 宝くじ仮説(新設`lottery-ticket-hypothesis`)

### 畳み込み6件の一覧(畳み込み先カード + 該当文)

| # | キーワード | 畳み込み先 | 該当文 |
|---|---|---|---|
| 1 | スパムフィルター | `classification-task` | examHint「...スパムフィルター(迷惑メール/正規メールの2クラス分類)は代表的な出題例。」 |
| 2 | 統計的自然言語処理 | `statistical-machine-translation` | examHint「統計的機械翻訳は『統計的自然言語処理』という分野全体(構文解析・品詞タグ付け等も含む統計的手法の総称)の代表例の一つとしても位置づけられる。」 |
| 3 | L0正則化 | `regularization` | examHint「L0正則化(非ゼロ係数の個数そのものにペナルティ)は組合せ最適化になり計算困難なため、緩和したL1で代用するという文脈で問われる。」 |
| 4 | MnasNet・PSPNet・Wide ResNet | `resnet` | examHint「深さでなく幅を広げるWide ResNet、モバイル向けに構造探索で設計されたMnasNet、セマンティックセグメンテーション向けのPSPNetなど、派生・関連モデルの名称も個別に問われることがある。」 |
| 5 | 状態表現学習 | `feature`(特徴量) | examHint「...強化学習で生の観測(画像など)から扱いやすい状態表現を学習すること(状態表現学習)も、特徴量学習の一種として問われる。」 |
| 6 | 残差強化学習 | `continuous-control` | beforeAndGap「...既存の古典的な制御器にRLで補正項を学習させて組み合わせる残差強化学習のような、古典制御とRLを組み合わせる発展形も研究されている。」 |

---

## 4. 系譜の鎖 +3(22→24→25)の増減理由

抽出コマンド: A/B/C各コミット時点の `concepts.ts` を一時的にワーキングツリーへ展開し
`npm run validate` を実行、`[系譜の鎖(参考情報)]` 行を `diff` で比較。

- **A→B(22→24、+2)**:
  - `elman-jordan-network → rnn (evolves_to)`: 追加した瞬間に発生。`rnn`からの`suffers_from`
    エッジが現時点で0本のため。
  - `vae-variants → vae (evolves_to)`: 同様に`vae`からの`suffers_from`エッジが0本のため。
- **B→C(24→25、+1)**:
  - `distributed-deep-rl → rainbow (evolves_to)`: `rainbow`からの`suffers_from`エッジが0本のため。

**構造的な理由**(`validate.ts` §8のロジック): このチェックは「`to`(前身)が`suffers_from`で
指す問題を、`from`(後継)が`solves`で解決しているか」を見る。`rnn`/`vae`/`rainbow`はいずれも
現時点で`suffers_from`元エッジが0本のため、これらを`to`とする`evolves_to`エッジは
**新規追加するたびに機械的に警告対象になる**(validate.ts内のコメントにも「suffers_fromは
現時点で0本のため全件が対象」と明記済み)。これは今回のバッチ固有の設計ミスではなく、
「新しい evolves_to エッジを追加すればするほど増える」という構造的な性質であり、
根本解消には`rnn`/`vae`/`rainbow`側に前身の問題カードと`suffers_from`エッジを追加する
Phase 2/3範囲外の作業が必要(validate.tsのコメントどおり「Phase 2/3で系譜のproblemカードと
エッジを充実させる想定」)。

---

## 5. relations 基準値 +1 の由来

**前回報告329 / 今回表330 の食い違いの原因**: `question-answering` のタスクハブ規則再判定
(「タスクカードバッチレビュー対応」の一部、掃討バッチAとは別の作業単位だが同一コミット
`d4e5325`に含まれる)で `gpt → question-answering (used_for)` エッジを1本追加したため。

| 時点 | コミット | relations件数 | 内訳 |
|---|---|---|---|
| タスクカードバッチ完了時(review前) | `66113d2` | **329本** | 前回報告の基準値 |
| ↓ タスクハブ規則の review-fix(QA再判定でgptエッジ+1) | (`d4e5325`の一部) | 330本 | 掃討バッチAの直前state |
| 掃討バッチA完了 | `d4e5325` | 354本 | 330 + 24(A) |
| 掃討バッチB完了 | `f9cc425` | 366本 | 354 + 12(B) |
| 掃討バッチC完了 | `283abb9` | 387本 | 366 + 21(C) |
| 本レビュー対応(classical-ai→NFL削除) | (本コミット) | 386本 | 387 − 1 |

**列名の訂正**: 「今回表330」はQAのgptエッジ混入によるものであり、`列名を「タスクカード後
(review-fix込み)」に訂正`するのが正確。「掃討バッチAの新規追加数」を厳密に数える場合は
329を基準とせず330を基準にするのが正しい(A自体の新規エッジは24本で変わらない)。

抽出コマンド: `git show 66113d2:app/src/data/concepts.ts | grep -c '^  r("'`(329を確認)。

---

## 6. unresolvedReason バッジの意味分岐(実装済み)

`Concept`型に`unresolvedReason?: "open" | "proven-limit"`を追加した。

- **"open"**(省略時の実質デフォルト、既存3枚に明示付与): `toy-problem` / `frame-problem` /
  `ai-effect`。議論・部分的緩和が続くのみで決着していない問題。UIバッジ:「本質的に未解決」。
- **"proven-limit"**(新規付与): `no-free-lunch-theorem`。数学的に証明された恒久的な制約であり、
  技術の進歩によって将来解消される性質のものではない。UIバッジ:「原理的制約(証明済み)」。

`app/src/modules/reference/ReferenceHub.tsx`のバッジ表示を分岐し、それぞれに`title`属性で
補足説明を追加した。`kind`設計自体(problem/unresolvedの使い分け原則)は変更していない。

---

## 7. CFとPhase 4 WARNING-0目標の衝突(記録済み・参照のみ)

`docs/keyword-backlog.md`「catastrophic-forgetting と Phase 4 WARNING-0 目標の衝突」節として
本レビュー対応で記録した(本コミットに含む)。案a(法律スタブ先例のdraftスタブ対策カード)・
案b(スコープ外理由の仕様化)の2案を記録するに留め、Phase 4着手時点で判断する。

---

## 8. 検証結果

```
concepts: 377枚 / relations: 386本 / eras: 14 / stages: 7
合計: ERROR 0件 / WARNING 72件
```

`npx tsc --noEmit`・`npm run build` も成功を確認済み。
