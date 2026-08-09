# UI 风格升级 —— Apple 设计系统（Action Blue + 近黑表面系统）

> **设计依据**：参照 Apple Human Interface Guidelines（`docs/design-md/apple/DESIGN.md`），提炼 Apple 标志性设计语言。
> **角色**：你是一位资深 UI/UX 工程师，擅长现代科技风格的前端实现。
> **目标**：在不改动任何业务逻辑的前提下，对现有项目进行纯视觉层面的 Apple 风格升级。
> **优先级**：P0（高优先级，影响全局品牌感知）

---

## 0. 设计哲学

### 0.1 核心命题

Apple 的设计语言来自 **5 条克制到极致的设计纪律**：

| #   | 纪律                                | Apple 实践                                                        |
| --- | ----------------------------------- | ----------------------------------------------------------------- |
| 1   | **单一 Action Blue**                | 全站仅 `#0066cc` 一种强调色，暗色表面使用 `#2997ff`（亮蓝变体）  |
| 2   | **近黑表面系统**                    | 纯黑画布 `#000000` + 近黑瓷砖 `#1d1d1f` / `#2a2a2c`，无投影      |
| 3   | **SF Pro 字体系统**                 | Display（标题 20px+）、Text（正文 19px-）、Mono（代码/标签）       |
| 4   | **负向字间距（Negative Tracking）** | 标题负向 tracking（-0.005em ~ -0.036em），营造 editorial 密度     |
| 5   | **无装饰性梯度/阴影**               | 唯一装饰元素：Hero 底部 2px accent 缎带。卡片无 shadow，层级靠颜色 |

### 0.2 Apple 设计的独特定位

| 特征   | 旧赛博朋克           | Nebula（旧版）      | **Apple（当前设计）**                 |
| ------ | -------------------- | ------------------- | ------------------------------------ |
| 画布   | `#0a0a0f` + 扫描线   | `#060608` 深空底色  | `#000000` 纯黑（亮色 `#ffffff`）     |
| 强调色 | 蓝+青+紫三色霓虹     | 靛蓝 `#7b8aff`      | **Action Blue `#0066cc`**            |
| 投影   | 霓虹 box-shadow 光晕 | 无阴影              | **无投影**（唯 product shot 可例外） |
| 字体   | Google Fonts 加载    | 系统字体 + mono 品牌 | **SF Pro Display/Text/Mono 栈**      |
| 装饰   | 粒子/网格/HUD/星场   | Hero 底部 2px 缎带  | **Hero 底部 2px 缎带**（保留）       |
| 深度   | 光晕模糊             | 4 级表面梯级        | **3 级近黑表面**（无投影）           |
| 按钮   | 圆角矩形 + glow      | 6px 圆角 + inset    | **Pill 形 `9999px`** + 固体 accent   |
| 正文   | 16px                 | 16px / 400          | **17px / 400 / 1.47 / -0.022em**     |

---

## 1. 色彩系统

### 1.1 暗色主题（`:root`，默认）

#### 画布与表面（近黑表面系统 — 3 级）

```
纯黑画布   →  暗色瓷砖   →  悬停瓷砖
#000000       #272729       #2a2a2c
(最深)        (卡片/面板)   (悬停/抬高)
```

| 令牌                       | 色值      | 用途                               |
| -------------------------- | --------- | ---------------------------------- |
| `--color-bg`               | `#000000` | 页面主背景（纯黑画布）             |
| `--color-bg-alt`           | `#252527` | 交替背景                           |
| `--color-surface`          | `#272729` | 卡片、面板                        |
| `--color-surface-hover`    | `#2a2a2c` | 卡片悬停态                         |
| `--color-surface-elevated` | `#2a2a2c` | 抬高面板（如 featured card）       |

#### 文字（Ink Scale — 3 级）

| 令牌                 | 色值      | 用途                   |
| -------------------- | --------- | ---------------------- |
| `--color-text`       | `#f5f5f7` | 正文（微暖白，非纯白） |
| `--color-text-muted` | `#a1a1a6` | 辅助文字、描述         |
| `--color-text-dim`   | `#6e6e73` | 三级文字、占位符       |

#### 强调色（单一 Action Blue）

> **核心理念**：全站只使用一种固体强调色 `#0066cc`（Action Blue）。暗色表面上的链接使用 `#2997ff`（亮蓝变体，因 `#0066cc` 在深色背景下可见度不足）。

| 令牌                          | 色值                        | 用途                       |
| ----------------------------- | --------------------------- | -------------------------- |
| `--color-accent`              | `#0066cc`                   | 主强调色（Action Blue）    |
| `--color-accent-hover`        | `#0071e3`                   | 悬停态                     |
| `--color-accent-on-dark`      | `#2997ff`                   | 暗色表面上的链接色         |
| `--color-accent-soft`         | `rgba(0, 102, 204, 0.08)`  | 微妙强调背景               |
| `--color-accent-soft-hover`   | `rgba(0, 102, 204, 0.12)`  | 悬停态背景                 |
| `--color-accent-border-subtle` | `rgba(0, 102, 204, 0.12)` | 标签 pill 边框             |
| `--color-accent-selection`    | `rgba(0, 102, 204, 0.12)`  | 文字选区背景               |

#### 边框（Hairline Border Scale）

| 令牌                    | 色值                        | 用途               |
| ----------------------- | --------------------------- | ------------------ |
| `--color-border`        | `rgba(255, 255, 255, 0.08)` | 发丝边框（默认）   |
| `--color-border-strong` | `rgba(255, 255, 255, 0.14)` | 加强边框           |
| `--color-border-accent` | `rgba(0, 102, 204, 0.18)`   | 强调边框（悬停态） |

#### 代码表面

| 令牌                | 色值      | 用途     |
| ------------------- | --------- | -------- |
| `--color-code-bg`   | `#1d1d1f` | 代码块   |
| `--color-code-text` | `#f5f5f7` | 代码文字 |

#### 功能色

| 令牌                    | 色值                   | 用途             |
| ----------------------- | ---------------------- | ---------------- |
| `--color-btn-on-accent` | `#ffffff`              | 按钮上文字（白） |
| `--color-logo-icon-text` | `#ffffff`             | Logo 图标文字    |
| `--color-nav-backdrop`  | `rgba(0, 0, 0, 0.8)`  | 导航毛玻璃背景   |

### 1.2 亮色主题（`[data-theme="light"]`）

> 亮色主题采用纯白画布 + 同款 Action Blue accent（暗色/亮色模式下 accent 色值相同）。

