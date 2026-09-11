## 2026-09-11 - Task: 实现 MINDTRACE / 意识海档案可运行首版静态剧情站

### What was done
完成本地静态前端闭环首版：Signal Archive 主题 tokens、Map/Diagram 编辑式样式、语义化页面（N13 导航、状态带、hero、SVG 地图、档案索引、近期解读、三弹层、Ft4 页脚），以及演示数据驱动的阅读/批注/解读发布/⌘K 搜索与 localStorage 持久化。

### Testing
- 使用 Node 对 `index.html` / `tokens.css` / `styles.css` / `app.js` 做结构与语法检查：语义标签、3 个 dialog、6 个地图节点、Hallmark stamp、OKLCH tokens、`overflow-x: clip`、reduced-motion、localStorage key、Ctrl/Meta+K、JSON 防护、示例文本声明、Google Fonts 外链；`new Function(app.js)` 语法通过。
- 结果：20/20 PASS。
- 未启动真实浏览器，故未声称端到端点击/视觉回归通过。
- 手工复验命令：
  - `node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('js ok')"`
  - 在资源管理器中打开 `F:\pgr-story-station\index.html`，或于目录执行 `npx --yes serve -p 5173` 后访问本地地址。

### Notes
- 改动文件清单：
  - `index.html`：语义化整页结构、地图 SVG、档案区、解读区、阅读/搜索/发布三弹层。
  - `tokens.css`：OKLCH 色板、三套字体、4pt spacing、字号与动效 token。
  - `styles.css`：Hallmark stamp + Map/Diagram 编辑式布局与互动态。
  - `app.js`：演示节点数据、panel/阅读器/批注/解读/搜索/进度逻辑与 localStorage。
  - `progress.md`：本轮任务记录。
  - `.hallmark/log.json`：Hallmark 运行记录。
- 回滚方式：删除本轮新增的 `index.html`、`tokens.css`、`styles.css`、`app.js`、`progress.md`、`.hallmark/log.json`（及空目录 `.hallmark`）；本仓库此前为空，无更早提交可还原。

## 2026-09-11 - Task: 升级 MINDTRACE 首屏视觉样片

### What was done
将可运行首版升级为海报级视觉样片：原创 SVG 意识海信号场、章节封面带、地图舞台坐标、势力图例、编辑部卷宗表、主稿件解读墙、阅读层大章节编号，以及剧透正文默认折叠。保留节点阅读、批注、发布、搜索与 localStorage 闭环；不接入官方素材和 2D 生图接口。

### Testing
- `node --check app.js` 通过。
- 结构扫描：3 个 dialog、6 个地图节点、6 个章节封面、`index.html` 无 inline style、`styles.css` 无 raw `oklch(`、存在 overflow-x: clip 与 reduced-motion。
- 浏览器实测 `http://127.0.0.1:4173/?v=2`：桌面首页 Hero + 信号场可见；点击封面 `n03` 会切换地图当前节点与 dossier；阅读层打开「红潮协议」；剧透按钮默认隐藏正文，点击后 `.spoiler-block.is-open` 显示；Ctrl+K 打开搜索，输入「红潮」命中章节与解读；控制台无 JS 报错。仅存在历史 favicon 404。
- 未在本轮实测 320/375/414 实机点按，仅确认 CSS 断点与 `overflow-x: clip` 存在。

### Notes
- 改动文件清单：
  - `index.html`：Hero 信号场、封面带、地图舞台、势力图例、卷宗表、解读墙、阅读层结构。
  - `tokens.css`：补充 paper/cyan-hot/red-hot/shadow-hard 等视觉令牌。
  - `styles.css`：海报布局、封面轨道、地图舞台、剧透折叠、响应式断点。
  - `app.js`：封面带渲染、剧透折叠、dossier 状态与既有闭环衔接。
  - `progress.md`：本轮视觉升级记录。
  - `.hallmark/log.json`：记录 Tier-B SVG signal field。
  - `.verify-shots/`：验证截图与辅助脚本，非正式产品文件。
- 回滚方式：将 `index.html`、`tokens.css`、`styles.css`、`app.js` 还原到首版静态闭环版本；或删除 `F:\pgr-story-station` 本轮改动文件后重做。不触碰 F 盘其它目录。

## 2026-09-11 - Task: 立绘主导首屏 + 灰鸦公开章节骨架

### What was done
把深色 HUD 雷达首屏改成立绘主导：露西亚鸿羽占半屏，文字贴在立绘旁，灰鸦小队可切换。剧情节点改成公开章节骨架（进入序章、灰鸦过境、临别赠礼、完整战力、迷失雾中、最终创作），封面带改用真实肖像。阅读层仍用原创示例文本，并标明 Wiki 立绘来源。

### Testing
- `node --check app.js` 通过。
- 本地服务 `http://127.0.0.1:4173/?v=portrait`：首页截图可见露西亚鸿羽立绘与「露西亚 / PLUME / 鸿羽」；点击丽芙后主视觉与文案切换为蚀暗；封面带 6 张均为角色肖像且标题为公开关卡名；地图节点为序章/过境/赠礼/战力/迷雾/创作。控制台无 JS 报错。
- 立绘文件均已写入 `assets/portraits/`，PNG 头校验通过（Plume 679289 bytes）。
- 未在本轮实测 320/375/414 实机点按。

