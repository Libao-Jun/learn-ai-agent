# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指导。

> 🔄 **自维护机制**：每次对项目进行修改后（新增组件、调整布局、优化样式、修改内容规范等），必须检查并同步更新本文件。详见文末「CLAUDE.md 自动维护」章节。

## 常用命令

```bash
pnpm dev              # 启动开发服务器（端口 4321）
pnpm build            # 生产构建到 dist/
pnpm preview          # 预览生产构建
```

包管理器为 **pnpm v10**（`package.json` 中强制指定）。无测试运行器。

> ⚠️ **禁止修改构建配置文件**（`astro.config.mjs`、`package.json`、`tsconfig.json`、`content.config.ts`），除非用户明确要求。

## 项目概述

一个关于 **AI Agent 学习**的个人技术博客，使用 **Astro v6**（静态 SSG）构建，部署到 GitHub Pages：`humorfrank.github.io/learn-ai-agent/`。

核心依赖：`astro`、`@astrojs/rss`、`@astrojs/sitemap`、`@astrojs/mdx`、`mermaid`、`remark-directive`。

站点配置集中在 `src/site.config.ts`（`SITE` 对象），包含标题、描述、作者等信息，修改一处全局生效。

## 项目架构

### 文件地图

```text
learn-ai-agent/
├── astro.config.mjs              # 站点/构建配置（勿改）
├── src/
│   ├── site.config.ts            # 站点元数据（SITE 对象）
│   ├── content.config.ts         # 内容集合 schema 定义（勿改）
│   ├── utils/
│   │   └── reading-time.ts       # 阅读时间估算工具
│   ├── styles/
│   │   └── global.css            # 完整设计系统（~547 行）
│   ├── plugins/
│   │   └── remark-callout.mjs    # :::tip/note/warning/danger 指令插件
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML 骨架：<head>、导航、页脚、主题、进度条（Apple 风格）
│   │   └── BlogPostLayout.astro  # 继承 BaseLayout：文章头部、正文、TOC 侧栏、前/后导航
│   ├── components/
│   │   ├── BlogCard.astro        # 文章卡片（标题、描述、标签、阅读时间、日期）
│   │   ├── ThemeToggle.astro     # 暗色/亮色主题切换按钮
│   │   ├── Mermaid.astro         # 客户端 Mermaid 图表渲染
│   │   └── AgentsGuide.astro     # AGENTS.md 指南组件（当前未使用）
│   ├── pages/
│   │   ├── index.astro           # 首页：Hero + 特色文章 + 文章网格
│   │   ├── about.astro           # 关于页：统计 + 知识领域 + 技术栈
│   │   ├── blog/
│   │   │   ├── index.astro       # 文章列表（全部文章）
│   │   │   └── [slug].astro      # 单篇文章（动态路由 + 前/后导航）
│   │   ├── tags/
│   │   │   ├── index.astro       # 标签云（按文章数排序）
│   │   │   └── [tag].astro       # 按标签过滤的文章列表
│   │   ├── robots.txt.ts         # 动态 robots.txt
│   │   └── rss.xml.js            # RSS Feed 生成
│   └── content/
│       └── blog/                 # 12 篇 Markdown/MDX 文章
└── .github/workflows/deploy.yml  # CI/CD：推送 main → 构建 → 部署 GitHub Pages
```

### 布局层级

```text
BaseLayout.astro          ← HTML 骨架：<head>、导航栏、主题脚本、页脚、视图过渡
  └─ BlogPostLayout.astro ← 继承上述：文章头部（标题/日期/标签/阅读时间）、正文、TOC 侧栏、前/后导航
       └─ [slug].astro    ← 通过 getStaticPaths + render() 获取单篇博客
```

`BaseLayout` 导入 `global.css`，所有主题和设计令牌在全局可用。

### 内容层

`src/content.config.ts` 使用 Astro v6 的 **Content Layer API** 配合 `glob` 加载器。

Schema 字段：

- `title`（string）— 必填
- `date`（coerce date）— 必填
- `description`（string）— 可选
- `tags`（string[]）— 默认 `[]`
- `draft`（bool）— 默认 `false`

博客文章存放在 `src/content/blog/*.md`（12 篇 `.md` + 1 篇 `.mdx`）。`[slug].astro` 页面通过 `getStaticPaths()` + `render()` 生成静态页面。

### 草稿文章

所有获取文章的页面使用统一模式过滤草稿：

