import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARCHIVE = "F:/战双帕弥什-剧情回顾/01-主线剧情";
const OUT = path.join(ROOT, "story");
const WPM = 300;

const KNOWN_SPEAKERS = {
  露西亚: "lucia-lotus",
  丽芙: "liv-eclipse",
  里: "lee-palefire",
  七实: "nanami-storm",
  指挥官: "commander",
  哈桑: "hassan",
  系统: "system",
};

const GLOSSARY = {
  构造体: "意识转入机兵后的作战单位，不是普通人。",
  指挥官: "空中花园的前线指挥。过剧情时默认视角。",
  空中花园: "近地轨道据点。灰鸦从这里被派往地面。",
  人类阵线: "仍在地面作战的人类势力。",
  灰鸦小队: "空中花园编制：露西亚、丽芙、里。",
  灰鸦: "灰鸦小队的简称。",
  红莲: "露西亚的初期机兵。早期主线默认形态。",
  蚀暗: "丽芙的初期机兵。早期主线默认形态。",
  异火: "里的初期机兵。早期主线默认形态。",
  风暴: "七实的初期机兵。",
  感染体: "被惩罚病毒侵蚀的机械或生物。",
  机兵: "构造体化身的作战机体。",
  过境: "本站名，也借公开关卡「灰鸦过境」。",
  帕弥什: "导致文明崩溃的病毒。构造体与指挥官因此被派往地面。",
  意识海: "构造体意识所在的系统，不是普通电路。",
  黄金时代: "灾难前的人类文明高峰。",
  科学理事会: "空中花园的科研决策层。",
  格式塔: "黄金时代超级 AI，现为空中花园最高管控 AI。",
};

function read(file) {
  return fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
}

function loadChapters() {
  const raw = read(path.join(ROOT, "chapters.js"));
  return JSON.parse(raw.replace(/^window\.PGR_MAIN_CHAPTERS\s*=\s*/, "").replace(/;\s*$/, ""));
}

function chapterFolder(ch) {
  if (ch.code === "00") return "序章";
  return `${ch.code} ${ch.title}`;
}

function tocOrdinary(dir) {
  const toc = path.join(dir, "00-章节目录.md");
  if (!fs.existsSync(toc)) return [];
  const text = read(toc);
  const chunk = text.split(/^## /m).find((p) => p.startsWith("普通剧情"));
  if (!chunk) return [];
  const out = [];
  for (const line of chunk.split("\n")) {
    const m = line.match(/\[[^\]]*\]\(([^)]+)\)/);
    if (!m) continue;
    out.push(decodeURIComponent(m[1].replace(/\\ /g, " ")));
  }
  return out;
}

function isMeta(line) {
  return (
    /^# /.test(line) ||
    /^- (来源|页面|所属章节|分组|标题|章节|分类|序号)：/.test(line) ||
    line.trim() === ""
  );
}

function isGoalFence(q) {
  return /^(通关目标|出战成员|【首发】|【支援】|⬢)/.test(q);
}

