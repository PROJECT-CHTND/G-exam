# G検定 用語関連マップ（機械学習・深層学習・応用中心）

作成日: 2026-06-30

この資料は、JDLA公式のG検定シラバス見出しに沿って、機械学習・深層学習・深層学習の応用で押さえるべき用語を、図解に使いやすい関係で整理したものです。実際の出題を保証するものではなく、学習・教材設計のための概念整理として使ってください。

公式参照:
- G検定公式ページ: https://www.jdla.org/certificate/general/
- シラバス掲載ページ: https://www.jdla.org/download-category/syllabus/

## 1. 全体像

```mermaid
graph TD
AI[人工知能] --> ML[機械学習]
ML --> SL[教師あり学習]
ML --> UL[教師なし学習]
ML --> RL[強化学習]
ML --> DL[深層学習]
DL --> BASE[ニューラルネットワーク基礎]
DL --> TECH[要素技術]
DL --> APP[応用例]
TECH --> CNN[CNN・画像系]
TECH --> RNN[RNN・系列系]
TECH --> ATT[Attention / Transformer]
APP --> IMG[画像認識]
APP --> NLP[自然言語処理]
APP --> SPEECH[音声処理]
APP --> DRL[深層強化学習]
APP --> GEN[データ生成・生成AI]
APP --> TRANSFER[転移学習・ファインチューニング]
APP --> MULTI[マルチモーダル]
APP --> XAI[モデルの解釈性]
APP --> COMP[モデルの軽量化]
```

## 2. 機械学習の関係図

```mermaid
graph TD
ML[機械学習] --> SUP[教師あり学習]
ML --> UNSUP[教師なし学習]
ML --> RL[強化学習]
SUP --> CLS[分類]
SUP --> REG[回帰]
CLS --> LR[ロジスティック回帰]
CLS --> SVM[SVM]
CLS --> DT[決定木]
DT --> RF[ランダムフォレスト]
DT --> GB[勾配ブースティング]
REG --> LIN[線形回帰]
UNSUP --> CLUS[クラスタリング]
CLUS --> KMEANS[k-means]
UNSUP --> DR[次元削減]
DR --> PCA[PCA]
RL --> AGENT[エージェント]
RL --> ENV[環境]
RL --> REWARD[報酬]
RL --> POLICY[方策]
RL --> VALUE[価値関数]
```

### 機械学習で特に押さえる用語

- 学習方式: 教師あり学習、教師なし学習、強化学習
- 教師あり: 分類、回帰、線形回帰、ロジスティック回帰、決定木、ランダムフォレスト、SVM、k-NN、ナイーブベイズ、アンサンブル学習
- 教師なし: クラスタリング、k-means、階層的クラスタリング、PCA、次元削減、異常検知、協調フィルタリング
- 強化学習: エージェント、環境、状態、行動、報酬、方策、価値関数、Q学習、MDP、探索と活用
- 評価: 汎化、過学習、訓練・検証・テストデータ、交差検証、混同行列、正解率、適合率、再現率、F値、ROC、AUC、MSE、RMSE、MAE

## 3. 深層学習の学習ループ

```mermaid
graph LR
DATA[データ] --> FWD[順伝播]
FWD --> PRED[予測]
PRED --> LOSS[損失関数]
LOSS --> BP[誤差逆伝播法]
BP --> GRAD[勾配]
GRAD --> OPT[最適化手法]
OPT --> PARAM[重み・バイアス更新]
PARAM --> FWD
```

### 深層学習で特に押さえる用語

- 構造: ニューラルネットワーク、人工ニューロン、入力層、隠れ層、出力層、重み、バイアス、パラメータ
- 活性化関数: シグモイド、tanh、ReLU、Leaky ReLU、GELU、ソフトマックス
- 損失関数: MSE、交差エントロピー、二値交差エントロピー、KLダイバージェンス
- 学習: 順伝播、損失関数、勾配、誤差逆伝播法、連鎖律、エポック、バッチ、学習率
- 最適化: 勾配降下法、SGD、Momentum、AdaGrad、RMSProp、Adam、AdamW
- 汎化対策: 正則化、L1/L2、Dropout、早期終了、データ拡張
- 学習問題: 勾配消失、勾配爆発、勾配クリッピング

