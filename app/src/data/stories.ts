export type StoryStep = {
  id: string;
  conceptId?: string;
  title: string;
  problem: string;
  next: string;
  /**
   * 章ストーリー内のセクション見出し(例: "議論", "第1次ブーム: 探索・推論")。
   * 1章=1ストーリー原則のもと、シラバス項目単位でセクションを分けて同一ストーリーに
   * 追記していく(Phase 3バッチ1レビュー承認事項8)。
   */
  section?: string;
};

export type Story = {
  id: string;
  title: string;
  /**
   * この章ストーリーが対応する timeline 上の位置(表示用の文字列)。
   * 承認事項4: 「この章のtimeline上の位置(era-XX〜YY)」を冒頭に表示する。
   */
  eraRange?: string;
  steps: StoryStep[];
};

export const stories: Story[] = [
  {
    id: "ch-ai-history",
    title: "人工知能の歴史と議論(第1章・第2章)",
    eraRange: "era-01 〜 era-04(知識表現の技術史セクションは項目4のバッチで追記予定)",
    steps: [
      {
        id: "dartmouth",
        conceptId: "dartmouth-conference",
        section: "項目2: 人工知能分野で議論される問題 — 知能とは何かを測る基準",
        title: "「人工知能」と名付けられる",
        problem: "考える機械を研究する人々はいたが、共通の名前も方法論もまだなかった。",
        next: "1956年のダートマス会議で「人工知能」と名付けられ、まず「知能とは何か」を測る基準そのものが問われることになる。",
      },
      {
        id: "turing-test-step",
        conceptId: "turing-test",
        title: "会話で見分けがつかなければ知能があるとみなす",
        problem: "機械の内部の仕組みをいくら覗いても、それが「考えている」かどうかを直接確かめる方法がない。",
        next: "チューリングは、人間と会話して区別がつかなければ知能があるとみなす、という外側から測れる基準(チューリングテスト)を提案した。",
      },
      {
        id: "loebner-prize-step",
        conceptId: "loebner-prize",
        title: "この基準は実際のコンテストにもなった",
        problem: "チューリングテストはあくまで思考実験にとどまっていた。",
        next: "ローブナーコンテストは、審査員との対話でこの基準を毎年実際に競わせる、具体的な実装として創設された。",
      },
      {
        id: "chinese-room-step",
        conceptId: "chinese-room",
        title: "会話の受け答えだけで「理解」と言えるのか",
        problem: "チューリングテストは会話の振る舞いだけを見る。だが規則どおりに記号を変換しているだけでも、テストには合格できてしまうのではないか。",
        next: "サールは「中国語の部屋」という思考実験で、規則に従って記号を変換しているだけでは意味を理解しているとは言えないと反論した。",
      },
      {
        id: "strong-weak-ai-step",
        conceptId: "strong-weak-ai",
        title: "この反論が否定しているものを整理する",
        problem: "中国語の部屋の反論は、AIの何を否定しているのか(すべてのAIを否定しているわけではなさそうだ)。",
        next: "「強いAI(本当に思考し意識を持つ)」と「弱いAI(知的に振る舞えれば十分)」という区別が生まれ、中国語の部屋は強いAIへの批判として位置づけられた。",
      },
      {
        id: "singularity-step",
        conceptId: "singularity",
        title: "AIが人間を超えたらどうなるか",
        problem: "個々の技術が実現できるかという議論を超えて、AI全体の進歩の先に何があるのかという問いも残る。",
        next: "この問いは「シンギュラリティ(技術的特異点)」として、現在の生成AIブームに至るまで繰り返し語られる論点になっている。",
      },
      {
        id: "toy-problem-step",
        conceptId: "toy-problem",
        section: "項目2 → 項目3への橋渡し: 第1次AIブームの壁",
        title: "一方、実装の現場ではもっと具体的な壁にぶつかっていた",
        problem: "哲学的な議論とは別に、第1次AIブームで実際にAIを作ろうとした現場では、探索や推論の手法を試すために「おもちゃの問題(トイ・プロブレム)」が使われていた。",
        next: "しかし現実の問題は変数や制約がはるかに多く、組合せが爆発してそのままでは通用しないことがすぐに露呈する。",
      },
      {
        id: "frame-problem-step",
        conceptId: "frame-problem",
        title: "行動の影響範囲を機械はどう区切るか",
        problem: "現実世界で行動を計画するには、その行動が引き起こす無数の帰結のうち考慮すべきものとしなくてよいものを区別する必要がある。",
        next: "この「フレーム問題」は、探索・推論だけでは知識が必要な現実の問題に対応できないという反省を生み、次の第2次AIブーム(知識表現の時代)への転換点になった。(→探索・推論の技術的な詳細は項目3の章ストーリーで扱う)",
      },
      {
        id: "knowledge-bottleneck-step",
        conceptId: "knowledge-acquisition-bottleneck",
        section: "項目2 → 項目4への橋渡し: 第2次AIブームの壁",
        title: "今度は「知識を書き込む」作業そのものが壁になる",
        problem: "第2次AIブームでは知識さえ書き込めば専門家のように賢くなるはずだと考えられたが、専門家の知識を人手でルール化し続ける作業(知識獲得のボトルネック)がすぐに膨大になった。",
        next: "記号だけを操作するシステムは、記号と実世界の意味を結びつけられない(シンボルグラウンディング問題)という、もう一つの本質的な壁にもぶつかる。(→知識表現・エキスパートシステムの技術的な詳細は項目4の章ストーリーで扱う)",
      },
      {
        id: "embodiment-step",
        conceptId: "embodiment",
        title: "身体を通じて実世界と関わることが一つの応答になる",
        problem: "記号操作だけで知能を再現しようとする限り、シンボルグラウンディング問題は解消されない。",
        next: "ロボットのように実世界とセンサー・アクチュエータを通じて関わる「身体性」の考え方が、記号に実世界の意味を根付かせる一つのアプローチとして提案された。",
      },
      {
        id: "search-tree-step",
        conceptId: "search-tree",
        section: "項目3: 探索・推論 — 第1次AIブームの具体的な中身",
        title: "探索木という土俵で、機械的に「解く」を定義する",
        problem: "ハノイの塔やSHRDLUのブロックワールドのように、ルールが明確な問題を機械に解かせるには、まず状態と行動を機械可読な形で表現する必要があった。",
        next: "状態をノード、行動を枝とする探索木という表現が使われ、この木をどう辿るかが具体的なアルゴリズムの違いになる。",
      },
      {
        id: "dfs-bfs-step",
        conceptId: "depth-first-search",
        title: "行き止まりまで進むか、浅い順に広く見るか",
        problem: "探索木を辿る方法として、メモリを節約したいのか、最短性を保証したいのかで方針が分かれる。",
        next: "深さ優先探索は行き止まりまで進んでバックトラックし、幅優先探索(breadth-first-search)は浅い順にすべて調べることで最短性を保証する。どちらも状態数が増えると計算コストが問題になる。",
      },
      {
        id: "brute-force-hanoi-step",
        conceptId: "brute-force",
        title: "確実だが、力任せでは限界がある",
        problem: "工夫せず全部試せば必ず正解にたどり着くが、状態数が増えると組合せが爆発する。",
        next: "ハノイの塔は円盤を1枚増やすだけで必要な手数が倍増する題材で、「ルールは単純、探索空間は膨大」というトイ・プロブレムの構図を具体的に示した(→項目2)。",
      },
      {
        id: "minimax-step",
        conceptId: "minimax",
        title: "対戦相手も最善を尽くすと仮定して手を選ぶ",
        problem: "チェスや将棋のような対戦ゲームでは、相手も自分に不利な手を選んでくる前提で、それでも最善となる手を選ぶ必要がある。",
        next: "Mini-Max法はこの発想でゲーム木を評価するが、木を隅々まで評価すると計算量が指数的に爆発する。",
      },
      {
        id: "alpha-beta-step",
        conceptId: "alpha-beta-pruning",
        title: "結果を変えずに、無駄な探索を切り捨てる",
        problem: "Mini-Max法をそのまま使うと、ゲームが複雑になるほど評価しなければならない手が指数的に増える。",
        next: "αβ法は、最終的な選択に影響しないと分かった時点で評価を打ち切る(枝刈り)ことで、同じ結果をより少ない計算量で得られるようにした。",
      },
      {
        id: "monte-carlo-step",
        conceptId: "monte-carlo-method",
        title: "すべて調べる代わりに、たくさん試してみる",
        problem: "αβ法で枝刈りしても、囲碁のように分岐数が桁違いに大きいゲームでは、なお計算量が現実的でない。",
        next: "モンテカルロ法は、ランダムに多数のシミュレーションを行いその統計から評価する発想に転換する。この考え方をゲーム木探索に応用したものが、後のAlphaGo(era-13)で使われるモンテカルロ木探索(MCTS)につながる。",
      },
      {
        id: "strips-step",
        conceptId: "strips",
        title: "探索とは別に、行動計画そのものを自動化する試みもあった",
        problem: "ゲームの手を選ぶ探索とは別に、ロボットが目標を達成するための行動の並びそのものを自動的に導き出したいという課題があった。",
        next: "STRIPSは行動の事前条件・事後効果を形式的に記述し、目標までの行動列を自動導出する枠組みを提示した。",
      },
      {
        id: "shrdlu-step",
        conceptId: "shrdlu",
        title: "限定された世界でなら、自然言語で指示できる",
        problem: "行動計画を自動化できても、それを自然言語で指示できなければ実用性は限られる。",
        next: "SHRDLUは積み木の世界という限定領域でなら、自然言語の指示を理解して行動できることを示した。だがこの「限定領域でしか通用しない」という制約こそが、トイ・プロブレムの姿そのものであり(→項目2)、第1次AIブームが冬に向かう理由になった。",
      },
    ],
  },
  {
    id: "ml-to-genai",
    title: "機械学習から生成AIまでの流れ",
    steps: [
      {
        id: "manual-rule",
        title: "人間がルールを書くのが難しい",
        problem: "画像、文章、音声のようなデータは、if文だけでルール化しにくい。",
        next: "データからルールを学ばせる発想が必要になる。",
      },
      {
        id: "ml",
        conceptId: "ml",
        title: "機械学習",
        problem: "データから予測ルールを学べるが、特徴量は人間が設計することが多い。",
        next: "特徴量設計の負担を減らしたくなる。",
      },
      {
        id: "feature",
        conceptId: "feature",
        title: "特徴量設計",
        problem: "何を入力にするかで性能が大きく変わり、領域知識が必要になる。",
        next: "特徴そのものをモデルに学ばせる深層学習につながる。",
      },
      {
        id: "neural-network",
        conceptId: "neural-network",
        title: "ニューラルネットワーク",
        problem: "多層化すると表現力は上がるが、学習の安定化が必要になる。",
        next: "誤差逆伝播、活性化関数、正規化、最適化が重要になる。",
      },
      {
        id: "cnn-rnn",
        conceptId: "cnn",
        title: "画像・系列への専用構造",
        problem: "画像は局所特徴、文章や音声は順序依存を扱う必要がある。",
        next: "CNN、RNN、LSTMのような構造が使われる。",
      },
      {
        id: "attention",
        conceptId: "attention",
        title: "Attention",
        problem: "長い系列では、どこを参照すべきかを直接扱いたい。",
        next: "Self-Attentionを中心にしたTransformerへ発展する。",
      },
      {
        id: "transformer",
        conceptId: "transformer",
        title: "Transformer",
        problem: "系列全体の関係を並列に扱えるため、大規模事前学習と相性が良い。",
        next: "BERT、GPT、LLM、生成AIの土台になる。",
      },
      {
        id: "genai",
        conceptId: "llm",
        title: "LLM・生成AI",
        problem: "生成はできるが、事実誤りや専門知識不足が起きる。",
        next: "RAG、ファインチューニング、RLHFなどで用途に合わせる。",
      },
    ],
  },
];