### Notes
- 改动文件清单：
  - `index.html`：立绘主导首屏、灰鸦小队切换条、地图节点改公开章节名。
  - `styles.css`：立绘舞台与小队条样式，移除雷达图首屏样式。
  - `tokens.css`：提高首屏最小高度。
  - `app.js`：构造体数据、公开章节骨架、立绘切换与封面带肖像。
  - `assets/portraits/`：五张公开 Wiki 肖像。
  - `docs/portraits.md`：立绘来源与章节骨架出处。
  - `progress.md`：本轮记录。
  - `.verify-shots/`：验收截图，非正式产品文件。
- 回滚方式：还原 `index.html`、`styles.css`、`tokens.css`、`app.js` 到视觉升级版；删除 `assets/portraits/` 与 `docs/portraits.md`。不触碰 F 盘其它目录。

## 2026-09-11 - Task: 首屏机体档案动效

### What was done
针对“像静态展板、没有游戏感”补了三件动效：立绘开机进场、机兵切换扫光换帧、状态带同步脉冲。不改章节骨架，不重做整页。减弱动效时空间动画关闭。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=motion2`：开机态计算样式为 `construct-boot` / `scan-sweep` / `copy-in`；点击丽芙后 `is-swapping` 为真，立绘切到蚀暗，控制台无 JS 报错。同步脉冲 `sync-pulse` 持续运行。
- 截图 `.verify-shots/live-motion-liv.png` 可见丽芙蚀暗与小队选中态。

### Notes
- 改动文件清单：
  - `index.html`：开机态、扫描线、立绘包裹层。
  - `styles.css`：进场、换帧、扫光、文案交错、同步脉冲与减弱动效。
  - `tokens.css`：补 `--ease-in` 与 `--dur-boot`。
  - `app.js`：换机时重播扫光，立绘在扫光中段换图。
  - `progress.md`：本轮记录。
- 回滚方式：去掉 `is-booting` / 扫描线相关 HTML，删除对应 CSS 关键帧，并把 `setConstruct` 还原为直接换图。

## 2026-09-11 - Task: 按官网 DATA 页重做首屏排版

### What was done
按公开页搜集结果改首屏，不再自造左右文档栏。来源：国际官网首页/DATA、GRAY RAVENS Wiki 机体页。采用结构：全黑全屏立绘、左侧竖轨红线选中、顶中 DATA 红下划线、右上 CHARACTER SELECT、右下薄叠加名字、底部分页 01/05、换人扫光。阅读进度退出主视觉。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=data-layout2`：首屏可见全屏露西亚、DATA 标题、左轨 DATA 红线、右上 CHARACTER SELECT、右下露西亚/鸿羽；点击丽芙后切到蚀暗，页码 03/05，控制台无 JS 报错。
- 对照截图：`.verify-shots/ref-official-character.png`、`.verify-shots/live-data-layout2.png`、`.verify-shots/live-data-liv.png`。

### Notes
- 改动文件清单：
  - `index.html`：首屏改成官网 DATA 结构。
  - `styles.css`：全屏立绘、左轨、薄叠加、红选中、开机动效。
  - `tokens.css`：近黑底与 `--pgr-red`。
  - `app.js`：角色页码改为 01/05–05/05。
  - `docs/pgr-layout.md`：搜集到的排版与动效规则。
  - `progress.md`：本轮记录。
- 回滚方式：还原上述文件到动效版；删除 `docs/pgr-layout.md`。不搬官方字体/原图。

## 2026-09-11 - Task: 库街区目录核对 + galgame 对话阅读层