| 令牌                          | 色值                        | 用途                   |
| ----------------------------- | --------------------------- | ---------------------- |
| `--color-bg`                  | `#ffffff`                   | 纯白画布               |
| `--color-bg-alt`              | `#f5f5f7`                   | 交替背景（羊皮纸色）   |
| `--color-surface`             | `#ffffff`                   | 卡片表面               |
| `--color-surface-hover`       | `#f5f5f7`                   | 悬停态                 |
| `--color-surface-elevated`    | `#ffffff`                   | 抬高面板               |
| `--color-text`                | `#1d1d1f`                   | 正文（近黑墨水）       |
| `--color-text-muted`          | `#7a7a7a`                   | 辅助文字               |
| `--color-text-dim`            | `#a1a1a6`                   | 三级文字               |
| `--color-accent`              | `#0066cc`                   | Action Blue            |
| `--color-accent-hover`        | `#0071e3`                   | 悬停态                 |
| `--color-accent-on-dark`      | `#0066cc`                   | 亮色模式下同 accent    |
| `--color-accent-soft`         | `rgba(0, 102, 204, 0.08)`  | 微妙背景               |
| `--color-accent-soft-hover`   | `rgba(0, 102, 204, 0.12)`  | 悬停背景               |
| `--color-accent-border-subtle` | `rgba(0, 102, 204, 0.12)` | 标签边框               |
| `--color-accent-selection`    | `rgba(0, 102, 204, 0.12)`  | 选区背景               |
| `--color-border`              | `rgba(0, 0, 0, 0.04)`      | 发丝边框               |
| `--color-border-strong`       | `rgba(0, 0, 0, 0.08)`      | 加强边框               |
| `--color-border-accent`       | `rgba(0, 102, 204, 0.18)`  | 强调边框               |
| `--color-code-bg`             | `#f5f5f7`                   | 代码块背景             |
| `--color-code-text`           | `#1d1d1f`                   | 代码文字               |
| `--color-btn-on-accent`       | `#ffffff`                   | 按钮上文字             |
| `--color-logo-icon-text`      | `#ffffff`                   | Logo 图标文字          |
| `--color-nav-backdrop`        | `rgba(255, 255, 255, 0.8)` | 导航毛玻璃             |

### 1.3 约束

- **禁止使用**纯黑 `#000`、纯白 `#fff`、高饱和红/黄/绿（`#ff0000`、`#ffff00`、`#00ff00`），除非语义色
- **禁止**使用渐变作为强调色 — 全站使用单一固体强调色 `#0066cc`
- **禁止**使用超过 2 个色相的渐变 — Hero 缎带为单色渐变（accent → transparent）
- 所有颜色通过 CSS 自定义属性引用，**禁止硬编码色值**
- **禁止**在正文段落、卡片背景使用渐变 — 渐变仅用于 Hero 缎带

---

## 2. 材质与深度

### 2.1 近黑表面系统 — 替代投影阴影

> **核心理念**（来自 Apple）：深度不通过 `box-shadow` 表达，而通过 **背景色明度台阶**。纯黑画布 → 近黑瓷砖 → 悬停瓷砖，三级表面。

```
┌─────────────────────────────────────────┐
│  Canvas (#000000)                       │  ← 纯黑（页面背景）
│  ┌───────────────────────────────────┐  │
│  │  Surface 1 (#272729)              │  │  ← 卡片、面板
│  │  ┌─────────────────────────────┐  │  │
│  │  │  Surface 2 (#2a2a2c)        │  │  │  ← 悬停卡片 / 抬高面板
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**实施规则**：

- 卡片默认：`background: var(--color-surface)` + `border: 1px solid var(--color-border)`
- 卡片悬停：`background: var(--color-surface-hover)` + `border-color: var(--color-border-strong)`
- 特色卡片：`background: var(--color-surface-elevated)` + `border-color: var(--color-border-accent)`
- **不使用 `box-shadow` 来区分卡片层级**（唯一例外：导航栏底部 1px border、product shot 图片）

### 2.2 毛玻璃导航

```css
background: var(--color-nav-backdrop);
backdrop-filter: blur(12px) saturate(160%);
-webkit-backdrop-filter: blur(12px) saturate(160%);
border-bottom: 1px solid var(--color-border);
```

### 2.3 按钮 — Apple Pill 风格

主按钮使用 **固体 accent + Pill 圆角**，无 inset 阴影，按压时缩小反馈：

```css
.btn-primary {
  background: var(--color-accent); /* 固体 Action Blue，非渐变 */
  color: var(--color-btn-on-accent);
  border-radius: var(--radius-pill); /* 9999px */
  border: none;
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 1.0625rem;
  transition: all 0.2s var(--ease-out);
}

.btn-primary:hover {
  background: var(--color-accent-hover); /* #0071e3 */
}

.btn-primary:active {
  transform: scale(0.95); /* Apple 标准按压反馈 */
}
```

### 2.4 唯一装饰 — Hero 渐变缎带

```css
.hero-ribbon {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
  opacity: 0.5;
}
```

> **单色渐变**：仅使用 accent 一个色相，从透明→accent→透明。不引入第二个色相。

---

## 3. 排版体系

### 3.1 字体栈

| 角色              | 字体栈                                                                   | 说明                                           |
| ----------------- | ------------------------------------------------------------------------ | ---------------------------------------------- |
| 标题（display）   | `'SF Pro Display', system-ui, -apple-system, 'Inter', sans-serif`        | Apple 标题字体优先（macOS/iOS 原生渲染）        |
| 正文（body）      | `'SF Pro Text', system-ui, -apple-system, 'Inter', sans-serif`           | Apple 正文字体优先                             |
| 等宽（mono）      | `'SF Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, monospace`      | 章节标签、标签 pill、代码块统一使用            |
| 代码              | `'SF Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, monospace`      | 内联代码和代码块                               |

> **Apple 字体层级**：SF Pro Display（标题，20px+）、SF Pro Text（正文，19px-）、SF Mono（代码/标签）。无 SF Pro Display 时降级为 system-ui。

### 3.2 排版层级（负向字间距 + Apple 密度）

