(() => {
  "use strict";

  const STORAGE_KEYS = {
    notes: "mindtrace.notes",
    readings: "mindtrace.readings",
    progress: "mindtrace.progress",
    danmaku: "mindtrace.danmaku",
    play: "mindtrace.play",
  };

  /** Public Gray Raven chapter skeleton; reading copy is original demo text only. */
  const CONSTRUCTS = {
    "lucia-plume": {
      id: "lucia-plume",
      en: "LUCIA",
      cn: "露西亚",
      frame: "PLUME / 鸿羽",
      tagId: "01 / 05",
      src: "./assets/portraits/lucia-plume.png",
      alt: "露西亚 · 鸿羽立绘",
      lede: "灰鸦小队队长。空中花园依据灰鸦作战数据研制的最新机兵「鸿羽」，是这条航线的默认封面。",
      faction: "灰鸦小队",
      klass: "进攻型 · S",
      link: "主线 / 序章",
    },
    "lucia-lotus": {
      id: "lucia-lotus",
      en: "LUCIA",
      cn: "露西亚",
      frame: "LOTUS / 红莲",
      tagId: "02 / 05",
      src: "./assets/portraits/lucia-lotus.png",
      icon: "./assets/dialogue/lucia-lotus-icon.png",
      alt: "露西亚 · 红莲立绘",
      lede: "灰鸦小队队长的初期机兵「红莲」。过境、赠礼与完整战力都从她开始被点名。",
      faction: "灰鸦小队",
      klass: "进攻型 · A",
      link: "主线 1-1",
    },
    "liv-eclipse": {
      id: "liv-eclipse",
      en: "LIV",
      cn: "丽芙",
      frame: "ECLIPSE / 蚀暗",
      tagId: "03 / 05",
      src: "./assets/portraits/liv-eclipse.png",
      icon: "./assets/dialogue/liv-eclipse-icon.png",
      alt: "丽芙 · 蚀暗立绘",
      lede: "灰鸦小队支援构造体。临别赠礼之后，她把观测与整备压在同一条前线。",
      faction: "灰鸦小队",
      klass: "辅助型 · A",
      link: "主线 1-2",
    },
    "lee-palefire": {
      id: "lee-palefire",
      en: "LEE",
      cn: "里",
      frame: "PALEFIRE / 异火",
      tagId: "04 / 05",
      src: "./assets/portraits/lee-palefire.png",
      icon: "./assets/dialogue/lee-palefire-icon.png",
      alt: "里 · 异火立绘",
      lede: "灰鸦小队进攻构造体。完整战力节点里，火力校准比口号更先落地。",
      faction: "灰鸦小队",
      klass: "进攻型 · A",
      link: "主线 1-4",
    },
    "nanami-storm": {
      id: "nanami-storm",
      en: "NANAMI",
      cn: "七实",
      frame: "STORM / 风暴",
      tagId: "05 / 05",
      src: "./assets/portraits/nanami-storm.png",
      icon: "./assets/dialogue/nanami-storm-icon.png",
      alt: "七实 · 风暴立绘",
      lede: "早期公开机兵之一。迷雾节点把她放在侧翼，用来对照灰鸦主队的推进节奏。",
      faction: "构造体档案",
      klass: "装甲型 · A",
      link: "主线 1-6",
    },
    "luna-argent": {
      id: "luna-argent",
      en: "LUNA",
      cn: "露娜",
      frame: "ARGENT / 银冕",
      tagId: "",
      src: "./assets/portraits/luna-argent.png",
      alt: "露娜 · 银冕立绘",
      lede: "露西亚的妹妹。间章「往何处逃离」从她开始被点名。",
      faction: "升格者",
      klass: "进攻型",
      link: "间章 / 往何处逃离",
    },
    "karenina-blast": {
      id: "karenina-blast",
      en: "KARENINA",
      cn: "卡列尼娜",
      frame: "BLAST / 爆裂",
      tagId: "",
      src: "./assets/portraits/karenina-blast.png",
      alt: "卡列尼娜 · 爆裂立绘",
      lede: "工程部队。间章「被冰封的心」是她的个人剧情入口。",
      faction: "工程部队",
      klass: "进攻型",
      link: "间章 / 被冰封的心",
    },
    "watanabe-nightblade": {
      id: "watanabe-nightblade",
      en: "WATANABE",
      cn: "渡边",
      frame: "NIGHTBLADE / 夜刃",
      tagId: "",
      src: "./assets/portraits/watanabe-nightblade.png",
      alt: "渡边 · 夜刃立绘",
      lede: "遗忘者相关构造体。间章「利刃下的成长」「陨落陆地之星」从他开始。",
      faction: "遗忘者",
      klass: "进攻型",
      link: "间章 / 渡边",
    },
    "vera-rozen": {
      id: "vera-rozen",
      en: "VERA",
      cn: "薇拉",
      frame: "ROZEN / 瑰丽",
      tagId: "",
      src: "./assets/portraits/vera-rozen.png",
      alt: "薇拉 · 瑰丽立绘",
      lede: "净化者。间章「瓦尔基里」是她的个人剧情入口。",
      faction: "净化者",
      klass: "辅助型",
      link: "间章 / 瓦尔基里",
    },
  };

  const SELECT_UNITS = ["lucia-plume", "lucia-lotus", "liv-eclipse", "lee-palefire", "nanami-storm"];
  const WAITING = {
    en: "UNIT",
    cn: "选择机体",
    frame: "CHARACTER SELECT",
    lede: "灰鸦小队已就位。点选一名构造体，再进入剧情。",
    faction: "空中花园",
    klass: "DATA",
    link: "等待选择",
    tagId: "00 / 05",
  };

  let MAIN_CATALOG = [];
  let STORY_PEOPLE = [];
  const NODES = [
    {
      id: "i-lotus",
      code: "间章",
      title: "往何处逃离",
      type: "间章",
      group: "interlude",
      chapter: "露西亚 · 红莲",
      scene: "角色剧情 / 红莲",
      summary: "公开骨架：露西亚·红莲间章。国际 Wiki 英名 Escape to Somewhere；中文名取自 BWiki 剧情回顾「往何处逃离」。正文仍是示例。",
      characters: ["露西亚·红莲", "露娜"],
      factions: ["灰鸦小队"],
      terms: ["间章", "红莲"],
      cover: "lucia-lotus",
      cg: "./assets/covers/interlude-escape.png",
      chapterNo: "I1",
      prev: null,
      next: null,
      lines: [
        { speaker: "narrator", text: "示例：红莲的间章从这里开始。完整剧情未收录。" },
        { speaker: "lucia-lotus", text: "示例：门对面还有另一个我。官方台词仍待授权。" },
      ],
    },
    {
      id: "i-eclipse",
      code: "间章",
      title: "月光下的礼服",
      type: "间章",
      group: "interlude",
      chapter: "丽芙 · 蚀暗",
      scene: "角色剧情 / 蚀暗",
      summary: "公开骨架：丽芙·蚀暗间章。国际 Wiki 英名 Under a Pale Moon；中文名取自 BWiki 剧情回顾「月光下的礼服」。正文仍是示例。",
      characters: ["丽芙·蚀暗"],
      factions: ["灰鸦小队"],
      terms: ["间章", "蚀暗"],
      cover: "liv-eclipse",
      cg: "./assets/covers/interlude-dress.png",
      chapterNo: "I2",
      prev: null,
      next: null,
      lines: [
        { speaker: "narrator", text: "示例：蚀暗的间章只演示骨架，不搬官方剧本。" },
        { speaker: "liv-eclipse", text: "示例：镜子前面要先整理自己。完整对白未收录。" },
      ],
    },
    {
      id: "i-palefire",
      code: "间章",
      title: "四二一",
      type: "间章",
      group: "interlude",
      chapter: "里 · 异火",
      scene: "角色剧情 / 异火",
      summary: "公开骨架：里·异火间章。国际 Wiki 关卡提示 4-2-1；中文名取自 BWiki 剧情回顾「四二一」。正文仍是示例。",
      characters: ["里·异火"],
      factions: ["灰鸦小队"],
      terms: ["间章", "异火"],
      cover: "lee-palefire",
      cg: "./assets/covers/interlude-421.png",
      chapterNo: "I3",
      prev: null,
      next: null,
      lines: [
        { speaker: "narrator", text: "示例：异火的间章用公开关卡名，不写官方谜底全文。" },
        { speaker: "lee-palefire", text: "示例：421 只是骨架编号。完整关卡未收录。" },
      ],
    },
    {
      id: "i-storm",
      code: "间章",
      title: "迷途真理",
      type: "间章",
      group: "interlude",
      chapter: "七实 · 风暴",
      scene: "角色剧情 / 风暴",
      summary: "公开骨架：七实·风暴间章。国际 Wiki 英名 Nanami: Storm；中文名取自 BWiki 剧情回顾「迷途真理」。正文仍是示例。",
      characters: ["七实·风暴"],
      factions: ["构造体档案"],
      terms: ["间章", "风暴"],
      cover: "nanami-storm",
      cg: "./assets/covers/interlude-truth.png",
      chapterNo: "I4",
      prev: null,
      next: null,
      lines: [
        { speaker: "narrator", text: "示例：风暴间章只演示入口。人类与感染体的关卡细节不展开。" },
        { speaker: "nanami-storm", text: "示例：这一段仍待授权。这里只放骨架。" },
      ],
    },
    {
      id: "e-whale",
      code: "活动",
      title: "游云鲸梦",
      type: "活动",
      group: "event",
      chapter: "浮点纪实",
      scene: "活动剧情 / 九龙",
      summary: "公开骨架：活动「游云鲸梦」。BWiki 归在浮点纪实；国际 Wiki 英名 Reveries With A Whale。正文仍是示例。",
      characters: ["蒲牢", "指挥官"],
      factions: ["九龙", "空中花园"],
      terms: ["活动", "浮点纪实"],
      cover: "lucia-plume",
      cg: "./assets/covers/event-whale.jpg",
      chapterNo: "E1",
      prev: null,
      next: null,
      lines: [
        { speaker: "narrator", text: "示例：游云鲸梦是活动入口，不是主线关卡。" },
        { speaker: "commander", text: "示例：完整活动剧本未收录。这里只演示分类。" },
      ],
    },
    {
      id: "e-embers",
      code: "活动",
      title: "烈日将烬",
      type: "活动",
      group: "event",
      chapter: "浮点纪实",
      scene: "活动剧情",
      summary: "公开骨架：活动「烈日将烬」。BWiki 剧情回顾列在浮点纪实。正文仍是示例。",
      characters: ["指挥官"],
      factions: ["空中花园"],
      terms: ["活动", "浮点纪实"],
      cover: "lucia-plume",
      cg: "./assets/covers/event-embers.jpg",
      chapterNo: "E2",
      prev: null,
      next: null,
      lines: [
        { speaker: "narrator", text: "示例：烈日将烬只作活动分类演示。" },
        { speaker: "commander", text: "示例：官方活动对白未收录。" },
      ],
    },
  ];

  const MAIN_CHAPTERS = Array.isArray(window.PGR_MAIN_CHAPTERS) ? window.PGR_MAIN_CHAPTERS : [];
  const INTERLUDES = Array.isArray(window.PGR_INTERLUDES) ? window.PGR_INTERLUDES : [];

  const TABS = {
    main: { label: "主线剧情", empty: "主线目录尚未载入。" },
    interlude: { label: "间章剧情", empty: "间章骨架尚未载入。" },
    event: { label: "活动剧情", empty: "活动骨架尚未载入。" },
    network: { label: "关系网", empty: "" },
  };

  const PEOPLE = {
    lucia: { id: "lucia", name: "露西亚", frame: "红莲 / 鸿羽", construct: "lucia-lotus", x: 18, y: 28, interlude: "i00" },
    liv: { id: "liv", name: "丽芙", frame: "蚀暗", construct: "liv-eclipse", x: 50, y: 18, interlude: "i03" },
    lee: { id: "lee", name: "里", frame: "异火", construct: "lee-palefire", x: 82, y: 28, interlude: "i06" },
    nanami: { id: "nanami", name: "七实", frame: "风暴", construct: "nanami-storm", x: 34, y: 58, interlude: "i11" },
    commander: { id: "commander", name: "指挥官", frame: "", construct: null, x: 50, y: 42 },
    hassan: { id: "hassan", name: "哈桑", frame: "人类阵线", construct: null, x: 50, y: 88 },
    luna: { id: "luna", name: "露娜", frame: "银冕", construct: "luna-argent", x: 10, y: 62, interlude: "i00" },
    karenina: { id: "karenina", name: "卡列尼娜", frame: "爆裂", construct: "karenina-blast", x: 66, y: 70, interlude: "i07" },
    watanabe: { id: "watanabe", name: "渡边", frame: "夜刃", construct: "watanabe-nightblade", x: 88, y: 62, interlude: "i08" },
    vera: { id: "vera", name: "薇拉", frame: "瑰丽", construct: "vera-rozen", x: 18, y: 82, interlude: "i16" },
  };

  const TIES = [
    { a: "lucia", b: "liv", label: "灰鸦小队", nodes: ["m01-1-1", "m01-1-2", "m01-1-4"] },
    { a: "lucia", b: "lee", label: "灰鸦小队", nodes: ["m01-1-1", "m01-1-4", "m01-1-6"] },
    { a: "liv", b: "lee", label: "灰鸦小队", nodes: ["m01-1-1", "m01-1-4"] },
    { a: "lucia", b: "commander", label: "指挥链路", nodes: ["m01-1-1", "m01-1-12"] },
    { a: "liv", b: "commander", label: "指挥链路", nodes: ["m01-1-2", "m01-1-4"] },
    { a: "lee", b: "commander", label: "指挥链路", nodes: ["m01-1-6"] },
    { a: "nanami", b: "lucia", label: "早期对照", nodes: ["i-storm"] },
    { a: "lucia", b: "luna", label: "姐妹", interlude: "i00" },
    { a: "nanami", b: "commander", label: "间章友人", interlude: "i05" },
    { a: "karenina", b: "commander", label: "工程部队", interlude: "i07" },
    { a: "watanabe", b: "commander", label: "遗忘者", interlude: "i08" },
    { a: "vera", b: "lucia", label: "净化者", interlude: "i16" },
    { a: "hassan", b: "commander", label: "人类阵线", nodes: ["m00-0-0"] },
  ];

  const SPEAKERS = {
    "lucia-lotus": { name: "露西亚", frame: "LOTUS / 红莲", construct: "lucia-lotus" },
    "liv-eclipse": { name: "丽芙", frame: "ECLIPSE / 蚀暗", construct: "liv-eclipse" },
    "lee-palefire": { name: "里", frame: "PALEFIRE / 异火", construct: "lee-palefire" },
    commander: { name: "指挥官", frame: "", construct: null },
    system: { name: "系统", frame: "", construct: null },
    hassan: { name: "哈桑", frame: "", construct: null },
    soldier: { name: "构造体士兵", frame: "", construct: null },
    "nanami-storm": { name: "七实", frame: "STORM / 风暴", construct: "nanami-storm" },
    narrator: { name: "", frame: "", construct: null },
  };

  const GLOSSARY = {
    "构造体": "意识转入机兵后的作战单位，不是普通人。",
    "指挥官": "空中花园的前线指挥。过剧情时默认视角。",
    "空中花园": "近地轨道据点。灰鸦从这里被派往地面。",
    "人类阵线": "仍在地面作战的人类势力。",
    "灰鸦小队": "空中花园编制：露西亚、丽芙、里。",
    "灰鸦": "灰鸦小队的简称。",
    "红莲": "露西亚的初期机兵。早期主线默认形态。",
    "蚀暗": "丽芙的初期机兵。早期主线默认形态。",
    "异火": "里的初期机兵。早期主线默认形态。",
    "风暴": "七实的初期机兵。",
    "感染体": "被惩罚病毒侵蚀的机械或生物。",
    "机兵": "构造体化身的作战机体。",
    "过境": "本站名，也借公开关卡「灰鸦过境」。",
    "间章": "角色个人剧情，不是主线章。",
    "浮点纪实": "活动剧情的公开分类名。",
  };
  let GLOSSARY_KEYS = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);

  const DEMO_DANMAKU = {
    "m00-0-0": ["血清不够才来回看", "0-0 没有立绘是对的", "示例弹幕，可关"],
    "m01-1-1": ["灰鸦过境从这里开始", "红莲 / 蚀暗 / 异火"],
    "m01-1-2": ["临别赠礼不是道具页", "蚀暗还缺核心"],
    "m01-1-4": ["完整战力是三人队齐装满员", "推荐蚀暗上场"],
    "m01-1-6": ["1-6 还是灰鸦三人队", "雾里适合停下来写批注"],
    "m01-1-12": ["第一章收到这里"],
    "i-lotus": ["红莲间章入口", "官方台词未收录"],
    "i-eclipse": ["蚀暗间章入口"],
    "i-palefire": ["异火间章入口"],
    "i-storm": ["风暴间章入口"],
    "e-whale": ["活动：游云鲸梦"],
    "e-embers": ["活动：烈日将烬"],
  };

  const DEMO_READINGS = [
    {
      id: "demo-r1",
      title: "过境之后灰鸦才成为小队",
      tags: ["主线", "灰鸦"],
      spoiler: "arc",
      body: "1-1 到 1-4 不是战斗清单，而是三人队被点名的过程。示例观点，供界面演示。",
      nodeId: "m01-1-1",
      createdAt: "2026-09-10T10:00:00.000Z",
      source: "demo",
    },
    {
      id: "demo-r2",
      title: "临别赠礼读成观测，而不是道具",
      tags: ["丽芙", "整备"],
      spoiler: "node",
      body: "1-2 把丽芙放在整备缝隙。示例解读。",
      nodeId: "m01-1-2",
      createdAt: "2026-09-10T18:30:00.000Z",
      source: "demo",
    },
    {
      id: "demo-r3",
      title: "迷雾节点适合写批注",
      tags: ["观察", "失联"],
      spoiler: "none",
      body: "1-6 通讯变薄，适合停下来写跟帖。示例观点。",
      nodeId: "m01-1-6",
      createdAt: "2026-09-09T12:00:00.000Z",
      source: "demo",
    },
  ];

  const SPOILER_LABEL = {
    none: "无剧透",
    node: "仅本节点",
    arc: "整条支线",
    all: "全局剧透",
  };

  const state = {
    activeNodeId: null,
    readerNodeId: null,
    activeConstructId: null,
    notes: [],
    readings: [],
    progress: { readIds: [], lastNodeId: null },
    searchActiveIndex: -1,
    searchHits: [],
    lastFocus: null,
    activeTab: "main",
    activeChapterId: "ch00",
    activeInterludeId: "i00",
    activeStageCode: null,
    lineIndex: 0,
    vnConstructId: null,
    danmakuOn: true,
    danmaku: {},
    danmakuGen: 0,
    danmakuLane: 0,
    typing: false,
    typedCount: 0,
    typeTimer: 0,
    typeGen: 0,
    autoOn: false,
    autoTimer: 0,
    skipRead: false,
    logOpen: false,
    glossaryOpen: false,
    glossaryTerm: "",
    play: { nodeId: null, lineIndex: 0, autoOn: false, skipRead: false, danmakuOn: true, seen: {} },
  };

  const els = {};

  function $(id) {
    return document.getElementById(id);
  }

  function cacheEls() {
    els.status = $("storage-status");
    els.dossierStatus = $("dossier-status");
    els.navDossierTitle = $("nav-dossier-title");
    els.continueSummary = $("continue-summary");
    els.continueAction = $("continue-action");
    els.progressValue = $("progress-value");
    els.progressBar = $("progress-bar");
    els.progressFill = $("progress-fill");
    els.continueBtn = $("continue-btn");
    els.commandGrid = $("command-grid");
    els.commandPreviewImg = $("command-preview-img");
    els.commandPreviewCode = $("command-preview-code");
    els.heroArt = $("hero-art");
    els.heroCopy = $("hero-copy");
    els.heroCv = $("hero-cv");
    els.heroLineup = $("hero-lineup");
    els.heroNameEn = $("hero-name-en");
    els.heroNameCn = $("hero-name-cn");
    els.heroFrame = $("hero-frame");
    els.heroLede = $("hero-lede");
    els.heroFaction = $("hero-faction");
    els.heroClass = $("hero-class");
    els.heroLink = $("hero-link");
    els.heroTagId = $("hero-tag-id");
    els.editionRail = $("edition-rail-track");
    els.storyTabs = $("story-tabs");
    els.networkPanel = $("network");
    els.netGraph = $("net-graph");
    els.netTies = $("net-ties");
    els.netHint = $("net-hint");
    els.stageList = $("stage-list");
    els.stageCg = $("stage-cg");
    els.panelKicker = $("panel-kicker");
    els.panelType = $("panel-type");
    els.panelTitle = $("panel-title");
    els.panelSummary = $("panel-summary");
    els.panelTags = $("panel-tags");
    els.panelLinks = $("panel-links");
    els.panelPrev = $("panel-prev");
    els.panelNext = $("panel-next");
    els.panelActions = $("panel-actions");
    els.panelReadBtn = $("panel-read-btn");
    els.panelNoteBtn = $("panel-note-btn");
    els.nodeDiscussion = $("node-discussion");
    els.nodeNotes = $("node-notes");
    els.nodeNotesEmpty = $("node-notes-empty");
    els.readingsList = $("readings-list");
    els.boardPostBtn = $("board-post-btn");
    els.searchOpen = $("search-open");
    els.searchKbd = $("search-kbd");
    els.publishOpen = $("publish-open");
    els.readerDialog = $("reader-dialog");
    els.readerTitle = $("reader-title");
    els.readerSub = $("reader-sub");
    els.readerChapterNo = $("reader-chapter-no");
    els.readerNoteBtn = $("reader-note-btn");
    els.readerNextBtn = $("reader-next-btn");
    els.vnStage = $("vn-stage");
    els.vnCgImg = $("vn-cg-img");
    els.vnImage = $("vn-image");
    els.vnPortrait = $("vn-portrait");
    els.vnName = $("vn-name");
    els.vnLine = $("vn-line");
    els.vnAdvance = $("vn-advance");
    els.vnPrevBtn = $("vn-prev-btn");
    els.vnBox = $("vn-box");
    els.vnCg = $("vn-cg");
    els.vnCast = $("vn-cast");
    els.vnScene = $("vn-scene");
    els.vnLog = $("vn-log");
    els.vnLogList = $("vn-log-list");
    els.vnLogBtn = $("vn-log-btn");
    els.vnAutoBtn = $("vn-auto-btn");
    els.vnSkipBtn = $("vn-skip-btn");
    els.vnGlossary = $("vn-glossary");
    els.vnGlossaryBtn = $("vn-glossary-btn");
    els.vnGlossaryTerm = $("vn-glossary-term");
    els.vnGlossaryBlurb = $("vn-glossary-blurb");
    els.vnGlossaryList = $("vn-glossary-list");
    els.vnDanmaku = $("vn-danmaku");
    els.vnDanmakuToggle = $("vn-danmaku-toggle");
    els.vnDanmakuInput = $("vn-danmaku-input");
    els.vnDanmakuSend = $("vn-danmaku-send");
    els.searchDialog = $("search-dialog");
    els.searchForm = $("search-form");
    els.searchInput = $("search-input");
    els.searchResults = $("search-results");
    els.searchEmpty = $("search-empty");
    els.composeDialog = $("compose-dialog");
    els.composeForm = $("compose-form");
    els.composeTitle = $("compose-title");
    els.composeSub = $("compose-sub");
    els.composeBanner = $("compose-banner");
    els.composeMode = $("compose-mode");
    els.composeNode = $("compose-node");
    els.composeTitleInput = $("compose-title-input");
    els.composeTags = $("compose-tags");
    els.composeSpoiler = $("compose-spoiler");
    els.composeBody = $("compose-body");
    els.composeStatus = $("compose-status");
    els.composeSubmit = $("compose-submit");
    els.titleError = $("title-error");
    els.spoilerError = $("spoiler-error");
    els.bodyError = $("body-error");
    els.fieldTitle = $("field-title");
    els.fieldBody = $("field-body");
  }

  function safeParse(raw, fallback) {
    if (raw == null || raw === "") return fallback;
    try {
      const value = JSON.parse(raw);
      return value == null ? fallback : value;
    } catch (err) {
      console.warn("MINDTRACE: JSON parse failed", err);
      return fallback;
    }
  }

  function readStorage(key, fallback) {
    try {
      return safeParse(localStorage.getItem(key), fallback);
    } catch (err) {
      console.warn("MINDTRACE: localStorage read failed", err);
      if (els.status) els.status.textContent = "LOCAL CACHE BLOCKED";
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      if (els.status) els.status.textContent = "LOCAL CACHE SYNCED";
      return true;
    } catch (err) {
      console.warn("MINDTRACE: localStorage write failed", err);
      if (els.status) els.status.textContent = "LOCAL CACHE ERROR";
      return false;
    }
  }

  function loadState() {
    const notes = readStorage(STORAGE_KEYS.notes, []);
    const readings = readStorage(STORAGE_KEYS.readings, []);
    const progress = readStorage(STORAGE_KEYS.progress, { readIds: [], lastNodeId: null });
    state.notes = Array.isArray(notes) ? notes : [];
    state.readings = Array.isArray(readings) ? readings : [];
    state.progress = {
      readIds: Array.isArray(progress.readIds) ? progress.readIds.filter(Boolean) : [],
      lastNodeId: progress.lastNodeId || null,
    };
    const danmaku = readStorage(STORAGE_KEYS.danmaku, {});
    state.danmaku = danmaku && typeof danmaku === "object" && !Array.isArray(danmaku) ? danmaku : {};
    const play = readStorage(STORAGE_KEYS.play, null);
    if (play && typeof play === "object" && !Array.isArray(play)) {
      state.play = {
        nodeId: play.nodeId || null,
        lineIndex: Number.isFinite(Number(play.lineIndex)) ? Number(play.lineIndex) : 0,
        autoOn: Boolean(play.autoOn),
        skipRead: Boolean(play.skipRead),
        danmakuOn: play.danmakuOn !== false,
        seen: play.seen && typeof play.seen === "object" && !Array.isArray(play.seen) ? play.seen : {},
      };
      state.autoOn = state.play.autoOn;
      state.skipRead = state.play.skipRead;
      state.danmakuOn = state.play.danmakuOn !== false;
    }
  }

  function hydrateCatalog(row) {
    return {
      id: row.id,
      code: row.code,
      title: row.title,
      type: "主线",
      group: "main",
      chapter: row.chapter,
      scene: row.chapter,
      summary: row.summary || "",
      characters: row.characters || [],
      factions: row.factions || [],
      terms: row.terms || [],
      cg: row.cg,
      prev: row.prev || null,
      next: row.next || null,
      script: row.script,
      chars: row.chars || 0,
      minutes: row.minutes || 1,
      lines: [],
    };
  }

  function getNode(id) {
    return NODES.find((n) => n.id === id) || MAIN_CATALOG.find((n) => n.id === id) || null;
  }

  function allStoryNodes() {
    return MAIN_CATALOG.concat(NODES);
  }

  function nodesInTab(tab) {
    const key = tab || state.activeTab;
    if (key === "main" || key === "network") return MAIN_CATALOG;
    return NODES.filter((n) => n.group === key);
  }

  async function loadStoryData() {
    const [catalog, people, glossary] = await Promise.all([
      fetch("./story/catalog.json").then((res) => res.json()),
      fetch("./story/people.json").then((res) => res.json()),
      fetch("./story/glossary.json").then((res) => res.json()).catch(() => ({})),
    ]);
    MAIN_CATALOG = Array.isArray(catalog) ? catalog.map(hydrateCatalog) : [];
    STORY_PEOPLE = Array.isArray(people) ? people : [];
    Object.assign(GLOSSARY, glossary || {});
    GLOSSARY_KEYS = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
  }

  async function ensureScript(node) {
    if (!node) return node;
    if (Array.isArray(node.lines) && node.lines.length) return node;
    if (!node.script) return node;
    const data = await fetch(encodeURI(node.script)).then((res) => res.json());
    node.lines = (data && data.lines) || [{ speaker: "narrator", text: node.summary || "" }];
    return node;
  }

  function getChapter(id) {
    return MAIN_CHAPTERS.find((ch) => ch.id === id) || null;
  }

  function chapterLabel(ch) {
    if (!ch) return "—";
    return ch.code === "00" ? "00 序章" : `${ch.code} ${ch.title}`;
  }

  function firstPlayableStage(ch) {
    if (!ch || !ch.stages) return null;
    return ch.stages.find((s) => s.nodeId) || ch.stages[0] || null;
  }

  function getInterlude(id) {
    return INTERLUDES.find((item) => item.id === id) || null;
  }

  function interludesForPerson(personId) {
    return INTERLUDES.filter((item) => item.person === personId);
  }

  function nodeLabel(id) {
    const node = getNode(id);
    return node ? `${node.code} ${node.title}` : "—";
  }

  function appearRecord(name) {
    return STORY_PEOPLE.find((row) => row.name === name) || null;
  }

  function appearChapters(name) {
    const row = appearRecord(name);
    if (!row || !row.chapters) return [];
    return row.chapters.map((id) => {
      const ch = getChapter(id);
      return ch ? chapterLabel(ch) : id;
    });
  }

  function uid(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function setProgressUI() {
    const total = MAIN_CATALOG.length || NODES.length;
    const count = state.progress.readIds.length;
    const pct = total ? Math.round((count / total) * 100) : 0;
    els.progressValue.textContent = `${count} / ${total}`;
    els.progressBar.setAttribute("aria-valuenow", String(pct));
    els.progressFill.style.transform = `scaleX(${pct / 100})`;

    const resume = getNode(state.play.nodeId) || getNode(state.progress.lastNodeId) || MAIN_CATALOG[0] || NODES[0];
    if (!state.play.nodeId && count === 0) {
      if (els.continueSummary) els.continueSummary.textContent = "尚未记录进度。从序章开始一段线性演出。";
      if (els.continueAction) els.continueAction.textContent = "开始剧情";
    } else if (count >= total && resume) {
      if (els.continueSummary) els.continueSummary.textContent = `已读完 ${total} 关。可从「${resume.code} ${resume.title}」重演。`;
      if (els.continueAction) els.continueAction.textContent = "重演航线";
    } else if (resume) {
      const lineNo = Number(state.play.lineIndex || 0) + 1;
      if (els.continueSummary) els.continueSummary.textContent = `上次停留：${resume.code} · ${resume.title} · 第 ${lineNo} 句。进度已写入本机。`;
      if (els.continueAction) els.continueAction.textContent = "继续剧情";
    }
  }

  function updateDossierChrome(node) {
    if (!node) return;
    if (els.navDossierTitle) els.navDossierTitle.textContent = `${node.code} · ${node.title}`;
    if (els.dossierStatus) {
      const read = state.progress.readIds.includes(node.id);
      els.dossierStatus.textContent = `DOSSIER / ${node.code} ${read ? "READ" : "ACTIVE"}`;
    }
  }

  function markMapReadState() {
    document.querySelectorAll(".edition-cover[data-chapter]").forEach((cover) => {
      const id = cover.getAttribute("data-chapter");
      cover.classList.toggle("is-active", id === state.activeChapterId);
      cover.setAttribute("aria-pressed", id === state.activeChapterId ? "true" : "false");
    });
    document.querySelectorAll(".edition-cover[data-interlude]").forEach((cover) => {
      const id = cover.getAttribute("data-interlude");
      cover.classList.toggle("is-active", id === state.activeInterludeId);
      cover.setAttribute("aria-pressed", id === state.activeInterludeId ? "true" : "false");
    });
    document.querySelectorAll(".edition-cover[data-node]").forEach((cover) => {
      const id = cover.getAttribute("data-node");
      cover.classList.toggle("is-active", id === state.activeNodeId);
      cover.classList.toggle("is-read", state.progress.readIds.includes(id));
      cover.setAttribute("aria-pressed", id === state.activeNodeId ? "true" : "false");
    });
    document.querySelectorAll(".stage-chip").forEach((chip) => {
      const nodeId = chip.getAttribute("data-node");
      const code = chip.getAttribute("data-stage");
      const on = nodeId ? nodeId === state.activeNodeId : code === state.activeStageCode;
      chip.classList.toggle("is-active", on);
      chip.classList.toggle("is-read", Boolean(nodeId && state.progress.readIds.includes(nodeId)));
      chip.classList.toggle("is-locked", !nodeId);
    });
  }

  function renderNodeNotes(nodeId) {
    const notes = state.notes.filter((n) => n.nodeId === nodeId);
    els.nodeNotes.innerHTML = "";
    if (!notes.length) {
      els.nodeNotesEmpty.hidden = false;
      return;
    }
    els.nodeNotesEmpty.hidden = true;
    notes
      .slice()
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
      .forEach((note) => {
        const li = document.createElement("li");
        li.className = "note-list__item";
        li.innerHTML = `
          <div class="note-list__meta">
            <span>${escapeHtml(SPOILER_LABEL[note.spoiler] || note.spoiler || "批注")}</span>
            <span>${escapeHtml(formatTime(note.createdAt))}</span>
          </div>
          <h4 class="note-list__title">${escapeHtml(note.title)}</h4>
          <p class="note-list__body">${escapeHtml(note.body)}</p>
        `;
        els.nodeNotes.appendChild(li);
      });
  }

  function selectNode(nodeId, { scrollPanel = false, syncConstruct = false } = {}) {
    const node = getNode(nodeId);
    if (!node) return;
    state.activeNodeId = nodeId;
    els.panelKicker.textContent = node.chapter;
    els.panelType.textContent = node.type;
    els.panelTitle.textContent = `${node.code} ${node.title}`;
    els.panelSummary.textContent = node.summary;
    if (node.chars) {
      els.panelSummary.textContent = `${node.summary}\n约 ${node.chars} 字 · 约 ${node.minutes} 分钟`;
    }
    if (els.stageCg) {
      const nextSrc = node.cg || "./assets/covers/prologue.png";
      const stage = document.getElementById("node-panel");
      if (stage && els.stageCg.getAttribute("src") !== nextSrc && !prefersReducedMotion()) {
        stage.classList.remove("is-swapping");
        void stage.offsetWidth;
        stage.classList.add("is-swapping");
      }
      els.stageCg.src = nextSrc;
    }
    els.panelTags.hidden = false;
    els.panelTags.innerHTML = "";
    const tags = [...(node.characters || []), ...(node.factions || []), ...(node.terms || [])];
    if (node.chars) tags.unshift(`约 ${node.minutes} 分钟`);
    tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "tag" + ((node.characters || []).includes(tag) || (node.factions || []).includes(tag) ? " tag--entity" : "");
      span.textContent = tag;
      els.panelTags.appendChild(span);
    });
    if (els.panelLinks) els.panelLinks.hidden = false;
    els.panelPrev.textContent = node.prev ? nodeLabel(node.prev) : "无";
    els.panelNext.textContent = node.next ? nodeLabel(node.next) : "无";
    if (els.panelActions) els.panelActions.hidden = false;
    if (els.panelReadBtn) els.panelReadBtn.disabled = false;
    if (els.nodeDiscussion) els.nodeDiscussion.hidden = false;
    renderNodeNotes(nodeId);
    updateDossierChrome(node);
    const host = MAIN_CHAPTERS.find((ch) => (ch.stages || []).some((s) => s.nodeId === node.id));
    if (host) {
      state.activeChapterId = host.id;
      const stage = (host.stages || []).find((s) => s.nodeId === node.id);
      if (stage) state.activeStageCode = stage.code;
    }
    if (syncConstruct && node.cover) setConstruct(node.cover, { animate: true });
    markMapReadState();
    if (scrollPanel && window.matchMedia("(max-width: 1024px)").matches) {
      $("node-panel").scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  function markRead(nodeId) {
    if (!state.progress.readIds.includes(nodeId)) {
      state.progress.readIds.push(nodeId);
    }
    state.progress.lastNodeId = nodeId;
    writeStorage(STORAGE_KEYS.progress, state.progress);
    setProgressUI();
    markMapReadState();
    updateDossierChrome(getNode(nodeId));
  }

  function openDialog(dialog, focusEl) {
    state.lastFocus = document.activeElement;
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    if (focusEl) {
      window.requestAnimationFrame(() => focusEl.focus());
    }
  }

  function closeDialog(dialog) {
    if (dialog.open) dialog.close();
  }

  function restoreFocus() {
    const target = state.lastFocus;
    state.lastFocus = null;
    if (target && typeof target.focus === "function") {
      target.focus();
    }
  }

  function nodeLines(node) {
    return Array.isArray(node.lines) && node.lines.length ? node.lines : [{ speaker: "narrator", text: node.summary || "" }];
  }

  function speakerOf(key, line) {
    if (SPEAKERS[key]) return SPEAKERS[key];
    if (line && line.name) return { name: line.name, frame: "", construct: null };
    if (key && key !== "narrator") return { name: key, frame: "", construct: null };
    return SPEAKERS.narrator;
  }

  function persistPlay() {
    if (state.readerNodeId) {
      state.play.nodeId = state.readerNodeId;
      state.play.lineIndex = state.lineIndex;
    }
    state.play.autoOn = state.autoOn;
    state.play.skipRead = state.skipRead;
    state.play.danmakuOn = state.danmakuOn;
    writeStorage(STORAGE_KEYS.play, state.play);
  }

  function seenKey(nodeId, index) {
    return `${nodeId}:${index}`;
  }

  function isLineSeen(nodeId, index) {
    return Boolean(state.play.seen && state.play.seen[seenKey(nodeId, index)]);
  }

  function markLineSeen(nodeId, index) {
    if (!state.play.seen) state.play.seen = {};
    state.play.seen[seenKey(nodeId, index)] = true;
  }

  function stopTyping() {
    if (state.typeTimer) {
      window.clearTimeout(state.typeTimer);
      state.typeTimer = 0;
    }
    state.typing = false;
  }

  function stopAuto() {
    if (state.autoTimer) {
      window.clearTimeout(state.autoTimer);
      state.autoTimer = 0;
    }
  }

  function setAutoOn(on) {
    state.autoOn = Boolean(on);
    if (els.vnAutoBtn) {
      els.vnAutoBtn.setAttribute("aria-pressed", state.autoOn ? "true" : "false");
    }
    if (!state.autoOn) stopAuto();
    persistPlay();
    if (state.autoOn && els.readerDialog && els.readerDialog.open) scheduleAuto();
  }

  function setSkipRead(on) {
    state.skipRead = Boolean(on);
    if (els.vnSkipBtn) {
      els.vnSkipBtn.setAttribute("aria-pressed", state.skipRead ? "true" : "false");
    }
    persistPlay();
  }

  function setLogOpen(on) {
    state.logOpen = Boolean(on);
    if (els.vnLog) els.vnLog.hidden = !state.logOpen;
    if (els.vnLogBtn) els.vnLogBtn.setAttribute("aria-pressed", state.logOpen ? "true" : "false");
    if (els.vnStage) els.vnStage.classList.toggle("is-log-open", state.logOpen);
  }

  function markTerms(text) {
    const raw = String(text || "");
    let html = "";
    for (let i = 0; i < raw.length; ) {
      const hit = GLOSSARY_KEYS.find((term) => raw.startsWith(term, i));
      if (hit) {
        html += `<button type="button" class="vn__term" data-term="${escapeHtml(hit)}">${escapeHtml(hit)}</button>`;
        i += hit.length;
      } else {
        html += escapeHtml(raw[i]);
        i += 1;
      }
    }
    return html;
  }

  function termsInText(text) {
    const raw = String(text || "");
    return GLOSSARY_KEYS.filter((term) => raw.includes(term));
  }

  function renderGlossary() {
    if (!els.vnGlossaryList) return;
    const node = getNode(state.readerNodeId);
    const line = node ? nodeLines(node)[state.lineIndex] : null;
    const inLine = termsInText(line && line.text);
    const related = [];
    (node && Array.isArray(node.terms) ? node.terms : []).forEach((term) => {
      if (GLOSSARY[term] && !inLine.includes(term) && !related.includes(term)) related.push(term);
    });
    const shown = inLine.concat(related);
    const current = GLOSSARY[state.glossaryTerm] ? state.glossaryTerm : (shown[0] || "");
    state.glossaryTerm = current;
    if (els.vnGlossaryTerm) els.vnGlossaryTerm.textContent = current || "暂无词条";
    if (els.vnGlossaryBlurb) {
      els.vnGlossaryBlurb.textContent = current
        ? GLOSSARY[current]
        : "这一句没有可解释的词。点台词高亮，或按 G 打开。";
    }
    els.vnGlossaryList.innerHTML = shown.map((term) => (
      `<li><button type="button" class="vn__glossary-item${term === current ? " is-on" : ""}" data-term="${escapeHtml(term)}">${escapeHtml(term)}</button></li>`
    )).join("");
  }

  function setGlossaryOpen(on) {
    state.glossaryOpen = Boolean(on);
    if (els.vnGlossary) els.vnGlossary.hidden = !state.glossaryOpen;
    if (els.vnGlossaryBtn) els.vnGlossaryBtn.setAttribute("aria-pressed", state.glossaryOpen ? "true" : "false");
    if (els.vnStage) els.vnStage.classList.toggle("is-glossary-open", state.glossaryOpen);
    if (state.glossaryOpen) {
      stopAuto();
      renderGlossary();
    }
  }

  function openTerm(term) {
    if (!GLOSSARY[term]) return;
    state.glossaryTerm = term;
    setGlossaryOpen(true);
  }

  function nodeCast(node) {
    const ids = [];
    nodeLines(node).forEach((line) => {
      const id = speakerOf(line.speaker).construct;
      if (id && CONSTRUCTS[id] && !ids.includes(id)) ids.push(id);
    });
    return ids;
  }

  function renderCast(node, speakerKey) {
    if (!els.vnCast) return;
    const ids = nodeCast(node);
    const active = speakerOf(speakerKey).construct;
    els.vnCast.dataset.count = String(ids.length);
    els.vnCast.innerHTML = ids.map((id) => {
      const construct = CONSTRUCTS[id];
      const on = id === active ? " is-speaking" : " is-wait";
      return `<figure class="vn__actor${on}" data-construct="${escapeHtml(id)}"><img src="${escapeHtml(construct.src)}" alt="${escapeHtml(construct.alt)}"></figure>`;
    }).join("");
    els.vnCast.setAttribute("aria-hidden", ids.length ? "false" : "true");
  }

  function setVnAvatar(constructId) {
    if (!els.vnPortrait) return;
    if (!constructId || !CONSTRUCTS[constructId]) {
      state.vnConstructId = null;
      els.vnPortrait.hidden = true;
      els.vnPortrait.removeAttribute("src");
      els.vnPortrait.alt = "";
      if (els.vnImage) els.vnImage.hidden = true;
      return;
    }
    const construct = CONSTRUCTS[constructId];
    if (els.vnImage) els.vnImage.hidden = false;
    els.vnPortrait.hidden = false;
    els.vnPortrait.src = construct.icon || construct.src;
    els.vnPortrait.alt = construct.alt;
    state.vnConstructId = construct.id;
  }

  function setVnCg(node) {
    if (!els.vnCgImg) return;
    const nextSrc = node.cg || "./assets/covers/prologue.png";
    const changed = els.vnCgImg.getAttribute("src") !== nextSrc;
    if (changed && els.vnCg && !prefersReducedMotion()) {
      els.vnCg.classList.remove("is-swapping");
      void els.vnCg.offsetWidth;
      els.vnCg.classList.add("is-swapping");
    }
    els.vnCgImg.src = nextSrc;
    els.vnCgImg.alt = "";
  }

  function renderLog(node, index) {
    if (!els.vnLogList) return;
    const lines = nodeLines(node);
    const end = Math.max(0, Math.min(index, lines.length - 1));
    els.vnLogList.innerHTML = lines.slice(0, end + 1).map((line, i) => {
      const speaker = speakerOf(line.speaker, line);
      const name = line.name || speaker.name || "旁白";
      return `<li class="vn__log-item${i === end ? " is-current" : ""}"><span class="vn__log-name">${escapeHtml(name)}</span><span class="vn__log-text">${escapeHtml(line.text)}</span></li>`;
    }).join("");
    const current = els.vnLogList.querySelector(".is-current");
    if (current) current.scrollIntoView({ block: "nearest" });
  }

  function paintLine(node, index, { instant = false } = {}) {
    const lines = nodeLines(node);
    const clamped = Math.max(0, Math.min(index, lines.length - 1));
    state.lineIndex = clamped;
    const line = lines[clamped];
    const speaker = speakerOf(line.speaker, line);
    const full = line.text || "";
    const shownName = line.name || speaker.name;
    els.vnName.textContent = shownName;
    els.vnName.hidden = !shownName;
    els.vnBox.dataset.kind = speaker.construct ? "speech" : shownName ? "npc" : "narration";
    setVnAvatar(speaker.construct);
    renderCast(node, line.speaker);
    if (els.vnPrevBtn) els.vnPrevBtn.disabled = clamped <= 0;
    const lastLine = clamped >= lines.length - 1;
    if (els.readerNextBtn) els.readerNextBtn.disabled = lastLine && !node.next;
    renderLog(node, clamped);
    if (els.vnLine) {
      if (instant || prefersReducedMotion() || isLineSeen(node.id, clamped)) {
        stopTyping();
        els.vnLine.innerHTML = markTerms(full);
        state.typedCount = full.length;
        markLineSeen(node.id, clamped);
      } else {
        startTyping(full);
      }
    }
    if (state.glossaryOpen) renderGlossary();
    persistPlay();
    setProgressUI();
  }

  function startTyping(full) {
    stopTyping();
    state.typeGen += 1;
    const gen = state.typeGen;
    state.typing = true;
    state.typedCount = 0;
    els.vnLine.textContent = "";
    const step = () => {
      if (gen !== state.typeGen) return;
      state.typedCount += 1;
      els.vnLine.textContent = full.slice(0, state.typedCount);
      if (state.typedCount >= full.length) {
        state.typing = false;
        state.typeTimer = 0;
        els.vnLine.innerHTML = markTerms(full);
        const node = getNode(state.readerNodeId);
        if (node) markLineSeen(node.id, state.lineIndex);
        persistPlay();
        if (state.glossaryOpen) renderGlossary();
        scheduleAuto();
        return;
      }
      state.typeTimer = window.setTimeout(step, 28);
    };
    state.typeTimer = window.setTimeout(step, 28);
  }

  function completeLine() {
    const node = getNode(state.readerNodeId);
    if (!node) return;
    const line = nodeLines(node)[state.lineIndex];
    if (!line) return;
    stopTyping();
    els.vnLine.innerHTML = markTerms(line.text || "");
    state.typedCount = (line.text || "").length;
    if (state.glossaryOpen) renderGlossary();
    markLineSeen(node.id, state.lineIndex);
    persistPlay();
    scheduleAuto();
  }

  function scheduleAuto() {
    stopAuto();
    if (!state.autoOn || !els.readerDialog || !els.readerDialog.open || state.typing) return;
    state.autoTimer = window.setTimeout(() => {
      handleAdvance();
    }, 900);
  }

  function handleAdvance() {
    stopAuto();
    if (state.typing) {
      completeLine();
      return;
    }
    const node = getNode(state.readerNodeId);
    if (!node) return;
    const lines = nodeLines(node);
    if (state.skipRead) {
      while (state.lineIndex < lines.length - 1 && isLineSeen(node.id, state.lineIndex + 1)) {
        state.lineIndex += 1;
      }
    }
    if (state.lineIndex < lines.length - 1) {
      paintLine(node, state.lineIndex + 1);
      if (!state.typing) scheduleAuto();
      return;
    }
    if (!node.next) {
      stopAuto();
      return;
    }
    const next = getNode(node.next);
    if (!next) return;
    ensureScript(next).then((ready) => {
      fillReader(ready, { lineIndex: 0 });
      selectNode(ready.id);
      markRead(ready.id);
      if (!state.typing) scheduleAuto();
    });
  }

  function commentsFor(nodeId) {
    const demo = DEMO_DANMAKU[nodeId] || [];
    const extra = Array.isArray(state.danmaku[nodeId]) ? state.danmaku[nodeId] : [];
    return demo.concat(extra).slice(-12);
  }

  function flyDanmaku(text) {
    if (!els.vnDanmaku || !state.danmakuOn) return;
    const el = document.createElement("span");
    el.className = "vn__danmaku-item";
    el.textContent = text;
    const lane = state.danmakuLane++ % 5;
    el.style.top = `${16 + lane * 11}%`;
    if (!prefersReducedMotion()) el.style.animationDelay = `${-1.2 - lane * 0.7}s`;
    els.vnDanmaku.appendChild(el);
    while (els.vnDanmaku.children.length > 16) els.vnDanmaku.firstChild.remove();
  }

  function refreshDanmaku(nodeId) {
    if (!els.vnDanmaku) return;
    state.danmakuGen += 1;
    els.vnDanmaku.innerHTML = "";
    if (!state.danmakuOn) return;
    commentsFor(nodeId).forEach((text) => flyDanmaku(text));
  }

  function setDanmakuOn(on) {
    state.danmakuOn = Boolean(on);
    if (els.vnDanmakuToggle) {
      els.vnDanmakuToggle.setAttribute("aria-pressed", state.danmakuOn ? "true" : "false");
      els.vnDanmakuToggle.textContent = state.danmakuOn ? "弹幕开" : "弹幕关";
    }
    if (els.vnStage) els.vnStage.classList.toggle("is-danmaku-off", !state.danmakuOn);
    persistPlay();
    if (!state.danmakuOn && els.vnDanmaku) {
      state.danmakuGen += 1;
      els.vnDanmaku.innerHTML = "";
    } else if (state.readerNodeId) {
      refreshDanmaku(state.readerNodeId);
    }
  }

  function sendDanmaku() {
    if (!els.vnDanmakuInput || !state.readerNodeId) return;
    const text = String(els.vnDanmakuInput.value || "").trim().slice(0, 40);
    if (!text) return;
    if (!Array.isArray(state.danmaku[state.readerNodeId])) state.danmaku[state.readerNodeId] = [];
    state.danmaku[state.readerNodeId].push(text);
    writeStorage(STORAGE_KEYS.danmaku, state.danmaku);
    els.vnDanmakuInput.value = "";
    flyDanmaku(text);
  }

  function fillReader(node, { lineIndex = 0 } = {}) {
    stopTyping();
    stopAuto();
    state.readerNodeId = node.id;
    state.vnConstructId = null;
    els.readerTitle.textContent = node.title;
    els.readerSub.textContent = node.chapter;
    if (els.readerChapterNo) els.readerChapterNo.textContent = node.code;
    if (els.vnScene) els.vnScene.textContent = node.scene || node.chapter;
    setVnCg(node);
    const lines = nodeLines(node);
    const start = Math.max(0, Math.min(lineIndex, lines.length - 1));
    paintLine(node, start, { instant: isLineSeen(node.id, start) });
    setLogOpen(false);
    state.glossaryTerm = "";
    setGlossaryOpen(false);
    refreshDanmaku(node.id);
  }

  function advanceVn() {
    handleAdvance();
  }

  function rewindVn() {
    const node = getNode(state.readerNodeId);
    if (!node || state.lineIndex <= 0) return;
    stopAuto();
    paintLine(node, state.lineIndex - 1, { instant: true });
  }

  function openReader(nodeId, { lineIndex = 0 } = {}) {
    const node = getNode(nodeId);
    if (!node) return;
    selectNode(nodeId);
    ensureScript(node).then((ready) => {
      fillReader(ready, { lineIndex });
      markRead(nodeId);
      persistPlay();
      openDialog(els.readerDialog, els.readerNextBtn);
      if (state.autoOn) scheduleAuto();
    });
  }

  function openCompose({ mode = "reading", nodeId = "" } = {}) {
    els.composeForm.reset();
    els.composeStatus.textContent = "";
    els.composeStatus.className = "form-status";
    clearFieldErrors();
    els.composeMode.value = mode;
    els.composeNode.value = nodeId || state.activeNodeId || "";
    if (mode === "annotation") {
      els.composeTitle.textContent = "跟帖";
      els.composeSub.textContent = "写在本关下面，并出现在讨论区";
      els.composeBanner.dataset.mode = "annotation";
      els.composeBanner.textContent = `模式：跟帖 · ${nodeLabel(els.composeNode.value)}`;
      els.composeSubmit.textContent = "发帖";
    } else {
      els.composeTitle.textContent = "发帖";
      els.composeSub.textContent = "玩家讨论 · 写入本机 · 可随时清除";
      els.composeBanner.dataset.mode = "reading";
      els.composeBanner.textContent = "模式：发帖";
      els.composeSubmit.textContent = "发帖";
    }
    openDialog(els.composeDialog, els.composeTitleInput);
  }

  function clearFieldErrors() {
    [els.fieldTitle, els.fieldBody, els.composeSpoiler.closest(".field")].forEach((field) => {
      if (field) field.classList.remove("is-error", "is-success");
    });
    els.titleError.hidden = true;
    els.bodyError.hidden = true;
    els.spoilerError.hidden = true;
  }

  function validateCompose() {
    clearFieldErrors();
    let ok = true;
    const title = els.composeTitleInput.value.trim();
    const body = els.composeBody.value.trim();
    const spoiler = els.composeSpoiler.value;
    if (!title) {
      els.fieldTitle.classList.add("is-error");
      els.titleError.hidden = false;
      ok = false;
    }
    if (!body) {
      els.fieldBody.classList.add("is-error");
      els.bodyError.hidden = false;
      ok = false;
    }
    if (!spoiler) {
      els.composeSpoiler.closest(".field").classList.add("is-error");
      els.spoilerError.hidden = false;
      ok = false;
    }
    return ok;
  }

  function parseTags(raw) {
    return String(raw || "")
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 8);
  }

  function formatTime(iso) {
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return "—";
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    } catch (err) {
      return "—";
    }
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function replayFrameSwap() {
    if (!els.heroArt || prefersReducedMotion()) return;
    els.heroArt.classList.remove("is-swapping");
    if (els.heroCopy) els.heroCopy.classList.remove("is-swapping");
    void els.heroArt.offsetWidth;
    els.heroArt.classList.add("is-swapping");
    if (els.heroCopy) els.heroCopy.classList.add("is-swapping");
  }

  function renderLineup() {
    if (!els.heroLineup) return;
    els.heroLineup.innerHTML = SELECT_UNITS.map((id, i) => {
      const unit = CONSTRUCTS[id];
      const frame = String((unit.frame || "").split("/")[1] || unit.frame).trim();
      return `<button type="button" class="hero-unit" data-construct="${escapeHtml(id)}" style="--i:${i}" aria-pressed="false" aria-label="${escapeHtml(unit.cn + " · " + frame)}">
        <img src="${escapeHtml(unit.src)}" alt="${escapeHtml(unit.alt)}">
        <span class="hero-unit__meta"><strong>${escapeHtml(unit.cn)}</strong><span>${escapeHtml(String(frame).trim())}</span></span>
      </button>`;
    }).join("");
  }

  function markLineup() {
    if (!els.heroLineup) return;
    els.heroLineup.querySelectorAll(".hero-unit").forEach((btn) => {
      const on = btn.getAttribute("data-construct") === state.activeConstructId;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function applyConstructCopy(construct) {
    const copy = construct || WAITING;
    if (els.heroCv) els.heroCv.textContent = construct ? "CV. INTRO." : "SELECT";
    if (els.heroNameEn) els.heroNameEn.textContent = copy.en;
    if (els.heroNameCn) els.heroNameCn.textContent = copy.cn;
    if (els.heroFrame) els.heroFrame.textContent = copy.frame;
    if (els.heroLede) els.heroLede.textContent = copy.lede;
    if (els.heroFaction) els.heroFaction.textContent = copy.faction;
    if (els.heroClass) els.heroClass.textContent = copy.klass;
    if (els.heroLink) els.heroLink.textContent = copy.link;
    if (els.heroTagId) els.heroTagId.textContent = copy.tagId;
    if (els.heroArt) els.heroArt.classList.toggle("is-waiting", !construct);
    markLineup();
  }

  function setConstruct(id, { animate = false } = {}) {
    const construct = id && CONSTRUCTS[id] ? CONSTRUCTS[id] : null;
    const nextId = construct ? construct.id : null;
    const changed = nextId !== state.activeConstructId;
    state.activeConstructId = nextId;
    applyConstructCopy(construct);
    if (animate && changed && !prefersReducedMotion()) replayFrameSwap();
  }

  function revealItems(root, selector) {
    if (!root) return;
    const nodes = [...root.querySelectorAll(selector)];
    nodes.forEach((el, i) => {
      el.classList.remove("is-in");
      el.style.setProperty("--enter-delay", `${Math.min(i, 8) * 45}ms`);
    });
    if (prefersReducedMotion()) {
      nodes.forEach((el) => el.classList.add("is-in"));
      return;
    }
    if (!revealItems.io) {
      revealItems.io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealItems.io.unobserve(entry.target);
        });
      }, { threshold: 0.16, rootMargin: "0px 0px -6% 0px" });
    }
    nodes.forEach((el) => revealItems.io.observe(el));
  }

  function setTab(tab) {
    if (!TABS[tab]) return;
    state.activeTab = tab;
    if (els.storyTabs) {
      els.storyTabs.querySelectorAll(".pgr-tab").forEach((btn) => {
        const on = btn.getAttribute("data-tab") === tab;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-selected", on ? "true" : "false");
      });
    }
    const isNet = tab === "network";
    if (els.editionRail) els.editionRail.hidden = isNet;
    if (els.networkPanel) els.networkPanel.hidden = !isNet;
    if (isNet) {
      renderNetwork();
      return;
    }
    renderEditionRail();
    if (tab === "main") {
      selectChapter(state.activeChapterId || "ch00");
      return;
    }
    if (tab === "interlude") {
      selectInterlude(state.activeInterludeId || (INTERLUDES[0] && INTERLUDES[0].id));
      return;
    }
    renderStageList();
    const first = nodesInTab(tab)[0];
    if (first) selectNode(first.id);
  }

  function renderEditionRail() {
    if (!els.editionRail) return;
    if (state.activeTab === "main") {
      if (!MAIN_CHAPTERS.length) {
        els.editionRail.innerHTML = `<p class="note-list__empty">${escapeHtml(TABS.main.empty)}</p>`;
        return;
      }
      els.editionRail.innerHTML = MAIN_CHAPTERS.map((ch) => {
        const art = ch.cg
          ? `<span class="edition-cover__art" aria-hidden="true"><img src="${escapeHtml(ch.cg)}" alt=""></span>`
          : `<span class="edition-cover__art edition-cover__art--empty" aria-hidden="true"></span>`;
        return `
        <button type="button" class="edition-cover${ch.cg ? "" : " is-placeholder"}" data-chapter="${escapeHtml(ch.id)}" aria-pressed="false" aria-label="章节 ${escapeHtml(chapterLabel(ch))}">
          ${art}
          <span class="edition-cover__code">${escapeHtml(ch.code)}</span>
          <span class="edition-cover__type">${ch.cg ? "主线" : "目录"}</span>
          <strong class="edition-cover__title">${escapeHtml(ch.title)}</strong>
          <span class="edition-cover__meta">${escapeHtml(String((ch.stages || []).length))} 关</span>
        </button>`;
      }).join("");
      markMapReadState();
      revealItems(els.editionRail, ".edition-cover");
      return;
    }
    if (state.activeTab === "interlude") {
      if (!INTERLUDES.length) {
        els.editionRail.innerHTML = `<p class="note-list__empty">${escapeHtml(TABS.interlude.empty)}</p>`;
        return;
      }
      els.editionRail.innerHTML = INTERLUDES.map((item) => {
        const art = item.cg
          ? `<span class="edition-cover__art" aria-hidden="true"><img src="${escapeHtml(item.cg)}" alt=""></span>`
          : `<span class="edition-cover__art edition-cover__art--empty" aria-hidden="true"></span>`;
        const person = item.person && PEOPLE[item.person] ? PEOPLE[item.person].name : "间章";
        return `
        <button type="button" class="edition-cover${item.cg ? "" : " is-placeholder"}" data-interlude="${escapeHtml(item.id)}" aria-pressed="false" aria-label="间章 ${escapeHtml(item.title)}">
          ${art}
          <span class="edition-cover__code">${escapeHtml(item.code)}</span>
          <span class="edition-cover__type">${escapeHtml(person)}</span>
          <strong class="edition-cover__title">${escapeHtml(item.title)}</strong>
          <span class="edition-cover__meta">${escapeHtml(String((item.stages || []).length))} 关</span>
        </button>`;
      }).join("");
      markMapReadState();
      revealItems(els.editionRail, ".edition-cover");
      return;
    }
    const list = nodesInTab(state.activeTab);
    if (!list.length) {
      els.editionRail.innerHTML = `<p class="note-list__empty">${escapeHtml(TABS[state.activeTab]?.empty || "暂无条目。")}</p>`;
      return;
    }
    els.editionRail.innerHTML = list.map((node) => {
      const cg = node.cg || "./assets/covers/prologue.png";
      return `
        <button type="button" class="edition-cover" data-node="${escapeHtml(node.id)}" aria-pressed="false" aria-label="章节封面 ${escapeHtml(node.code)} ${escapeHtml(node.title)}">
          <span class="edition-cover__art" aria-hidden="true"><img src="${escapeHtml(cg)}" alt=""></span>
          <span class="edition-cover__code">${escapeHtml(node.code)}</span>
          <span class="edition-cover__type">${escapeHtml(node.type)}</span>
          <strong class="edition-cover__title">${escapeHtml(node.title)}</strong>
          <span class="edition-cover__meta">${escapeHtml(node.chapter)}</span>
        </button>`;
    }).join("");
    markMapReadState();
    revealItems(els.editionRail, ".edition-cover");
  }

  function renderStageList() {
    if (!els.stageList) return;
    if (state.activeTab === "main") {
      const ch = getChapter(state.activeChapterId) || MAIN_CHAPTERS[0];
      const stages = (ch && ch.stages) || [];
      els.stageList.innerHTML = stages.map((stage) => {
        const locked = !stage.nodeId;
        return `
      <button type="button" class="stage-chip${locked ? " is-locked" : ""}" data-stage="${escapeHtml(stage.code)}" ${stage.nodeId ? `data-node="${escapeHtml(stage.nodeId)}"` : ""} aria-label="${escapeHtml(stage.code)} ${escapeHtml(stage.title)}${locked ? " 目录占位" : ""}">
        <span class="stage-chip__play" aria-hidden="true"></span>
        <span class="stage-chip__code">${escapeHtml(stage.code)}</span>
        <strong class="stage-chip__title">${escapeHtml(stage.title)}</strong>
      </button>`;
      }).join("");
      markMapReadState();
      revealItems(els.stageList, ".stage-chip");
      return;
    }
    if (state.activeTab === "interlude") {
      const item = getInterlude(state.activeInterludeId) || INTERLUDES[0];
      const stages = (item && item.stages) || [];
      const playable = item && item.nodeId;
      els.stageList.innerHTML = stages.map((stage, i) => {
        const open = Boolean(playable && i === 0);
        return `
      <button type="button" class="stage-chip${open ? "" : " is-locked"}" data-stage="${escapeHtml(stage.code)}" ${open ? `data-node="${escapeHtml(item.nodeId)}"` : ""} aria-label="${escapeHtml(stage.title)}${open ? "" : " 目录占位"}">
        <span class="stage-chip__play" aria-hidden="true"></span>
        <span class="stage-chip__code">${escapeHtml(stage.code)}</span>
        <strong class="stage-chip__title">${escapeHtml(stage.title)}</strong>
      </button>`;
      }).join("");
      markMapReadState();
      revealItems(els.stageList, ".stage-chip");
      return;
    }
    const list = nodesInTab(state.activeTab === "network" ? "main" : state.activeTab);
    els.stageList.innerHTML = list.map(
      (node) => `
      <button type="button" class="stage-chip" data-node="${escapeHtml(node.id)}" aria-label="${escapeHtml(node.code)} ${escapeHtml(node.title)}">
        <span class="stage-chip__play" aria-hidden="true"></span>
        <span class="stage-chip__code">${escapeHtml(node.code)}</span>
        <strong class="stage-chip__title">${escapeHtml(node.title)}</strong>
      </button>`
    ).join("");
    markMapReadState();
    revealItems(els.stageList, ".stage-chip");
  }

  function showChapterPlaceholder(ch, stage) {
    const current = stage || firstPlayableStage(ch);
    els.panelKicker.textContent = chapterLabel(ch);
    els.panelType.textContent = "主线目录";
    els.panelTitle.textContent = current ? `${current.code} ${current.title}` : chapterLabel(ch);
    els.panelSummary.textContent = current && current.nodeId
      ? "主线普通关已接入本地剪本。"
      : "本地索引关卡名。";
    if (els.stageCg) {
      els.stageCg.src = ch.cg || "./assets/covers/prologue.png";
    }
    els.panelTags.hidden = false;
    els.panelTags.innerHTML = "";
    const tags = [chapterLabel(ch), `${(ch.stages || []).length} 关`, ch.cg ? "有封面" : "无封面占位"];
    tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      els.panelTags.appendChild(span);
    });
    if (els.panelLinks) els.panelLinks.hidden = false;
    els.panelPrev.textContent = "—";
    els.panelNext.textContent = "—";
    if (els.panelActions) els.panelActions.hidden = false;
    if (els.panelReadBtn) els.panelReadBtn.disabled = !(current && current.nodeId);
    if (els.nodeDiscussion) els.nodeDiscussion.hidden = false;
    renderNodeNotes("");
    markMapReadState();
  }

  function selectChapter(chapterId, stageCode) {
    const ch = getChapter(chapterId) || MAIN_CHAPTERS[0];
    if (!ch) return;
    state.activeChapterId = ch.id;
    const stage = (ch.stages || []).find((s) => s.code === stageCode) || firstPlayableStage(ch);
    state.activeStageCode = stage ? stage.code : null;
    renderStageList();
    if (stage && stage.nodeId) {
      if (els.panelReadBtn) els.panelReadBtn.disabled = false;
      selectNode(stage.nodeId, { syncConstruct: true });
      return;
    }
    state.activeNodeId = null;
    showChapterPlaceholder(ch, stage);
    const stageEl = document.getElementById("stage");
    if (stageEl) stageEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showInterludePlaceholder(item, stage) {
    const current = stage || (item.stages && item.stages[0]);
    const person = item.person && PEOPLE[item.person] ? PEOPLE[item.person].name : "间章";
    els.panelKicker.textContent = `间章 · ${person}`;
    els.panelType.textContent = "个人剧情";
    els.panelTitle.textContent = current ? `${current.code} ${current.title}` : item.title;
    els.panelSummary.textContent = item.nodeId
      ? "可播放示例关。完整个人剧情未接入。"
      : "本地索引关卡名。正文未接入，观看层仍只演示已有示例句。";
    if (els.stageCg) els.stageCg.src = item.cg || "./assets/covers/prologue.png";
    els.panelTags.hidden = false;
    els.panelTags.innerHTML = "";
    [item.title, person, `${(item.stages || []).length} 关`].forEach((tag) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      els.panelTags.appendChild(span);
    });
    if (els.panelLinks) els.panelLinks.hidden = false;
    els.panelPrev.textContent = "—";
    els.panelNext.textContent = "—";
    if (els.panelActions) els.panelActions.hidden = false;
    if (els.panelReadBtn) els.panelReadBtn.disabled = !item.nodeId;
    if (els.nodeDiscussion) els.nodeDiscussion.hidden = false;
    renderNodeNotes(item.nodeId || "");
    markMapReadState();
  }

  function selectInterlude(interludeId, stageCode) {
    const item = getInterlude(interludeId) || INTERLUDES[0];
    if (!item) return;
    state.activeInterludeId = item.id;
    const stage = (item.stages || []).find((s) => s.code === stageCode) || (item.stages || [])[0];
    state.activeStageCode = stage ? stage.code : null;
    renderStageList();
    if (item.nodeId && (!stageCode || stage === (item.stages || [])[0])) {
      if (els.panelReadBtn) els.panelReadBtn.disabled = false;
      selectNode(item.nodeId, { syncConstruct: true });
      return;
    }
    state.activeNodeId = null;
    showInterludePlaceholder(item, stage);
    const stageEl = document.getElementById("stage");
    if (stageEl) stageEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderNetwork() {
    if (!els.netGraph) return;
    const people = Object.values(PEOPLE);
    const lines = TIES.map((tie, i) => {
      const a = PEOPLE[tie.a];
      const b = PEOPLE[tie.b];
      if (!a || !b) return "";
      return `<line class="net-line" data-tie="${i}" data-a="${escapeHtml(tie.a)}" data-b="${escapeHtml(tie.b)}" x1="${a.x}%" y1="${a.y}%" x2="${b.x}%" y2="${b.y}%" />`;
    }).join("");
    const nodes = people.map((p) => {
      const construct = p.construct && CONSTRUCTS[p.construct];
      const src = construct ? construct.src : "";
      return `
        <button type="button" class="net-node" data-person="${escapeHtml(p.id)}" style="left:${p.x}%;top:${p.y}%;">
          ${src ? `<img src="${escapeHtml(src)}" alt="">` : `<span class="net-node__dot"></span>`}
          <strong>${escapeHtml(p.name)}</strong>
          <span>${escapeHtml(p.frame || "指挥")}</span>
        </button>`;
    }).join("");
    els.netGraph.innerHTML = `<svg class="net-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${lines}</svg>${nodes}`;
    if (els.netTies) {
      els.netTies.innerHTML = TIES.map((tie, i) => {
        const a = PEOPLE[tie.a];
        const b = PEOPLE[tie.b];
        const first = tie.nodes && tie.nodes[0];
        const extra = tie.interlude ? ` data-interlude="${escapeHtml(tie.interlude)}"` : "";
        return `<li><button type="button" class="net-tie" data-tie="${i}" data-a="${escapeHtml(tie.a)}" data-b="${escapeHtml(tie.b)}" data-node="${escapeHtml(first || "")}"${extra}>${escapeHtml(a.name)} — ${escapeHtml(b.name)} · ${escapeHtml(tie.label)}</button></li>`;
      }).join("");
    }
    setNetworkFocus(null);
  }

  function networkHint(personId, tieIndex) {
    if (personId && PEOPLE[personId]) {
      const p = PEOPLE[personId];
      const ties = TIES.filter((t) => t.a === personId || t.b === personId);
      const names = ties.map((t) => PEOPLE[t.a === personId ? t.b : t.a].name);
      const chapters = [...new Set(ties.flatMap((t) => t.nodes || []))].map((id) => nodeLabel(id));
      const stories = interludesForPerson(personId).map((item) => item.title);
      const appear = appearRecord(p.name);
      const first = appear ? nodeLabel(appear.first) : "";
      const seen = appearChapters(p.name);
      const seenText = seen.length ? (seen.length > 8 ? `${seen.slice(0, 8).join(" / ")} 等 ${seen.length} 章` : seen.join(" / ")) : "—";
      const look = stories.length ? stories.join(" / ") : (chapters.join(" / ") || first || "—");
      return `${p.name} · ${p.frame || "指挥"}　关系：${names.join("、") || "无"}　首次：${first || "—"}　出场：${seenText}　可回看：${look}`;
    }
    if (tieIndex != null && TIES[tieIndex]) {
      const tie = TIES[tieIndex];
      const chapters = (tie.nodes || []).map((id) => nodeLabel(id));
      return `${PEOPLE[tie.a].name} — ${PEOPLE[tie.b].name} · ${tie.label}　可回看：${chapters.join(" / ")}`;
    }
    return "悬停角色：高亮关系 · 点击：进入对应间章或主线";
  }

  function setNetworkFocus(personId, tieIndex) {
    if (!els.netGraph) return;
    const hotPeople = new Set();
    const hotTies = new Set();
    if (personId) {
      hotPeople.add(personId);
      TIES.forEach((t, i) => {
        if (t.a === personId || t.b === personId) {
          hotPeople.add(t.a);
          hotPeople.add(t.b);
          hotTies.add(i);
        }
      });
    } else if (tieIndex != null && TIES[tieIndex]) {
      const t = TIES[tieIndex];
      hotPeople.add(t.a);
      hotPeople.add(t.b);
      hotTies.add(tieIndex);
    }
    const active = hotPeople.size > 0;
    els.netGraph.classList.toggle("is-focusing", active);
    els.netGraph.querySelectorAll(".net-node").forEach((node) => {
      const id = node.getAttribute("data-person");
      node.classList.toggle("is-on", hotPeople.has(id));
      node.classList.toggle("is-dim", active && !hotPeople.has(id));
    });
    els.netGraph.querySelectorAll(".net-line").forEach((line) => {
      const i = Number(line.getAttribute("data-tie"));
      line.classList.toggle("is-on", hotTies.has(i));
      line.classList.toggle("is-dim", active && !hotTies.has(i));
    });
    if (els.netTies) {
      els.netTies.querySelectorAll(".net-tie").forEach((btn) => {
        const i = Number(btn.getAttribute("data-tie"));
        btn.classList.toggle("is-on", hotTies.has(i));
      });
    }
    if (els.netHint) els.netHint.textContent = networkHint(personId, tieIndex);
  }

  function allReadings() {
    return [...DEMO_READINGS, ...state.readings, ...state.notes.map(noteToReading)].sort((a, b) =>
      String(b.createdAt).localeCompare(String(a.createdAt))
    );
  }

  function noteToReading(note) {
    return {
      id: note.id,
      title: note.title,
      tags: note.tags || [],
      spoiler: note.spoiler,
      body: note.body,
      nodeId: note.nodeId,
      createdAt: note.createdAt,
      source: "annotation",
    };
  }

  function readingCardMarkup(item, { feature = false } = {}) {
    const node = getNode(item.nodeId);
    const sourceLabel =
      item.source === "demo" ? "演示帖" : item.source === "annotation" ? "跟帖" : "玩家帖";
    const tags = (item.tags || [])
      .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join("");
    const spoiler = item.spoiler || "none";
    const needsFold = spoiler !== "none";
    return `
      <article class="post-card${item.source !== "demo" ? " post-card--user" : ""}">
        <div class="post-card__meta">
          <span>${escapeHtml(sourceLabel)}</span>
          <span>${escapeHtml(formatTime(item.createdAt))}</span>
          <span>${escapeHtml(node ? node.code + " " + node.title : "未绑定")}</span>
        </div>
        <h3 class="post-card__title">${escapeHtml(item.title)}</h3>
        <div class="spoiler-block" data-spoiler="${escapeHtml(spoiler)}">
          ${
            needsFold
              ? `<button type="button" class="btn btn--ghost btn--compact spoiler-reveal" data-spoiler-reveal>显示剧透 · ${escapeHtml(SPOILER_LABEL[spoiler] || spoiler)}</button>`
              : ""
          }
          <div class="spoiler-content">
            <p class="post-card__body">${escapeHtml(item.body)}</p>
            <span class="reading-card__spoiler">${escapeHtml(SPOILER_LABEL[spoiler] || spoiler)}</span>
            ${tags ? `<div class="reading-card__tags">${tags}</div>` : ""}
          </div>
        </div>
      </article>`;
  }

  function renderReadings() {
    if (!els.readingsList) return;
    const items = allReadings();
    if (!items.length) {
      els.readingsList.innerHTML = '<p class="note-list__empty">还没有帖子。</p>';
      return;
    }
    els.readingsList.innerHTML = items.map((item) => readingCardMarkup(item)).join("");
    revealItems(els.readingsList, ".post-card");
  }

  function buildSearchIndex() {
    const chapterHits = allStoryNodes().map((n) => ({
      group: "章节",
      id: n.id,
      title: `${n.code} ${n.title}`,
      meta: n.chapter,
      type: "node",
      hay: `${n.code} ${n.title} ${n.chapter} ${n.summary} ${n.type}`.toLowerCase(),
    }));
    const charSet = new Map();
    const factionSet = new Map();
    allStoryNodes().forEach((n) => {
      (n.characters || []).forEach((c) => {
        if (!charSet.has(c)) charSet.set(c, []);
        charSet.get(c).push(n.id);
      });
      (n.factions || []).forEach((f) => {
        if (!factionSet.has(f)) factionSet.set(f, []);
        factionSet.get(f).push(n.id);
      });
    });
    STORY_PEOPLE.forEach((p) => {
      if (!charSet.has(p.name)) charSet.set(p.name, [p.first]);
    });
    const characterHits = [...charSet.entries()].map(([name, nodeIds]) => ({
      group: "角色",
      id: `char:${name}`,
      title: name,
      meta: `关联 ${nodeIds.length} 个节点`,
      type: "character",
      nodeIds,
      hay: name.toLowerCase(),
    }));
    const factionHits = [...factionSet.entries()].map(([name, nodeIds]) => ({
      group: "势力",
      id: `fac:${name}`,
      title: name,
      meta: `关联 ${nodeIds.length} 个节点`,
      type: "faction",
      nodeIds,
      hay: name.toLowerCase(),
    }));
    const readingHits = allReadings().map((r) => ({
      group: "解读",
      id: r.id,
      title: r.title,
      meta: SPOILER_LABEL[r.spoiler] || "",
      type: "reading",
      nodeId: r.nodeId,
      hay: `${r.title} ${(r.tags || []).join(" ")} ${r.body}`.toLowerCase(),
    }));
    return [...chapterHits, ...characterHits, ...factionHits, ...readingHits];
  }

  function runSearch(query) {
    const q = String(query || "").trim().toLowerCase();
    els.searchResults.innerHTML = "";
    state.searchHits = [];
    state.searchActiveIndex = -1;
    if (!q) {
      els.searchEmpty.hidden = true;
      return;
    }
    const hits = buildSearchIndex().filter((item) => item.hay.includes(q));
    if (!hits.length) {
      els.searchEmpty.hidden = false;
      return;
    }
    els.searchEmpty.hidden = true;
    const groups = {};
    hits.forEach((hit) => {
      if (!groups[hit.group]) groups[hit.group] = [];
      groups[hit.group].push(hit);
    });
    const order = ["章节", "角色", "势力", "解读"];
    order.forEach((groupName) => {
      const list = groups[groupName];
      if (!list) return;
      const section = document.createElement("section");
      section.className = "search-group";
      section.innerHTML = `<h3>${escapeHtml(groupName)}</h3>`;
      const ul = document.createElement("ul");
      ul.className = "search-hits";
      list.forEach((hit) => {
        const globalIndex = state.searchHits.length;
        state.searchHits.push(hit);
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "search-hit";
        btn.dataset.index = String(globalIndex);
        btn.innerHTML = `<span class="search-hit__title">${escapeHtml(hit.title)}</span><span class="search-hit__meta">${escapeHtml(hit.meta)}</span>`;
        btn.addEventListener("click", () => activateSearchHit(globalIndex, true));
        li.appendChild(btn);
        ul.appendChild(li);
      });
      section.appendChild(ul);
      els.searchResults.appendChild(section);
    });
    setSearchActive(0);
  }

  function setSearchActive(index) {
    if (!state.searchHits.length) return;
    state.searchActiveIndex = (index + state.searchHits.length) % state.searchHits.length;
    els.searchResults.querySelectorAll(".search-hit").forEach((btn) => {
      const i = Number(btn.dataset.index);
      btn.classList.toggle("is-active", i === state.searchActiveIndex);
    });
    const activeBtn = els.searchResults.querySelector(`.search-hit[data-index="${state.searchActiveIndex}"]`);
    if (activeBtn) activeBtn.scrollIntoView({ block: "nearest" });
  }

  function activateSearchHit(index, open) {
    const hit = state.searchHits[index];
    if (!hit) return;
    setSearchActive(index);
    if (!open) return;
    closeDialog(els.searchDialog);
    if (hit.type === "node") {
      selectNode(hit.id, { scrollPanel: true });
      openReader(hit.id);
    } else if (hit.type === "character" || hit.type === "faction") {
      const first = hit.nodeIds && hit.nodeIds[0];
      if (first) {
        selectNode(first, { scrollPanel: true });
        document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (hit.type === "reading") {
      if (hit.nodeId) selectNode(hit.nodeId, { scrollPanel: true });
      document.getElementById("readings").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function detectModKbd() {
    const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || "");
    els.searchKbd.textContent = isMac ? "⌘ K" : "Ctrl K";
  }

  function onComposeSubmit(event) {
    event.preventDefault();
    if (!validateCompose()) {
      els.composeStatus.textContent = "请修正标红字段";
      els.composeStatus.className = "form-status is-error";
      return;
    }
    const mode = els.composeMode.value;
    const payload = {
      id: uid(mode === "annotation" ? "note" : "read"),
      title: els.composeTitleInput.value.trim(),
      tags: parseTags(els.composeTags.value),
      spoiler: els.composeSpoiler.value,
      body: els.composeBody.value.trim(),
      nodeId: els.composeNode.value || state.activeNodeId || (MAIN_CATALOG[0] && MAIN_CATALOG[0].id) || NODES[0].id,
      createdAt: new Date().toISOString(),
      source: mode === "annotation" ? "annotation" : "user",
    };

    if (mode === "annotation") {
      state.notes.unshift(payload);
      writeStorage(STORAGE_KEYS.notes, state.notes);
      if (payload.nodeId === state.activeNodeId) renderNodeNotes(payload.nodeId);
      els.composeStatus.textContent = "跟帖已写入本机";
    } else {
      state.readings.unshift(payload);
      writeStorage(STORAGE_KEYS.readings, state.readings);
      els.composeStatus.textContent = "帖子已写入本机";
    }
    els.composeStatus.className = "form-status is-success";
    els.fieldTitle.classList.add("is-success");
    els.fieldBody.classList.add("is-success");
    renderReadings();
    window.setTimeout(() => {
      closeDialog(els.composeDialog);
      const board = document.getElementById("board");
      if (board) board.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 280);
  }

  function bindEvents() {
    if (els.stageList) {
      els.stageList.addEventListener("click", (e) => {
        const chip = e.target.closest(".stage-chip");
        if (!chip) return;
        const nodeId = chip.getAttribute("data-node");
        const stageCode = chip.getAttribute("data-stage");
        if (state.activeTab === "main") {
          selectChapter(state.activeChapterId, stageCode);
          if (nodeId) openReader(nodeId);
          return;
        }
        if (state.activeTab === "interlude") {
          selectInterlude(state.activeInterludeId, stageCode);
          if (nodeId) openReader(nodeId);
          return;
        }
        if (nodeId) openReader(nodeId);
      });
    }

    if (els.heroLineup) {
      els.heroLineup.addEventListener("click", (e) => {
        const btn = e.target.closest(".hero-unit[data-construct]");
        if (!btn) return;
        setConstruct(btn.getAttribute("data-construct"), { animate: true });
      });
    }

    document.querySelectorAll(".site-rail__item").forEach((link) => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href") || "";
        if (href === "#network") setTab("network");
        if (href === "#story") setTab("main");
        document.querySelectorAll(".site-rail__item").forEach((item) => {
          item.classList.toggle("is-active", item === link);
        });
      });
    });

    if (els.commandGrid) {
      const previewOp = (op) => {
        if (!op) return;
        els.commandGrid.querySelectorAll(".command-op").forEach((item) => {
          item.classList.toggle("is-on", item === op);
        });
        const src = op.getAttribute("data-preview");
        const code = op.querySelector(".command-op__code");
        if (els.commandPreviewImg && src) els.commandPreviewImg.src = src;
        if (els.commandPreviewCode && code) els.commandPreviewCode.textContent = code.textContent;
      };
      els.commandGrid.addEventListener("pointerover", (e) => {
        const op = e.target.closest(".command-op[data-go]");
        if (op) previewOp(op);
      });
      els.commandGrid.addEventListener("focusin", (e) => {
        const op = e.target.closest(".command-op[data-go]");
        if (op) previewOp(op);
      });
      els.commandGrid.addEventListener("click", (e) => {
        const card = e.target.closest("[data-go]");
        if (!card) return;
        previewOp(card);
        const go = card.getAttribute("data-go");
        if (go === "story") setTab("main");
        if (go === "net") setTab("network");
        document.querySelectorAll(".site-rail__item").forEach((item) => {
          const href = item.getAttribute("href") || "";
          const on = (go === "continue" && href === "#story")
            || (go === "story" && href === "#story")
            || (go === "data" && href === "#operator")
            || (go === "net" && href === "#network")
            || (go === "board" && href === "#board");
          item.classList.toggle("is-active", on);
        });
      });
    }

    if (els.storyTabs) {
      els.storyTabs.addEventListener("click", (e) => {
        const tab = e.target.closest(".pgr-tab[data-tab]");
        if (!tab || tab.disabled) return;
        const key = tab.getAttribute("data-tab");
        setTab(key);
        if (key === "network") {
          const net = document.getElementById("network");
          if (net) net.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    if (els.netGraph) {
      els.netGraph.addEventListener("pointerover", (e) => {
        const node = e.target.closest(".net-node[data-person]");
        if (node) {
          setNetworkFocus(node.getAttribute("data-person"));
          return;
        }
        const line = e.target.closest(".net-line[data-tie]");
        if (line) setNetworkFocus(null, Number(line.getAttribute("data-tie")));
      });
      els.netGraph.addEventListener("pointerout", (e) => {
        if (els.netGraph.contains(e.relatedTarget)) return;
        setNetworkFocus(null);
      });
      els.netGraph.addEventListener("focusin", (e) => {
        const node = e.target.closest(".net-node[data-person]");
        if (node) setNetworkFocus(node.getAttribute("data-person"));
      });
      els.netGraph.addEventListener("focusout", (e) => {
        if (els.netGraph.contains(e.relatedTarget)) return;
        setNetworkFocus(null);
      });
      els.netGraph.addEventListener("click", (e) => {
        const node = e.target.closest(".net-node[data-person]");
        if (!node) return;
        const person = PEOPLE[node.getAttribute("data-person")];
        if (!person) return;
        if (person.interlude) {
          state.activeInterludeId = person.interlude;
          setTab("interlude");
          return;
        }
        const appear = appearRecord(person.name);
        const hit =
          NODES.find((n) => n.group === "interlude" && n.cover === person.construct) ||
          (appear && getNode(appear.first)) ||
          MAIN_CATALOG.find((n) => (n.characters || []).some((c) => c.includes(person.name))) ||
          NODES.find((n) => (n.characters || []).some((c) => c.includes(person.name)));
        if (hit) {
          const tab = hit.group === "interlude" || hit.group === "event" ? hit.group : "main";
          setTab(tab);
          selectNode(hit.id, { syncConstruct: true });
          const stage = document.getElementById("stage");
          if (stage) stage.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    if (els.netTies) {
      els.netTies.addEventListener("pointerover", (e) => {
        const btn = e.target.closest(".net-tie[data-tie]");
        if (!btn) return;
        setNetworkFocus(null, Number(btn.getAttribute("data-tie")));
      });
      els.netTies.addEventListener("pointerout", (e) => {
        if (els.netTies.contains(e.relatedTarget)) return;
        setNetworkFocus(null);
      });
      els.netTies.addEventListener("click", (e) => {
        const btn = e.target.closest(".net-tie");
        if (!btn) return;
        const i = Number(btn.getAttribute("data-tie"));
        const tie = TIES[i];
        if (tie && tie.interlude) {
          state.activeInterludeId = tie.interlude;
          setTab("interlude");
          return;
        }
        const id = btn.getAttribute("data-node");
        if (!id) return;
        const hit = getNode(id);
        if (hit && hit.group && hit.group !== "network") {
          state.activeTab = hit.group === "interlude" || hit.group === "event" ? hit.group : "main";
          renderEditionRail();
          renderStageList();
        }
        selectNode(id, { syncConstruct: true });
        const stage = document.getElementById("stage");
        if (stage) stage.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    if (els.editionRail) {
      els.editionRail.addEventListener("click", (e) => {
        const chapterCover = e.target.closest(".edition-cover[data-chapter]");
        if (chapterCover) {
          selectChapter(chapterCover.getAttribute("data-chapter"));
          const stage = document.getElementById("stage");
          if (stage) stage.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        const interludeCover = e.target.closest(".edition-cover[data-interlude]");
        if (interludeCover) {
          selectInterlude(interludeCover.getAttribute("data-interlude"));
          const stage = document.getElementById("stage");
          if (stage) stage.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        const cover = e.target.closest(".edition-cover[data-node]");
        if (!cover) return;
        const id = cover.getAttribute("data-node");
        selectNode(id, { syncConstruct: true });
        const stage = document.getElementById("stage");
        if (stage) stage.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    els.panelReadBtn.addEventListener("click", () => {
      if (state.activeNodeId) openReader(state.activeNodeId);
    });
    els.panelNoteBtn.addEventListener("click", () => {
      openCompose({ mode: "annotation", nodeId: state.activeNodeId });
    });
    if (els.continueBtn) {
      els.continueBtn.addEventListener("click", () => {
        const target = state.play.nodeId || state.progress.lastNodeId || (MAIN_CATALOG[0] && MAIN_CATALOG[0].id) || NODES[0].id;
        const lineIndex = target === state.play.nodeId ? state.play.lineIndex || 0 : 0;
        openReader(target, { lineIndex });
      });
    }

    if (els.readingsList) els.readingsList.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-spoiler-reveal]");
      if (!btn) return;
      const block = btn.closest(".spoiler-block");
      if (!block) return;
      block.classList.add("is-open");
      btn.hidden = true;
    });

    els.searchOpen.addEventListener("click", () => {
      openDialog(els.searchDialog, els.searchInput);
      runSearch(els.searchInput.value);
    });
    els.publishOpen.addEventListener("click", () => openCompose({ mode: "reading" }));
    if (els.boardPostBtn) els.boardPostBtn.addEventListener("click", () => openCompose({ mode: "reading" }));

    document.querySelectorAll("[data-close]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-close");
        const dialog = document.getElementById(id);
        if (dialog) closeDialog(dialog);
      });
    });

    [els.readerDialog, els.searchDialog, els.composeDialog].forEach((dialog) => {
      dialog.addEventListener("close", () => {
        if (dialog === els.readerDialog) {
          stopTyping();
          stopAuto();
          persistPlay();
        }
        restoreFocus();
      });
      dialog.addEventListener("cancel", (e) => {
        e.preventDefault();
        closeDialog(dialog);
      });
    });

    els.readerNoteBtn.addEventListener("click", () => {
      const nodeId = state.readerNodeId || state.activeNodeId;
      closeDialog(els.readerDialog);
      openCompose({ mode: "annotation", nodeId });
    });
    els.readerNextBtn.addEventListener("click", advanceVn);
    if (els.vnAdvance) els.vnAdvance.addEventListener("click", advanceVn);
    if (els.vnPrevBtn) els.vnPrevBtn.addEventListener("click", rewindVn);
    if (els.vnAutoBtn) {
      els.vnAutoBtn.addEventListener("click", () => setAutoOn(!state.autoOn));
    }
    if (els.vnSkipBtn) {
      els.vnSkipBtn.addEventListener("click", () => setSkipRead(!state.skipRead));
    }
    if (els.vnLogBtn) {
      els.vnLogBtn.addEventListener("click", () => setLogOpen(!state.logOpen));
    }
    if (els.vnGlossaryBtn) {
      els.vnGlossaryBtn.addEventListener("click", () => setGlossaryOpen(!state.glossaryOpen));
    }
    if (els.vnLine) {
      els.vnLine.addEventListener("click", (e) => {
        const btn = e.target.closest(".vn__term[data-term]");
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();
        openTerm(btn.getAttribute("data-term"));
      });
    }
    if (els.vnGlossaryList) {
      els.vnGlossaryList.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-term]");
        if (!btn) return;
        openTerm(btn.getAttribute("data-term"));
      });
    }
    if (els.vnDanmakuToggle) {
      els.vnDanmakuToggle.addEventListener("click", () => setDanmakuOn(!state.danmakuOn));
    }
    if (els.vnDanmakuSend) els.vnDanmakuSend.addEventListener("click", sendDanmaku);
    if (els.vnDanmakuInput) {
      els.vnDanmakuInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          sendDanmaku();
        }
      });
    }
    els.readerDialog.addEventListener("keydown", (e) => {
      if (!els.readerDialog.open) return;
      if (e.target && e.target.closest("input, textarea, select")) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        advanceVn();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        rewindVn();
      } else if (e.key === " " || e.key === "Enter") {
        if (e.target && e.target.closest("button, a")) return;
        e.preventDefault();
        advanceVn();
      } else if ((e.key || "").toLowerCase() === "a") {
        e.preventDefault();
        setAutoOn(!state.autoOn);
      } else if ((e.key || "").toLowerCase() === "y" || (e.key || "").toLowerCase() === "h") {
        e.preventDefault();
        setLogOpen(!state.logOpen);
      } else if ((e.key || "").toLowerCase() === "g") {
        e.preventDefault();
        setGlossaryOpen(!state.glossaryOpen);
      }
    });

    els.searchInput.addEventListener("input", () => runSearch(els.searchInput.value));
    els.searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (state.searchActiveIndex >= 0) activateSearchHit(state.searchActiveIndex, true);
    });

    els.searchDialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSearchActive(state.searchActiveIndex + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSearchActive(state.searchActiveIndex - 1);
      } else if (e.key === "Enter" && document.activeElement === els.searchInput) {
        if (state.searchActiveIndex >= 0) {
          e.preventDefault();
          activateSearchHit(state.searchActiveIndex, true);
        }
      } else if (e.key === "Escape") {
        closeDialog(els.searchDialog);
      }
    });

    els.composeForm.addEventListener("submit", onComposeSubmit);

    document.addEventListener("keydown", (e) => {
      const key = e.key && e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && key === "k") {
        e.preventDefault();
        if (els.searchDialog.open) {
          els.searchInput.focus();
        } else {
          openDialog(els.searchDialog, els.searchInput);
          runSearch(els.searchInput.value);
        }
      }
    });
  }

  function init() {
    cacheEls();
    detectModKbd();
    loadState();
    renderReadings();
    bindEvents();
    setDanmakuOn(state.danmakuOn);
    setAutoOn(state.autoOn);
    setSkipRead(state.skipRead);
    setLogOpen(false);
    renderLineup();
    setConstruct(null);
    startLinkGate();
    loadStoryData().then(() => {
      setProgressUI();
      setTab("main");
      if (state.play.nodeId || state.progress.lastNodeId) {
        const resumeId = state.play.nodeId || state.progress.lastNodeId;
        const host = MAIN_CHAPTERS.find((ch) => (ch.stages || []).some((s) => s.nodeId === resumeId));
        if (host) state.activeChapterId = host.id;
        if (getNode(resumeId)) {
          selectNode(resumeId);
          renderStageList();
        }
      }
      markMapReadState();
    }).catch(() => {
      setProgressUI();
      setTab("main");
    });
  }

  function startLinkGate() {
    const gate = $("link-gate");
    const skip = $("link-gate-skip");
    const status = $("link-gate-status");
    const hero = $("operator");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let closed = false;
    const bootHero = () => {
      const home = $("home");
      if (home) {
        home.classList.add("is-booting");
        window.setTimeout(() => home.classList.remove("is-booting"), 900);
      }
      if (hero) {
        hero.classList.add("is-booting");
        window.setTimeout(() => hero.classList.remove("is-booting"), 720);
      }
    };
    const close = () => {
      if (closed) return;
      closed = true;
      if (status) status.textContent = "READY";
      document.body.classList.remove("is-linking");
      if (!gate) {
        bootHero();
        return;
      }
      gate.classList.add("is-out");
      window.setTimeout(() => {
        gate.hidden = true;
        bootHero();
      }, reduce ? 120 : 420);
    };
    if (!gate) {
      close();
      return;
    }
    document.body.classList.add("is-linking");
    const words = ["SCAN", "LINK", "HANDSHAKE", "READY"];
    let i = 0;
    const tick = window.setInterval(() => {
      i += 1;
      if (status && words[i]) status.textContent = words[i];
      if (i >= words.length - 1) window.clearInterval(tick);
    }, reduce ? 70 : 520);
    const finish = (e) => {
      if (e && (e.key === " " || e.key === "Enter" || e.key === "Escape")) e.preventDefault();
      window.clearInterval(tick);
      close();
    };
    window.setTimeout(finish, reduce ? 240 : 2680);
    if (skip) skip.addEventListener("click", finish);
    gate.addEventListener("click", finish);
    document.addEventListener("keydown", (e) => {
      if (closed) return;
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish(e);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