function parseStage(text) {
  const rawLines = text.split("\n");
  let summary = "";
  let inGoals = false;
  const seenSummary = [];
  const lines = [];

  const pushNarrator = (value) => {
    const textLine = String(value || "").replace(/\s+/g, " ").trim();
    if (!textLine) return;
    lines.push({ speaker: "narrator", text: textLine });
  };

  for (let i = 0; i < rawLines.length; i += 1) {
    const line = rawLines[i];
    const trimmed = line.trim();
    if (!inGoals && isMeta(trimmed) && !trimmed.startsWith(">")) continue;

    if (trimmed.startsWith(">")) {
      const q = trimmed.replace(/^>\s?/, "").trim();
      if (isGoalFence(q) || q === "通关目标" || q === "出战成员") {
        inGoals = true;
        continue;
      }
      if (inGoals) continue;
      if (!summary && q) {
        seenSummary.push(q);
        continue;
      }
      pushNarrator(q);
      continue;
    }

    if (inGoals) {
      if (trimmed === "" || isGoalFence(trimmed) || /^(露西亚|丽芙|里|七实)/.test(trimmed)) continue;
      inGoals = false;
    }

    if (trimmed.startsWith("####")) {
      pushNarrator(trimmed.replace(/^#+\s*/, ""));
      continue;
    }
    const talk = trimmed.match(/^\*\*(.+?)\*\*\s*[:：]\s*(.*)$/);
    if (talk) {
      const name = talk[1].trim();
      const speech = talk[2].trim() || "……";
      const speaker = KNOWN_SPEAKERS[name] || name;
      lines.push({ speaker, text: speech, name: KNOWN_SPEAKERS[name] ? undefined : name });
      continue;
    }
    if (trimmed.startsWith("- ") || trimmed.startsWith("#")) continue;
    if (trimmed) pushNarrator(trimmed.replace(/\*\*/g, ""));
  }

  if (seenSummary.length) summary = seenSummary.join(" ");
  if (!summary && lines[0]) summary = lines[0].text.slice(0, 80);
  const cleaned = lines.map((line) => {
    const row = { speaker: line.speaker, text: line.text };
    if (line.name) row.name = line.name;
    return row;
  });
  return { summary, lines: cleaned };
}

function charsOf(lines) {
  return lines.reduce((n, line) => n + String(line.text || "").replace(/\s/g, "").length, 0);
}

function minutesOf(count) {
  return Math.max(1, Math.round(count / WPM) || 1);
}

function peopleOf(lines) {
  const names = [];
  for (const line of lines) {
    if (line.speaker === "narrator" || line.speaker === "system") continue;
    const name = line.name || (
      line.speaker === "lucia-lotus" ? "露西亚"
      : line.speaker === "liv-eclipse" ? "丽芙"
      : line.speaker === "lee-palefire" ? "里"
      : line.speaker === "nanami-storm" ? "七实"
      : line.speaker === "commander" ? "指挥官"
      : line.speaker === "hassan" ? "哈桑"
      : line.speaker
    );
    if (name && !names.includes(name)) names.push(name);
  }
  return names;
}

function nodeId(ch, stage) {
  return `m${ch.code}-${stage.code}`;
}

function uniqueKey(base, used) {
  let key = base;
  let n = 2;
  while (used.has(key)) {
    key = `${base}-${n}`;
    n += 1;
  }
  used.add(key);
  return key;
}

const chapters = loadChapters();
const catalog = [];
const peopleIndex = new Map();
const usedIds = new Set();
const warnings = [];

fs.rmSync(path.join(OUT, "main"), { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "main"), { recursive: true });

for (const ch of chapters) {
  const folder = path.join(ARCHIVE, chapterFolder(ch));
  if (!fs.existsSync(folder)) {
    warnings.push(`missing folder ${chapterFolder(ch)}`);
    continue;
  }
  const listed = tocOrdinary(folder).map((rel) => path.join(folder, rel));
  const stages = ch.stages || [];
  if (listed.length && listed.length !== stages.length) {
    warnings.push(`${ch.code} toc ${listed.length} vs stages ${stages.length}`);
  }
  stages.forEach((stage, i) => {
    const file = listed[i];
    const id = uniqueKey(nodeId(ch, stage), usedIds);
    let parsed = { summary: "", lines: [] };
    if (file && fs.existsSync(file)) {
      parsed = parseStage(read(file));
    } else {
      warnings.push(`missing file ${ch.code} ${stage.code}`);
    }
    const chars = charsOf(parsed.lines);
    const minutes = minutesOf(chars);
    const characters = peopleOf(parsed.lines);
    const blob = `${parsed.summary}\n${parsed.lines.map((line) => line.text).join("\n")}`;
    if (/哈桑/.test(blob) && !characters.includes("哈桑")) characters.unshift("哈桑");
    const destDir = path.join(OUT, "main", ch.id);
    fs.mkdirSync(destDir, { recursive: true });
    const fileBase = uniqueKey(String(stage.code), new Set(
      fs.existsSync(destDir) ? fs.readdirSync(destDir).map((name) => name.replace(/\.json$/i, "")) : []
    ));
    const rel = `./story/main/${ch.id}/${fileBase}.json`;
    fs.writeFileSync(path.join(destDir, `${fileBase}.json`), `${JSON.stringify({ id, lines: parsed.lines })}\n`);
    stage.nodeId = id;
    stage.script = rel;
    catalog.push({
      id,
      chapterId: ch.id,
      chapter: ch.code === "00" ? "00 序章" : `${ch.code} ${ch.title}`,
      code: stage.code,
      title: stage.title,
      summary: parsed.summary,
      chars,
      minutes,
      characters,
      script: rel,
      cg: ch.cg,
      prev: null,
      next: null,
    });
    characters.forEach((name) => {
      String(name).split(/[&／/、]/).map((part) => part.trim()).filter(Boolean).forEach((part) => {
        if (part === "感染体" || part === "？？？" || part.includes("<")) return;
        if (!peopleIndex.has(part)) peopleIndex.set(part, { name: part, first: id, chapters: [] });
        const row = peopleIndex.get(part);
        if (!row.chapters.includes(ch.id)) row.chapters.push(ch.id);
      });
    });
  });
}

for (let i = 0; i < catalog.length; i += 1) {
  catalog[i].prev = i ? catalog[i - 1].id : null;
  catalog[i].next = i + 1 < catalog.length ? catalog[i + 1].id : null;
}

fs.writeFileSync(path.join(OUT, "catalog.json"), `${JSON.stringify(catalog)}\n`);
fs.writeFileSync(path.join(OUT, "people.json"), `${JSON.stringify([...peopleIndex.values()])}\n`);
fs.writeFileSync(path.join(OUT, "glossary.json"), `${JSON.stringify(GLOSSARY)}\n`);
fs.writeFileSync(path.join(ROOT, "chapters.js"), `window.PGR_MAIN_CHAPTERS = ${JSON.stringify(chapters)};\n`);

const empty = catalog.filter((row) => !row.chars).length;
console.log(JSON.stringify({
  chapters: chapters.length,
  stages: catalog.length,
  empty,
  people: peopleIndex.size,
  warnings: warnings.slice(0, 20),
  sample: catalog.slice(0, 3).map((row) => ({ id: row.id, chars: row.chars, minutes: row.minutes, n: row.characters.length })),
}, null, 2));