| 层级          | 字号                          | 字重 | 行高  | 字间距        | 字体     | 用途                            |
| ------------- | ----------------------------- | ---- | ----- | ------------- | -------- | ------------------------------- |
| h1（全局）    | `clamp(2.125rem, 5vw, 3.5rem)` | 600 | 1.07  | `-0.005em`    | display  | 页面主标题                      |
| h1（hero）    | `clamp(2.5rem, 5vw, 4rem)`    | 600  | 1.07  | `-0.005em`    | display  | 首页大标题                      |
| h2            | `1.75rem`                     | 600  | 1.15  | `-0.022em`    | display  | 文章内 h2                       |
| h3            | `1.3125rem`（21px）           | 600  | 1.19  | `0`           | display  | 子标题                          |
| **body**      | **`17px`**                    | 400  | 1.47  | `-0.022em`    | body     | 正文（Apple 标志性 17px）       |
| post-body     | `1rem`                        | 400  | 1.85  | —             | body     | 文章内正文（宽松行高）          |
| caption/time  | `0.875rem`（14px）            | 400  | 1.43  | `-0.016em`    | body     | 日期、阅读时间                  |
| back-link     | `0.82rem`                     | 400  | —     | —             | display  | 文章返回链接                    |
| nav-link      | `0.75rem`（12px）             | 400  | —     | `-0.01em`     | body     | 导航链接（Apple SF Pro Text）  |
| section label | `0.72rem`                     | 600  | —     | `+0.04em`     | mono     | 章节 eyebrow label              |
| tag pill      | `0.68rem`                     | 600  | —     | `+0.04em`     | mono     | 标签 pill                       |
| code          | `0.875rem`                    | 400  | 1.6   | `0`           | mono     | 内联代码和代码块                |

> 关键设计决策：
>
> - Body **17px**（Apple 标志性正文尺寸 — SF Pro Text 专为 17px 优化）
> - **导航使用 SF Pro Text**（body 字体，12px/400/-0.01em），不用 mono — Apple 导航使用系统字体
> - **标签 pill、章节 label 使用 SF Mono + 正向 tracking（+0.04em）** — 保留技术品牌识别
> - 标题 weight 上限 **600**（Apple 使用 semibold 而非 bold）
> - Apple 体系**不使用 weight 500** — 只有 300、400、600、700 四个字重
> - Hero 标题使用 `-0.005em` 负向 tracking（克制 — 非 aggressive editorial）
> - h2 左侧 accent 色条装饰（3px 宽，保留该装饰元素）
> - **新增 `--color-accent-on-dark: #2997ff`** — 暗色表面上的链接使用更亮的蓝色

### 3.3 排版约束

- 正文、标题统一使用 `font-weight: 600`（semibold），**不使用 `font-weight: 500`**（Apple 体系不存在 500）
- **禁止 `font-weight: 700`**（bold），以下例外：
  - Logo（品牌标识）
  - 统计数据数字（如 about 页文章数、标签数）
  - sg-card 阅读时间数字
- 章节 eyebrow / section label 使用 mono 字体 + 正向 tracking + 大写
- 导航链接使用 body 字体（Apple 风格），非 mono
- 内联代码、标签 pill 可保留 mono 字体（技术品牌信号）

---

## 4. 动效与交互

> **设计原则**：动效服务于科技感，但克制于 Apple 极简美学。CSS 关键帧动画用于氛围层（orbs、光标、缎带），GSAP 驱动 Canvas 粒子网络背景，功能性反馈保持瞬发（hover/active ≤ 0.3s）。

### 4.1 过渡规范

所有交互属性变化必须包含 `transition`：

```css
/* 位移/缩放 */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
/* 颜色/透明度 */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
```

### 4.2 悬浮反馈（Hover）

| 元素      | 效果                                  | 时长  | easing        |
| --------- | ------------------------------------- | ----- | ------------- |
| 按钮      | 颜色变亮 + 可选微位移                 | 0.2s  | `ease-out`    |
| 卡片      | `translateY(-2px)` + 表面颜色向上一级 + accent 光晕 | 0.25s | `ease-smooth` |
| 链接      | 颜色渐变到 accent-hover               | 0.2s  | `ease-smooth` |
| 标签 pill | 背景色微亮                            | 0.2s  | `ease-smooth` |

### 4.3 按压反馈（Active）

```css
.btn-primary:active {
  transform: scale(0.95); /* Apple 标准按压缩小 */
}
```

### 4.4 入场动画

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- `.animate-in`：页面/组件入场（0.7s）
- `.stagger > *`：交错子元素入场（间隔 0.08s）

### 4.5 主题切换过渡

所有主题相关属性统一使用 `0.35s var(--ease-smooth)` 平滑过渡（`background-color`、`color`、`border-color`）。

---

### 4.6 首页科技感动效（index.astro）

> 首页在 Apple 极简基础上注入克制的科技感氛围动效，所有动画均为纯 CSS 实现（无 JS 动画库依赖），仅在卡片滚动揭示中使用了原生 IntersectionObserver。

#### 4.6.1 关键帧定义（global.css）

| 关键帧名 | 类型 | 用途 | 时长 | 缓动 |
|----------|------|------|------|------|
| `float` | 位移动画 | Hero 背景光球 #1（morphing float） | 12s | `ease-in-out` (infinite) |
| `floatSlow` | 位移动画 | Hero 背景光球 #2（慢速漂移） | 16s | `ease-in-out` (infinite) |
| `blink` | 透明度动画 | 终端光标闪烁（`.badge-cursor`） | 1s | `step-end` (infinite) |
| `shimmer` | 背景位移动画 | Featured card 渐变边框扫光 | 4s | `ease` (infinite) |
| `pulseGlow` | 阴影动画 | 卡片悬停外发光（备用） | — | — |
| `pulseDot` | 阴影动画 | 段落标签圆点脉冲（`.label-dot`） | 2.5s | `ease-in-out` (infinite) |
| `ribbonDrift` | 透明度动画 | Hero 底部渐变缎带呼吸 | 4s | `ease-in-out` (infinite) |

```css
/* Morphing float — Hero 背景光球 */
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(30px, -30px) scale(1.05); }
  66%      { transform: translate(-20px, 20px) scale(0.95); }
}

@keyframes floatSlow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(-40px, -20px) scale(1.08); }
}

/* 终端光标闪烁 */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}

/* 渐变边框扫光 */
@keyframes shimmer {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Label dot 脉冲 */
@keyframes pulseDot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 102, 204, 0.3); }
  50%      { box-shadow: 0 0 0 6px rgba(0, 102, 204, 0); }
}

/* Hero 缎带呼吸 */
@keyframes ribbonDrift {
  0%   { opacity: 0.3; }
  50%  { opacity: 0.6; }
  100% { opacity: 0.3; }
}
```

#### 4.6.2 Hero 背景光球（Hero Orbs）

两个大尺寸模糊渐变光球浮动在 Hero 背景中，营造深度和科技氛围：

```html
<div class="hero-orb hero-orb--1" aria-hidden="true"></div>
<div class="hero-orb hero-orb--2" aria-hidden="true"></div>
```