## 4. 要素技術と応用の接続

```mermaid
graph TD
DL[深層学習] --> FC[全結合層]
DL --> CNN[CNN]
CNN --> CONV[畳み込み層]
CNN --> POOL[プーリング層]
CNN --> IMG[画像認識]
IMG --> CLS[画像分類]
IMG --> DET[物体検出]
IMG --> SEG[セグメンテーション]
DL --> RNN[RNN]
RNN --> LSTM[LSTM]
RNN --> GRU[GRU]
DL --> ATT[Attention]
ATT --> TR[Transformer]
TR --> BERT[BERT]
TR --> GPT[GPT]
GPT --> LLM[LLM]
```

## 5. 生成AI・転移学習・マルチモーダル

```mermaid
graph TD
FM[基盤モデル] --> PT[事前学習]
PT --> FT[ファインチューニング]
PT --> FE[特徴抽出]
FT --> LORA[LoRA]
FM --> LLM[LLM]
LLM --> PROMPT[プロンプト]
LLM --> RAG[RAG]
RAG --> VEC[ベクトル検索]
FM --> MM[マルチモーダル]
MM --> CLIP[CLIP]
MM --> VLM[VLM]
GEN[生成モデル] --> GAN[GAN]
GEN --> VAE[VAE]
GEN --> DIFF[拡散モデル]
DIFF --> DENOISE[デノイジング]
```

## 6. 解釈性・軽量化・社会実装

```mermaid
graph TD
MODEL[モデル] --> XAI[説明可能AI / XAI]
XAI --> GCAM[Grad-CAM]
XAI --> SHAP[SHAP]
XAI --> LIME[LIME]
MODEL --> COMP[モデル軽量化]
COMP --> PRUNE[枝刈り]
COMP --> QUANT[量子化]
COMP --> KD[知識蒸留]
COMP --> EDGE[エッジAI]
MODEL --> OPS[MLOps]
OPS --> MON[モデル監視]
MON --> DRIFT[データドリフト/概念ドリフト]
MODEL --> GOV[AIガバナンス]
GOV --> FAIR[公平性・バイアス]
GOV --> TRANS[透明性]
GOV --> RISK[ハルシネーション等のリスク]
```

## 7. 図解を作るときの基本方針

1. まず「包含関係」を固定する: AI → 機械学習 → 深層学習 → 応用。
2. 次に「学習方式」を並列に置く: 教師あり、教師なし、強化学習。
3. 深層学習は「学習ループ」と「層・アーキテクチャ」に分ける。
4. 応用は「画像・言語・音声・生成・マルチモーダル・解釈性・軽量化」に分ける。
5. 生成AIは「モデル種別」と「利用・適応方法」を分ける。例: GAN/VAE/拡散モデルと、LLM/RAG/プロンプト/ファインチューニングは同じ図に混ぜすぎない。

## 8. 教材化の推奨構成

| 回 | テーマ | 図解の主題 | 中核用語 |
|---:|---|---|---|
| 1 | 全体像 | AI→ML→DL→応用 | 機械学習, 深層学習, 表現学習 |
| 2 | ML基礎 | 学習方式の分岐 | 教師あり, 教師なし, 強化学習 |
| 3 | 評価 | 汎化と評価指標 | 過学習, 混同行列, F値, MSE |
| 4 | DL学習 | 順伝播→逆伝播→最適化 | 損失関数, 勾配, Adam |
| 5 | CNN | 層と画像タスク | 畳み込み, プーリング, 物体検出 |
| 6 | 系列・Attention | RNN→Transformer | LSTM, Attention, Q/K/V |
| 7 | 生成AI | 生成モデルとLLM | GAN, VAE, 拡散モデル, LLM, RAG |
| 8 | 応用横断 | 転移・マルチモーダル・軽量化 | ファインチューニング, CLIP, XAI, 量子化 |