### What was done
爬取库街区主线目录，按公开关卡名收紧骨架，并把阅读层改成 galgame 对话演出：全屏立绘、底部暗色对白条、点下一句换说话人立绘。官方完整剧本未搬入，正文仍是示例句。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=vn8`：进入剧情打开 0-0，无立绘、旁白条；点到 1-1 后说话人依次为丽芙/蚀暗、露西亚/红莲、里/异火，立绘同步切换；1-6 迷失雾中第一句为里·异火，不是七实。控制台无 JS 报错。
- 对照：库街区目录 `00 序章`–`42 歧海循光`、0-0/1-1 正文说话人、BWiki DialogStyle 对白条。截图 `.verify-shots/live-vn-11-lucia.png`、`.verify-shots/live-vn-11-liv.png`、`.verify-shots/live-vn-11-lee.png`。

### Notes
- 改动文件清单：
  - `index.html`：阅读弹层改成全屏对话舞台。
  - `styles.css`：全屏立绘、底部暗色对白条、换机扫光、减弱动效。
  - `app.js`：公开章节骨架改对话句；按说话人切红莲/蚀暗/异火。
  - `docs/pgr-layout.md`：补库街区目录、对话层对照与早期主线形态。
  - `docs/portraits.md`：补关卡出处与默认形态说明。
  - `progress.md`：本轮记录。
  - `.verify-shots/`：目录/对话对照与本地验收截图，非正式产品。
- 回滚方式：还原 `index.html`、`styles.css`、`app.js`、`docs/pgr-layout.md`、`docs/portraits.md` 到 DATA 首屏版。不触碰 F 盘其它目录。

## 2026-09-11 - Task: 剧情站定位调研 + 公开封面入库

### What was done
按剧情站而不是机体展板重新对照公开页：BWiki 剧情回顾/序章/序章01、用户主线一览长图、国际 Wiki 对话模板。结论写入文档。主线前段章节 CG 下到本地。未改阅读层、未加弹幕——游戏内实机剧情界面还没采到，不能再凭印象施工。

### Testing
- 浏览器打开 BWiki 剧情回顾：分类页签与用户长图一致（主线/浮点/本我/外篇/间章/好感/活动等）；序章页为宽封面 + 4 个关卡按钮；序章01 为文字 `zs-DialogBox`，108 条对话框，出战成员为露西亚·红莲。
- 国际 Wiki `Template:Dialogue` 计算样式：`.dialogue#character` 为左 image + 右 title/text；旁白无头像。
- `assets/covers/` 11 张 PNG 头校验通过（序章 1172349 bytes）。对话头像 CLI 仍 403，未当素材使用。
- 本轮未改 `index.html` / `styles.css` / `app.js`，本地 `4173` 阅读层行为与上一轮相同。

### Notes
- 改动文件清单：
  - `docs/story-station.md`：定位、分类、入口/阅读对照、弹幕放哪、素材边界。
  - `docs/assets.md`：已下封面表与对话头像缺口。
  - `docs/pgr-layout.md`：更正阅读层对照结论。
  - `assets/covers/`：序章与 01–06、08–11 公开章节 CG。
  - `progress.md`：本轮记录。
  - `.verify-shots/`：BWiki/对话模板对照截图，非正式产品。
- 回滚方式：删除 `docs/story-station.md`、`docs/assets.md`、`assets/covers/`；还原 `docs/pgr-layout.md` 本轮追加段。不触碰 F 盘其它目录。

## 2026-09-11 - Task: 章节 CG 封面带 + 左头像阅读层 + 可关弹幕

### What was done
按公开剧情回顾结构把封面带改成章节 CG，不再用机体肖像墙。阅读层按国际 Wiki 对白模板改成章节 CG 背景 + 左 60px 头像 + 名字 + 台词；旁白/NPC 无头像。过剧情可开关弹幕，本机发送写入 localStorage。官方剧本仍不整段搬入。Wiki 对话头像仍 403，暂用机体肖像裁切，未把失败 HTML 当图。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=story-rail3`：封面带标题为「主线章节封面」，0-0 用序章 CG，1-1～1-12 用涂鸦艺术 CG。
- 点 0-0：无头像旁白；下一句哈桑为 NPC、无头像。点 1-1：左头像丽芙 60px，说话人切露西亚/指挥官时头像同步显隐。弹幕开可见示例句；点「弹幕关」层清空且 `aria-pressed=false`；再开发送「开关后补发」出现。控制台无 JS 报错。
- 截图：`.verify-shots/live-story-covers.png`、`live-story-vn-00-hassan.png`、`live-story-vn-11-liv.png`、`live-story-danmaku-on.png`。

### Notes
- 改动文件清单：
  - `index.html`：封面带文案；阅读层改左头像对白、章节 CG、弹幕开关与输入。
  - `styles.css`：宽 CG 封面带、左头像对白条、弹幕层；清掉全屏立绘阅读层样式。
  - `app.js`：节点绑定章节 CG；按说话人切头像；弹幕开关/发送/本地缓存。
  - `docs/story-station.md`：入口、阅读层、弹幕落地结论。
  - `docs/assets.md`：对话头像仍 403，阅读层改用肖像裁切。
  - `docs/pgr-layout.md`：阅读层对照改为 Template:Dialogue。
  - `progress.md`：本轮记录。
  - `.verify-shots/`：本轮验收截图，非正式产品。
- 回滚方式：还原 `index.html`、`styles.css`、`app.js`、`docs/story-station.md`、`docs/assets.md`、`docs/pgr-layout.md` 到调研入库版。不触碰 F 盘其它目录，不删除 `assets/dialogue/lucia-lotus-icon.png`。

## 2026-09-11 - Task: 首屏以下按官网结构重做 + 讨论改发帖

### What was done
核对战双没有图书管理员。最接近的公开 AI 是格式塔（空中花园最高管控 AI），不能当站内客服，故不内置扮演 AI。首屏以下去掉雷达图、卷宗表、解读墙；改成官网黑底红线：剧情回顾页签 + 章节 CG 网格、宽 CG 关卡页 + 播放条、玩家发帖流。选中色改回正红。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=pgr-board2`：无 `.map-svg` / 档案表。剧情回顾标题与顶栏间距 135px；主线页签红下划线；点 1-1 封面切到宽 CG 关卡页，播放条高亮 1-1。讨论区为帖子流，按钮为「发帖」。点播放仍打开左头像阅读层（丽芙）。控制台无 JS 报错。
- 截图：`.verify-shots/live-pgr-story-grid.png`、`live-pgr-stage.png`、`live-pgr-board.png`。

