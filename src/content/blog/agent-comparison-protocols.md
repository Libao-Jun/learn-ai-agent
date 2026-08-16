---
title: "智能体通信协议"
date: 2026-08-15
description: "随着 AI Agent 从单点工具演化为多 Agent 协作系统，如何让不同厂商、不同框架构建的 Agent 互相发现、通信和协调，成为工程上的核心挑战。MCP（Model Context Protocol）用于智能体与工具的标准化通信，A2A（Agent-to-Agent Protocol）用于智能体间的点对点协作，ANP（Agent Network Protocol）用于构建大规模智能体网络。"
tags: ["MCP", "A2A", "ANP", "智能体通信协议"]
---

## 本节导读

<div class="sg-card">
  <div class="sg-body">
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">🎯</div>
        <div class="sg-item-label">学习目标</div>
      </div>
      <div class="sg-tags">
        <span class="sg-tag">三大协议定位</span>
        <span class="sg-tag">MCP 配置与使用</span>
        <span class="sg-tag">A2A 协作机制</span>
        <span class="sg-tag">协议对比与选型</span>
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
        <li>理解 MCP / A2A / ANP 三大协议各自的定位与设计思想</li>
        <li>掌握 MCP 的三大核心能力（Tools / Resources / Prompts）与核心组件</li>
        <li>学会快速配置并使用 MCP 服务器（用户级 / 项目级 / 传输方式）</li>
        <li>掌握 A2A 的三大核心概念与典型应用场景</li>
        <li>学会在 MCP 与 A2A 之间做出选型</li>
      </ul>
    </div>
  </div>
</div>

## 智能体通信协议

:::warning[核心论断]
MCP 解决的是 Agent 调用工具的问题，A2A 解决的是 Agent 与 Agent 之间协作的问题。两者不是竞争关系，而是完整企业 AI 栈的两个层次。
:::

### 协议分类

:::tip[MCP：智能体与工具的桥梁]
MCP（Model Context Protocol）由 Anthropic 团队提出，其核心设计理念是**标准化智能体与外部工具/资源的通信方式**。
:::

:::tip[A2A：智能体间的对话协议]
A2A（Agent-to-Agent Protocol）协议由 Google 团队提出，其核心设计理念是**实现智能体之间的点对点通信**。
:::

:::tip[ANP：智能体网络的基础设施]
ANP（Agent Network Protocol）是一个概念性的协议框架，其核心设计理念是**构建大规模智能体网络的基础设施**。
:::

### MCP — 智能体与工具的桥梁

1️⃣ 概念

> MCP（Model Context Protocol 模型上下文协议）由 Anthropic 团队提出，其核心设计理念是`标准化智能体与外部工具/资源的通信方式`
> (MCP 是一套开放标准协议，它允许 AI 模型安全、可控地访问外部工具和数据源)

2️⃣ MCP 设计思想

```mermaid
  graph LR
    A[智能体（Agent）]
    B[MCP服务器]
    C[文件系统]
    D[数据库]
    E[GitHub API]
    F[其他服务]

    A --> |MCP协议|B
    B --> C
    B --> D
    B --> E
    B --> F
```

3️⃣ MCP 协议提供了四大核心能力，构成完整的工具访问框架

| 能力            | 控制方   | 说明                         | 使用场景                         |
| --------------- | -------- | ---------------------------- | -------------------------------- |
| Tools(工具)     | 模型控制 | 可执行的功能                 | 执行操作/处理数据                |
| Resources(资源) | 应用控制 | 可访问的数据                 | 读取数据/订阅变化                |
| Prompts(提示词) | 用户控制 | 预定义的提示版本             | 标准化任务/最佳实践              |
| Tasks（任务）   | 模型控制 | 支持异步执行长时间运行的操作 | 处理耗时的请求，避免超时或阻塞。 |

4️⃣ 四种能力的区别

- Tools 是主动的（执行操作）。
- Resources 是被动的（提供数据）。
- Prompts 是指导性的（提供模板）。
- Tasks 是异步的（管理长时工作流）。

### A2A — 智能体间的对话

1️⃣ 概念

> A2A（Agent-to-Agent Protocol）协议由 Google 团队提出，其核心设计理念是`实现智能体之间的点对点通信`。
> A2A 关注的是智能体之间如何相互协作。
> A2A 的设计哲学是"对等通信"。在 A2A 网络中，每个智能体既是服务提供者，也是服务消费者。
> 智能体可以主动发起请求，也可以响应其他智能体的请求。这种对等的设计避免了中心化协调器的瓶颈，让智能体网络更加灵活和可扩展。

