import type {
  ReadingListItem,
  ReviewingArticle,
  TrackingArticle,
} from '@/components/my-reading/types'

export const fakeTrackingArticles: TrackingArticle[] = [
  {
    slug: 'tracking-migrant-dormitory-1',
    publishDate: '2026/03/21',
    trackingTitle: '產業外移之後：移工宿舍安全規範仍未落地',
    trackingContent:
      '事故調查完成後，地方政府雖已提出改善方案，但跨部會協作與預算分配仍未有明確時程。',
    trackingArticleTitle: '宿舍失火後，制度修補為何總慢一步？',
    trackingArticleSlug: 'tracking-migrant-dormitory-1',
  },
  {
    slug: 'tracking-migrant-dormitory-2',
    publishDate: '2026/03/11',
    trackingTitle: '地方長照計畫更新：夜間照護試辦擴大三縣市',
    trackingContent:
      '衛福體系提出新一輪補助方案，地方端表示人力仍為最大瓶頸，照服員留任配套成關鍵。',
    trackingArticleTitle: '高齡社會的夜晚，誰在撐住照護缺口',
    trackingArticleSlug: 'tracking-longterm-care-2',
  },
  {
    slug: 'tracking-migrant-dormitory-3',
    publishDate: '2026/02/27',
    trackingTitle: '校園數位平台採購爭議：教育部公布審查原則',
    trackingContent:
      '新版指引納入資安稽核與資料最小化原則，學校端關注實作成本與既有系統轉換期。',
    trackingArticleTitle: '當教室走向雲端，學生資料如何被保護？',
    trackingArticleSlug: 'tracking-edtech-3',
  },
  {
    slug: 'tracking-migrant-dormitory-4',
    publishDate: '2026/02/19',
    trackingTitle: '山區道路復建第二階段啟動，原鄉通行時間縮短',
    trackingContent:
      '工程改善坡面排水後，雨季封路天數下降，但部落仍盼建立長期監測與緊急運補機制。',
    trackingArticleTitle: '颱風過後的日常，原鄉交通復原路還有多遠',
    trackingArticleSlug: 'tracking-indigenous-road-4',
  },
  {
    slug: 'tracking-migrant-dormitory-5',
    publishDate: '2026/01/30',
    trackingTitle: '沿海離岸風電環評附帶條件首度啟動追蹤會議',
    trackingContent: '漁業補償與生態監測資料公開化有進展。',
    trackingArticleTitle: '風場與漁場能否共存？離岸能源的下一步',
    trackingArticleSlug: 'tracking-offshore-wind-5',
  },
]

