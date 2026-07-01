import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Section from "./components/Section";
import ConceptMap from "./modules/ConceptMap";
import IrisClassifier from "./modules/IrisClassifier";
import GradientDescent from "./modules/GradientDescent";
import KMeansIris from "./modules/KMeansIris";
import Overfitting from "./modules/Overfitting";
import ThresholdROC from "./modules/ThresholdROC";
import NeuralNet from "./modules/NeuralNet";
import CNNMnist from "./modules/CNNMnist";
import Attention from "./modules/Attention";
import GenAI from "./modules/GenAI";
import PCAIris from "./modules/demos/PCAIris";
import LSTMGates from "./modules/demos/LSTMGates";
import WordEmbedding from "./modules/demos/WordEmbedding";
import ImageTaskGranularity from "./modules/demos/ImageTaskGranularity";
import BanditDemo from "./modules/demos/BanditDemo";
import ReferenceHub from "./modules/reference/ReferenceHub";

type Page = {
  id: string;
  index: string;
  label: string;
  group: "図解で学ぶ" | "用語マップ＆解説" | "まとめ";
  title: string;
  desc: string;
  content: ReactNode;
};

const PAGES: Page[] = [
  {
    id: "map",
    index: "00",
    label: "全体像",
    group: "図解で学ぶ",
    title: "AIの地図",
    desc: "機械学習・深層学習・応用の関係を、包含関係として最初に固定します。",
    content: <ConceptMap />,
  },
  {
    id: "classify",
    index: "01",
    label: "分類",
    group: "図解で学ぶ",
    title: "分類 — アヤメを見分ける (Iris実データ)",
    desc: "正解ラベル付きの実データ150件から、k近傍法が特徴空間をどう色分けするかを見ます。クリックで未知の花を分類できます。",
    content: <IrisClassifier />,
  },
  {
    id: "regression",
    index: "02",
    label: "回帰",
    group: "図解で学ぶ",
    title: "回帰 — ペンギンの体重を予測 (Palmer Penguins実データ)",
    desc: "勾配降下法を1ステップずつ動かし、直線がデータに近づき損失が下がる様子を実データで確認します。",
    content: <GradientDescent />,
  },
  {
    id: "cluster",
    index: "03",
    label: "クラスタリング",
    group: "図解で学ぶ",
    title: "クラスタリング — ラベルなしでまとめる (Iris実データ)",
    desc: "正解を使わずに、k-meansがデータの構造だけで品種をほぼ再現できることを見ます。",
    content: <KMeansIris />,
  },
  {
    id: "pca",
    index: "04",
    label: "PCA",
    group: "図解で学ぶ",
    title: "PCA — 4次元のアヤメを2次元に圧縮する",
    desc: "Irisの4特徴量を主成分へ射影し、どの程度の情報を2軸で保てるかを寄与率として見ます。",
    content: <PCAIris />,
  },
  {
    id: "bandit",
    index: "05",
    label: "強化学習",
    group: "図解で学ぶ",
    title: "強化学習 — 探索と活用を多腕バンディットで見る",
    desc: "ε-greedyで未知の選択肢を試すか、今の最善を選ぶかを切り替え、報酬の集まり方を確認します。",
    content: <BanditDemo />,
  },
  {
    id: "overfit",
    index: "06",
    label: "過学習",
    group: "図解で学ぶ",
    title: "過学習 — 複雑さのジレンマ",
    desc: "多項式の次数を上げると訓練誤差は下がり続けますが、テスト誤差はある点から増加します。この乖離を実際に計算して可視化します。",
    content: <Overfitting />,
  },
  {
    id: "metrics",
    index: "07",
    label: "評価",
    group: "図解で学ぶ",
    title: "分類の評価 — しきい値・混同行列・ROC",
    desc: "実データで学習したロジスティック回帰のスコアを使い、しきい値を動かすと指標がどう連動するかを見ます。",
    content: <ThresholdROC />,
  },
  {
    id: "nn",
    index: "08",
    label: "NN",
    group: "図解で学ぶ",
    title: "ニューラルネットワーク — 順伝播と逆伝播",
    desc: "学習ループ(順伝播→損失→逆伝播→更新)を1手ずつ追い、活性化関数の役割も確認します。",
    content: <NeuralNet />,
  },
  {
    id: "cnn",
    index: "09",
    label: "CNN",
    group: "図解で学ぶ",
    title: "CNN — 手書き数字を畳み込む (MNIST実データ)",
    desc: "実物のMNIST数字にフィルタをスライドさせ、畳み込みが特徴マップを作る過程をそのまま計算します。",
    content: <CNNMnist />,
  },
  {
    id: "image-tasks",
    index: "10",
    label: "画像タスク",
    group: "図解で学ぶ",
    title: "画像タスク粒度 — 分類・検出・セグメンテーション・姿勢推定",
    desc: "同じ画像に対して、タスクが返す答えの粒度がどう変わるかを重ね表示します。",
    content: <ImageTaskGranularity />,
  },
  {
    id: "attention",
    index: "11",
    label: "Attention",
    group: "図解で学ぶ",
    title: "Transformer — Attentionで関係を見る",
    desc: "単語ベクトルの内積とsoftmaxから、どの単語がどの単語に注目するかを計算します。",
    content: <Attention />,
  },
  {
    id: "lstm-gates",
    index: "12",
    label: "LSTM",
    group: "図解で学ぶ",
    title: "LSTM — ゲートで記憶を制御する",
    desc: "忘却・入力・出力ゲートがセル状態をどう変えるかを、系列を1ステップずつ選びながら確認します。",
    content: <LSTMGates />,
  },
  {
    id: "word2vec",
    index: "13",
    label: "word2vec",
    group: "図解で学ぶ",
    title: "word2vec — 分散表現のベクトル演算",
    desc: "単語の意味や関係がベクトル空間の方向として表れる様子を、2D埋め込みで体験します。",
    content: <WordEmbedding />,
  },
  {
    id: "genai",
    index: "14",
    label: "生成AI",
    group: "図解で学ぶ",
    title: "生成AI — RAGの検索と拡散モデル",
    desc: "質問と文書の類似度を実際に計算して検索するRAGと、ノイズから形が現れる拡散モデルを分けて見ます。",
    content: <GenAI />,
  },
  {
    id: "reference",
    index: "15",
    label: "用語マップ",
    group: "用語マップ＆解説",
    title: "公式シラバス大項目4〜6の用語関係マップ",
    desc: "機械学習から深層学習の応用まで、用語を区分・関係・対応デモでつなげて確認します。",
    content: <ReferenceHub />,
  },
  {
    id: "exam",
    index: "16",
    label: "試験の視点",
    group: "まとめ",
    title: "試験の視点 — どの関係を問われているか",
    desc: "問題文のキーワードから、どのセクションに戻ればよいかを判断します。",
    content: (
      <div className="grid two-eq">
        <ExamCard q="正解ラベルがある？" a="あるなら教師あり。カテゴリなら分類(01)、連続値なら回帰(02)。" href="#classify" />
        <ExamCard q="報酬と行動がある？" a="状態・行動・報酬・方策が出たら強化学習。探索と活用は多腕バンディット(05)。" href="#bandit" />
        <ExamCard q="ラベルがなく、まとめたい？" a="クラスタリング(k-means)や次元削減(PCA)などの教師なし学習(03/04)。" href="#cluster" />
        <ExamCard q="訓練だけ良くテストが悪い？" a="過学習(06)。正則化・Dropout・データ拡張・早期終了で抑えます。" href="#overfit" />
        <ExamCard q="不均衡データの評価？" a="正解率だけでなく適合率・再現率・F値・AUC(07)で見ます。" href="#metrics" />
        <ExamCard q="画像の局所特徴？" a="畳み込み・フィルタ・特徴マップならCNN(09)。タスク粒度は分類/検出/セグメンテーション。" href="#image-tasks" />
        <ExamCard q="系列全体の関係？" a="LSTMはゲート、TransformerはQ/K/V・自己注意。BERT・GPTの基盤。" href="#attention" />
        <ExamCard q="外部知識を検索して回答？" a="重みを変えず検索結果を使うならRAG(14)。追加学習はファインチューニング。" href="#genai" />
      </div>
    ),
  },
];