2️⃣ A2A 设计思想

```mermaid
graph TD
    A[研究员智能体] -->|A2A协议| B[撰写员智能体]
    A -->|A2A协议| C[编辑智能体]
    A -->|A2A协议| D[SEO专家智能体]
    A -->|A2A协议| E[...]

    B --> |A2A协议|A
    C --> |A2A协议|A
    D --> |A2A协议|A
    E --> |A2A协议|A

    B --> |A2A协议|C
    C --> |A2A协议|B

    C --> |A2A协议|D
    D --> |A2A协议|C

    D --> |A2A协议|E
    E --> |A2A协议|D

```

### ANP - 智能体网络的基础设施

1️⃣ 概念

> ANP（Agent Network Protocol）是一个概念性的协议框架，目前由开源社区维护，还没有成熟的生态，其核心设计理念是`构建大规模智能体网络的基础设施`。
> 如果说 MCP 解决的是"如何访问工具"，A2A 解决的是"如何与其他智能体对话"，那么 ANP 解决的是"如何在大规模网络中发现和连接智能体"。
> ANP 的设计哲学是"去中心化服务发现"。在一个包含成百上千个智能体的网络中，如何让智能体能够找到它需要的服务？
> ANP 提供了服务注册、发现和路由机制，让智能体能够动态地发现网络中的其他服务，而不需要预先配置所有的连接关系。

2️⃣ ANP 设计思想

```mermaid
graph LR
    A[NLP智能体]
    B[计算智能体]
    C[服务发现中心]
    D[数据分析智能体]
    E[可视化智能体]

    A -.-> |注册|C
    A -.-> |发现|C
    A --> |使用|B -.-> |注册|C

    D -.-> |注册|C
    D -.-> |发现|C
    D --> |使用|E -.-> |注册|C

    style C fill:#90EE90,stroke:#228B22,stroke-width:3px
```

### 三种协议对比

| 维度         | MCP                           | A2A                    | ANP                        |
| ------------ | ----------------------------- | ---------------------- | -------------------------- |
| **设计目标** | 智能体与工具/资源的标准化通信 | 智能体间的`点对点`通信 | 大规模智能体网络的服务发现 |
| **通信模式** | 客户端/服务器模式（C/S）      | 对等网络（P2P）        | 对等网络（P2P）            |
| **核心理念** | 上下文共享                    | 对等协作               | 去中心化发现               |
| **适用场景** | 访问外部工具和数据源          | 智能体间协作和任务委托 | 大规模智能体生态系统       |
| **扩展性**   | 通过添加MCP服务器扩展         | 通过添加智能体节点扩展 | 支持动态扩展               |
| **实现状态** | 已有成熟实现（FastMCP）       | 官方SDK可用            | 概念性框架                 |

> 如何选择合适的协议？
>
> - 若你的智能体需要访问外部服务（文件、数据库、API）—— 选择 MCP
> - 若你需要多个智能体相互协作完成任务 —— 选择 A2A
> - 若你要构建大规模的智能体生态系统 —— 考虑 ANP

## MCP 协议

### 为什么使用 MCP

> MCP 解决了**AI 如何连接工具**的问题，让 AI 应用可以调用外部工具、读取资源数据、使用预定义提示，就像给 AI 装上了"手"和"眼睛"。

#### 无 MCP 的 Claude Code

```sh
你能做的：
✓ 读取本地文件
✓ 编辑代码
✓ 运行命令
✓ 使用 Bash 工具

你不能做的：
✗ 查看你的 GitHub Issues
✗ 访问云数据库
✗ 调用外部 API
✗ 获取实时天气
```

#### 有 MCP 的 Claude Code

```sh
你能做的：
✓ 所有原来的功能
✓ 查看/创建 GitHub Issues 和 PR
✓ 查询 SQLite、PostgreSQL 数据库
✓ 访问 Notion、Slack 等外部服务
✓ 获取实时天气、地图数据
✓ 浏览器自动化
✓ ...以及更多！
```

### MCP

#### MCP是什么

> MCP（Model Context Protocol 模型上下文协议）是 Anthropic 于 2024 年 11 月推出的**AI 与外部工具连接的统一标准**。
> 它让 AI 应用可以调用外部工具、读取资源数据、使用预定义提示，就像给 AI 装上了"手"和"眼睛"。

#### 如何使用 MCP