export const fakeSavedBookmarks: ReadingListItem[] = [
  {
    slug: 'saved-water-governance',
    title: '水資源治理重啟：地方配水爭議下的透明化改革',
    category: '環境',
    description: '枯水期常態化後，跨區供水決策如何對民眾清楚說明。',
    publishedDate: '2026/03/18',
    image:
      'https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'saved-learning-portfolio',
    title: '學習歷程檔案上路三年：城鄉資源差距是否擴大',
    category: '教育',
    description: '第一線教師與學生回看制度，最常出現的困境與修正建議。',
    publishedDate: '2026/03/02',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'saved-night-economy',
    title: '夜班經濟復甦：24 小時城市背後的勞動條件',
    category: '勞動',
    description: '物流與外送需求攀升，夜間工作者的工時與風險如何被看見。',
    publishedDate: '2026/02/25',
    image:
      'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'saved-pension-debate',
    title: '長照財源爭議：稅收制還是保費制，誰來買單',
    category: '社會',
    description: '高齡化加速下，各黨對長照財源的主張差異與可行性分析。',
    publishedDate: '2026/02/18',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'saved-indigenous-land',
    title: '原住民族土地權利新進展：諮商同意程序的落實困境',
    category: '原住民族',
    description: '法規已明定諮商同意權，但執行細節仍讓部落陷入資訊不對等。',
    publishedDate: '2026/02/10',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'saved-media-trust',
    title: '媒體信任度調查：台灣讀者怎麼評估新聞可信度',
    category: '媒體',
    description: '跨平台閱讀習慣改變後，受訪者對主流媒體的信任指數有何變化。',
    publishedDate: '2026/01/30',
    image:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'saved-air-quality',
    title: '空氣品質季節性惡化：工業排放與農業燃燒誰影響更大',
    category: '環境',
    description: '跨部會監測數據首度整合公開，污染來源比例引發政策討論。',
    publishedDate: '2026/01/22',
    image:
      'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'saved-rural-hospital',
    title: '偏鄉醫院存亡之際：轉型社區健康中心能撐住嗎',
    category: '醫療',
    description: '多家地區醫院財務吃緊，衛福部試辦轉型方案的第一年成果檢視。',
    publishedDate: '2026/01/14',
    image:
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'saved-digital-divide',
    title: '數位落差不只是網路速度：高齡者使用障礙的另一面',
    category: '科技',
    description: '硬體普及後，操作理解與心理障礙成為下一個需要解決的課題。',
    publishedDate: '2026/01/06',
    image:
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'saved-sports-facilities',
    title: '公共運動設施使用率偏低：設計問題還是推廣不足',
    category: '城市',
    description: '各縣市投入大量預算興建，但閒置率居高不下，背後原因逐一拆解。',
    publishedDate: '2025-12/28',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'saved-birth-rate',
    title: '出生率創歷史新低：政策補貼之外還缺什麼',
    category: '社會',
    description: '年輕世代對生育意願的深度訪談，揭示補貼以外的結構性障礙。',
    publishedDate: '2025-12/19',
    image:
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
]

export const fakeBrowsingHistory: ReadingListItem[] = [
  {
    slug: 'browsing-housing-policy',
    title: '社宅新制上路一年：租金分級真的更公平了嗎',
    category: '居住',
    description: '從申請門檻到輪候制度，住戶與地方政府的觀察一次整理。',
    publishedDate: '2026/03/17',
    image:
      'https://images.unsplash.com/photo-1460317442991/0ec209397118?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'browsing-algorithm-governance',
    title: '社群媒體演算法治理草案：平台責任怎麼定義',
    category: '科技',
    description: '言論自由與內容風險之間，立法機關如何畫出邊界。',
    publishedDate: '2026/03/09',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    isBookmark: false,
  },
  {
    slug: 'browsing-mountain-tourism',
    title: '高山觀光限流試辦：保育與地方生計的新平衡',
    category: '地景',
    description: '熱門步道啟動預約與總量管制後，社區產業鏈有哪些改變。',
    publishedDate: '2026/02/26',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'browsing-er-congestion',
    title: '急診壅塞常態化：分級醫療政策下一步',
    category: '醫療',
    description: '醫院前線提出的四項改革建議，是否能有效分流就醫需求。',
    publishedDate: '2026/02/11',
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    isBookmark: false,
  },
  {
    slug: 'browsing-pension-reform',
    title: '年金改革五年後：基層公務員怎麼看退休保障',
    category: '社會',
    description: '制度調整後的實際影響，從第一線人員角度重新盤點。',
    publishedDate: '2026/02/05',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'browsing-ev-infrastructure',
    title: '電動車普及的隱形門檻：充電基礎建設誰來補齊',
    category: '交通',
    description: '補貼政策推動購車意願，但充電樁密度不足仍讓消費者卻步。',
    publishedDate: '2026/01/28',
    image:
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80',
    isBookmark: false,
  },
  {
    slug: 'browsing-food-safety',
    title: '校園午餐食安稽查：地方政府的執行落差有多大',
    category: '教育',
    description: '中央標準趨嚴，但各縣市稽查人力與頻率仍參差不齊。',
    publishedDate: '2026/01/19',
    image:
      'https://images.unsplash.com/photo-1504674900247/0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'browsing-river-restoration',
    title: '河川治理新方向：還地於河能解決洪患嗎',
    category: '環境',
    description: '部分縣市試行退堤與濕地復育，效果與居民接受度各有評估。',
    publishedDate: '2026/01/12',
    image:
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80',
    isBookmark: false,
  },
  {
    slug: 'browsing-night-economy',
    title: '夜間經濟與居民衝突：商圈擴張的邊界在哪裡',
    category: '城市',
    description: '營業時間延長帶動消費，但噪音與垃圾問題讓周邊住戶反彈。',
    publishedDate: '2025-12/30',
    image:
      'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
  {
    slug: 'browsing-ai-hiring',
    title: 'AI 篩履歷已成常態：求職者如何應對演算法關卡',
    category: '勞動',
    description: '企業導入自動化初篩節省成本，但求職者投訴偏見的案例也在增加。',
    publishedDate: '2025-12/21',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    isBookmark: false,
  },
  {
    slug: 'browsing-tribal-water',
    title: '原鄉用水困境：自來水普及率背後的維護空缺',
    category: '原住民族',
    description: '管線老化與人力不足，讓部分部落仍面臨不穩定供水的日常。',
    publishedDate: '2025-12/14',
    image:
      'https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=1200&q=80',
    isBookmark: true,
  },
]

export const fakeReviewingArticles: ReviewingArticle[] = [
  {
    slug: 'review-climate-insurance',
    reviewWord: '一年後追蹤',
    title: '極端氣候保險改革，誰能真正被保障？',
    ogDescription:
      '保單設計雖擴大保障範圍，但弱勢戶的保費負擔仍高，地方政府開始試辦差額補貼。',
    bgImage:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'review-fishing-village',
    reviewWord: '編輯推薦',
    title: '離岸能源進場後，漁村青年回流了嗎？',
    ogDescription:
      '部分青年投入維運與監測工作，但在地培訓資源仍不足，職能轉換仍有斷層。',
    bgImage:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'review-campus-harassment',
    reviewWord: '深度回顧',
    title: '校園申訴機制改革：流程縮短後，受害者更敢求助嗎',
    ogDescription:
      '受理時間縮短提升信任，但心理支持與法律協助仍依賴少數縣市投入。',
    bgImage:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'review-urban-heat',
    reviewWord: '持續更新',
    title: '都市熱島治理：降溫工程之外，還缺哪些公共設計',
    ogDescription: '植栽覆蓋率有改善，卻尚未整合弱勢社區的防暑策略與能源補貼。',
    bgImage:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  },
]