### Notes
- 改动文件清单：
  - `index.html`：首屏以下改剧情回顾 / 关卡页 / 发帖区；去掉地图与档案表。
  - `styles.css`：黑底红线页签、CG 网格、宽 CG 关卡、发帖流；清青强调。
  - `app.js`：封面进关卡页，播放条进阅读层，讨论渲染为帖子。
  - `docs/story-station.md`：写明不造图书管理员、讨论用发帖。
  - `docs/pgr-layout.md`：首屏以下结构对照。
  - `progress.md`：本轮记录。
  - `.verify-shots/`：本轮验收截图，非正式产品。
- 回滚方式：还原上述文件到「章节 CG 封面带 + 左头像阅读层」版本。不触碰 F 盘其它目录。

## 2026-09-11 - Task: 落地间章、活动剧情与关系网

### What was done
按公开 Wiki 补了可切换的间章剧情、活动剧情和关系网，不再把页签留空。角色剧情用间章：红莲「往何处逃离」、蚀暗「月光下的礼服」、异火「四二一」、风暴「迷途真理」。活动用浮点纪实：游云鲸梦、烈日将烬。关系网只画灰鸦小队公开关系，点角色先进对应间章。正文仍是示例句，不搬官方剧本。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=arcs2`：主线 6 张；切间章出现 4 张（往何处逃离 / 月光下的礼服 / 四二一 / 迷途真理）；切活动出现游云鲸梦、烈日将烬；切关系网显示露西亚/丽芙/里/七实/指挥官及 7 条关系。点露西亚进入「间章 往何处逃离」。控制台无 JS 报错。
- 截图：`.verify-shots/live-arcs-interlude.png`、`live-arcs-network.png`。

### Notes
- 改动文件清单：
  - `index.html`：页签改为可点的主线/间章/活动/关系网，并加关系网容器。
  - `app.js`：补间章与活动骨架、关系数据、页签过滤与关系网点击。
  - `styles.css`：关系网图与关系条。
  - `docs/story-station.md`：四页签出处。
  - `progress.md`：本轮记录。
  - `.verify-shots/`：本轮验收截图，非正式产品。
- 回滚方式：还原上述文件到「首屏以下按官网结构重做」版本。不触碰 F 盘其它目录。

## 2026-09-11 - Task: 关系网悬停高亮

### What was done
关系网补了悬停反馈：鼠标放到角色上会放大头像、亮出相关红线、压暗无关角色，并在上方写出关系与可回看章节。关系条同步高亮。减弱动效时不做缩放。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=nethover1`：悬停丽芙后 `is-focusing` 为真，头像边框为正红、缩放 1.08；连线 3 条高亮、4 条压暗；七实为 `is-dim`；提示为「丽芙 · 蚀暗　关系：露西亚、里、指挥官」。控制台无 JS 报错。
- 截图：`.verify-shots/live-net-hover-liv.png`。

### Notes
- 改动文件清单：
  - `index.html`：关系网增加悬停提示行。
  - `app.js`：关系网悬停/焦点高亮与提示文案。
  - `styles.css`：头像放大、红线发光、无关节点压暗。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-net-hover-liv.png`：验收截图，非正式产品。
- 回滚方式：还原上述三文件到「落地间章、活动剧情与关系网」版本。不触碰 F 盘其它目录。

## 2026-09-11 - Task: 间章与活动封面换成原图

### What was done
间章、活动封面不再借用主线 CG。从 BWiki 剧情回顾页签取原图：红莲「往何处逃离」、蚀暗「月光下的礼服」、异火「四二一」、风暴「迷途真理」，以及活动「游云鲸梦」「烈日将烬」。活动两张原图是 JPEG，按真实文件头写入。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=arccovers1`：间章 4 张分别绑定 `interlude-escape/dress/421/truth`，尺寸 1280×720 / 1024×512；活动绑定 `event-whale.jpg`（1280×720）、`event-embers.jpg`（1920×1080）。页面不再引用误用的主线 CG。控制台无 JS 报错。
- 截图：`.verify-shots/live-arccovers-interlude.png`、`live-arccovers-event.png`。