| 步骤                    | 说明                                                 |
| ----------------------- | ---------------------------------------------------- |
| **1. 开发 MCP Server**  | 按 MCP 规范实现 Server，提供 tools/resources/prompts |
| **2. 配置 AI 应用连接** | 在 AI 应用中添加 MCP Server 配置（本地或远程）       |
| **3. AI 自动调用**      | AI 根据任务需求，自动发现并调用合适的工具或读取资源  |

#### MCP 三大核心能力

| 能力     | 英文      | 作用              | 示例                                |
| -------- | --------- | ----------------- | ----------------------------------- |
| **工具** | Tools     | AI 可以调用的功能 | 查询天气、发送邮件、调用 API 等工具 |
| **资源** | Resources | AI 可以读取的数据 | 文件内容、数据库记录、配置信息等    |
| **提示** | Prompts   | 预定义的提示词模板  | 代码审查模板、写作模板              |

#### MCP 的核心组件

MCP 的架构主要包括三个部分

- `MCP Host` — 通常是 AI 模型（如 Claude等）或 Agent 的运行环境，负责发起请求。
- `MCP Client` — Host 的代理层，处理与 Server 的通信。
- `MCP Server` — 工具或数据源的提供端，通过标准化接口暴露资源和功能。

#### MCP 的典型应用场景

| 场景             | 说明                    | 示例                     |
| ---------------- | ----------------------- | ------------------------ |
| **本地文件操作** | 让 AI 读取/修改本地文件 | 读取代码库、分析日志文件 |
| **数据库查询**   | 让 AI 直接查询数据库    | SQL 查询、数据分析       |
| **API 调用**     | 让 AI 调用第三方服务    | GitHub API、Slack、邮件  |
| **开发工具集成** | 让 AI 使用开发工具      | Git 操作、终端命令       |

### 快速开始

#### 1. 了解配置文件位置

Claude Code 的 MCP 配置文件位于

| 级别   | 配置文件路径       | 作用范围 |
| ------ | ------------------ | -------- |
| 用户级 | `~/.claude.json`   | 所有项目 |
| 项目级 | `.claude/mcp.json` | 当前项目 |

> 推荐优先使用项目级配置，让不同项目使用不同的 MCP 服务。

#### 2. 用自然语言添加 MCP 服务器

1️⃣ 配置文件位置

```sh
.claude/mcp.json
```

2️⃣ 自然语言创建 MCP 服务器

```md
输入：帮我添加 GitHub MCP 服务器，我的 token 是 ghp_xxx
```

#### 3. 验证配置

1️⃣ 直接询问 Claude Code

```sh
input：现在有哪些可用的 MCP 服务器？

Claude：当前已配置的 MCP 服务器
• github - GitHub 集成
• sqlite - SQLite 数据库
• filesystem - 文件系统访问
```

2️⃣ 使用诊断命令

```sh
/doctor
```

#### 4. 开始使用

> 配置成功后，直接用自然语言调用 MCP 功能

### 配置方式详解

#### 用户级配置（全局）