```js
const posts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
});
```

`index.astro`、`blog/index.astro`、`tags/[tag].astro`、`[slug].astro` 均采用此模式。

---

## 设计系统

### 主题系统

通过 `<html>` 上的 `data-theme` 属性控制暗色/亮色模式。

关键实现细节：

- **防闪烁**：`BaseLayout.astro` 中的内联 `<script is:inline>` 在首帧渲染前从 `localStorage` 读取并设置属性
- **优先级**：localStorage > 系统偏好 > 暗色默认
- **切换组件**：`ThemeToggle.astro` 使用原生 JS 事件监听器处理切换
- **Token 层级**：暗色主题变量在 `:root`，亮色主题覆盖在 `[data-theme="light"]`
- **过渡**：所有主题相关属性使用 `0.35s var(--ease-smooth)` 平滑过渡

### 设计令牌速查

**暗色主题（默认）— Apple 纯黑画布 + 近黑表面系统：**

| 类别 | 令牌 | 暗色值 | 亮色值 |
|------|------|--------|--------|
| 画布 | `--color-bg` | `#000000` | `#ffffff` |
| 表面 | `--color-surface` | `#272729` | `#ffffff` |
| 悬停表面 | `--color-surface-hover` | `#2a2a2c` | `#f5f5f7` |
| 抬高表面 | `--color-surface-elevated` | `#2a2a2c` | `#ffffff` |
| 主文字 | `--color-text` | `#f5f5f7` | `#1d1d1f` |
| 次文字 | `--color-text-muted` | `#a1a1a6` | `#7a7a7a` |
| 三级文字 | `--color-text-dim` | `#6e6e73` | `#a1a1a6` |
| 强调色 | `--color-accent` | `#0066cc`（Action Blue） | `#0066cc` |
| 强调悬停 | `--color-accent-hover` | `#0071e3` | `#0071e3` |
| 发丝边框 | `--color-border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` |
| 暗色链接 | `--color-accent-on-dark` | `#2997ff` | `#0066cc` |

> **近黑表面系统**：深度通过颜色明度台阶表达（纯黑画布 → 暗色瓷砖 → 悬停），卡片不使用 `box-shadow` 表达层级。

### 字体

| 用途 | 字体栈 |
|------|--------|
| 标题 | `'SF Pro Display', system-ui, -apple-system, 'Inter', sans-serif` |
| 正文 | `'SF Pro Text', system-ui, -apple-system, 'Inter', sans-serif` |
| **等宽（标签/代码）** | `'SF Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, monospace` |

> **Apple 字体层级**：SF Pro Display（标题 20px+）、SF Pro Text（正文 19px-）、SF Mono（代码/标签）。导航链接使用 SF Pro Text（body 字体），标签 pill 使用 SF Mono。Apple 体系**不使用 weight 500**，字重阶梯为 300 / 400 / 600 / 700。

### 动画

| 动画名 | 用途 |
|--------|------|
| `fadeInUp` | 页面入场（`.animate-in`）和交错子元素（`.stagger`），24px 位移 |
| `fadeIn` | 简单淡入 |

### 视觉效果

- **毛玻璃导航**：`backdrop-filter: blur(12px) saturate(160%)`，44px 高度，底部发丝边框
- **阅读进度条**：Action Blue 单色，2px 高，固定视口顶部
- **Apple Pill 按钮**：Action Blue 固体背景，9999px 圆角，`scale(0.95)` 按压反馈，无 inset 阴影
- **近黑表面卡片**：hover 时背景色向上一级 + 发丝边框加强，**无投影**
- **Hero 渐变缎带**：底部 2px Action Blue 单色渐变线（全站唯一装饰性元素）
- **排版**：17px 正文（Apple 标志性尺寸），标题 weight ≤ 600，SF Pro 字体栈；导航用 body 字体 12px/400，标签用 mono + 正向 tracking
- **视图过渡**：`@view-transition { navigation: auto }` 已启用

### 代码高亮

Shiki 使用 `github-dark` 主题。代码块自动注入复制按钮（`BlogPostLayout.astro` 脚本实现）。

### 章节导读卡片（sg-card）

每篇博客文章顶部有一段 `.sg-card` 的 HTML 块，包含学习目标、预计阅读时间和收获要点。**直接以原始 HTML 形式写在 Markdown 中**，非 Astro 组件。

sg-card 样式定义在 `global.css`。