### Notes
- 改动文件清单：
  - `app.js`：间章/活动节点改绑原封面。
  - `assets/covers/interlude-escape.png` 等 4 张间章 PNG、`event-whale.jpg`、`event-embers.jpg`：BWiki 原图入库。
  - `docs/assets.md`：补间章/活动封面表。
  - `docs/story-station.md`：写明封面不再借用主线 CG。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-arccovers-interlude.png`、`live-arccovers-event.png`：验收截图，非正式产品。
- 回滚方式：还原 `app.js`、`docs/assets.md`、`docs/story-station.md` 到关系网悬停版；删除本轮新增的 6 张封面。不触碰 F 盘其它目录。

## 2026-09-11 - Task: Wiki 对话头像入库并接到阅读层

### What was done
阅读层左头像改用国际 Wiki 对话模板原图：红莲、蚀暗、异火、风暴。CLI 仍 403，改为浏览器同源拉取后写入。旁白、哈桑、指挥官仍无头像。失败 HTML 已覆盖为真 PNG。

### Testing
- `node --check app.js` 通过。
- 四张文件 PNG 头校验通过：lotus 457466、eclipse 433099、palefire 372215、storm 361330 bytes。
- 浏览器 `http://127.0.0.1:4173/?v=dialogue-icons1`：0-0 旁白/哈桑无头像；1-1 丽芙绑定 `liv-eclipse-icon.png`（800×800），下一句露西亚/里同步换图，指挥官无头像。控制台无 JS 报错。
- 截图：`.verify-shots/live-dialogue-icon-liv.png`。

### Notes
- 改动文件清单：
  - `app.js`：构造体增加 `icon`，阅读层改用对话头像。
  - `index.html`：阅读层默认头像改对话图。
  - `assets/dialogue/lucia-lotus-icon.png`：覆盖失败 HTML 为 Wiki 原图。
  - `assets/dialogue/liv-eclipse-icon.png`、`lee-palefire-icon.png`、`nanami-storm-icon.png`：对话头像入库。
  - `docs/assets.md`、`docs/story-station.md`、`docs/pgr-layout.md`：头像缺口关闭。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-dialogue-icon-liv.png`：验收截图，非正式产品。
- 回滚方式：还原上述代码与文档到封面原图版；对话头像文件可删三张新图，红莲头像勿当失败 HTML 还原。不触碰 F 盘其它目录。

## 2026-09-11 - Task: 顶栏改成官网左侧竖菜单

### What was done
吸顶横栏去掉，主导航改成官网那种左侧竖菜单：DATA / STORY / NET / BOARD，当前项左侧红线。剧情回顾等区块标题让开左边，不再被顶栏挡住。搜索和发帖收到左轨。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=leftrail1`：无 `.site-header` / `.hero-rail`；左轨 `position:fixed`、宽 120px；「剧情回顾」标题 top 112px、left 152px，与左轨无重叠。控制台无 JS 报错。
- 截图：`.verify-shots/live-leftrail-home.png`、`live-leftrail-story.png`。

### Notes
- 改动文件清单：
  - `index.html`：吸顶横栏改左侧竖菜单。
  - `styles.css`：左轨固定、正文让开、取消标题上边距补偿。
  - `app.js`：页签高亮改绑左轨链接。
  - `docs/pgr-layout.md`、`docs/story-station.md`：写明不再用吸顶横栏。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-leftrail-home.png`、`live-leftrail-story.png`：验收截图，非正式产品。
- 回滚方式：还原上述文件到对话头像版。不触碰 F 盘其它目录。

## 2026-09-11 - Task: 可见品牌改成「过境」

### What was done
中文主名改成「过境」，英文副标仍用 MINDTRACE。标题、左轨、页脚声明一并改。localStorage key 仍是 `mindtrace.*`，旧进度可继续读。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=guojing1`：标题「过境 · MINDTRACE」；左轨主名「过境」、副标「MINDTRACE」；页脚声明与版权行同步。页脚仍列出 `mindtrace.notes/readings/progress`。仅历史 favicon 404，无 JS 报错。
- 截图：`.verify-shots/live-guojing-home.png`。

### Notes
- 改动文件清单：
  - `index.html`：标题、描述、左轨品牌、页脚声明。
  - `styles.css`：左轨中文主名字号略加大。
  - `docs/story-station.md`：品牌改为过境 / MINDTRACE，并注明缓存 key 不动。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-guojing-home.png`：验收截图，非正式产品。
- 回滚方式：还原上述文件到左侧竖菜单版。不触碰 F 盘其它目录。

## 2026-09-11 - Task: 首屏以下补交错入场

### What was done
首屏以下不再整块贴死。章节封面、关卡条、讨论帖滚进视野后，复用现有 `enter-from-bottom` 交错出现。减弱动效时直接显示。未新做动画库。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=reveal1`：剧情回顾 6 张封面均带 `is-in`，动画延迟 0 / 45 / 90ms；讨论区 3 帖同样入场。控制台无 JS 报错。
- 截图：`.verify-shots/live-reveal-covers.png`。

