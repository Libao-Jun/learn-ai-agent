---
title: "AI 工具集：从开发到部署的全栈工具链"
date: 2026-08-09
description: "一份持续更新的 AI 工具集，覆盖 AI 编程工具、模型平台、Agent 协议（MCP/A2A）、Skills 生态、提示词工具、工具管理平台等全链路工具资源。"
tags:
  ["AI", "AI Tools", "MCP", "Agent", "Skills", "Claude Code", "Codex", "工具集"]
---

# AI 工具集

## 本节导读

<div class="sg-card">
  <div class="sg-body">
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">🎯</div>
        <div class="sg-item-label">核心内容</div>
      </div>
      <div class="sg-tags">
        <span class="sg-tag">AI 编程工具</span>
        <span class="sg-tag">模型平台</span>
        <span class="sg-tag">MCP 生态</span>
        <span class="sg-tag">Skills 生态</span>
        <span class="sg-tag">Prompt 工具</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">⏱️</div>
        <div class="sg-item-label">预计阅读</div>
      </div>
      <div class="sg-time">
        <span class="sg-time-num">15</span>
        <span class="sg-time-unit">min</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">📦</div>
        <div class="sg-item-label">你将收获</div>
      </div>
      <ul class="sg-list">
        <li>一览 AI 编程工具全景图</li>
        <li>掌握主流模型平台与 API 选型</li>
        <li>理解 Agent 协议（MCP / A2A / ANP）定位</li>
        <li>获取 MCP 服务与 Skills 的优质资源</li>
        <li>了解工具管理平台 CC Switch</li>
      </ul>
    </div>
  </div>
</div>

> **本文定位**：一份持续更新的 AI 工具集参考文档，覆盖从 AI 编程、模型调用、Agent 协议到 Skills 生态的全链路工具资源。每个板块均可独立阅读，也可作为日常开发的速查手册。

---

## 一、AI 编程工具

> AI 编程工具已从简单的代码补全进化为能够理解项目上下文的智能编程助手。以下是当前主流的 AI 编程 CLI 工具和 IDE 集成工具。

### CLI 工具

| 工具            | 出品方    | 简介                                                             |
| --------------- | --------- | ---------------------------------------------------------------- |
| **Claude Code** | Anthropic | 支持自然语言协作、MCP 协议、Skills 技能系统                      |
| **Codex**       | OpenAI    | 2026 年 7 月合并入 ChatGPT，支持定时任务、云端运行、浏览器自动化 |
| **Gemini CLI**  | Google    | Google 推出的终端 AI 编程工具，基于 Gemini 模型                  |
| **OpenCode**    | 开源社区  | 开源 CLI AI 编程工具，支持多种模型和 MCP 协议                    |
| **OpenClaw**    | 开源社区  | 轻量级开源 CLI 编程助手                                          |

### IDE 集成工具

| 工具               | 类型     | 简介                                                              |
| ------------------ | -------- | ----------------------------------------------------------------- |
| **GitHub Copilot** | IDE 插件 | GitHub 出品的 AI 代码补全和聊天助手，深度集成 VS Code / JetBrains |
| **Cursor**         | AI IDE   | 基于 VS Code 的 AI 原生编辑器，支持多模型对话和代码生成           |
| **Windsurf**       | AI IDE   | Codeium 出品的 AI 原生 IDE，强调 Flow 模式的智能体协作            |

---

## 二、AI 模型平台与 API

> 选择合适的模型供应商和 API 接入方式，是 AI 开发的基础决策。

### 统一接口平台

