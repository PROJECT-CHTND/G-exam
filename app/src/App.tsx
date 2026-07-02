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
import OverviewMap from "./modules/learn/OverviewMap";
import ComparisonDeck from "./modules/learn/ComparisonDeck";
import StoryFlow from "./modules/learn/StoryFlow";
import RecallCheck from "./modules/learn/RecallCheck";
import TimelineSpine from "./modules/learn/TimelineSpine";
import PipelineSpine from "./modules/learn/PipelineSpine";

type Page = {
  id: string;
  index: string;
  label: string;
  group: "学ぶ" | "動かす" | "まとめ";
  title: string;
  desc: string;
  content: ReactNode;
};

const PAGES: Page[] = [
  {
    id: "map",
    index: "00",
    label: "全体像",
    group: "学ぶ",
    title: "全体マップ",
    desc: "機械学習・深層学習・応用の関係を、包含関係として最初に固定します。",
    content: (
      <div className="learn-stack">
        <ConceptMap />
        <OverviewMap />
      </div>
    ),
  },
  {
    id: "terms",
    index: "01",
    label: "用語カード",
    group: "学ぶ",
    title: "用語カード",
    desc: "用語をテンプレで整理します。",
    content: <ReferenceHub />,
  },
  {
    id: "compare",
    index: "02",
    label: "比較",
    group: "学ぶ",
    title: "比較で覚える",
    desc: "似た用語を対比して覚えます。",
    content: <ComparisonDeck />,
  },
  {
    id: "story",
    index: "03",
    label: "ストーリー",
    group: "学ぶ",
    title: "流れで覚える",
    desc: "なぜ次の技術が出てきたかを追います。",
    content: <StoryFlow />,
  },
  {
    id: "timeline",
    index: "04",
    label: "技術史年表",
    group: "学ぶ",
    title: "技術史年表 — 期待・壁・突破の縦軸",
    desc: "AI史を「何が期待され、何が壁になり、何が突破したか」の一本道として辿ります。",
    content: <TimelineSpine />,
  },
  {
    id: "pipeline",
    index: "05",
    label: "社会実装",
    group: "学ぶ",
    title: "社会実装パイプライン — 企画から運用までの横軸",
    desc: "外観検査AIを題材に、企画→データ→学習→評価→デプロイ→運用の一連の流れを辿ります。",
    content: <PipelineSpine />,
  },
  {
    id: "recall",
    index: "06",
    label: "白紙再現",
    group: "学ぶ",
    title: "白紙再現チェック",
    desc: "何も見ずに説明できるか確認します。",
    content: <RecallCheck />,
  },
  {
    id: "classify",
    index: "07",
    label: "分類",
    group: "動かす",
    title: "分類 — アヤメを見分ける (Iris実データ)",
    desc: "正解ラベル付きの実データ150件から、k近傍法が特徴空間をどう色分けするかを見ます。クリックで未知の花を分類できます。",
    content: <IrisClassifier />,
  },
  {
    id: "regression",
    index: "08",
    label: "回帰",
    group: "動かす",
    title: "回帰 — ペンギンの体重を予測 (Palmer Penguins実データ)",
    desc: "勾配降下法を1ステップずつ動かし、直線がデータに近づき損失が下がる様子を実データで確認します。",
    content: <GradientDescent />,
  },
  {
    id: "cluster",
    index: "09",
    label: "クラスタリング",
    group: "動かす",
    title: "クラスタリング — ラベルなしでまとめる (Iris実データ)",
    desc: "正解を使わずに、k-meansがデータの構造だけで品種をほぼ再現できることを見ます。",
    content: <KMeansIris />,
  },
  {
    id: "pca",
    index: "10",
    label: "PCA",
    group: "動かす",
    title: "PCA — 4次元のアヤメを2次元に圧縮する",
    desc: "Irisの4特徴量を主成分へ射影し、どの程度の情報を2軸で保てるかを寄与率として見ます。",
    content: <PCAIris />,
  },
  {
    id: "bandit",
    index: "11",
    label: "強化学習",
    group: "動かす",
    title: "強化学習 — 探索と活用を多腕バンディットで見る",
    desc: "ε-greedyで未知の選択肢を試すか、今の最善を選ぶかを切り替え、報酬の集まり方を確認します。",
    content: <BanditDemo />,
  },
  {
    id: "overfit",
    index: "12",
    label: "過学習",
    group: "動かす",
    title: "過学習 — 複雑さのジレンマ",
    desc: "多項式の次数を上げると訓練誤差は下がり続けますが、テスト誤差はある点から増加します。この乖離を実際に計算して可視化します。",
    content: <Overfitting />,
  },
  {
    id: "metrics",
    index: "13",
    label: "評価",
    group: "動かす",
    title: "分類の評価 — しきい値・混同行列・ROC",
    desc: "実データで学習したロジスティック回帰のスコアを使い、しきい値を動かすと指標がどう連動するかを見ます。",
    content: <ThresholdROC />,
  },
  {
    id: "nn",
    index: "14",
    label: "NN",
    group: "動かす",
    title: "ニューラルネットワーク — 順伝播と逆伝播",
    desc: "学習ループ(順伝播→損失→逆伝播→更新)を1手ずつ追い、活性化関数の役割も確認します。",
    content: <NeuralNet />,
  },
  {
    id: "cnn",
    index: "15",
    label: "CNN",
    group: "動かす",
    title: "CNN — 手書き数字を畳み込む (MNIST実データ)",
    desc: "実物のMNIST数字にフィルタをスライドさせ、畳み込みが特徴マップを作る過程をそのまま計算します。",
    content: <CNNMnist />,
  },
  {
    id: "image-tasks",
    index: "16",
    label: "画像タスク",
    group: "動かす",
    title: "画像タスク粒度 — 分類・検出・セグメンテーション・姿勢推定",
    desc: "同じ画像に対して、タスクが返す答えの粒度がどう変わるかを重ね表示します。",
    content: <ImageTaskGranularity />,
  },
  {
    id: "attention",
    index: "17",
    label: "Attention",
    group: "動かす",
    title: "Transformer — Attentionで関係を見る",
    desc: "単語ベクトルの内積とsoftmaxから、どの単語がどの単語に注目するかを計算します。",
    content: <Attention />,
  },
  {
    id: "lstm-gates",
    index: "18",
    label: "LSTM",
    group: "動かす",
    title: "LSTM — ゲートで記憶を制御する",
    desc: "忘却・入力・出力ゲートがセル状態をどう変えるかを、系列を1ステップずつ選びながら確認します。",
    content: <LSTMGates />,
  },
  {
    id: "word2vec",
    index: "19",
    label: "word2vec",
    group: "動かす",
    title: "word2vec — 分散表現のベクトル演算",
    desc: "単語の意味や関係がベクトル空間の方向として表れる様子を、2D埋め込みで体験します。",
    content: <WordEmbedding />,
  },
  {
    id: "genai",
    index: "20",
    label: "生成AI",
    group: "動かす",
    title: "生成AI — RAGの検索と拡散モデル",
    desc: "質問と文書の類似度を実際に計算して検索するRAGと、ノイズから形が現れる拡散モデルを分けて見ます。",
    content: <GenAI />,
  },
  {
    id: "exam",
    index: "21",
    label: "試験の視点",
    group: "まとめ",
    title: "試験の視点 — どの関係を問われているか",
    desc: "問題文のキーワードから、どのセクションに戻ればよいかを判断します。",
    content: (
      <div className="grid two-eq">
        <ExamCard q="正解ラベルがある？" a="あるなら教師あり。カテゴリなら分類(07)、連続値なら回帰(08)。" href="#classify" />
        <ExamCard q="報酬と行動がある？" a="状態・行動・報酬・方策が出たら強化学習。探索と活用は多腕バンディット(11)。" href="#bandit" />
        <ExamCard q="ラベルがなく、まとめたい？" a="クラスタリング(k-means)や次元削減(PCA)などの教師なし学習(09/10)。" href="#cluster" />
        <ExamCard q="訓練だけ良くテストが悪い？" a="過学習(12)。正則化・Dropout・データ拡張・早期終了で抑えます。" href="#overfit" />
        <ExamCard q="不均衡データの評価？" a="正解率だけでなく適合率・再現率・F値・AUC(13)で見ます。" href="#metrics" />
        <ExamCard q="画像の局所特徴？" a="畳み込み・フィルタ・特徴マップならCNN(15)。タスク粒度は分類/検出/セグメンテーション。" href="#image-tasks" />
        <ExamCard q="系列全体の関係？" a="LSTMはゲート、TransformerはQ/K/V・自己注意。BERT・GPTの基盤。" href="#attention" />
        <ExamCard q="外部知識を検索して回答？" a="重みを変えず検索結果を使うならRAG(20)。追加学習はファインチューニング。" href="#genai" />
      </div>
    ),
  },
];

const NAV_GROUPS = ["学ぶ", "動かす", "まとめ"] as const;

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