- **Orb 1**：560×560px，Action Blue 10% 透明度径向渐变，右上角，`float` 12s infinite
- **Orb 2**：420×420px，亮蓝 `#2997ff` 7% 透明度，左下角，`floatSlow` 16s infinite
- **共同属性**：`filter: blur(80px)`，`pointer-events: none`，`z-index: 0`
- **响应式**：仅 Desktop 显示光球，平板和手机端隐藏（避免性能问题和视觉干扰）

#### 4.6.3 终端光标闪烁

Hero badge 文字后缀 `|` 字符，模拟终端光标效果：

```html
<span class="badge-cursor" aria-hidden="true">|</span>
```

- `animation: blink 1s step-end infinite` — 使用 `step-end` 实现硬切换（非渐变），模拟真实终端光标
- `font-weight: 400`（光标不加粗）
- 紧跟 badge 文字，间距 `margin-left: 2px`

#### 4.6.4 Featured Card 渐变边框扫光

首页 Featured Card 使用 `::before` 伪元素 + `mask-composite: exclude` 技术实现渐变边框扫光动画：

- **静止态**：边框透明（`opacity: 0`），渐变色持续在背景上扫动（`shimmer` 4s infinite）
- **悬停态**：边框淡入（`opacity: 1`），`background-size: 300% 300%` 产生流动感
- **渐变方向**：135deg 对角线，`transparent → accent → accent-on-dark → transparent`
- **额外悬停**：`translateY(-2px)` + `box-shadow: 0 0 30px 4px rgba(0,102,204,0.08)` 柔和光晕

```css
.featured-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-lg);
  padding: 1px;
  background: linear-gradient(135deg,
    transparent 30%, var(--color-accent) 50%,
    var(--color-accent-on-dark) 70%, transparent);
  background-size: 300% 300%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s var(--ease-smooth);
  animation: shimmer 4s ease infinite;
}
```

#### 4.6.5 卡片悬停光晕（BlogCard::after）

所有 BlogCard 在 hover 时通过 `::after` 伪元素显示 accent 色柔和外发光：

```css
.card::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: var(--radius-lg);
  opacity: 0;
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.35s var(--ease-smooth);
  box-shadow: 0 0 24px 6px rgba(0, 102, 204, 0.10);
}

.card:hover::after {
  opacity: 1;
}
```

- 光晕范围略大于卡片边界（`inset: -1px`），呈现包裹感
- 淡化处理（10% 透明度），不抢内容焦点
- 与卡片 `translateY(-2px)` + `background` 变化同步过渡

#### 4.6.6 Section Label 圆点脉冲

所有 `.section-label` 左侧圆点在 accent 色上叠加脉冲波纹：

```css
.label-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  animation: pulseDot 2.5s ease-in-out infinite;
}
```

- 脉冲效果：从 `0 0 0 0 rgba(0,102,204,0.3)` 扩散到 `0 0 0 6px rgba(0,102,204,0)`
- 6px 扩散半径 + 完全淡出，模拟雷达/心跳隐喻
- 同时用于「最新文章」和「全部文章」两个 section label

#### 4.6.7 Hero 缎带呼吸

Hero 底部单色渐变线的透明度周期性变化：

```css
.hero-ribbon {
  animation: ribbonDrift 4s ease-in-out infinite;
}
```

- opacity 在 0.3 ↔ 0.6 之间缓慢呼吸
- 4s 周期，ease-in-out 平滑过渡
- 缎带位置/颜色不变，仅透明度变化 — 保持 Apple 克制理念

#### 4.6.8 滚动触发揭示（Scroll Reveal）

首页卡片网格和 Featured Card 使用 IntersectionObserver 触发入场动画：

**CSS 层**（global.css）：
```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
}

.reveal-on-scroll.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

**JS 层**（index.astro 内联脚本）：
- 使用原生 `IntersectionObserver`，`threshold: 0.1`，`rootMargin: 0px 0px -30px 0px`
- Featured Card（`.featured.reveal-on-scroll`）直接 observed
- 卡片网格子元素在 DOM 加载后动态添加 `.reveal-on-scroll` class 并 observed
- **交错延迟**：每个卡片根据其在未揭示卡片中的索引获得 80ms 递增延迟（上限 5×80ms = 400ms）
- 揭示后 `unobserve`，不重复触发

**交错算法**：
```js
const delay = Array.from(entry.target.parentElement?.children || [])
  .filter(c => c.classList.contains('reveal-on-scroll') && !c.classList.contains('revealed'))
  .indexOf(entry.target);