---

## 组件 Props 速查

### BlogCard

```ts
interface Props {
  title: string;           // 文章标题
  date: Date;              // 发布日期
  slug: string;            // 文章 ID（用于链接）
  description?: string;    // 文章描述（限制 2 行）
  tags?: string[];         // 标签列表（显示前 3 个，超出显示 +N）
  readingTime?: number;    // 估算阅读时间（分钟）
}
```

### BlogPostLayout

```ts
interface Props {
  title: string;
  date: Date;
  tags?: string[];
  headings?: Heading[];        // { text, slug, depth } — 用于 TOC
  readingTime?: number;
  prevPost?: { id: string; data: { title: string; description?: string } } | null;
  nextPost?: { id: string; data: { title: string; description?: string } } | null;
}
```

TOC 仅在 `headings.length >= 2` 时显示。`prevPost` 按时间倒序，「上一篇」= 更旧的文章。

### BaseLayout

```ts
interface Props {
  pageTitle: string;       // 用于 <title> 后缀
  description?: string;    // 用于 <meta name="description">
}
```

---

## 内容创作规范

### Frontmatter 模板

```yaml
---
title: '文章标题'
date: 2026-08-09
description: '一句话描述，50 字以内，含关键词，吸引点击'
tags: ['主标签', '副标签1', '副标签2']
---
```

### 标签规范

- **技术专有名词保持英文**：`AI`, `MCP`, `A2A`, `Claude Code`, `Codex`, `Skills`, `SDD`
- **概念/领域可用中文**：`多模态`, `全栈`, `工具集`
- **避免冗余标签**：不要同时用 `Claude Code` 和 `Claude Code 参考资料`
- **每篇文章至少 3 个标签**

### 文章结构

```md
## 本节导读

<div class="sg-card">…</div>    ← 章节导读卡片（必选）

## 核心内容第一节
…正文…

## 核心内容第二节
…正文…
```

> ⚠️ **「本节导读」为每篇文章的强制模块**。每篇文章开头（frontmatter 之后、正文首个二级标题之前）必须包含 `## 本节导读` + `<div class="sg-card">` 卡片，包含「学习目标 🎯」「预计阅读 ⏱️」「你将收获 📦」三项。若发现 `src/content/blog/` 下的文章缺少该模块，**必须根据文章内容自动补充**。`sg-card` 结构如下：

```html
## 本节导读

<div class="sg-card">
  <div class="sg-body">
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">🎯</div>
        <div class="sg-item-label">学习目标</div>
      </div>
      <div class="sg-tags">
        <span class="sg-tag">关键词1</span>
        <span class="sg-tag">关键词2</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">⏱️</div>
        <div class="sg-item-label">预计阅读</div>
      </div>
      <div class="sg-time">
        <span class="sg-time-num">N</span>
        <span class="sg-time-unit">min</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">📦</div>
        <div class="sg-item-label">你将收获</div>
      </div>
      <ul class="sg-list">
        <li>收获点 1</li>
        <li>收获点 2</li>
      </ul>
    </div>
  </div>
</div>
```

### 交叉引用

每篇文章末尾推荐添加「延伸阅读」或文章导航表，参考 `ai-tools.md` 末尾的「附录：本系列文章导航」表格。

内部链接格式：`[文章标题](/learn-ai-agent/blog/slug/)`

### 可用指令

文章内可使用 `:::tip`、`:::note`、`:::warning`、`:::danger` 创建标注框：

```md
:::tip[标题]
提示内容
:::
```

由 `remark-callout.mjs` 插件转换为 `<aside class="md-callout md-callout-tip">`。

---

## 工具模块

### `src/utils/reading-time.ts`

```ts
export function getReadingTime(body: string): number
```

- 中文：~400 字/分钟
- 英文：~200 词/分钟
- 自动剥离 Markdown 语法（代码块、图片、链接、HTML 标签）
- 最小返回 1 分钟

所有使用 `BlogCard` 的页面均需导入此工具并传入 `readingTime={getReadingTime(post.body || '')}`。

---

## 基础路径处理

站点部署于 GitHub Pages 子路径 `/learn-ai-agent/`。所有内部链接通过以下方式计算基础路径：

```js
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
```

开发时 `BASE_URL` 为 `/`，正式环境为 `/learn-ai-agent/`。`BaseLayout.astro`、`BlogPostLayout.astro`、`BlogCard.astro` 及所有页面均采用此方式。

