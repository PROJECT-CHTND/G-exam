/**
 * G検定シラバス(機械可読データ)。
 *
 * 出典・確定状況:
 * - 現行版は G2024#6〜適用シラバス(2024年11月改訂、JDLA公式テキスト第3版に対応)。
 *   2025年5月に「第1.3版」として軽微修正(統計的自然言語処理・単回帰分析・SARSA・
 *   真陽性/真陰性の追加、LLM→「生成AI」表記統一等)が行われ、2026年も本版が継続使用されている。
 * - 本ファイルの項目ID・キーワードは docs/audit-report.md Phase 0 監査時点の二次資料突合に基づく
 *   **暫定(provisional)** 値であり、承認者による Phase 0 回答(第1.3版差分の反映指示)を織り込み済み。
 *   ただし JDLA公式PDF原本との人間による目視突合は未実施(PDF自体はリポジトリに含めない)。
 *   突合が完了するまでは項目ID・キーワードを最終確定とみなさないこと。
 * - 章立ては JDLA公式テキスト第3版の目次(第1章〜第8章 + Appendix + 数理・統計)と対応する。
 */

export type SyllabusItem = {
  /** 暫定ID。docs/audit-report.md §2 のカバレッジ表と同じ通し番号(1〜37)を用いる。 */
  id: string;
  title: string;
  keywords: string[];
};

export type SyllabusSection = {
  id: string;
  title: string;
  /** true: 本計画のスコープ内(カード作成対象)。false: パイプラインのdraftスタブのみ、または対象外。 */
  inScope: boolean;
  items: SyllabusItem[];
};

export const syllabusVersion =
  "G2024#6〜適用(2024年11月改訂・2025年5月 第1.3版) — provisional: 公式PDF原本との人間目視突合待ち(docs/audit-report.md §1.3参照)";