const NAV_GROUPS = ["図解で学ぶ", "用語マップ＆解説", "まとめ"] as const;

function PartLabel({ children }: { children: string }) {
  return <div className="part-label">{children}</div>;
}

export default function App() {
  const [activeId, setActiveId] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return PAGES.some((page) => page.id === hash) ? hash : "map";
  });

  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.replace("#", "");
      if (PAGES.some((page) => page.id === hash)) {
        setActiveId(hash);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const activeIndex = Math.max(
    0,
    PAGES.findIndex((page) => page.id === activeId)
  );
  const activePage = PAGES[activeIndex];
  const prevPage = PAGES[activeIndex - 1];
  const nextPage = PAGES[activeIndex + 1];
  const progress = useMemo(() => Math.round(((activeIndex + 1) / PAGES.length) * 100), [activeIndex]);

  function goTo(id: string) {
    setActiveId(id);
    window.history.pushState(null, "", `#${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app">
      <nav className="nav">
        <span className="nav-brand">G検定<span> 機械学習・深層学習</span></span>
        {PAGES.map((page) => (
          <button
            key={page.id}
            className={`nav-link ${page.id === activePage.id ? "active" : ""}`}
            onClick={() => goTo(page.id)}
          >
            {page.label}
          </button>
        ))}
      </nav>

      <div className="page-layout">
        <aside className="page-sidebar card pad">
          <div className="page-progress">
            <span>{activePage.index} / {PAGES[PAGES.length - 1].index}</span>
            <div className="progress-track">
              <div style={{ width: `${progress}%` }} />
            </div>
          </div>
          {NAV_GROUPS.map((group) => (
            <div className="page-group" key={group}>
              <PartLabel>{group}</PartLabel>
              {PAGES.filter((page) => page.group === group).map((page) => (
                <button
                  key={page.id}
                  className={`page-tab ${page.id === activePage.id ? "active" : ""}`}
                  onClick={() => goTo(page.id)}
                >
                  <span>{page.index}</span>
                  {page.label}
                </button>
              ))}
            </div>
          ))}
        </aside>

        <main className="page-main">
          <motion.div
            key={activePage.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            <Section id={activePage.id} index={activePage.index} title={activePage.title}>
              {activePage.content}
            </Section>
          </motion.div>

          <div className="page-pager">
            <button className="btn" disabled={!prevPage} onClick={() => prevPage && goTo(prevPage.id)}>
              ← 前へ {prevPage?.label}
            </button>
            <button className="btn primary" disabled={!nextPage} onClick={() => nextPage && goTo(nextPage.id)}>
              次へ {nextPage?.label} →
            </button>
          </div>
        </main>
      </div>

      <footer className="footer">
        <p>
          データ出典: Iris (Fisher / UCI ML Repository)、Palmer Penguins (Gorman et al., CC0)、MNIST (LeCun et al.)
        </p>
      </footer>
    </div>
  );
}

function ExamCard({ q, a, href }: { q: string; a: string; href: string }) {
  return (
    <a href={href} style={{ textDecoration: "none" }}>
      <motion.div className="card pad" whileHover={{ y: -3 }} style={{ height: "100%" }}>
        <h3 style={{ fontSize: 16, color: "#eef2f7", marginBottom: 6 }}>{q}</h3>
        <p style={{ color: "#aeb8c6", fontSize: 13.5 }}>{a}</p>
      </motion.div>
    </a>
  );
}
