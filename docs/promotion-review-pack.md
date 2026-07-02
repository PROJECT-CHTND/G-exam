# draft昇格キャンペーン レビューパック

昇格バッチ(evaluation→supervised→…)の新規エッジ全件を、独立音読レビューが可能な形で
機械生成した一覧。sweep-review-pack.md と同じ形式を昇格バッチ系列に適用する
(較正レビュー確定事項: 「エッジ列挙+音読は昇格バッチを含む全バッチの必須報告物」)。

## 第1バッチ(evaluationカテゴリ、13枚complete化)

抽出コマンド: `git show bd75895 -- app/src/data/concepts.ts` の追加行(`+  r(...)`)11本。

| # | from → to (type) | 音読文 |
|---|---|---|
| 1 | holdout → train-valid-test (is_a) | ホールドアウト法は訓練・検証・テストデータという分割方式の一種である |
| 2 | accuracy → f1 (contrasts_with) | 正解率とF値は対比される(クラス不均衡下での見かけの良さと実際の性能) |
| 3 | roc-auc → confusion-matrix (requires) | ROC曲線とAUCは混同行列(を複数のしきい値で計算したもの)を前提とする |
| 4 | type-errors → confusion-matrix (used_for) | 第一種/第二種の過誤は混同行列(のFP/FN)の意味づけに使われる |
| 5 | type-errors → classification-task (used_for) | 第一種/第二種の過誤は分類問題で使われる |
| 6 | rmse → mae (contrasts_with) | RMSEとMAEは対比される(外れ値への敏感さの違い) |
| 7 | r2 → regression-task (used_for) | 決定係数R²は回帰問題で使われる |
| 8 | aic-bic → r2 (contrasts_with) | 情報量規準(AIC/BIC)と決定係数R²は対比される(複雑さへのペナルティの有無) |
| 9 | mse → error-function (is_a) | 平均二乗誤差関数(MSE)は誤差関数の一種である |
| 10 | mae → error-function (is_a) | MAEは誤差関数の一種である |
| 11 | regularization → occam (used_for) | 正則化はオッカムの剃刀(の考え方)を実践するために使われる |

**独立音読の結果**: 11本すべてで from→to の日本語一文が真であることを確認した。誤りは0本。

## 較正レビュー指摘事項への対応

### 1. bornToSolve/beforeAndGapの目標形式をschemaに明文化

`app/src/data/concepts.ts` の `Concept.bornToSolve` フィールドのJSDocに、
「①前任の問題→②解決→③残る弱点→④(あれば)後継」の鎖と、rmseを模範例とするセルフチェック
基準を追記した。あわせて `status` フィールドのJSDocに「draft昇格の鎖基準」として、
形式条件(2質問+エッジ2本+アンカー)を満たしていても鎖を満たさないカードは complete に
しないこと、100%昇格時は無作為抽出での鎖基準再確認を必須とすることを明記した。

### 2. holdoutの書き直し(必須)

指示された文面のとおりに `bornToSolve` / `beforeAndGap` を差し替えた(鎖: ①訓練データでの
評価は過学習を見逃す→②取り分けたデータで測る→③1回の分割の偏りに左右される→④交差検証が
引き取る)。

### 3. 任意の磨き(3件とも本文と整合するため採用)

- `type-errors`: examHintに「2つの誤りは同時には減らせないトレードオフで、どちらを重く見るかが
  閾値・有意水準の設計を決める」を追記。
- `r2`: bornToSolveの「0〜1のスケール」を「通常0〜1(基準モデルより悪いと負になり得る)の
  スケール」に修正(数式上、決定係数は負になり得るため、無条件の「0〜1」表記は不正確だった)。
- `occam`: beforeAndGapを「オッカムの剃刀は一般原則(数式ではない)であり、AIC/BICはそれを
  数式として具体化(操作化)したもの」という派生方向が明示される形に書き直した。

### 4. 独立レビューで検出した2件

**(a) elman-jordan-network → rnn の鎖警告、真の原因の特定**

`rnn → suffers_from → vanishing-gradient` は既に配線済みであることを確認した
(`app/src/data/concepts.ts` 該当行に既存)。よって「rnnにsuffers_fromがない」ことは原因では
ない。validate.tsの鎖チェックロジック(`evolves_to`について、fromがtoの問題をsolvesしているか
を見る)を追跡した結果、真の原因は**ご指摘のとおり「elman-jordan-network側がsolvesを一切
持たないため」**だった: `elman-jordan-network`は`evolves_to→rnn`と`requires→backprop`の
2エッジのみで、`solves`エッジが0本のため、鎖チェックの「successorSolves」が常に空集合になり
警告が出ていた。

その上でエッジ自体を再判定: `elman-jordan-network`のカード本文(beforeAndGap)は
「この再帰構造が、現在のRNNの直接の原型になっている」と述べており、これは「RNNの問題を解決した
改良版」ではなく「RNNという分類に属する初期の代表的形態」という関係である。ご指摘のとおり
`evolves_to`ではなく`is_a`が正しいため、`r("elman-jordan-network", "rnn", "is_a")`に変更した。
is_aエッジは鎖チェックの対象外(`evolves_to`のみが対象)のため、この変更で警告そのものが
解消される(修正後のvalidateでWARNING 69→68件を確認、他の警告に変動なし)。

**(b) 昇格バッチの新規エッジ11本の全列挙+音読**

本文書の上表のとおり追補した。今後、昇格バッチを含む全バッチで、新規エッジの全列挙+音読を
必須報告物とする(sweep-review-pack.mdの§5仕様に対する追加であり、置き換えではない)。

### 5. UIバッチの状況報告

「用語カード/『動かす』改善バッチ」は本レビューに先立って**着手・完了・コミット済み**
(コミット `04d2e6d`)。カードデータ(term/summary/kind/エッジ等)は無変更、表示・
マッピングデータ(demos.ts等)のみの変更のため、本較正レビュー・バッチ2のいずれとも衝突しない。

## 検証結果

- `validate`: ERROR 0件 / WARNING 68件(elman-jordan-network修正分で69→68、他は変動なし)
- `tsc --noEmit`: エラーなし