export const syllabus: SyllabusSection[] = [
  {
    id: "sec-1",
    title: "第1章 人工知能(AI)とは",
    inScope: true,
    items: [
      {
        id: "1",
        title: "人工知能の定義",
        keywords: ["AI効果", "エージェント", "人工知能", "機械学習", "ディープラーニング", "人工知能のレベル分類(単純な制御プログラム/古典的な人工知能/機械学習/深層学習)"],
      },
      {
        id: "2",
        title: "人工知能分野で議論される問題",
        keywords: [
          "シンギュラリティ",
          "シンボルグラウンディング問題",
          "身体性",
          "ダートマス会議",
          "トイ・プロブレム",
          "知識獲得のボトルネック",
          "チューリングテスト",
          "中国語の部屋",
          "強いAIと弱いAI",
          "統計的機械翻訳",
          "フレーム問題",
          "ルールベース機械翻訳",
          "ローブナーコンテスト",
        ],
      },
    ],
  },
  {
    id: "sec-2",
    title: "第2章 人工知能をめぐる動向",
    inScope: true,
    items: [
      {
        id: "3",
        title: "探索・推論",
        keywords: ["αβ法", "Mini-Max法", "SHRDLU", "STRIPS", "探索木", "ハノイの塔", "幅優先探索", "深さ優先探索", "ブルートフォース", "モンテカルロ法"],
      },
      {
        id: "4",
        title: "知識表現とエキスパートシステム",
        keywords: [
          "Cycプロジェクト",
          "DENDRAL",
          "is-aの関係・has-aの関係・part-ofの関係",
          "Question-Answering",
          "意味ネットワーク",
          "イライザ(ELIZA)",
          "インタビューシステム",
          "ウェブマイニング",
          "オントロジー",
          "セマンティックWeb",
          "データマイニング",
          "東ロボくん",
          "マイシン(MYCIN)",
          "ワトソン",
        ],
      },
      {
        id: "5",
        title: "機械学習",
        keywords: ["次元の呪い", "スパムフィルター", "ビッグデータ", "レコメンデーションエンジン", "統計的自然言語処理"],
      },
      {
        id: "6",
        title: "ディープラーニング(発展の歴史)",
        keywords: ["ImageNet", "ILSVRC", "LeNet", "アルファ碁(AlphaGo)", "人間の神経回路", "ネオコグニトロン", "生成AI"],
      },
    ],
  },
  {
    id: "sec-3",
    title: "第3章 機械学習の具体的手法",
    inScope: true,
    items: [
      {
        id: "7",
        title: "教師あり学習",
        keywords: [
          "AdaBoost",
          "アンサンブル学習",
          "カーネル",
          "カーネルトリック",
          "回帰問題",
          "決定木",
          "勾配ブースティング",
          "サポートベクターマシン(SVM)",
          "単回帰分析",
          "線形回帰",
          "自己回帰モデル(AR)",
          "重回帰分析",
          "多クラス分類",
          "バギング",
          "ブースティング",
          "ブートストラップサンプリング",
          "分類問題",
          "ベクトル自己回帰モデル(VARモデル)",
          "マージン最大化",
          "ランダムフォレスト",
          "ロジスティック回帰",
        ],
      },
      {
        id: "8",
        title: "教師なし学習",
        keywords: [
          "k-means法",
          "t-SNE",
          "ウォード法",
          "協調フィルタリング",
          "クラスタリング",
          "コールドスタート問題",
          "コンテンツベースフィルタリング",
          "次元削減",
          "主成分分析(PCA)",
          "潜在的ディリクレ配分法(LDA)",
          "多次元尺度構成法",
          "デンドログラム(樹形図)",
          "特異値分解(SVD)",
          "トピックモデル",
        ],
      },
      {
        id: "9",
        title: "強化学習",
        keywords: [
          "Actor-Critic",
          "ε-greedy方策",
          "REINFORCE",
          "Q学習",
          "SARSA",
          "UCB方策",
          "行動価値関数",
          "状態価値関数",
          "バンディットアルゴリズム",
          "方策勾配法",
          "マルコフ決定過程",
          "割引率",
        ],
      },
      {
        id: "10",
        title: "モデルの選択・評価",
        keywords: [
          "k分割交差検証",
          "MSE・RMSE・MAE",
          "ROC曲線・AUC",
          "赤池情報量規準(AIC)",
          "オッカムの剃刀",
          "過学習",
          "交差検証",
          "偽陽性・偽陰性",
          "真陽性・真陰性",
          "混同行列",
          "正解率・適合率・再現率・F値",
          "汎化性能",
          "ベイズ情報量規準(BIC)",
          "ホールドアウト検証",
        ],
      },
    ],
  },
  {
    id: "sec-4",
    title: "第4章 ディープラーニングの概要",
    inScope: true,
    items: [
      {
        id: "11",
        title: "ニューラルネットワークとディープラーニング",
        keywords: ["CPU", "GPU", "TPU", "隠れ層・入力層・出力層", "多層パーセプトロン", "単純パーセプトロン"],
      },
      {
        id: "12",
        title: "活性化関数",
        keywords: ["Leaky ReLU関数", "ReLU関数", "tanh関数", "シグモイド関数", "ソフトマックス関数", "勾配消失問題"],
      },
      {
        id: "13",
        title: "誤差関数",
        keywords: ["Contrastive loss", "Triplet Loss", "カルバック・ライブラー情報量(KL)", "交差エントロピー", "平均二乗誤差関数"],
      },
      {
        id: "14",
        title: "正則化",
        keywords: ["L0正則化", "L1正則化", "L2正則化", "正則化", "ドロップアウト", "ラッソ回帰", "リッジ回帰"],
      },
      {
        id: "15",
        title: "誤差逆伝播法",
        keywords: ["勾配消失問題", "勾配爆発問題", "信用割当問題", "連鎖律"],
      },
      {
        id: "16",
        title: "最適化手法",
        keywords: [
          "AdaBound",
          "AdaDelta",
          "AdaGrad",
          "Adam",
          "AMSBound",
          "RMSprop",
          "鞍点",
          "イテレーション",
          "エポック",
          "オンライン学習",
          "学習率",
          "確率的勾配降下法(SGD)",
          "グリッドサーチ",
          "勾配降下法",
          "局所最適解",
          "早期終了",
          "大域最適解",
          "二重降下現象",
          "ノーフリーランチの定理",
          "ハイパーパラメータ",
          "バッチ学習",
          "ミニバッチ学習",
          "モーメンタム",
          "ランダムサーチ",
        ],
      },
    ],
  },
  {
    id: "sec-5",
    title: "第5章 ディープラーニングの要素技術",
    inScope: true,
    items: [
      { id: "17", title: "全結合層", keywords: ["重み", "線形関数"] },
      {
        id: "18",
        title: "畳み込み層",
        keywords: ["Atrous Convolution", "Depthwise Separable Convolution", "Dilation Convolution", "カーネル", "ストライド", "畳み込み操作", "畳み込みニューラルネットワーク(CNN)", "特徴マップ", "パディング", "フィルタ"],
      },
      { id: "19", title: "正規化層", keywords: ["グループ正規化", "バッチ正規化", "レイヤー正規化", "インスタンス正規化"] },
      { id: "20", title: "プーリング層", keywords: ["グローバルアベレージプーリング(GAP)", "最大値プーリング", "不変性の獲得", "平均値プーリング"] },
      { id: "21", title: "スキップ結合", keywords: ["スキップ結合", "Residual Network(ResNet)"] },
      {
        id: "22",
        title: "回帰結合層(RNN)",
        keywords: [
          "Back Propagation Through Time(BPTT)",
          "Gated Recurrent Unit(GRU)",
          "Long Short-Term Memory(LSTM)",
          "エルマンネットワーク",
          "勾配消失問題",
          "勾配爆発問題",
          "教師強制",
          "ゲート機構",
          "双方向RNN(Bidirectional RNN)",
          "時系列データ",
          "ジョルダンネットワーク",
          "リカレントニューラルネットワーク(RNN)",
        ],
      },
      {
        id: "23",
        title: "Attention",
        keywords: ["Attention", "Multi-Head Attention", "Self-Attention", "Seq2Seq", "Source Target Attention", "Transformer", "位置エンコーディング", "キー", "クエリ", "バリュー"],
      },
      {
        id: "24",
        title: "オートエンコーダ",
        keywords: ["VQ-VAE", "info VAE", "β-VAE", "次元削減", "事前学習", "積層オートエンコーダ", "変分オートエンコーダ(VAE)"],
      },
      {
        id: "25",
        title: "データ拡張",
        keywords: ["Contrast", "Brightness", "Crop", "CutMix", "Cutout", "Mixup", "noising", "paraphrasing", "RandAugment", "Random Erasing", "Random Flip", "Rotate"],
      },
    ],
  },
  {
    id: "sec-6",
    title: "第6章 ディープラーニングの応用例",
    inScope: true,
    items: [
      {
        id: "26",
        title: "画像認識",
        keywords: [
          "AlexNet", "DeepLab", "DenseNet", "EfficientNet", "Fast R-CNN", "Faster R-CNN", "FCN", "FPN",
          "GoogLeNet", "Mask R-CNN", "MnasNet", "MobileNet", "NAS", "Open Pose", "PSPNet", "ResNet",
          "SegNet", "SENet", "SSD", "U-Net", "VGG", "Vision Transformer", "Wide ResNet", "YOLO",
          "一般物体認識", "インスタンスセグメンテーション", "姿勢推定", "セマンティックセグメンテーション",
          "物体検出", "物体識別", "パノプティックセグメンテーション",
        ],
      },
      {
        id: "27",
        title: "自然言語処理",
        keywords: [
          "BERT", "BoW(Bag-of-Words)", "CBOW", "CEC", "ChatGPT", "ELMo", "fastText", "GLUE", "GPT-n",
          "N-gram", "PaLM", "Seq2Seq", "TF-IDF", "word2vec", "感情分析", "機械翻訳", "形態素解析",
          "構文解析", "質問応答", "情報検索", "スキップグラム", "単語埋め込み", "分散表現", "文書要約",
          "ワンホットベクトル", "生成AI(大規模言語モデル)", "統計的機械翻訳",
        ],
      },
      {
        id: "28",
        title: "音声処理",
        keywords: [
          "A-D変換", "WaveNet", "音韻", "音声合成", "音声認識", "音素", "隠れマルコフモデル", "感情分析",
          "高速フーリエ変換(FFT)", "スペクトル包絡", "パルス符号変調器(PCM)", "フォルマント",
          "フォルマント周波数", "メル周波数ケプストラム係数(MFCC)", "メル尺度", "話者識別", "CTC",
        ],
      },
      {
        id: "29",
        title: "深層強化学習",
        keywords: [
          "A3C", "Agent57", "APE-X", "DQN", "OpenAI Five", "PPO", "Rainbow", "RLHF", "sim2real",
          "アルファスター(AlphaStar)", "オフライン強化学習", "残差強化学習", "状態表現学習",
          "ダブルDQN", "デュエリングネットワーク", "ドメインランダマイゼーション", "ノイジーネットワーク",
          "報酬成形", "マルチエージェント強化学習(MARL)", "強化学習", "連続値制御",
        ],
      },
      {
        id: "30",
        title: "データ生成",
        keywords: ["CycleGAN", "DCGAN", "Diffusion Model", "NeRF", "Pix2Pix", "音声生成", "画像生成", "敵対的生成ネットワーク(GAN)", "文章生成"],
      },
      {
        id: "31",
        title: "転移学習・ファインチューニング",
        keywords: ["Few-shot", "One-shot", "自己教師あり学習", "事前学習", "事前学習済みモデル", "破壊的忘却", "半教師あり学習"],
      },
      {
        id: "32",
        title: "マルチモーダル",
        keywords: ["CLIP", "DALL-E", "Flamingo", "Image Captioning", "Text-To-Image", "Visual Question Answering", "Unified-IO", "zero-shot", "基盤モデル", "マルチタスク学習"],
      },
      {
        id: "33",
        title: "モデルの解釈性",
        keywords: ["CAM", "Grad-CAM", "LIME", "Permutation Importance", "SHAP", "説明可能AI(XAI)"],
      },
      {
        id: "34",
        title: "モデルの軽量化",
        keywords: ["エッジAI", "蒸留", "宝くじ仮説", "プルーニング", "モデル圧縮", "量子化"],
      },
    ],
  },
  {
    id: "sec-7",
    title: "第7章 AIの社会実装に向けて",
    inScope: true,
    items: [
      {
        id: "35",
        title: "AIプロジェクトの進め方",
        keywords: [
          "AIのビジネス活用", "AIプロジェクトの進め方", "BPR", "CRISP-DM", "CRISP-ML", "Docker",
          "Jupyter Notebook", "MLOps", "PoC", "Python", "Web API", "アジャイル", "ウォーターフォール",
          "オープン・イノベーション", "クラウド", "産学連携", "ステークホルダーのニーズ",
          "データサイエンティスト", "他企業や他業種との連携",
        ],
      },
      {
        id: "36",
        title: "データの収集・加工・分析・学習",
        keywords: ["アノテーション", "オープンデータセット", "コーパス", "データリーケージ"],
      },
    ],
  },
  {
    id: "sec-8",
    title: "第8章 AIの法律と倫理",
    inScope: false,
    items: [
      {
        id: "38",
        title: "AIの法律と倫理(範囲外・パイプラインの draft スタブでのみ言及)",
        keywords: ["著作権法第30条の4", "個人情報保護法", "AI・データ契約ガイドライン", "AIガバナンス", "公平性・透明性・アカウンタビリティ"],
      },
    ],
  },
  {
    id: "sec-math",
    title: "AIに必要な数理・統計知識(出題範囲としては別掲)",
    inScope: false,
    items: [
      {
        id: "37",
        title: "AIに必要な数理・統計知識",
        keywords: [
          "移動平均", "確率分布", "確率変数", "確率密度", "疑似相関", "期待値", "帰無仮説", "共分散",
          "コサイン類似度", "最小二乗法", "最頻値", "最尤法", "条件付き確率", "正規分布", "相関係数",
          "相互情報量", "対立仮説", "中央値", "度数分布", "二項分布", "外れ値", "標準偏差", "平均",
          "分散", "偏相関係数", "ベルヌーイ分布", "ポアソン分布", "マハラノビス距離", "ユークリッド距離",
        ],
      },
    ],
  },
];

export const syllabusItemById: Record<string, { section: SyllabusSection; item: SyllabusItem }> = Object.fromEntries(
  syllabus.flatMap((section) => section.items.map((item) => [item.id, { section, item }]))
);