---

## CSS 约定

- 全局样式在 `src/styles/global.css`
- 组件/页面级样式使用 Astro scoped `<style>` 块
- 主题过渡统一使用 `0.35s var(--ease-smooth)`
- 交互过渡使用 `0.2s ~ 0.3s var(--ease-smooth)` 或 `var(--ease-out)`
- 需要穿透 scoping 时使用 `:global()` 选择器
- 表格样式：全局定义基础样式，`BlogPostLayout` 脚本在客户端将 `<table>` 包裹在 `.table-wrapper` 中实现响应式滚动

---

## 已知约定

1. **禁止修改构建配置** — `astro.config.mjs`、`package.json`、`tsconfig.json`、`content.config.ts` 不要动
2. **sg-card 保持手写 HTML** — 不组件化，因为 `.md` 文件无法导入 Astro 组件
3. **TOC 锚点** — 服务端 `extractHeadings()` 和客户端 slug 生成算法需保持一致
4. **前/后导航** — 「上一篇」= 时间上更旧的（索引 +1），「下一篇」= 更新的（索引 -1）
5. **代码复制按钮** — 由 `BlogPostLayout.astro` 的 `initCodeCopy()` 脚本在 `<pre>` 上注入复制按钮
6. **表格响应式** — 同样由 `BlogPostLayout.astro` 脚本自动包裹为 `.table-wrapper`
7. **Apple 设计色板** — 单一 Action Blue `#0066cc` 强调色，近黑表面系统（纯黑→暗色瓷砖→悬停，无投影），SF Pro 字体栈（无 weight 500），Hero 底部唯一装饰缎带
8. **组件导入别名** — 内容（`.mdx`）或组件中导入 `src/components` 下的组件统一使用 `@components/xxx.astro` 别名（由 `tsconfig.json` 的 `paths` 与 `astro.config.mjs` 的 `vite.resolve.alias` 共同配置），避免写 `../../components/` 相对路径

## CI/CD

`.github/workflows/deploy.yml` 在推送到 `main` 分支时触发：

```text
检出 → 配置 pnpm + Node 22 → pnpm install --frozen-lockfile → pnpm build → 部署到 GitHub Pages
```

---

## CLAUDE.md 自动维护

本文件是项目的**核心知识库**，记录架构、设计系统、组件规范、内容约定等一切关键信息。每次对项目进行修改后，**必须检查本文件是否需要同步更新**。

### 触发条件

以下变更发生时，对应章节必须检查并更新：

| 变更类型 | 需检查的章节 | 典型操作 |
|---------|-------------|---------|
| 新增/删除组件 | 文件地图、组件 Props 速查 | 更新文件树、添加/删除 Props 接口 |
| 修改组件 Props | 组件 Props 速查 | 更新接口定义和注释 |
| 新增/删除页面 | 文件地图、布局层级 | 更新路由和层级关系 |
| 调整设计令牌 | 设计令牌速查 | 更新颜色/字体/动画表格 |
| 新增动画/特效 | 动画表、视觉效果 | 添加条目并注明用途 |
| 新增工具模块 | 工具模块 | 添加函数签名和用法说明 |
| 新增内容规范 | 内容创作规范 | 添加新的规范条目 |
| 调整布局结构 | 文件地图、布局层级 | 更新层级关系和文件描述 |
| 修改 CI/CD 流程 | CI/CD | 更新部署流程图 |
| 标签命名变更 | 标签规范 | 更新标签示例和规范说明 |
| 新增约束/约定 | 已知约定 | 追加新的约定条目 |

### 执行流程

每次完成项目修改后，按以下步骤自检：

1. **比对变更**：列出本次修改涉及的所有文件
2. **对照上表**：找到对应的 CLAUDE.md 章节
3. **逐项更新**：
   - 更新的数据（如令牌值、文件路径）保持精确
   - 新增的内容遵循现有格式和排版
   - 删除过时信息，不留残留
4. **验证一致性**：确认文件地图中的路径与实际文件一致，Props 定义与源码一致

### 维护原则

- **精确性优先**：令牌值、路径、接口签名必须与源码完全一致
- **增量更新**：只修改变更涉及的部分，不重写整个文件
- **保持结构**：不随意调整章节顺序或标题层级，保持文档结构稳定
- **新旧兼顾**：新增内容时保留仍有价值的旧内容，不随意删除现有约定