setTimeout(() => {
  entry.target.classList.add('revealed');
}, Math.min(delay, 5) * 80);
```

- 每批可见卡片按 DOM 顺序依次揭示，形成波浪入场序列
- 前 5 个卡片获得 0/80/160/240/320ms 延迟，第 6 个起均为 400ms
- 页面初始可见区域的卡片在加载后立即触发（isIntersecting = true）

#### 4.6.9 Hero Keywords 入场动画

Hero 底部关键词行和 badge、标题、副标题、CTA 按钮使用 `fadeInUp` 序列入场：

| 元素 | 延迟 | 说明 |
|------|------|------|
| `.hero-badge` | 0s | 最先入场 |
| `.hero-title` | 0.1s | 紧随 badge |
| `.hero-subtitle` | 0.2s | |
| `.hero-actions` | 0.3s | CTA 按钮组 |
| `.hero-keywords` | 0.35s | 关键词行最后 |

所有元素 `animation: fadeInUp 0.5s~0.6s var(--ease-out) <delay> both`，共用 `fadeInUp` 关键帧，仅在延迟上作出区分。

#### 4.6.10 动效性能约束

- **GPU 加速**：仅对 `transform` 和 `opacity` 做动画（避免触发 layout/paint）
- **光球移动端隐藏**：`@media (max-width: 768px)` 隐藏 hero-orb，减少移动端 GPU 负担
- **无 JS 动画库**：所有持续动画使用 CSS `@keyframes`，仅滚动揭示使用原生 IntersObserver（passive）
- **`pointer-events: none`**：所有装饰性动画元素（orbs、::before/::after 伪元素）不参与交互
- **`prefers-reduced-motion` 尊重**：未来可添加 `@media (prefers-reduced-motion: reduce)` 降级策略

#### 4.6.11 GSAP 粒子网络背景（Canvas + GSAP）

> 使用 GSAP 动画引擎驱动多层 Canvas 粒子系统，作为 Hero 区域的赛博科技动态背景。包含发光粒子网络、脉冲 Hub 节点、数据包传输、鼠标涟漪波纹和光标光晕 — 营造"数字神经网络 + 数据流"的高科技氛围。

**系统架构 — 5 层叠加渲染**：

```
┌─────────────────────────────────────────────┐
│  Layer 5: 鼠标光标光晕 (radial gradient)     │  ← 80px 跟随光晕
│  Layer 4: 鼠标涟漪波纹 (expanding rings)    │  ← GSAP 驱动扩散
│  Layer 3: Hub 节点脉冲环 (ring pulses)      │  ← 3–5 个枢纽节点周期性脉冲
│  Layer 2: 数据包 (traveling bright dots)    │  ← 沿连线飞行的高亮光点
│  Layer 1: 粒子网络 (particles + glow lines)  │  ← 80 粒子 + 发光连线
│  Layer 0: 运动拖尾 (fade-clear trail)       │  ← 半透明清除，产生残影
└─────────────────────────────────────────────┘
```

**技术栈**：

| 层 | 技术 | 用途 |
|----|------|------|
| 动画引擎 | GSAP 3.x (`gsap` npm 包) | 粒子漂移、数据包飞行、Hub 脉冲、涟漪扩散 |
| 渲染层 | HTML5 Canvas 2D API + `requestAnimationFrame` | 60fps 实时渲染，shadowBlur 发光 |
| 模块封装 | `src/scripts/particle-network.ts` | 独立 TypeScript 类（~320 行），完整生命周期 |

**核心参数**：

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `particleCount` | 80 | 粒子总数（含 Hub 节点） |
| `hubCount` | 5 | 枢纽节点数（大尺寸 + 脉冲环 + 强发光） |
| `packetCount` | 18 | 飞行数据包数量（沿连线传输的高亮光点） |
| `connectDistance` | 150px | 粒子连线最大距离 |
| `baseOpacity` | 0.55 | 全局透明度基准 |
| 粒子半径 | 0.8–4.5px | 普通 0.8–3.3px，Hub 2.5–4.5px |
| 粒子透明度 | 0.25–0.85 | 随机，Hub 0.6–0.9 |
| 数据包大小 | 1.2–3px | 含发光 halo + 白色核心 |

**颜色调色板**（多色相微量偏移，增加视觉深度）：

| 模式 | 粒子色系 | Hub 色系 | 数据包色系 | 连线色 |
|------|----------|----------|------------|--------|
| 暗色 | `#2997ff`, `#4da6ff`, `#0071e3`, `#66b8ff`, `#3399ff` | `#66b8ff`, `#4da6ff`, `#80ccff` | `#ffffff`, `#b3dfff`, `#e6f4ff` | `rgba(0,102,204,0.10)` / 近距离 `rgba(41,151,255,0.25)` |
| 亮色 | `#0066cc`, `#0071e3`, `#005bb5`, `#1a7fd4`, `#3388cc` | `#0071e3`, `#1a7fd4`, `#0066cc` | `#0066cc`, `#0071e3`, `#1a7fd4` | `rgba(0,102,204,0.06)` / 近距离 `rgba(0,102,204,0.14)` |

颜色调色板固定编码于模块内，通过 `MutationObserver` 监听 `data-theme` 实现暗色/亮色自动切换。粒子颜色随时间微调 hueOffset，产生缓慢的色相漂移。

**GSAP 动画明细**：

| 动画对象 | GSAP 方法 | 时长 | 缓动 | 说明 |
|----------|-----------|------|------|------|
| 粒子漂移 | `gsap.to(p, { targetX, targetY })` | 3–10s | `sine.inOut` | 到达后自动指派新目标，无限循环 |
| 数据包飞行 | `gsap.to(packet, { progress: 1 })` | 1.2–4.2s | `power1.inOut` | 到达终点后切换端点继续飞行 |
| Hub 脉冲环 | `gsap.to(hub, { ringRadius, ringAlpha })` | 1.5–3s | `power2.out` | 半径 0→80–120px，alpha 0.5→0 |
| 鼠标涟漪 | `gsap.to(ripple, { radius, alpha })` | 1.2s | `power2.out` | 半径 0→120px，alpha 0.5→0 |

**视觉效果详解**：

**① 发光粒子（shadowBlur glow）**：
- 所有粒子使用 Canvas `shadowBlur` 产生发光效果
- 普通粒子：5px + 速度加成 blur
- Hub 节点：12px blur，带白色核心亮点
- 较大粒子（radius > 1.5px）有双层结构：发光外圈 + 白色内核

**② 智能连线**：
- 连线透明度与距离线性反比
- 距离 < 52px 的粒子使用高亮连线（`lineBright`，更粗更亮）
- Hub 节点之间额外绘制加粗发光连线（双倍距离阈值，180px）
- 连线使用 `shadowBlur` 产生微光

**③ 数据包传输**：
- 18 个高亮光点沿粒子连线飞行
- 双层绘制：外圈发光 halo（彩色）+ 内核亮点（白色）
- 优先选择附近粒子作为传输路径
- 到达终点后自动切换下一段路径

**④ Hub 节点脉冲**：
- 5 个枢纽节点周期性发出扩展圆环
- 环从节点中心向外扩散并淡出
- 各节点脉冲相位错开（staggered start）

**⑤ 鼠标涟漪**：
- 鼠标移动距离 > 40px 时生成涟漪
- 从鼠标位置向外扩散的圆形波纹
- 使用 accent 色描边，逐渐扩大并淡出

**⑥ 光标光晕**：
- 鼠标在 Hero 区域内时显示 80px 径向渐变光晕
- 中心 `rgba(41,151,255,0.06)` → 边缘完全透明
- 柔和的环境光效果

**⑦ 运动拖尾**：
- 每帧使用半透明覆盖代替完全清除（`fillRect(rgba,0.07)`）
- 粒子快速移动时留下短暂残影拖尾
- 暗色/亮色模式使用对应背景色

**鼠标力场**：
- 80px 内：强吸引力（粒子向光标汇聚）
- 80–250px：微弱排斥力（外圈粒子向外推移）
- 形成"双区域力场"效果 — 光标附近粒子聚集，外围粒子散开

**渲染循环（rAF，60fps）**：

```
requestAnimationFrame 循环
  ├─ fade-clear (0.07 alpha → 运动拖尾)
  ├─ 粒子位置更新 (lerp → target + mouse force field)
  ├─ 连线绘制 (二重循环，distance-gated，亮度分级)
  ├─ 数据包绘制 (双层：halo + core)
  ├─ 鼠标涟漪绘制 (expanding rings)
  ├─ Hub 脉冲环绘制
  ├─ 粒子绘制 (shadowBlur glow + core highlight)
  ├─ Hub 互联线绘制 (加粗发光)
  └─ 光标光晕绘制 (radial gradient, 80px)
```

