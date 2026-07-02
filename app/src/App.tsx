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
import DemoIntro from "./modules/demos/DemoIntro";
import { demos, demoCategoryMeta, type DemoCategory } from "./data/demos";

type Page = {
  id: string;
  index: string;
  label: string;
  group: "学ぶ" | "動かす" | "まとめ";
  /** 「動かす」ページのみ設定。サイドバーの章グループ見出しに使う。 */
  demoCategory?: DemoCategory;
  title: string;
  desc: string;
  content: ReactNode;
};

/** demos.ts のidと実際のデモコンポーネントの対応(ロジック自体は変更しない)。 */
const DEMO_COMPONENTS: Record<string, ReactNode> = {
  classify: <IrisClassifier />,
  regression: <GradientDescent />,
  cluster: <KMeansIris />,
  pca: <PCAIris />,
  bandit: <BanditDemo />,
  overfit: <Overfitting />,
  metrics: <ThresholdROC />,
  nn: <NeuralNet />,
  cnn: <CNNMnist />,
  "image-tasks": <ImageTaskGranularity />,
  attention: <Attention />,
  "lstm-gates": <LSTMGates />,
  word2vec: <WordEmbedding />,
  genai: <GenAI />,
};

const DEMO_PAGES: Page[] = demos.map((demo, i) => ({
  id: demo.id,
  index: String(7 + i).padStart(2, "0"),
  label: demo.navLabel,
  group: "動かす",
  demoCategory: demo.category,
  title: demo.title,
  desc: demo.whatYouSee,
  content: (
    <div className="learn-stack">
      <DemoIntro demo={demo} />
      {DEMO_COMPONENTS[demo.id]}
    </div>
  ),
}));

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
  ...DEMO_PAGES,
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
          {NAV_GROUPS.map((group) => {
            const groupPages = PAGES.filter((page) => page.group === group);
            let lastDemoCategory: DemoCategory | undefined;
            return (
              <div className="page-group" key={group}>
                <PartLabel>{group}</PartLabel>
                {groupPages.map((page) => {
                  const showCategoryHeading = page.demoCategory && page.demoCategory !== lastDemoCategory;
                  lastDemoCategory = page.demoCategory;
                  return (
                    <div key={page.id}>
                      {showCategoryHeading && (
                        <div className="page-subgroup-label">{demoCategoryMeta[page.demoCategory!].label}</div>
                      )}
                      <button
                        className={`page-tab ${page.id === activePage.id ? "active" : ""}`}
                        onClick={() => goTo(page.id)}
                      >
                        <span>{page.index}</span>
                        {page.label}
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
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