1️⃣ 配置文件 `~/.claude.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/Documents"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

#### 项目级配置（推荐）

1️⃣ 配置文件 `.claude/mcp.json`

```json
{
  "mcpServers": {
    "project-db": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sqlite",
        "--db-path",
        "./data/app.db"
      ]
    }
  }
}
```

2️⃣ 项目级配置优势

- 团队成员可以共享配置（提交到 Git）
- 不同项目使用不同的 MCP 服务
- 配置更灵活，不会污染全局设置

#### 传输方式配置

- STDIO（本地进程）
- HTTP（远程服务）
- SSE（服务器推送）

### MCP 服务器资源

| 来源                            | 地址                                                                              |
| ------------------------------- | --------------------------------------------------------------------------------- |
| 官方 Server 列表                | [Model Context Protocol Servers](https://github.com/modelcontextprotocol/servers) |
| 官方 MCP 注册                   | [Model Context Protocol Registry](https://modelcontextprotocol.io)                |
| MCP.so（中文）                  | [MCP.so](https://mcp.so)                                                          |
| LobeHub MCP（中文）             | [LobeHub MCP](https://lobehub.com/mcp)                                            |
| Pulse MCP（英文）               | [Pulse MCP](https://pulsemcp.com)                                                 |
| Smithery（英文）                | [Smithery](https://smithery.ai)                                                   |
| Awesome MCP Servers（精选汇总） | [Awesome MCP Servers](https://github.com/awesome-mcp-servers)                     |
| 精选的优秀 MCP 服务器列表       | [awesome-mcp-servers](https://glama.ai/mcp/servers)                               |

## A2A 协议

### 什么是 A2A 协议

A2A（Agent-to-Agent Protocol）是 Google 于 2025 年 4 月推出的**Agent 之间相互协作的通信标准**。
它让不同厂商、不同框架的 Agent 能够相互发现、分配任务、交换信息，就像给 AI 世界装上了"对讲机"。

### 为什么使用 A2A

A2A（Agent-to-Agent Protocol）解决**多个 Agent 如何协作的问题**，让不同厂商、不同框架的 Agent 能够相互发现、分配任务、交换信息。

### 什么时候用 A2A

> **当需要多个 Agent 协作完成复杂任务时** <br>
> 一个 Agent 负责需求分析，一个负责写代码，一个负责测试，各自发挥专长

> **当需要集成不同厂商的 Agent 时** <br>
> Google 的 Agent、Anthropic 的 Agent、OpenAI 的 Agent 需要相互协作等

> **当需要任务委托和进度追踪时** <br>
> 主 Agent 分配任务给专家 Agent，并实时接收进度更新

### 如何使用 A2A

| 步骤               | 说明                                                    |
| ------------------ | ------------------------------------------------------- |
| 1️⃣ 发布 Agent Card | 在 `/.well-known/agent.json` 路径暴露 Agent 的能力描述  |
| 2️⃣ 发现 Agent      | 通过 `agents/get` API 获取其他 Agent 的名片，了解其能力 |
| 3️⃣ 发送任务        | 通过 `tasks/send` API 发送任务，支持 SSE 接收进度更新   |
| 4️⃣ 获取结果        | 任务完成后，通过 `tasks/get` API 获取最终结果           |

### 核心架构

#### A2A 协议分层架构

| 名称                            | 核心内容                                               | 说明                                           |
| ------------------------------- | ------------------------------------------------------ | ---------------------------------------------- |
| Protocol Bindings（协议绑定层） | 传输协议绑定：JSON-RPC over HTTP、gRPC、REST           | 同一操作可通过不同传输协议暴露，客户端按需选择 |
| Operations Layer（操作原语层）  | 七个核心操作：SendMessage、GetTask、SubscribeToTask 等 | 定义了 Agent 间所有可能的交互模式              |
| Data Model Layer（数据模型层）  | 五个核心概念：Task、Message、Part、AgentCard、Artifact | 构成协议的语义基础                             |

#### A2A 五大核心概念

| 概念          | 说明                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **AgentCard** | Agent 的自描述 JSON 清单，声明名称、能力、技能列表和认证方式。客户端可通过标准 URI 自动发现。                                         |
| **Task**      | 工作单元，具有完整生命周期：`working→completed/failed/canceled/rejected/input-required`。每个 Task 有全局唯一 ID，支持跨 Agent 追踪。 |
| **Message**   | 通信单元，角色为 `"user"`/`"agent"`，包含一个或多个 Part。是 Agent 间对话的载体。                                                     |
| **Part**      | 原子内容单元，可以是文本、文件引用（URI + MIME 类型）或结构化数据（JSON object）。多个 Part 组成一条 Message。                        |
| **Artifact**  | Agent 产出的输出物，由 Part 组成，支持版本控制和增量更新。流式场景下可逐步追加内容。                                                  |

#### A2A 七个操作原语

| 操作                     | 说明                                    | 适用场景                |
| ------------------------ | --------------------------------------- | ----------------------- |
| **SendMessage**          | 发起任务或在已有 Task 下追加消息        | 同步短任务              |
| **SendStreamingMessage** | 发起任务并实时接收流式响应（SSE）       | 长文本生成、进度汇报    |
| **GetTask**              | 轮询指定 Task 的当前状态和输出          | 异步任务状态查询        |
| **ListTasks**            | 分页查询当前 Agent 的 Task 列表         | 任务管理后台            |
| **CancelTask**           | 幂等取消任务，返回最终状态              | 超时处理、用户撤销      |
| **SubscribeToTask**      | 持久流订阅任务更新（gRPC 双向流）       | 长时间运行的 Agent 任务 |
| **Push Notifications**   | Agent 主动向调用方 Webhook 推送状态变更 | 跨服务器异步通知        |

### 五大设计原则

- **拥抱 Agent 能力**：Agent 以自然、非结构化方式协作，不强制要求共享内存或工具调用接口格式。
- **基于现有标准**：传输层采用 HTTP、SSE、JSON-RPC、gRPC，与现有基础设施兼容，无需引入新的网络栈。
- **默认安全**：原生支持 OAuth2、mTLS、API Key 等企业级认证授权机制，不依赖网络隔离作为唯一安全手段。
- **支持长任务**：任务生命周期从秒级到数天均可管理，原生支持人工介入（input-required 状态）。
- **模态无关**：Part 原子内容单元支持文本、文件引用和结构化数据，扩展后可承载音频和视频流。

### A2A 的典型应用场景

| 场景       | 说明                        | 示例                               |
| ---------- | --------------------------- | ---------------------------------- |
| 软件开发   | 多 Agent 协作完成开发任务   | 需求分析→代码→测试→部署            |
| 企业工作流 | 不同部门 Agent 协作处理业务 | HR Agent + 财务 Agent + 法务 Agent |
| 智能客服   | 多个专业 Agent 分工处理     | 接待→解答→转接→记录                |
| 数据分析   | 多个 Agent 协作分析数据     | 收集→清洗→分析→可视化→报告         |

## MCP vs A2A

:::warning[一句话关系]
完整的企业 Agent 栈 = MCP（工具/数据接入层）+ A2A（Agent 协作层）。两者解决不同层次的问题，不存在"选哪个"的问题。
:::

### MCP与A2A 解决什么问题

:::danger[解决的问题]

- **MCP**：解决的是 `Agent 如何调用外部工具和数据源` 的问题 — 数据库查询、文件读写、API 调用。
- **A2A**： 解决的是 `Agent 如何与其他 Agent 协作` 的问题 — 发现彼此、委托任务、同步结果。
  :::

### MCP 与 A2A 协议对比

| 维度         | MCP                      | A2A                                            |
| :----------- | :----------------------- | :--------------------------------------------- |
| **定位**     | Agent → 工具/数据        | Agent → Agent                                  |
| **提出者**   | Anthropic                | Google                                         |
| **协议**     | JSON-RPC over stdio/SSE  | JSON-RPC / gRPC / HTTP REST                    |
| **发现机制** | 手动配置 MCP Server 列表 | `AgentCard 自动发现（/.well-known/）`          |
| **任务模型** | 无（工具调用即完成）     | `完整生命周期（working → completed / failed）` |
| **长任务**   | ❌不原生支持             | `原生支持（小时/天级）`                        |
| **流式**     | SSE                      | SSE + gRPC streaming                           |
| **推送通知** | ❌无                     | `Webhook push notification`                    |
| **认证**     | 简单（stdio 本地信任）   | `企业级（OAuth2 / mTLS / API Key）`            |
| **多模态**   | 主要文本                 | 文本 / 文件 / 结构化数据（可扩展音视频）       |
| **生态规模** | 数千个 MCP Server        | 150+ 组织支持                                  |
| **治理**     | Linux Foundation - AAIF  | Linux Foundation - AAIF                        |

### MCP与A2A 协议选择

:::tip[什么时候用 MCP]

- **AI 模型需要外部工具** — 数据库访问、文件操作、API 调用
- **单 Agent 工作流** — 一个模型编排多个工具
- **本地/离线部署** — MCP 的 stdio 传输无需网络
- **细粒度资源访问** — 精确控制模型能看到什么数据
- **工具市场** — 构建可复用的集成，任何客户端都能使用

**场景举例**：一个编码助手通过 MCP 读取文件、搜索代码库、运行测试、部署代码。
:::

:::tip[什么时候用 A2A]
- **多个 Agent 需要协作** — 跨厂商、跨组织的工作流
- **长时间运行的任务** — 需要分钟/小时级别的进度跟踪
- **人机协作** — 需要正式审批流程（input-required 状态）
- **Agent 发现** — 发布你的 Agent 能力供其他人发现
- **企业编排** — 协调来自不同厂商的专业 Agent

**场景举例**：采购流程中，研究 Agent 寻找产品，合规 Agent 检查政策，采购 Agent 下单，财务 Agent 审批预算。
:::

## 资料文献

- [AI Agent 教程](https://www.runoob.com/ai-agent/ai-agent-intro.html)
- [《从零开始构建智能体》](https://github.com/datawhalechina/hello-agents)
- [AI Agent全栈课程](https://github.com/Callous-0923/agent-study)
- [DevTk.AI](https://devtk.ai/zh/)