**响应式策略**：

- **Desktop (≥769px)**：完整 5 层粒子系统运行
- **Tablet + Phone (≤768px)**：Canvas 隐藏（`display: none`），移端零开销

**生命周期管理**：

`ParticleNetwork` 类提供 `init()` / `destroy()` 方法：
- `init()`：创建 80 粒子 + 5 Hub + 18 数据包，绑定 ResizeObserver / MutationObserver / mouse 事件，启动所有 GSAP 补间和 rAF
- `destroy()`：取消 rAF，杀死所有 GSAP tweens，断开 Observer，清理粒子/Hub/包/涟漪数组，移除事件监听
- Canvas 尺寸通过 `ResizeObserver` 自动适配（devicePixelRatio ≤ 2x）

**性能设计**：

| 措施 | 说明 |
|------|------|
| `devicePixelRatio` 上限 2x | 避免 3x Retina 像素量翻 2.25 倍 |
| Canvas 独立图层 | 不影响 DOM layout/paint |
| `pointer-events: none` | 完全跳过浏览器 hit-testing |
| 移动端关闭 | ≤768px Canvas `display: none`，零渲染开销 |
| GSAP 轻量缓动 | `sine.inOut` / `power1.inOut` / `power2.out` |
| rAF 帧率同步 | 浏览器原生调度，不超帧 |
| 粒子数 80 | 低数量保证高帧率，靠视觉效果弥补 |
| 半透明清除 | 避免每帧 `clearRect` + 全量重绘的开销 |

**文件位置**：

| 文件 | 说明 |
|------|------|
| `src/scripts/particle-network.ts` | 粒子网络核心类（~320 行，5 层渲染） |
| `src/pages/index.astro` | `<canvas>` 元素 + CSS + 初始化脚本 |
| `package.json` | 依赖 `gsap: ^3.15.0` |

---

## 5. 标志性装饰 — Hero 渐变缎带

> **核心理念**：全站只有 ONE 标志性装饰元素。本设计保留 **Hero 底部 2px 单色渐变线**。

### 5.1 缎带规格

- **位置**：Hero section 底部
- **尺寸**：全宽，2px 高
- **渐变**：`transparent → accent → transparent`（单色渐变，Action Blue）
- **透明度**：0.5
- **实现**：`.hero-ribbon` div 元素

### 5.2 变体

- **首页 Hero**：缎带出现在 Hero section 底部
- **其他页面**：不使用缎带（保持克制）

---

## 6. 响应式设计

项目使用 **3 级断点系统**，从移动端→iPad→PC 逐级适配。

### 6.1 断点体系

| 断点             | 宽度       | 目标设备              | 核心变化                                                |
| ---------------- | ---------- | --------------------- | ------------------------------------------------------- |
| **Desktop**      | ≥ 1025px   | PC / 大屏             | 3 列卡片网格，TOC 侧栏显示，完整字号的 typography       |
| **Small Desktop** | 769–1024px | 笔记本 / iPad 横屏    | 2 列卡片网格，body 16px，post-body 侧栏隐藏             |
| **Tablet**       | 481–768px  | iPad 竖屏 / 大手机    | 1 列布局，body 15px，pre 缩减 padding，按钮全宽         |
| **Large Phone**  | ≤ 480px    | 手机                  | 最小字号，nav 极致紧凑，Hero CTA 竖向堆叠，footer 单列  |

### 6.2 全局排版响应式（global.css）

#### Body 字号级联

```text
Desktop (≥1025px):  17px / 1.47 / -0.022em   ← Apple 标志性正文
Small Desktop:      16px / 1.47
Tablet (≤768px):    15px / 1.5
Large Phone (≤480px): 15px / 1.5
```

#### 标题级联

| 标签 | Desktop (≥1025px) | Small Desktop (≤1024px) | Tablet (≤768px) | Phone (≤480px) |
|------|-------------------|------------------------|-----------------|----------------|
| h1   | `clamp(2.125rem,5vw,3.5rem)` | `clamp(1.85rem,4.5vw,2.5rem)` | `1.75rem` | `1.6rem` |
| h2   | `1.75rem` | `1.5rem` | `1.35rem` | `1.25rem` |
| h3   | `1.3125rem` | `1.15rem` | `1.1rem` | `1.05rem` |

#### 代码块

| 属性 | Desktop | Tablet (≤768px) | Phone (≤480px) |
|------|---------|-----------------|----------------|
| padding | `1.25rem 1.5rem` | `0.9rem 1rem` | `0.75rem 0.85rem` |
| font-size | `0.875rem` | `0.78rem` | `0.74rem` |
| border-radius | `var(--radius-md)` (11px) | `var(--radius-md)` | `var(--radius-sm)` (8px) |

#### 按钮

- **Tablet (≤768px)**：按钮自动 `width: 100%`，居中文字，字号 `1rem`
- **Desktop**：按钮保持自适应宽度（inline-flex）

#### 表格

- **Desktop**：`th, td { padding: 10px 14px; font-size: 0.9rem }`
- **Tablet (≤768px)**：`th, td { padding: 8px 10px; font-size: 0.8rem }`
- **Phone (≤480px)**：`th, td { padding: 6px 8px; font-size: 0.75rem }`
- 所有断点：`.table-wrapper` + `overflow-x: auto` 实现水平滚动

#### sg-card（章节导读卡片）

- **Phone (≤480px)**：`sg-body padding: 12px`，`sg-list li font-size: 0.82rem`，内部间距收紧

### 6.3 导航栏（BaseLayout.astro）

| 属性 | Desktop | Tablet (≤768px) | Phone (≤480px) |
|------|---------|-----------------|----------------|
| 左右 padding | `0 2rem` | `0 1rem` | `0 0.75rem` |
| Logo 文字 | 可见 | **隐藏**（仅图标） | 隐藏 |
| nav-link padding | `0.4rem 1rem` | `0.35rem 0.7rem` | `0.3rem 0.55rem` |
| nav-link font-size | `0.75rem` | `0.85rem` | `0.8rem` |
| nav 链接间距 | `0.15rem` | `0.15rem` | `0`（极致紧凑） |

> 导航无 hamburger 菜单 — 4 个中文短链接（首页/文章/标签/关于）即使在 375px 手机上也能容纳。Logo 文字在 ≤768px 时隐藏以节省空间。

### 6.4 首页（index.astro）

#### Hero 区域

