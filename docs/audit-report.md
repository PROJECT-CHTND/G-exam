# Phase 0 監査レポート

**作成日**: 2026-07-02
**対象**: `docs/RESTRUCTURE_PLAN.md` Phase 0
**実行内容**: シラバス確認、シラバス×既存カードのカバレッジ突合、既存202エッジの全数レビュー、確認事項の整理
**リポジトリへの変更**: 本ファイルの追加のみ(コード変更なし)

---

## 0. サマリ

- JDLA公式サイトから最新シラバス(**G2024#6〜適用、2024年11月改訂版**。2026年も継続使用、2025年5月に用語微修正の第1.3版)であることを確認した。ただし公式PDFの直接ダウンロードは本セッションの環境からは失敗し(§1.3参照)、二次資料(法人・個人の要約記事、うち1件はJDLA公式シラバス本文をほぼ全文転記したnote記事)から**大項目37件・詳細キーワードレベル**の構成を再構築した。**人間による公式PDF原本との最終突合を強く推奨する**(§4 確認事項1)。
- 既存269枚のカードのうち、**機械学習の具体的手法(シラバス項目7〜10)・ディープラーニングの要素技術(11〜25)・応用例(26〜34)は高いカバレッジ**を持つ。一方、**「人工知能とは」「人工知能をめぐる動向」(項目1〜4)と「AIの社会実装」(項目35〜36)はほぼ全滅**で、本計画が新設する`ai-history`/`ai-project`カテゴリの対象そのものであることを確認した。
- 既存202エッジの全数レビューの結果、指示書に記載の**既知所見3件をすべて確認**した。それ以外の新規の方向違反は検出されなかった(`evolves_to` 20本中1本、`solves` 11本中2本が既知の問題)。
- **人名カード(kind: person)は現状0枚**。シラバス本文には人名の明示列挙がないため、対象人物の選定は人間の判断が必要(§4 確認事項5)。

---

## 1. シラバス確認

### 1.1 版の特定

- 現行版: **G2024#6〜適用シラバス**(2024年11月改訂、JDLA公式テキスト第3版に対応)。2025年5月に「第1.3版」として軽微修正(統計的自然言語処理・SARSA等の用語追加、「LLM」表記の「生成AI」への統一)。
- 2026年時点でも新たなシラバス改訂は行われておらず、この版が継続使用されている(試験時間・問題数の変更のみで出題範囲は不変)。
- 出典: JDLA公式ニュース「シラバス改訂および公式テキスト第3版刊行のお知らせ」(2024-05-14)、JDLA公式サイト シラバスダウンロードページ(`https://www.jdla.org/download-category/syllabus/`)。

### 1.2 章立て(公式テキスト第3版 = 出題範囲)

| 章 | 内容 | 本計画のスコープ判定 |
|---|---|---|
| 第1章 | 人工知能(AI)とは | `inScope: true` |
| 第2章 | 人工知能をめぐる動向 | `inScope: true` |
| 第3章 | 機械学習の具体的手法 | `inScope: true` |
| 第4章 | ディープラーニングの概要 | `inScope: true` |
| 第5章 | ディープラーニングの要素技術 | `inScope: true` |
| 第6章 | ディープラーニングの応用例 | `inScope: true` |
| 第7章 | AIの社会実装に向けて | `inScope: true`(社会実装フロー軸の主対象) |
| 第8章 | AIの法律と倫理 | `inScope: false`(パイプライン上はdraftスタブのみ) |
| Appendix | 事例集・産業への応用 | `inScope: true`(参考、優先度低) |
| (別掲) | AIに必要な数理・統計知識 | `inScope: false`(RESTRUCTURE_PLAN.md §3.4の方針どおり) |

これは指示書§0.4/§3.4の「人工知能の概要〜ディープラーニングの応用」+「社会実装フロー」というスコープ定義と一致する。

### 1.3 公式PDF取得の試行結果(要人間確認)

- JDLA公式サイトの「シラバスダウンロード」ページは WordPress Download Manager プラグインを使用しており、実ファイルへの直リンクが静的HTMLに含まれず(JS/AJAX経由の動的生成)、本セッションの自動取得では**PDF原本のテキスト抽出に失敗した**。
- 代替として、複数の二次資料(G検定対策メディア複数、個人ブログ)を横断的に参照し、特に note.com記事「G検定試験出題範囲(シラバス 2024)【技術分野】」(2024-12-05、公式シラバスからの転記を明記)から**大項目1〜37の学習目標・詳細キーワードをほぼ原文どおり**に確認できた。
- **リスク**: この記事は2024年12月時点の内容で、2025年5月の第1.3版修正(統計的自然言語処理・SARSA追加、LLM→生成AI表記統一)を反映していない可能性がある。既存カードには`sarsa`カードは既に存在するため実害は小さいが、「統計的自然言語処理」という項目5または27相当のキーワード追加は未確認。
- **推奨事項**: Phase 1で`syllabus.ts`を確定する前に、人間が公式PDF(`https://www.jdla.org/certificate/general/#general_No03` からたどれる最新ファイル)を直接ダウンロードし、本レポート末尾の項目リスト(§2)と突合すること。

---

## 2. シラバス項目 × 既存カード カバレッジ表

大項目1〜36(数理統計の37は対象外)について、`app/src/data/concepts.ts` の269枚と突合した。ステータスは3段階: **済**(主要キーワードの大半にカードが存在)/**一部**(核となる概念はあるが個別キーワードに漏れ)/**穴**(ほぼ未着手)。

| # | シラバス項目(大項目) | 該当章 | ステータス | 既存カード(id) | 主な未収録キーワード |
|---|---|---|---|---|---|
| 1 | 人工知能の定義 | 第1章 | 穴 | `ml` のみ | AI効果, 単純な制御プログラム, 人工知能のレベル分類, (AIとしての)エージェント |
| 2 | 人工知能分野で議論される問題 | 第1章 | 穴 | なし | シンギュラリティ, シンボルグラウンディング問題, 身体性, ダートマス会議, トイ・プロブレム, 知識獲得のボトルネック, チューリングテスト, 中国語の部屋, 強いAI/弱いAI, フレーム問題, ローブナーコンテスト |
| 3 | 探索・推論 | 第2章 | 穴 | なし(`mcts`はAlphaGo文脈のみ) | αβ法, Mini-Max法, SHRDLU, STRIPS, 探索木, ハノイの塔, 幅優先探索, 深さ優先探索, ブルートフォース |
| 4 | 知識表現とエキスパートシステム | 第2章 | 穴 | なし | Cycプロジェクト, DENDRAL, 意味ネットワーク, ELIZA, オントロジー, セマンティックWeb, MYCIN, ワトソン, 東ロボくん |
| 5 | 機械学習(概要) | 第2章 | 一部 | `curse-dimensionality`, `recommendation` | スパムフィルター, ビッグデータ(概要文脈), (統計的自然言語処理: v1.3追加の可能性・要確認) |
| 6 | ディープラーニング(発展の歴史) | 第2章 | 済 | `ilsvrc`, `lenet`, `alphago`, `neocognitron`, `llm` | 個別カードはあるが「歴史の連鎖」としての物語化(timeline)が未整備 |
| 7 | 教師あり学習 | 第3章 | 済 | `linear-regression`,`logistic-regression`,`svm`,`decision-tree`,`random-forest`,`ensemble`,`bagging`,`boosting`,`adaboost`,`gradient-boosting`,`knn`,`margin`,`kernel`,`multiclass`,`ar`,`var` 他 | なし(ほぼ完全網羅) |
| 8 | 教師なし学習 | 第3章 | 済 | `kmeans`,`hierarchical-clustering`,`ward`,`dendrogram`,`pca`,`svd`,`mds`,`tsne`,`umap`,`dbscan`,`collaborative-filtering`,`content-based-filtering`,`cold-start`,`lda`,`topic-model` 他 | なし(ほぼ完全網羅) |
| 9 | 強化学習 | 第3章 | 一部 | `agent`,`policy`,`state-value`,`action-value`,`q-learning`,`sarsa`,`policy-gradient`,`reinforce`,`actor-critic`,`bandit`,`epsilon-greedy`,`mdp`,`discount-rate` | UCB方策 |
| 10 | モデルの選択・評価 | 第3章 | 済 | `cross-validation`,`mse`,`rmse`,`mae`,`roc-auc`,`aic-bic`,`occam`,`confusion-matrix`,`accuracy`,`precision`,`recall`,`f1`,`type-errors`,`holdout` | なし |
| 11 | ニューラルネットワークとDL | 第4章 | 済 | `neural-network`,`perceptron`,`mlp`,`input-hidden-output`,`gpu-tpu` | CPUの明示的な対比カード(軽微) |
| 12 | 活性化関数 | 第4章 | 済 | `activation`,`relu`,`leaky-relu`,`gelu`,`tanh`,`sigmoid`,`softmax`,`step-function` | なし |
| 13 | 誤差関数 | 第4章 | 一部 | `cross-entropy`,`mse` | Contrastive Loss, Triplet Loss, KLダイバージェンス |
| 14 | 正則化 | 第4章 | 済 | `regularization`,`lasso`(L1),`ridge`(L2),`dropout` | L0正則化(明示カードなし、軽微) |
| 15 | 誤差逆伝播法 | 第4章 | 一部 | `backprop`,`chain-rule`,`vanishing-gradient`,`exploding-gradient` | 信用割当問題 |
| 16 | 最適化手法 | 第4章 | 一部 | `sgd`,`momentum`,`adagrad`,`rmsprop`,`adam`,`adamw`,`gradient-descent`,`learning-rate`,`epoch-batch`,`early-stopping`,`local-minimum` | AdaBound, AdaDelta, AMSBound, グリッドサーチ, ランダムサーチ, 二重降下現象, ノーフリーランチの定理, オンライン学習 |
| 17 | 全結合層 | 第5章 | 済 | `fully-connected` | なし |
| 18 | 畳み込み層 | 第5章 | 済 | `convolution-layer`,`filter-kernel`,`stride`,`padding`,`depthwise`,`deeplab`(Atrous/Dilation) | なし(概ね網羅) |
| 19 | 正規化層 | 第5章 | 一部 | `batchnorm`,`layernorm` | グループ正規化, インスタンス正規化 |
| 20 | プーリング層 | 第5章 | 済 | `pooling`,`max-pooling`,`avg-pooling`,`gap` | なし |
| 21 | スキップ結合 | 第5章 | 済 | `skip-connection`,`resnet` | なし |
| 22 | 回帰結合層(RNN) | 第5章 | 一部 | `rnn`,`bptt`,`lstm`,`cec`,`gru`,`bidirectional-rnn` | エルマンネットワーク, ジョルダンネットワーク, 教師強制 |
| 23 | Attention | 第5章 | 一部 | `attention`,`self-attention`,`multi-head`,`positional-encoding`,`transformer`,`seq2seq`,`source-target-attention` | クエリ・キー・バリューの明示カード(要素技術としては未分割) |
| 24 | オートエンコーダ | 第5章 | 一部 | `autoencoder`,`vae`,`pretraining`,`latent-variable` | VQ-VAE, InfoVAE, β-VAE, 積層オートエンコーダ |
| 25 | データ拡張 | 第5章 | 済(粒度は粗い) | `data-augmentation`,`cutout-random-erasing`,`mixup-cutmix` | RandAugment等の個別技法(グループ化で許容範囲) |
| 26 | 画像認識 | 第6章 | 済 | `alexnet`,`vgg`,`googlenet`,`resnet`,`densenet`,`senet`,`mobilenet`,`efficientnet`,`nas`,`rcnn`,`yolo`,`ssd`,`fpn-anchor`,`fcn-unet`,`deeplab`,`mask-rcnn`,`vit`,`image-classification`,`object-detection`,`segmentation`,`semantic-seg`,`instance-seg`,`panoptic-seg`,`pose-estimation` | MnasNet, PSPNet, Wide ResNet(個別カード) |
| 27 | 自然言語処理 | 第6章 | 一部 | `bert`,`gpt`,`t5`,`glue`,`word2vec`,`cbow`,`skip-gram`,`fasttext`,`elmo`,`ngram`,`bow`,`one-hot`,`tfidf`,`local-distributed`,`morph-syntax`,`llm`,`seq2seq` | 感情分析, 機械翻訳, 質問応答, 情報検索, 文書要約(タスク単位のカード), 統計的機械翻訳, (統計的自然言語処理: v1.3追加要確認) |
| 28 | 音声処理 | 第6章 | 一部 | `ad-conversion`,`pcm`,`fft`,`spectral-envelope`,`mfcc`,`mel-scale`,`formant`,`phoneme`,`hmm`,`wavenet`,`ctc` | 音声認識・音声合成・話者識別(タスク単位のカード) |
| 29 | 深層強化学習 | 第6章 | 済 | `deep-rl`,`dqn`,`experience-replay`,`double-dqn`,`dueling-network`,`noisy-network`,`rainbow`,`mcts`,`alphago`,`alphazero`,`multi-agent`,`openai-five`,`alphastar`,`sim2real`,`domain-randomization`,`offline-rl`,`reward-shaping`,`a3c` | Agent57, APE-X, 残差強化学習, 状態表現学習, 連続値制御 |
| 30 | データ生成 | 第6章 | 済 | `generative-model`,`gan`,`generator-discriminator`,`dcgan-pix2pix-cyclegan`,`diffusion`,`denoising` | NeRF |
| 31 | 転移学習・ファインチューニング | 第6章 | 一部 | `transfer-learning`,`fine-tuning`,`few-shot`,`self-supervised`,`pretraining`,`semi-supervised` | **破壊的忘却(catastrophic forgetting)が未収録**、One-shot |
| 32 | マルチモーダル | 第6章 | 一部 | `clip`,`multimodal`,`foundation-model` | DALL-E, Flamingo, Image Captioning, VQA, zero-shot(明示カード)、マルチタスク学習 |
| 33 | モデルの解釈性 | 第6章 | 済 | `xai`,`cam`,`grad-cam`,`lime`,`shap` | Permutation Importance |
| 34 | モデルの軽量化 | 第6章 | 済 | `edge-ai`,`distillation`,`quantization`,`compression-pruning`,`model-compression` | 宝くじ仮説 |
| 35 | AIプロジェクトの進め方 | 第7章 | 穴 | `mlops` のみ | AIのビジネス活用, CRISP-DM, CRISP-ML, PoC, アジャイル, ウォーターフォール, ステークホルダーのニーズ, データサイエンティスト, 産学連携 等ほぼ全て |
| 36 | データの収集・加工・分析・学習 | 第7章 | 穴 | なし | アノテーション, オープンデータセット, コーパス, データリーケージ |
| (37) | AIに必要な数理・統計知識 | (別掲) | **範囲外**(`inScope: false`) | なし | 対象外のため未評価 |

### 2.1 集計

- **済**(主要キーワード網羅): 15項目 / 36項目
- **一部**(核はあるが穴あり): 12項目 / 36項目
- **穴**(ほぼ未着手): 6項目 / 36項目(項目1・2・3・4・35・36 = すべて「人工知能の概要」と「社会実装」)

指示書§0.3で述べられている課題(スコープの穴)が、この定量集計でも裏付けられた。**優先着手領域は明確に項目1〜4(ai-history)と35〜36(ai-project)である。**

---

## 3. 公式シラバス章 ↔ `categoryMeta` 対応表

既存12カテゴリはシラバス項目7〜34にきれいに対応する。新設2カテゴリの割当案は以下のとおり。

| categoryMeta | 対応するシラバス項目 | 新設か |
|---|---|---|
| `ai-history`(新設) | 1, 2, 3, 4, (6の歴史的文脈) | 新設 |
| `ml-foundation` | 5(機械学習概要), 9の一部(共通基礎) | 既存 |
| `supervised` | 7 | 既存 |
| `unsupervised` | 8 | 既存 |
| `reinforcement` | 9 | 既存 |
| `evaluation` | 10 | 既存 |
| `dl-foundation` | 11, 13, 15, 16の一部 | 既存 |
| `dl-tech` | 12, 14, 16の一部, 19, 24, 25 | 既存 |
| `cnn-image` | 17, 18, 20, 21, 26 | 既存 |
| `sequence-nlp-speech` | 22, 23, 27, 28 | 既存 |
| `deep-rl` | 29 | 既存 |
| `generative-ai` | 30, 31の一部, 32 | 既存 |
| `xai-compression` | 33, 34 | 既存 |
| `ai-project`(新設) | 35, 36 (+第8章の法律・契約はdraftスタブのみ) | 新設 |

**確認事項**: 項目6(ディープラーニングの発展の歴史)は現状 `cnn-image` / `generative-ai` 等の技術カテゴリに個別カードとして分散している(`ilsvrc`, `lenet`, `alphago` 等)。これらは「章(category)」としては現カテゴリのまま据え置き、`timeline`アンカー(`era-XX`)で歴史軸を横断的に付与する方針でよいか、それとも `ai-history` に category ごと移すべきか、§4確認事項4で扱う。

---

## 4. 既存202エッジ 全数レビュー結果

`relations` 配列(202本)の型別内訳: `is_a` 80 / `part_of` 53 / `used_for` 28 / `evolves_to` 20 / `solves` 11 / `pipeline_next` 7 / `contrasts_with` 3。

### 4.1 `evolves_to`(20本)の方向規約チェック

規約: **from = 後継、to = 前身**。20本中、以下の**1本のみ違反**を確認(指示書記載の既知所見と一致)。

| from | to | 判定 |
|---|---|---|
| `cam` | `grad-cam` | **違反**。CAMがGrad-CAMの前身なので `grad-cam → cam` が正しい方向。 |

残り19本(`rmsprop←adagrad`, `adam←rmsprop`, `adamw←adam`, `lenet←neocognitron`, `alexnet←lenet`, `vgg←alexnet`, `googlenet←vgg`, `resnet←googlenet`, `lstm←rnn`, `gru←lstm`, `attention←seq2seq`, `transformer←attention`, `fasttext←word2vec`, `elmo←word2vec`, `dqn←q-learning`, `double-dqn←dqn`, `dueling-network←dqn`, `rainbow←dqn`, `alphazero←alphago`)はすべて規約どおり。**新規の方向違反は検出されなかった。**

### 4.2 `solves`(11本)のto側妥当性チェック

規約(Phase 1で追加予定): to側は問題(problem)カードであること。11本中、以下の**2本が違反**(指示書記載の既知所見と一致)。

| from | to | 判定 |
|---|---|---|
| `cold-start` | `collaborative-filtering` | **違反**。意味が逆。協調フィルタリングがコールドスタート問題を抱える側(`suffers_from`)であり、コールドスタート自体の解決策(半教師あり学習、コンテンツベースとのハイブリッド等)がまだカード化されていない。 |
| `pruning` | `decision-tree` | **違反**。decision-treeは問題ではない。実際に解決している問題は過学習(`overfitting`)。`decision-tree → overfitting`(`suffers_from`)+ `pruning → overfitting`(`solves`)への張替えが必要。 |

残り9本(`regularization→overfitting`, `relu→vanishing-gradient`, `gradient-clipping→exploding-gradient`, `dropout→overfitting`, `early-stopping→overfitting`, `data-augmentation→overfitting`, `skip-connection→vanishing-gradient`, `lstm→vanishing-gradient`, `rag→hallucination`)は妥当。**新規の違反は検出されなかった。**

### 4.3 `contrasts_with`(3本)の対称性チェック

`q-learning↔sarsa`, `ctc↔hmm`, `one-hot↔local-distributed` の3本すべてが単方向登録であり、重複登録(逆方向の二重張り)は**検出されなかった**。

### 4.4 参照整合性(dangling edge)チェック

全202エッジの `from`/`to` が269枚のカードid集合に含まれるかを機械的に確認し、**未定義idへの参照は検出されなかった**(`app/scripts/validate.ts` 相当のロジックを本レポート作成時に簡易実行して確認)。

### 4.5 id一意性チェック

269枚のカードidに**重複は検出されなかった**。

### 4.6 2質問記入状況

`purpose`/`difference`(→ `bornToSolve`/`beforeAndGap` に改名予定)が記入済みのカードは **47枚**(269枚中)。指示書記載の「約50枚」とほぼ一致。残り222枚が実質的に `status: "draft"` 相当。

---

## 5. 確認事項リスト(人間の判断が必要な点)

1. **シラバス原本の最終確認**: 本レポートの項目リストは二次資料(note.com記事、2024年12月時点)を主に用いて再構成したものであり、JDLA公式PDF(第1.3版、2025年5月修正済み)の原本テキストと未突合。特に「統計的自然言語処理」「SARSA」の追加箇所、および「LLM」→「生成AI」表記統一の影響範囲(`syllabus.ts` の項目名・キーワード表記に反映すべきか)を人間側で公式PDFと照合してほしい。
2. **数理・統計(項目37)の扱い**: 指示書どおり `inScope: false` として syllabus.ts には項目だけ列挙し、カード作成対象からは除外する方針でよいか。
3. **第8章(法律・倫理)のスタブ粒度**: パイプラインのstage-2/3/7に置く法律・契約スタブ(著作権法30条の4、個人情報保護法、AI・データ契約ガイドライン等)について、IDと1行タイトルの登録のみに留めるか、summary相当の1〜2文を書くか。
4. **項目6(DL発展の歴史)のカテゴリ帰属**: 現在 `cnn-image`/`generative-ai` 等に分散している歴史的カード(`ilsvrc`, `lenet`, `alphago` 等)を `ai-history` カテゴリへ付け替えるか、現カテゴリのまま `timeline` アンカーのみで歴史軸を表現するか。後者を推奨(既存UIの破壊を避けるため)だが、承認を求める。
5. **person カードの対象人物選定**: シラバス本文には人名の明示列挙がない。ヒントン、ルカン、ベンジオ、福島邦彦、松尾豊、Vaswani(Transformer著者)等、どの範囲まで人名カード化するか、優先順位を含めて決定してほしい。
6. **項目1・2の用語のkind分類**: 「AI効果」「強いAI/弱いAI」「シンギュラリティ」等は `concept` として2質問(bornToSolve/beforeAndGap)を書くには馴染みにくい"議論・思考実験"的な用語が多い。これらを通常の `concept` として扱うか、`kind` を拡張する(例: `discussion`)必要があるか判断を仰ぎたい。現行案では無理に2質問を埋めず `status: "draft"` のまま置く運用(P2原則)で対応可能と考えるが、確認したい。
7. **タスク単位カードの粒度**: 「感情分析」「機械翻訳」「質問応答」「音声認識」「音声合成」等、シラバスでは技術(word2vec, BERT等)と並列にタスク名が列挙されている。これらをconceptカードとして新規追加するか、既存の技術カードのexamHint等に統合して済ませるか(カード数の肥大化を避けたい場合)。
8. **増補の優先順位付け**: Phase 3で全穴を一律に埋めるか、シラバスの出題比重(深層学習が相対的に厚く、社会実装は相対的に薄いという二次資料の分析)に応じて優先順位をつけるか。P4(網羅性)の観点では全項目が対象だが、作業順序の効率化のため確認したい。

---

## 6. Phase 1 着手にあたっての補足

- 型・validate基盤(Phase 1)は本レポートの結果と独立して進められる(スキーマ拡張・エッジ型追加・見本カード3枚は既存データの穴の有無によらない)。
- 一方、`syllabus.ts` の項目ID確定は§4確認事項1(公式PDF原本突合)の結果を待つのが望ましい。Phase 1では「型と骨格のみ」(指示書§6 Phase 1手順3)にとどめ、本レポートの項目リストを暫定IDとして使い、人間のレビュー後に確定させることを提案する。
- 上記1〜8について回答・承認が得られ次第、Phase 1の実行に進む。

---

以上、Phase 0完了として報告する。