### Notes
- 改动文件清单：
  - `styles.css`：封面/关卡条/帖子入场与减弱动效。
  - `app.js`：进入视野后再打 `is-in`。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-reveal-covers.png`：验收截图，非正式产品。
- 回滚方式：还原上述两文件到「可见品牌改成过境」版本。不触碰 F 盘其它目录。

## 2026-09-11 - Task: 线性 Galgame 阅读层 + 继续/开始剧情入口

### What was done
把现有阅读弹层改成可玩的线性演出：章节 CG 作场景，构造体立绘作前景，底部仍用对话头像条。点击第一次补全当前句，第二次进下一句；可自动播放、跳过已读、打开对话回顾。首页主行动改为开始/继续剧情，恢复点写入新 key `mindtrace.play`，旧缓存不动。章节封面与关卡条标出已读。正文仍是示例句。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=gal1`：首页按钮为「开始剧情」。点 1-4：第一句逐字出现「示例：支援到」，再点一次补全丽芙整句，再点切到露西亚立绘/头像。关闭后摘要为「上次停留：1-4 · 完整战力 · 第 2 句」，点「继续剧情」回到同一句。0-0 无立绘；1-1 三人立绘，说话人高亮。弹幕可关可发「验收弹幕」。搜索「灰鸦」命中章节。关系网悬停丽芙高亮。控制台无 JS 报错。`mindtrace.notes/readings/progress/danmaku` 仍在，新增 `mindtrace.play`。
- 未在本轮实测 320/375/414 实机点按。

### Notes
- 改动文件清单：
  - `index.html`：阅读层改为演出舞台（立绘层、回顾、自动/跳过）；首页改为开始/继续剧情。
  - `app.js`：逐字推进、立绘调度、回顾、自动/跳过、`mindtrace.play` 恢复点。
  - `styles.css`：立绘层、回顾面板、已读标记、减弱动效。
  - `docs/story-station.md`、`docs/pgr-layout.md`：阅读层改为线性演出说明。
  - `progress.md`：本轮记录。
- 回滚方式：还原上述文件到「首屏以下补交错入场」版本；删除 `localStorage` 中的 `mindtrace.play` 即可去掉恢复点，不触碰其它 `mindtrace.*` key。不触碰 F 盘其它目录。

## 2026-09-11 - Task: 观看层按实机旁白页重做

### What was done
观看剧情页按用户实机截图改版：全屏 CG、右上「回顾 / 自动 / SKIP」、底部横线 + 波形旁白、右下 NEXT。前景立绘和左头像框从观看层拿掉。弹幕、批注、上一句收到回顾面板。正文仍是示例句。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=watch1`：点「开始剧情」进入 0-0；右上三键文案为回顾 Y / 自动 / SKIP LT；底部横线 + 波形；台词为示例旁白；右下 NEXT。点 NEXT 切到哈桑句，NEXT 文案不被覆盖。点自动后 `aria-pressed=true` 且内部时钟结构仍在。点回顾打开对话回顾，弹幕/批注/上一句在面板内。控制台无 JS 报错。
- 截图：`.verify-shots/live-watch-narration.png`、`live-watch-log.png`。
- 未在本轮实测 320/375/414 实机点按。

### Notes
- 改动文件清单：
  - `index.html`：观看层改成实机旁白结构（右上三键、底部横线、NEXT）。
  - `styles.css`：全屏 CG、工具条、旁白线/波形、NEXT；立绘与头像框退出观看层。
  - `app.js`：不再改写回顾/自动/SKIP/NEXT 内部 HTML；Y 键开回顾。
  - `docs/story-station.md`、`docs/pgr-layout.md`：观看层对照改为实机旁白页。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-watch-narration.png`、`live-watch-log.png`：验收截图，非正式产品。
- 回滚方式：还原上述文件到「线性 Galgame 阅读层」版本。不触碰 F 盘其它目录。

## 2026-09-12 - Task: 按本地索引铺主线 43 章目录

### What was done
剧情回顾主线网格改成按章：00 序章到 42 歧海循光共 43 张。章名和普通关卡名来自 `F:\战双帕弥什-剧情回顾\00-索引.md`。有封面的章用现成 CG，07 与 12 章之后用占位底。点章后关卡条列出该章普通关；可播的仍只有示例关 0-0 / 1-1 / 1-2 / 1-4 / 1-6 / 1-12，其余关只占位，不灌官方正文。

### Testing
- `node --check app.js`、`node --check chapters.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=chapters1`：主线封面 43 张；序章 4 关（0-0 可播，0-1～0-3 锁定）；点 01 涂鸦艺术出现 12 关，1-3 涂鸦浪潮播放按钮禁用且不打开观看层；点 07 逆元坍塌为占位封面、12 关全锁定。控制台无 JS 报错。
- 截图：`.verify-shots/live-main-43.png`。