| 属性 | Desktop | Tablet (≤768px) | Phone (≤480px) |
|------|---------|-----------------|----------------|
| 垂直 padding | `6rem 0 5rem` | `4rem 0 3rem` | `3rem 0 2.5rem` |
| hero-title | `clamp(2.5rem,5vw,4rem)` | `2.4rem` | `1.85rem` |
| hero-subtitle font-size | `1.1rem` | `1rem` | `0.92rem` |
| CTA 按钮方向 | 横向 | 横向 | **竖向堆叠** |
| hero-keywords font-size | `0.875rem` | `0.8rem` | `0.72rem` |
| hero-badge | `0.7rem` | — | `0.65rem` |

#### 卡片网格

| 断点 | 列数 |
|------|------|
| Desktop (≥1025px) | **3 列** |
| Small Desktop (769–1024px) | **2 列** |
| Tablet + Phone (≤768px) | **1 列** |

#### 特色卡片（Featured Card）

- **Tablet (≤768px)**：flex-direction 从 `row` 切换为 `column`，箭头右对齐
- **Phone (≤480px)**：padding 缩减至 `1.25rem`，标题 `1.15rem`

### 6.5 文章卡片（BlogCard.astro）

| 属性 | Desktop | Tablet (≤768px) | Phone (≤480px) |
|------|---------|-----------------|----------------|
| padding (card-link) | `1.5rem 1.75rem` | `1.25rem` | `1rem` |
| 标题 font-size | `1.2rem` | `1.05rem` | `0.95rem` |
| 描述 font-size | `0.9rem` | — | `0.82rem` |
| tag pill font-size | `0.66rem` | — | `0.62rem` |

### 6.6 文章列表页（blog/index.astro）

- 卡片网格列数：与首页一致（Desktop 3 列 → 2 列 → 1 列）
- 页面标题：Desktop `2rem` → Tablet `1.65rem` → Phone `1.4rem`

### 6.7 文章详情页（BlogPostLayout.astro）

| 断点 | 布局 | 关键变化 |
|------|------|---------|
| Desktop (≥1025px) | 正文 + TOC 侧栏（200px） | 完整双栏 |
| Small Desktop (769–1024px) | 正文全宽 | **TOC 侧栏隐藏** |
| Tablet (≤768px) | 正文全宽 | post-title `1.65rem`，post-body `0.95rem`，h2 `1.25rem` |
| Phone (≤480px) | 正文全宽 | post-title `1.45rem`，post-body `0.9rem`/1.75，h2 `1.15rem` |

#### 前后导航（prev-next）

- **≥641px**：双列并排
- **≤640px**：**单列堆叠**，「下一篇」恢复左对齐

#### 代码复制按钮

- **Desktop/Tablet**：32×32px
- **Phone (≤480px)**：28×28px

### 6.8 标签云页（tags/index.astro）

- 标签卡片默认使用 flex 自动换行 — 无需断点调整列数
- 页面标题：Desktop `2rem` → Tablet `1.65rem` → Phone `1.4rem`
- tag-card 名称/计数在 Phone 下缩小至 `0.7rem` / `0.62rem`

### 6.9 标签过滤页（tags/[tag].astro）

- 卡片网格列数：与首页一致（Desktop 3→2→1）
- 标题使用 `var(--color-accent)` 着色区分

### 6.10 关于页（about.astro）

| 断点 | 统计卡片列数 | 关键变化 |
|------|------------|---------|
| Desktop (≥769px) | 3 列 | 完整字号 |
| Tablet/Phone (≤768px) | 3 列（保持） | stat-num `1.65rem`，stat-label `0.72rem` |
| Phone (≤480px) | 3 列（保持） | stat-num `1.4rem`，padding `0.85rem 0.5rem`，knowledge-tag/tech-item `0.7rem` |

> 统计卡片在移动端保持 3 列 — 3 个数字不会溢出（文章数 + 标签数 + 分钟），但 padding 和字号逐级缩小。

### 6.11 页脚（BaseLayout.astro）

| 断点 | footer-grid 列数 | 关键变化 |
|------|-----------------|---------|
| Desktop (≥641px) | `1.5fr 1fr 1fr`（3 列） | 品牌列稍宽 |
| Tablet (≤640px) | `1fr`（单列） | 品牌/导航/订阅 垂直堆叠 |
| Phone (≤480px) | `1fr`（单列） | 链接字号 `0.95rem`，行高 `2.2`，copyright `0.72rem` |

### 6.12 Back to Top 按钮

- **Desktop/Tablet**：`bottom: 2rem; right: 2rem; 42×42px`
- **Phone (≤480px)**：`bottom: 1rem; right: 0.75rem; 38×38px`

### 6.13 Hero 渐变缎带

- 所有断点保持 2px 高度，不移除（全站唯一装饰元素）

### 6.14 断点策略

```
Desktop-first 级联（max-width 渐进缩减）：

  1024px  ──→ body 16px, h1 缩小, pre 缩减, 卡片 2 列
   768px  ──→ body 15px, 按钮全宽, nav 紧凑, TOC 隐藏, 卡片 1 列
   480px  ──→ Hero CTA 竖向, footer 单列, sg-card 紧凑, 卡片 1 列
```

所有文件使用以下文件级排序：
1. 默认样式（Desktop）
2. `@media (max-width: 1024px)` — 小桌面
3. `@media (max-width: 768px)` — 平板
4. `@media (max-width: 480px)` — 大手机

卡片网格的列数切换使用 `min-width`（Desktop-first 渐进增强）：
1. 默认 1 列
2. `@media (min-width: 769px)` → 2 列
3. `@media (min-width: 1025px)` → 3 列

---

## 7. 组件规格

### 7.1 按钮（.btn-primary / .btn-ghost）

```css
/* 主按钮 — 固体 accent + Apple Pill */
.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.4rem;
  background: var(--color-accent); /* Action Blue */
  color: var(--color-btn-on-accent);
  border-radius: var(--radius-pill); /* 9999px */
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 1.0625rem;
  border: none;
  transition: all 0.2s var(--ease-out);
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--color-accent-hover);
}

.btn-primary:active {
  transform: scale(0.95); /* Apple 按压反馈 */
}

/* 次要按钮 — accent 边框 + 透明背景 */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.4rem;
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 1.0625rem;
  transition: all 0.2s var(--ease-smooth);
}

.btn-ghost:hover {
  background: var(--color-accent);
  color: var(--color-btn-on-accent);
}
```

### 7.2 卡片（BlogCard）

```css
.card {
  background: var(--color-surface); /* 暗色瓷砖 #272729 */
  border: 1px solid var(--color-border); /* 发丝边框 */
  border-radius: var(--radius-lg); /* 18px — Apple 卡片圆角 */
  transition: all 0.25s var(--ease-smooth);
  /* 无投影 */
}

.card:hover {
  background: var(--color-surface-hover); /* #2a2a2c — 颜色台阶表达深度 */
  border-color: var(--color-border-accent);
  transform: translateY(-2px);
  /* 仍然无投影 */
}
```

