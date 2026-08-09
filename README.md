# Learn AI Agent

个人技术博客，记录 AI Agent 生态的学习、思考与实践。

基于 [Astro](https://astro.build) v6 构建，静态生成（SSG），追求极致的加载速度和沉浸式阅读体验。采用**科技蓝 × 赛博朋克**视觉风格，暗色/亮色双主题支持。

🔗 **在线访问**：[humorfrank.github.io/learn-ai-agent](https://humorfrank.github.io/learn-ai-agent/)

---

## 功能特性

- 🎨 **科技蓝赛博朋克风格** — 霓虹光晕、扫描线、CRT 噪点纹理、HUD 角标装饰
- 🌓 **暗色/亮色双主题** — 自动跟随系统偏好，支持手动切换，localStorage 持久化
- 📡 **RSS 订阅** — 自动生成 RSS 源，支持 RSS 阅读器订阅
- 🗺️ **站点地图** — 自动生成 sitemap.xml，优化搜索引擎收录
- 📱 **响应式布局** — 适配 375px / 768px / 1200px+ 断点
- ⚡ **零 JavaScript 运行时** — 纯静态 HTML 输出，极致加载性能
- 🔍 **SEO 友好** — 语义化 HTML + Open Graph meta 标签
- 🏷️ **标签系统** — 标签云 + 按标签筛选文章，支持中英文混合标签
- 📖 **文章目录（TOC）** — 自动提取标题生成侧栏导航
- 🎯 **阅读进度条** — 页面顶部渐变进度指示
- 🖥️ **终端风格代码块** — 红黄绿圆点 + 语言标签 + 一键复制按钮

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | [Astro](https://astro.build) v6（静态 SSG） |
| 内容 | Markdown / MDX 内容集合（Content Layer API） |
| 样式 | 纯 CSS（CSS Custom Properties 设计令牌） |
| 代码高亮 | [Shiki](https://shiki.style)（github-dark 主题） |
| 图表 | [Mermaid](https://mermaid.js.org)（客户端渲染） |
| Markdown 扩展 | `remark-directive`（`:::tip` / `:::note` / `:::warning` / `:::danger`） |
| RSS | [@astrojs/rss](https://docs.astro.build/zh-cn/guides/rss/) |
| 站点地图 | [@astrojs/sitemap](https://docs.astro.build/zh-cn/guides/integrations-guide/sitemap/) |
| 部署 | GitHub Pages（GitHub Actions 自动部署） |
| 包管理 | pnpm v10 |

---

## 目录结构

```
learn-ai-agent/
├── .github/workflows/deploy.yml   # CI/CD：推送 main → 构建 → 部署
├── public/
│   └── favicon.svg
├── src/
│   ├── site.config.ts             # 站点元数据（SITE 对象，集中配置）
│   ├── content.config.ts          # 内容集合 Schema 定义
│   ├── styles/
│   │   └── global.css             # 全局设计系统（~700 行，令牌/动画/主题）
│   ├── plugins/
│   │   └── remark-callout.mjs     # :::tip/note/warning/danger 指令插件
│   ├── utils/
│   │   └── reading-time.ts        # 阅读时间估算（中英文自适应）
│   ├── layouts/
│   │   ├── BaseLayout.astro       # HTML 骨架：导航、页脚、主题、环境光效
│   │   └── BlogPostLayout.astro   # 文章布局：头部、正文、TOC 侧栏、前后导航
│   ├── components/
│   │   ├── BlogCard.astro         # 文章卡片（标题/描述/标签/阅读时间/日期）
│   │   ├── ThemeToggle.astro      # 暗色/亮色主题切换按钮
│   │   └── Mermaid.astro          # 客户端 Mermaid 图表渲染
│   ├── pages/
│   │   ├── index.astro            # 首页：Hero + 粒子 + 特色文章 + 文章网格
│   │   ├── about.astro            # 关于页：统计 + 知识领域 + 技术栈
│   │   ├── robots.txt.ts          # 动态 robots.txt
│   │   ├── rss.xml.js             # RSS Feed 生成
│   │   ├── blog/
│   │   │   ├── index.astro        # 文章列表（全部文章，按时间倒序）
│   │   │   └── [slug].astro       # 文章详情（动态路由）
│   │   └── tags/
│   │       ├── index.astro        # 标签云（按文章数排序）
│   │       └── [tag].astro        # 按标签过滤的文章列表
│   └── content/
│       └── blog/                   # 博客文章（.md / .mdx）
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

---

## 快速开始

### 环境要求

- [Node.js](https://nodejs.org) ≥ 22
- [pnpm](https://pnpm.io) ≥ 10

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/libao-jun/learn-ai-agent.git
cd learn-ai-agent

# 安装依赖
pnpm install

# 启动开发服务器（http://localhost:4321）
pnpm dev

# 构建生产版本（输出到 dist/）
pnpm build

# 预览生产构建（http://localhost:4321）
pnpm preview
```

---

## 内容创作

### 创建新文章

在 `src/content/blog/` 目录下创建 `.md` 或 `.mdx` 文件：

```yaml
---
title: '文章标题'
date: 2026-08-09
description: '一句话描述，50 字以内，含关键词，吸引点击'
tags: ['主标签', '副标签1', '副标签2']
---
```

### 文章结构

每篇文章建议包含「本节导读」章节，使用 `sg-card` 组件展示学习目标、阅读时间和收获要点：

```md
## 本节导读

<div class="sg-card">
  <div class="sg-body">
    <div class="sg-item">
      <div class="sg-item-head">
        <span class="sg-item-icon">🎯</span>
        <span class="sg-item-label">学习目标</span>
      </div>
      <div class="sg-tags">
        <span class="sg-tag">了解 XXX 的基本概念</span>
        <span class="sg-tag">掌握 XXX 的使用方法</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <span class="sg-item-icon">⏱️</span>
        <span class="sg-item-label">预计阅读</span>
      </div>
      <div class="sg-time">
        <span class="sg-time-num">8</span>
        <span class="sg-time-unit">分钟</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <span class="sg-item-icon">📌</span>
        <span class="sg-item-label">收获要点</span>
      </div>
      <ul class="sg-list">
        <li>要点一</li>
        <li>要点二</li>
      </ul>
    </div>
  </div>
</div>
```

### 标注框

文章内可使用 `:::tip`、`:::note`、`:::warning`、`:::danger` 创建标注框：

```md
:::tip[标题]
提示内容
:::

:::warning
警告内容（标题可选）
:::
```

### 标签规范

- **技术专有名词保持英文**：`AI`, `MCP`, `A2A`, `Claude Code`, `Codex`, `Skills`, `SDD`
- **概念/领域可用中文**：`多模态`, `全栈`, `工具集`
- **每篇文章至少 3 个标签**
- 避免冗余标签（如同时打 `Claude Code` 和 `Claude Code 参考资料`）

### 草稿文章

设置 `draft: true` 后，文章仅在本地开发环境可见，生产构建时自动排除：

```yaml
---
title: '草稿标题'
date: 2026-08-09
draft: true
---
```

---

## 设计系统

### 配色

| 角色 | 暗色模式 | 亮色模式 |
|------|---------|---------|
| 主强调色 | `#00d4ff`（科技蓝） | `#0284c7`（深蓝） |
| 辅助强调色 | `#a78bfa`（淡紫） | `#7c3aed`（紫） |
| 强调光晕 | `#22d3ee`（青） | `#0ea5e9` |
| 页面背景 | `#0a0a0f` | `#f8fafc` |
| 正文文字 | `#e2e8f0` | `#0f172a` |

### 视觉特效

- **CRT 扫描线** — `repeating-linear-gradient` 实现 3px 间隔扫描线叠加
- **颗粒纹理** — SVG `feTurbulence` 噪声覆盖层，模拟 CRT 屏幕质感
- **环境光晕** — 3 个固定定位的径向渐变光晕（蓝/青/紫），`blur(120px)` + 浮动动画
- **星场背景** — 10 个独立星点元素，`twinkle` 闪烁动画（蓝/青交替）
- **Hero 粒子** — 8 个霓虹光点（蓝/青/紫三色），`particleFloat` 浮动动画
- **HUD 角标** — Hero 四角 L 形括号装饰，`hudCornerPulse` 脉冲动画
- **玻璃拟态** — 导航栏和引用块使用 `backdrop-filter: blur()` 毛玻璃效果
- **终端代码块** — 代码块包裹为终端窗口，顶部红黄绿圆点 + 语言标签 + 复制按钮
- **渐变标题** — 首页标题使用 `blue → purple` 渐变动画文字
- **阅读进度条** — 蓝→紫→青三色渐变，固定视口顶部

### 动画

| 动画 | 用途 |
|------|------|
| `fadeInUp` | 页面/组件入场淡入上移 |
| `gradientShift` | 渐变背景位移动画（标题、Logo、卡片顶部条） |
| `float` | 环境光晕上下浮动（8s） |
| `particleFloat` | Hero 粒子浮动（5s，opacity + translateY + scale） |
| `neonPulse` | 蓝色霓虹边框呼吸（3s，box-shadow 循环） |
| `neonPulseCyan` | 同上，青色版 |
| `neonPulseMagenta` | 同上，紫色版 |
| `twinkle` | 星场闪烁（opacity 0.3 ↔ 0.9，各星不同时长） |
| `borderBreath` | 边框颜色在蓝/青之间交替（4s） |
| `hudCornerPulse` | HUD 角标透明度脉冲（3s） |
| `shimmer` | 骨架屏闪烁扫描 |
| `pulseGlow` | 呼吸光晕（2s） |

---

## 部署

项目输出纯静态文件到 `dist/`，已配置 GitHub Actions 自动部署到 GitHub Pages。

### 部署流程

```text
推送 main 分支 → GitHub Actions 触发 → pnpm install → pnpm build → 部署到 GitHub Pages
```

### Base 路径

项目部署于 GitHub Pages 子路径 `/learn-ai-agent/`：

| 环境 | Base 路径 |
|------|----------|
| 开发（`pnpm dev`） | `/` |
| 生产（`pnpm build`） | `/learn-ai-agent/` |

所有内部链接通过 `import.meta.env.BASE_URL` 自动计算，无需手动处理。

### 部署到其他平台

`dist/` 目录为纯静态文件，可直接部署到 Netlify、Vercel、Cloudflare Pages 等平台。部署时注意配置 **Base 路径** 为 `/` 或自定义子路径。

---

## 项目约定

详细的项目架构、组件 Props、设计令牌和内容规范请参阅 [CLAUDE.md](./.claude/CLAUDE.md)。

核心约束：
- 禁止修改构建配置文件（`astro.config.mjs`、`package.json`、`tsconfig.json`、`content.config.ts`）
- 所有颜色通过 CSS 自定义属性（design tokens）引用，禁止硬编码色值
- 暗色/亮色双主题必须同步适配
- 响应式需在 375px / 768px / 1200px 三个断点验证

---

## License

MIT