| 平台                                                        | 简介                      | 核心优势                                                    |
| ----------------------------------------------------------- | ------------------------- | ----------------------------------------------------------- |
| **[OpenRouter](https://openrouter.ai/)**                    | 大语言模型的统一 API 接口 | 一个 API 访问 200+ 模型，按量付费无月费，自动路由最优供应商 |
| **[AWS Bedrock](https://aws.amazon.com/bedrock/)**          | AWS 托管的基础模型服务    | 企业级安全合规，与 AWS 生态深度集成                         |
| **[NVIDIA NIM](https://build.nvidia.com/explore/discover)** | NVIDIA 微服务推理平台     | GPU 优化推理，支持自部署                                    |

### 主流模型供应商

| 供应商              | 代表模型                     | API 接入要点                                                            |
| ------------------- | ---------------------------- | ----------------------------------------------------------------------- |
| **Anthropic**       | Claude Opus / Sonnet / Haiku | [Anthropic API](https://docs.anthropic.com/)，也支持 MCP 协议           |
| **OpenAI**          | GPT-5 / GPT-4.1 / o4-mini    | [OpenAI API](https://platform.openai.com/)，Codex 已整合进 ChatGPT      |
| **Google**          | Gemini 3 Pro / Flash         | [Google AI Studio](https://aistudio.google.com/)，支持 Gemini CLI       |
| **DeepSeek**        | DeepSeek-V4 Pro / Flash      | [DeepSeek API](https://platform.deepseek.com/)，兼容 Anthropic API 格式 |
| **智谱 (BigModel)** | GLM-5 系列                   | [智谱开放平台](https://open.bigmodel.cn/)，支持 Claude Code 接入        |

> **💡 提示**：使用 Claude Code 接入 DeepSeek 等第三方模型时，推荐通过 [CC Switch](#八工具管理平台-cc-switch) 可视化配置，无需手动编辑 JSON 文件。详见 [Claude Code DeepSeek 配置](/learn-ai-agent/blog/claude-code/#通过-terminal-终端配置)。

---

## 三、模型评测与选型

> AI 模型迭代极快，善用评测平台和排行榜能帮你做出更明智的选型决策。

| 平台                                                      | 简介                           | 核心用法                                           |
| --------------------------------------------------------- | ------------------------------ | -------------------------------------------------- |
| **[LMArena](https://lmarena.ai/)**                        | 基于人类偏好的模型匿名竞技排名 | 先选方向（编程/通用/视觉），再看 Top 10 中你能用的 |
| **[Artificial Analysis](https://artificialanalysis.ai/)** | 模型智能、速度、价格的独立分析 | 综合评估智力、速度、价格三维度，选性价比最优       |

更多选型策略详见 [AI 模型及选择](/learn-ai-agent/blog/ai-model/)。

---

## 四、AI Agent 协议

> AI Agent 之间的通信需要标准化协议。当前三大协议各有定位，互补而非竞争。

| 协议    | 全称                    | 出品方              | 解决的问题                       |
| ------- | ----------------------- | ------------------- | -------------------------------- |
| **MCP** | Model Context Protocol  | Anthropic (2024.11) | AI 如何访问外部工具和数据源      |
| **A2A** | Agent-to-Agent Protocol | Google (2025.04)    | 多 Agent 之间如何相互协作        |
| **ANP** | Agent Network Protocol  | 开源社区            | 大规模网络中如何发现和连接 Agent |

### 快速区分

- **MCP** → 给 AI 装上"手和眼睛"：访问文件、数据库、API、浏览器等外部工具
- **A2A** → 给 AI 装上"对讲机"：让不同厂商的 Agent 可以分配任务、交换信息
- **ANP** → 给 AI 装上"黄页"：在大规模网络中动态发现可用的 Agent 服务

> 详尽的 MCP 配置指南和 A2A 使用方法见 [AI Agent 协议](/learn-ai-agent/blog/ai-agent-mcp/)。

---

## 五、MCP 生态资源

> MCP（Model Context Protocol）的核心价值在于"一次开发，所有 AI 应用通用"。以下资源帮你快速找到适合的 MCP 服务器。

### 官方资源

| 资源             | 地址                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------ |
| MCP 官方文档     | [modelcontextprotocol.io](https://modelcontextprotocol.io)                                 |
| 官方 Server 示例 | [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) |

### 社区聚合

| 平台                    | 地址                                                                     | 说明                            |
| ----------------------- | ------------------------------------------------------------------------ | ------------------------------- |
| **MCP.so**              | [mcp.so](https://mcp.so)                                                 | 中文 MCP 服务器导航站           |
| **LobeHub MCP**         | [lobehub.com/mcp](https://lobehub.com/mcp)                               | 中文 MCP 市场，分类清晰         |
| **Pulse MCP**           | [pulsemcp.com](https://pulsemcp.com)                                     | 英文 MCP 目录，含使用趋势       |
| **Smithery**            | [smithery.ai](https://smithery.ai)                                       | 英文 MCP 注册中心，支持一键安装 |
| **Awesome MCP Servers** | [github.com/awesome-mcp-servers](https://github.com/awesome-mcp-servers) | 精选 MCP 服务器汇总             |
| **Glama MCP**           | [glama.ai/mcp/servers](https://glama.ai/mcp/servers)                     | 英文 MCP 服务器列表             |

### 配置速查

```sh
# Claude Code 的 MCP 配置位置
用户级：~/.claude.json        # 全局生效
项目级：.claude/mcp.json       # 当前项目生效（推荐）

# 用自然语言添加 MCP
/plugin install <mcp-server-name>
```

---

## 六、Agent Skills 生态

> Agent Skills 是将专业知识和工作流固化为可复用资产的核心工具。如果说 MCP 是给 AI 配上"工具"，Skills 就是给 AI 配上"操作手册"。

### Skills 市场与社区

| 平台               | 地址                                     | 说明                                 |
| ------------------ | ---------------------------------------- | ------------------------------------ |
| **Skills.sh**      | [skills.sh](https://www.skills.sh/)      | 开放代理技能生态系统                 |
| **SkillHub**       | [skillhub.cn](https://skillhub.cn/)      | 专为中国用户优化的 AI Skills 社区    |
| **SkillsMP**       | [skillsmp.com](https://skillsmp.com/zh)  | 社区驱动的 Agent Skills 市场（中文） |
| **AgentSkills.io** | [agentskills.io](https://agentskills.io) | Agent Skills 官方标准站点            |

### 开发与参考资源

| 资源                      | 地址                                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| Anthropic Skills 官方仓库 | [github.com/anthropics/skills](https://github.com/anthropics/skills)                               |
| skill-creator 工具        | [Skill Creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md)      |
| Awesome Claude Skills     | [github.com/ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) |

> 深入了解 Skills 的工作原理和创建方法，见 [Agent Skills](/learn-ai-agent/blog/agent-skills/)。

---

## 七、提示词工具

> 好的提示词是 AI 输出的质量保证。以下工具帮助你构建和优化提示词。

| 工具                     | 地址                                                        | 功能             |
| ------------------------ | ----------------------------------------------------------- | ---------------- |
| **AI 对话提示词**        | [jyshare.com](https://www.jyshare.com/front-end/9127/)      | 提示词参考库     |
| **AI 提示词（AIGC.cn）** | [aigc.cn](https://www.aigc.cn/favorites/ai-prompt-keywords) | 提示词关键词收藏 |
| **Prompt 生成器**        | [promptark.net](https://promptark.net/zh#generator)         | 在线提示词生成   |
| **Prompt 优化器**        | [promptoptimizer.org](https://promptoptimizer.org/zh)       | 提示词优化       |

> 系统学习 Prompt 结构化方法见 [Prompt Engineering](/learn-ai-agent/blog/prompt-engineering/)。

---

## 八、工具管理平台 — CC Switch

> [CC Switch](https://www.ccswitch.io/zh/) 是一个 AI 编程工具统一管理平台，用一个桌面应用管理 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw 五大 CLI 工具。

### 为什么选择 CC Switch？

现代 AI 编程依赖于多个 CLI 工具，但每个工具都有自己的配置格式。切换 API 供应商意味着手动编辑 JSON、TOML 或 `.env` 文件，不同工具间也缺乏统一管理 MCP 和 Skills 的方式。

CC Switch 为你提供一个可视化界面来管理所有五个 CLI 工具：

- **一个应用，五个 CLI 工具** — 在单一界面中管理 Claude Code、Codex、Gemini CLI、OpenCode 和 OpenClaw
- **告别手动编辑** — 50+ 供应商预设（含 AWS Bedrock、NVIDIA NIM 和社区中转服务），一键切换
- **统一 MCP / Skills 管理** — 一个面板管理多应用的 MCP 和 Skills，支持双向同步
- **系统托盘快速切换** — 从托盘菜单即时切换供应商，无需打开完整应用
- **云同步** — 通过 Dropbox、OneDrive、iCloud 或 WebDAV 在多设备间同步供应商数据
- **跨平台** — 基于 Tauri 2 的原生桌面应用，支持 Windows、macOS 和 Linux
- **小工具** — 内置首次安装登录确认、禁止签名、插件拓展同步等多种实用工具

### 快速链接

| 资源                | 地址                                                                                         |
| ------------------- | -------------------------------------------------------------------------------------------- |
| 官方网站            | [ccswitch.io](https://www.ccswitch.io/zh/)                                                   |
| GitHub 下载         | [github.com/farion1231/cc-switch/releases](https://github.com/farion1231/cc-switch/releases) |
| Claude Desktop 配置 | [ccswitch.io 文档](https://ccswitch.io/zh/docs?section=providers&item=claude-desktop)        |
| 快速上手指南        | [ccswitch.io 快速上手](https://ccswitch.io/zh/docs?section=getting-started&item=quickstart)  |

---

## 九、AI Agent 框架与学习资源

> 从理论学习到实战项目，以下资源帮助你构建完整的 AI Agent 知识体系。

### Agent 框架

| 框架             | 简介                                  | 地址                                                                                     |
| ---------------- | ------------------------------------- | ---------------------------------------------------------------------------------------- |
| **LangGraph**    | LangChain 出品的 Agent 工作流编排框架 | [langchain.com/langgraph](https://www.langchain.com/langgraph)                           |
| **CrewAI**       | 多 Agent 协作框架                     | [crewai.com](https://crewai.com/)                                                        |
| **Hello Agents** | Datawhale 出品的从零构建智能体教程    | [github.com/datawhalechina/hello-agents](https://github.com/datawhalechina/hello-agents) |
| **Agent Study**  | AI Agent 全栈学习课程                 | [github.com/Callous-0923/agent-study](https://github.com/Callous-0923/agent-study)       |

### 教程与文档

| 资源                       | 说明                                     | 地址                                                                                    |
| -------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------- |
| **菜鸟教程 - AI Agent**    | 中文 AI Agent 入门教程                   | [runoob.com/ai-agent](https://www.runoob.com/ai-agent/ai-agent-intro.html)              |
| **菜鸟教程 - Claude Code** | Claude Code 中文教程                     | [runoob.com/claude-code](https://www.runoob.com/claude-code/claude-code-tutorial.html)  |
| **菜鸟教程 - Codex**       | Codex 中文教程                           | [runoob.com/codex](https://www.runoob.com/codex/codex-tutorial.html)                    |
| **Easy Vibe**              | Datawhale 出品的 AI 编程入门到高级教程   | [datawhalechina.github.io/easy-vibe](https://datawhalechina.github.io/easy-vibe/zh-cn/) |
| **Ponytail**               | 一套让 AI 编码代理编写最小有效代码的规则 | [ponytail.dev](https://ponytail.dev/)                                                   |
| **GPT-Codex**              | 面向国内开发者的 OpenAI Codex 中文教程   | [codex.maynorai.top](https://codex.maynorai.top/)                                       |

### 官方文档直达

| 文档                         | 地址                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| Claude Code 官方文档（中文） | [code.claude.com/docs/zh-CN](https://code.claude.com/docs/zh-CN/overview)                               |
| Codex 官方文档               | [developers.openai.com/codex](https://developers.openai.com/codex)                                      |
| DeepSeek Anthropic API 文档  | [api-docs.deepseek.com](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api)                       |
| DeepSeek 接入 Claude Code    | [api-docs.deepseek.com](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code) |
| 智谱 Claude Code 接入        | [docs.bigmodel.cn](https://docs.bigmodel.cn/cn/coding-plan/tool/claude#claude-code)                     |

---

## 十、常用 SKILL

| SKILL            | 说明                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------- |
| vue antfu/skills | 基于 Vue 3.5。始终使用带有 `<script setup lang="ts">` 的 Composition API 进行开发。    |
| ui-ux-pro-max    | 适用于复杂界面和交互设计的先进 UI/UX 设计模式。                                        |
| frontend-design  | 前端界面独具特色，属于专业级水准。通过精心设计，它们刻意避免了那种千篇一律的 AI 风格。 |
| skill-creator    | 技能创造者，用于创建 AI Agent Skill 的工具。                                           |
| find-skills      | 寻找技能/发掘才能，可以直接在代理会话中，从 skills.sh 网站获取并安装各种技能。         |
| brainstorming    | 头脑风暴/集思广益，将各种想法转化为具体的设计方案                                      |

## 附录：本系列文章导航

> 本文是「AI Agent 学习笔记」系列的一部分，各篇文章从不同维度深入 AI Agent 生态。

| 文章                                                           | 核心内容                                                  |
| -------------------------------------------------------------- | --------------------------------------------------------- |
| [AI Agent 学习资源整理](/learn-ai-agent/blog/ai-agent/)        | AI Agent 定义、MCP/A2A/ANP 协议对比、Prompt 框架          |
| [AI Agent 协议](/learn-ai-agent/blog/ai-agent-mcp/)            | MCP 深度配置、A2A 使用方法、协议对比与选择                |
| [Agent Skills](/learn-ai-agent/blog/agent-skills/)             | Skills 概念、渐进式披露机制、SKILL.md 编写、Skills vs MCP |
| [Claude Code 快速上手](/learn-ai-agent/blog/claude-code/)      | 安装配置、10 大核心技巧、三级配置体系、DeepSeek 接入      |
| [Codex](/learn-ai-agent/blog/codex/)                           | 订阅方案对比、任务六要素、Skills/MCP 配置、全局规则       |
| [AI 模型及选择](/learn-ai-agent/blog/ai-model/)                | OpenRouter、LMArena、Artificial Analysis、API 安全        |
| [Prompt Engineering](/learn-ai-agent/blog/prompt-engineering/) | 提示词三层结构、六大结构化技术、高级推理框架              |
| [多模态 Agent](/learn-ai-agent/blog/multimodal-agent/)         | 图像/语音/视频理解、Python 实战、技术架构                 |
| [规范驱动开发（SDD）](/learn-ai-agent/blog/sdd-dev/)           | SDD 方法论、Vibe Coding、协议栈、AI 编程范式演进          |

---

> **📌 本文将持续更新**，欢迎通过 Issue 或 PR 补充新的 AI 工具和资源。