### 7.3 标签 Pill（.tag-pill）

```css
.tag-pill {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  font-family: var(--font-mono); /* SF Mono */
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border: 1px solid var(--color-accent-border-subtle);
  border-radius: var(--radius-sm); /* 8px */
  transition: all 0.2s ease;
}
```

### 7.4 代码块

```css
pre {
  background: var(--color-code-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md); /* 11px */
  padding: 1.25rem 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.6;
  /* 无投影，无终端栏 */
}
```

### 7.5 引用块（blockquote）

```css
blockquote {
  background: var(--color-surface);
  border-left: 2px solid var(--color-accent);
  border-radius: 0 var(--radius) var(--radius) 0;
  padding: 1rem 1.25rem;
  /* 简洁左边栏，无毛玻璃，无装饰引号 */
}
```

### 7.6 导航栏

```css
.nav-bar {
  height: var(--nav-height); /* 44px — Apple 标准导航高度 */
  background: var(--color-nav-backdrop);
  backdrop-filter: blur(12px) saturate(160%);
  border-bottom: 1px solid var(--color-border);
}

.nav-link {
  font-family: var(--font-body); /* SF Pro Text — Apple 导航使用系统字体 */
  font-size: 0.75rem;           /* 12px */
  font-weight: 400;
  letter-spacing: -0.01em;
}
```

### 7.7 阅读进度条

```css
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--color-accent); /* Action Blue，单色非渐变 */
}
```

### 7.8 H2 标题装饰

```css
.post-body h2 {
  position: relative;
  padding-left: 1rem;
}

.post-body h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.15em;
  bottom: 0.15em;
  width: 3px;
  border-radius: 2px;
  background: var(--color-accent);
}
```

---

## 8. 布局间距

| 令牌               | 值       | 用途                |
| ------------------ | -------- | ------------------- |
| `--nav-height`     | `44px`   | 导航栏高度（Apple 标准） |
| `--max-width`      | `1150px` | 文章/关于页最大宽度 |
| `--max-width-wide` | `1150px` | 全局页面最大宽度（首页/列表/导航/页脚） |

> PC 端内容宽度 1150px，参考 Vite 文档站的宽布局理念。文章详情页双栏布局中，正文列约 838px（1150 - 64px padding - 200px TOC - 48px gap），兼顾阅读舒适度与空间利用。

---

## 9. 圆角尺度（Apple Scale）

| 令牌            | 值       | 用途                          |
| --------------- | -------- | ----------------------------- |
| `--radius-sm`   | `8px`    | 标签 pill、inline code        |
| `--radius`      | `11px`   | 通用圆角（Apple 11pt）        |
| `--radius-md`   | `11px`   | 卡片、代码块、图片            |
| `--radius-lg`   | `18px`   | 特色卡片、Hero 卡片           |
| `--radius-pill` | `9999px` | 按钮（Apple Pill）             |

> Apple 不使用小圆角 — sm 从 8px 起，默认圆角 11px，按钮为全 pill（9999px）。

---

## 10. 改造范围与优先级

| 优先级 | 模块                       | 影响文件                                        |
| ------ | -------------------------- | ----------------------------------------------- |
| **P0** | 全局 CSS 令牌替换          | `src/styles/global.css`                         |
| **P0** | 字体栈 + 排版层级          | `src/styles/global.css`                         |
| **P0** | 按钮、卡片、标签组件       | `global.css` + `index.astro` + `BlogCard.astro` |
| **P1** | 导航栏（body 字体 + 44px） | `BaseLayout.astro`                              |
| **P1** | Hero 区域 + 渐变缎带       | `index.astro`                                   |
| **P1** | 代码块、引用块样式         | `global.css` + `BlogPostLayout.astro`           |
| **P1** | **响应式设计（3 级断点）** | `global.css` + 全部 `.astro` 页面/组件/布局     |
| **P2** | 亮色主题适配               | `global.css`                                    |
| **P2** | 进度条、滚动条             | `global.css`                                    |
| **P2** | **GSAP 粒子网络背景**      | `index.astro` + `particle-network.ts` + `package.json` |

---

## 11. 约束条件

1. **不修改任何业务逻辑** — 仅限 CSS 和视觉层标记（HTML class/结构微调）
2. **不修改构建配置文件** — `astro.config.mjs`、`package.json`、`tsconfig.json`、`content.config.ts`
3. **不引入新依赖** — 除 GSAP（Canvas 粒子层动画引擎）外，所有效果用纯 CSS 实现
4. **不引入外部字体加载** — SF Pro 仅在 macOS/iOS 本地可用，其他平台降级为 system-ui/Inter
5. **响应式保持** — 所有改动需在 375px / 768px / 1200px 三个断点验证
6. **暗色 + 亮色双主题同步适配**
7. **所有颜色通过 CSS 自定义属性引用，禁止硬编码**
8. **不使用 font-weight: 500**（Apple 体系不存在该字重）

---

## 12. 交付清单

| 序号 | 交付物            | 说明                          |
| ---- | ----------------- | ----------------------------- |
| 1    | 修改文件列表      | 所有改动文件的路径 + 改动概述 |
| 2    | `pnpm build` 通过 | 构建无报错                    |
| 3    | 设计令牌对照表    | 旧令牌 → 新令牌 映射          |

---

## 13. 完成标准（Definition of Done）

- [x] 全局 CSS 令牌已替换为 Apple Action Blue 色板
- [x] 近黑表面系统（3 级 surface）正常工作，无 box-shadow 依赖
- [x] 按钮为 Apple Pill 风格（9999px 圆角 + 固体 accent + scale(0.95) 按压）
- [x] 导航链接使用 SF Pro Text（body 字体，12px/400/-0.01em），高度 44px
- [x] 标签 pill 使用 SF Mono（保留技术品牌识别）
- [x] Hero 底部渐变缎带已实现（单色渐变，Action Blue）
- [x] 正文 17px，标题 weight ≤ 600，无 weight 500
- [x] 所有交互元素有平滑过渡
- [x] 暗色 + 亮色双主题视觉效果一致
- [x] 移动端（375px）/ iPad（768px）/ PC（1025px+）三断点布局正常，无溢出
- [x] 卡片网格响应式列数切换（3→2→1）
- [x] GSAP 粒子网络背景正常工作（粒子漂移 + 连线 + 鼠标交互 + 主题适配 + 移动端隐藏）
- [x] `pnpm build` 零错误通过