### Notes
- 改动文件清单：
  - `chapters.js`：主线 43 章目录（章名、关卡名、已有封面路径、可播 nodeId）。
  - `index.html`：引入 `chapters.js`；主线区说明改为点章看关卡。
  - `app.js`：主线网格按章、关卡条按关；未接入关占位不播。
  - `styles.css`：无封面占位、锁定关卡条。
  - `docs/story-station.md`、`docs/assets.md`：主线 43 章目录出处与播放边界。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-main-43.png`：验收截图，非正式产品。
- 回滚方式：删除 `chapters.js`，还原 `index.html`、`app.js`、`styles.css`、`docs/story-station.md`、`docs/assets.md` 到「观看层按实机旁白页重做」版本。不触碰 F 盘其它目录，不删除剧情回顾存档。

## 2026-09-12 - Task: 用本地美术库补主线缺封面

### What was done
从 `F:\战双帕弥什-剧情回顾\99-美术资源\03-剧情CG` 只补主线缺封面：07 用隐藏剧情封面，12–42 用主线章封面，写入 `assets/covers/`。JPEG 文件头按真实后缀改成 `.jpg`。`chapters.js` 43 章全部绑上封面。立绘、角色背景、剧情插图未整包搬进站点。观看层仍不灌官方正文。

### Testing
- `node --check chapters.js`、`node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=covers2`：主线封面 43 张、占位 0。07 为 `ch07.png` 944×453；12 为 `ch12.jpg` 1918×1080；42 为 `ch42.jpg` 1920×1080。网格可见 07 逆元坍塌实图，不再是空底。
- 截图：`.verify-shots/live-covers-07-12.png`。

### Notes
- 改动文件清单：
  - `assets/covers/ch07.png`、`ch12.jpg`–`ch42.png/jpg`：本地美术库主线缺封面入库。
  - `chapters.js`：43 章全部绑定封面路径。
  - `docs/assets.md`、`docs/story-station.md`：写明封面补齐出处与 JPEG 后缀。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-covers-07-12.png`：验收截图，非正式产品。
- 回滚方式：删除本轮新增的 `assets/covers/ch07.png` 与 `ch12`–`ch42` 封面；把 `chapters.js`、`docs/assets.md`、`docs/story-station.md` 还原到「按本地索引铺主线 43 章目录」版本。不触碰美术资源原目录，不搬立绘。

## 2026-09-12 - Task: 间章 31 条目录 + 关系网扩到间章角色

### What was done
按本地索引铺间章（个人剧情）31 条目录，封面从已持有素材和 `99-美术资源/03-剧情CG/间章剧情` 入库；缺封面仅「悠夜蜉蝣」占位。可播仍只有示例四条，锁定关只显示关卡名。关系网从灰鸦五人扩到 9 人（加露娜、卡列尼娜、渡边、薇拉），点角色进对应个人剧情。未爬 wiki 整包，未灌官方正文，未整包搬立绘。

### Testing
- `node --check interludes.js`、`node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/`：间章网格 31 条，封面 30 张、占位 1（悠夜蜉蝣）。点「瓦尔基里」右侧关卡条为锁定占位，不打开观看层。
- 关系网 9 人、12 条连线。点薇拉切到间章「瓦尔基里」。
- 截图：`.verify-shots/live-interlude-31.png`、`.verify-shots/live-net-9.png`。

### Notes
- 改动文件清单：
  - `interludes.js`：本地索引 31 条间章目录。
  - `index.html`：引入 `interludes.js`；关系网文案改为点角色进个人剧情。
  - `app.js`：间章网格/关卡条；关系网 9 人与点击进间章。
  - `assets/covers/interlude-01.png` 等：间章封面入库（含 `interlude-28.jpg`、`interlude-29.jpg`）。
  - `assets/portraits/luna-argent.png`、`karenina-blast.png`、`watanabe-nightblade.png`、`vera-rozen.png`：关系网识别图。
  - `docs/assets.md`、`docs/story-station.md`、`docs/portraits.md`：写明间章目录、封面出处与关系网扩人。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-interlude-31.png`、`.verify-shots/live-net-9.png`：验收截图，非正式产品。
- 回滚方式：删除本轮新增的间章封面与四张关系网立绘；还原 `interludes.js`、`index.html`、`app.js`、`docs/assets.md`、`docs/story-station.md`、`docs/portraits.md` 到「用本地美术库补主线缺封面」版本。不触碰 F 盘剧情回顾原目录。

## 2026-09-12 - Task: 自建仓上传并开 GitHub Pages

### What was done
本地 `F:\pgr-story-station` 初始化 git，推到公开仓 `Pokkan39/pgr-story-station`，Pages 从 `main` 根目录发布。未灌官方正文。验收截图、`.narrafork`、`desktop.png` 未入库。

### Testing
- `git ls-remote origin` 可见 `main`。
- `https://pokkan39.github.io/pgr-story-station/` 返回 200，正文为站点 `index.html`。

### Notes
- 改动文件清单：
  - `.gitignore`：排除验收图与工具目录。
  - `progress.md`：本轮记录。
- 回滚方式：删除 GitHub 仓 `Pokkan39/pgr-story-station`；本地可 `git remote remove origin`。不删本机站点文件。

## 2026-09-12 - Task: 进站节点连线接入动画

### What was done
进站加一层黑底红线节点连线：中心点向外画线、节点点亮，再出「过境 / MINDTRACE」。每次刷新都播。SKIP、点击、Esc 可跳过，随后进 DATA。减弱动画时只留静态图。不套明日方舟 / 莱茵生命标识。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=link2`：入场可见红线节点与字标；点 SKIP 后 `link-gate` hidden，进入 DATA。
- 截图：`.verify-shots/live-link-gate.png`、`.verify-shots/live-link-skip.png`。

### Notes
- 改动文件清单：
  - `index.html`：进站接入层。
  - `styles.css`：红线画线、节点点亮、减弱动画。
  - `app.js`：每次进站播接入，SKIP 后进 DATA。
  - `docs/story-station.md`：写明接入层边界。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-link-gate.png`、`.verify-shots/live-link-skip.png`：验收截图，非正式产品。
- 回滚方式：还原 `index.html`、`styles.css`、`app.js`、`docs/story-station.md` 到「自建仓上传并开 GitHub Pages」版本。

## 2026-09-12 - Task: DATA 改成机体选择台

### What was done
DATA 不再一进来就铺满单人立绘。灰鸦五人先排成选择台，右侧写「选择机体」。点到谁，谁才走到前台，其余人压暗。进度恢复不再抢前台。关系网角色不进首屏。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=lineup3`：默认 waiting、标题「选择机体」、五人无选中。点丽芙后标题改「丽芙」，仅 `liv-eclipse` 前台。
- 截图：`.verify-shots/live-lineup-wait.png`、`.verify-shots/live-lineup-liv.png`。

### Notes
- 改动文件清单：
  - `index.html`：DATA 改成选择台容器。
  - `app.js`：渲染五人排队，默认无人选中。
  - `styles.css`：排队、点选前台、右侧文案让位。
  - `docs/story-station.md`、`docs/pgr-layout.md`：写明首屏是选择台。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-lineup-wait.png`、`.verify-shots/live-lineup-liv.png`：验收截图，非正式产品。
- 回滚方式：还原 `index.html`、`app.js`、`styles.css`、`docs/story-station.md`、`docs/pgr-layout.md` 到「进站节点连线接入动画」版本。

## 2026-09-12 - Task: 首页改成指令台

### What was done
进站后先到 HOME 指令台：开始剧情 / 剧情回顾 / 机体档案 / 关系网 / 讨论区排好等人选。机体档案不再当首页，点进去才是灰鸦选择台。左侧菜单改为 HOME 当前项。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=home1`：首屏标题「选择下一步」，五张操作卡，导航 HOME 高亮。点「机体档案」进入 DATA，五人排队、无人前台。
- 截图：`.verify-shots/live-home-command.png`、`.verify-shots/live-home-to-data.png`。

### Notes
- 改动文件清单：
  - `index.html`：新增 HOME 指令台，DATA 不再带继续条。
  - `app.js`：进度文案写到指令台卡片；进站后指令台入场。
  - `styles.css`：指令台网格与入场动效。
  - `docs/story-station.md`、`docs/pgr-layout.md`：首屏改为指令台。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-home-command.png`、`.verify-shots/live-home-to-data.png`：验收截图，非正式产品。
- 回滚方式：还原 `index.html`、`app.js`、`styles.css`、`docs/story-station.md`、`docs/pgr-layout.md` 到「DATA 改成机体选择台」版本。

## 2026-09-12 - Task: HOME 改成左操作右预览的指令台

### What was done
HOME 不再用五张普通卡片。左侧是操作列表，右侧是对应预览图。悬停或点选项会换预览。机体档案仍是其中一个入口，不是首页。

### Testing
- `node --check app.js` 通过。
- 浏览器 `http://127.0.0.1:4173/?v=lineup-h4`：首屏左列 01–05，默认预览序章封面；悬停「机体档案」预览切到鸿羽立绘，编号 03。无 `.command-card`。
- 截图：`.verify-shots/live-home-ops.png`。

### Notes
- 改动文件清单：
  - `index.html`：指令台改成左操作列表 + 右预览。
  - `app.js`：接预览图/编号，悬停与点击切换。
  - `styles.css`：去掉卡片墙，改操作台布局。
  - `docs/story-station.md`、`docs/pgr-layout.md`：写明左操作右预览。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-home-ops.png`：验收截图，非正式产品。
- 回滚方式：还原上述文件到「首页改成指令台」版本。

## 2026-09-12 - Task: DATA 立绘拉回全高排队

### What was done
DATA 排队立绘不再挤成底下一排小半身，也不再发灰。五人按全高交叠站位，点谁谁走上前。左轨加浅遮罩，避免立绘压住菜单字。

### Testing
- 浏览器 `http://127.0.0.1:4173/?v=lineup-h4#operator`：五人立绘高度 900px，`filter: none`。点丽芙后标题改「丽芙」，仅 `liv-eclipse` 前台。
- 截图：`.verify-shots/live-data-fullheight.png`、`.verify-shots/live-data-liv.png`。

### Notes
- 改动文件清单：
  - `styles.css`：立绘按高度撑满并交叠；窄屏不再用旧 inset 裁脚；左轨浅遮罩。
  - `docs/story-station.md`、`docs/pgr-layout.md`：写明全高排队、不发灰不裁脚。
  - `progress.md`：本轮记录。
  - `.verify-shots/live-data-fullheight.png`、`.verify-shots/live-data-liv.png`：验收截图，非正式产品。
- 回滚方式：还原 `styles.css`、`docs/story-station.md`、`docs/pgr-layout.md` 到「HOME 改成左操作右预览的指令台」版本。
