---
title: "LangChain"
date: 2026-08-17
description: "LangChain是一个用于开发由大型语言模型 (LLM) 驱动的应用程序开发框架。"
tags: ["LangChain"]
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
        <span class="sg-tag">了解 LangChain 核心定义</span>
        <span class="sg-tag">了解 LangChain 的核心功能模块</span>
        <span class="sg-tag">了解 LangChain 的生态三件套</span>
        <span class="sg-tag">知道 谁在用 LangChain，在做什么</span>
        <span class="sg-tag">了解选择 LangChain 的理由</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">⏱️</div>
        <div class="sg-item-label">预计阅读</div>
      </div>
      <div class="sg-time">
        <span class="sg-time-num">20</span>
        <span class="sg-time-unit">min</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">📦</div>
        <div class="sg-item-label">你将收获</div>
      </div>
      <ul class="sg-list">
        <li>LangChain 是什么</li>
        <li>LangChain 的生态</li>
        <li>LangChain 能做什么</li>
        <li>选择 LangChain 的理由</li>
        <li>如何学习 LangChain</li>
      </ul>
    </div>
  </div>
</div>

## LangChain 的核心定义

LangChain 是由 Harrison Chase 于 2022 年 10 月发布的开源框架， 设计目标只有一个：让开发者能够把大型语言模型（LLM）接入真实的应用场景中。 在 LangChain 出现之前，每接入一个新模型、每换一个向量数据库， 都要重写大量重复代码——LangChain 通过统一的抽象层解决了这个问题。

LangChain 的核心思路是"链"（Chain）：把提示词模板、模型调用、 输出解析、工具使用等步骤串联成可复用的组件。用 LangChain 写一次业务逻辑，就可以自由替换底层的模型或数据库，不存在供应商锁定。

:::warning[连接工具或者mcp]
LangChain 的价值不在于 "更智能的 AI"，而在于让智能体真的能连接到你的数据库、调用你的 API、在合适时机停下来等待人工审核。
:::

## LangChain 四个核心功能模块

### 01 无供应商锁定
LangChain 的模型无关设计
> LangChain 用统一接口封装了 OpenAI、Anthropic Claude、Google Gemini、Meta LLaMA 在内的 1000+ 模型和工具。切换模型只需改一行配置，这是 LangChain 被广泛采用的核心原因之一。

**向量数据库支持**
> LangChain 原生集成 Pinecone、Chroma、PGVector、Weaviate 等向量存储，RAG 流水线开箱即用，无需自行拼接适配代码。

### 02 LCEL 链式编排

LangChain Expression Language
  > LCEL 是 LangChain 提供的声明式管道语法，用管道符把提示词、模型、解析器串联起来，原生支持流式输出、批处理与异步调用，让复杂 RAG 流水线变成几行可读代码。

**检索增强生成（RAG）**
> LangChain 内置完整 RAG 工作流：文档加载 → 分块 → Embedding → 向量检索 → 上下文注入 → 生成，每一步都有成熟组件。

### 03 智能体与工具调用
LangChain 智能体框架
> LangChain 内置 ReAct 推理模式，让智能体能够"思考 → 行动 → 观察"循环执行直到完成目标。通过 LangChain 的 Tool 接口，智能体可以调用任意 Python 函数、外部 API 或数据库查询。

**人机协作（Human-in-the-loop）**
> LangChain 支持在关键决策节点插入人工审核，确保自动化流程在高风险操作前得到人工确认，不是放任 AI 自由发挥。

### 04 记忆与状态持久化

LangChain 状态管理机制
> LangChain 提供会话历史、实体记忆等多种记忆组件。基于 LangGraph 的持久运行时，LangChain 智能体具备检查点、断点续跑和状态回放能力——这对长时间运行的任务至关重要。

**中间件扩展机制**
> LangChain Callback 机制允许在不改动核心逻辑的前提下，注入日志、限流、敏感词过滤等中间件，低侵入接入现有系统。

## LangChain 生态三件套

### 核心框架（LangChain）

:::tip[LangChain]
LangChain 开源框架是整个生态的起点，提供预构建的智能体架构、1000+ 集成，以及基于 LangGraph 的持久运行时，适合需要快速从零搭建应用的团队。

###### LangChain 适合你，如果——

→ 需要快速验证 AI 想法，不想从头写接入代码

→ 要接多种模型做对比，不想被某家厂商绑死

→ 要构建 RAG 知识库，需要完整文档处理流水线

→ 给现有系统加 AI 能力，Callback 机制低侵入集成

:::

### 智能体编排（LangGraph）

:::tip[LangGraph]

LangGraph 是 LangChain 生态内用于构建复杂多智能体系统的框架，采用有向图模型描述状态流转，提供比 LangChain 链式调用更强的流程控制能力。对需要确定性行为的 LangChain 生产智能体，LangGraph 是首选。

###### LangGraph 核心优势

→ 有向图状态机，流程分支与循环可精确控制

→ 内置检查点与故障恢复，支持断点续跑

→ 并发执行，原生支持智能体集群协作

→ 原生兼容 MCP 与 A2A 最新 AI 协议

:::

### 工程化平台（LangSmith）

:::tip[LangSmith]
LangSmith 是与 LangChain 深度集成的智能体工程化平台，解决"LangChain 智能体上线之后怎么调试和持续优化"的问题，一行环境变量配置即可接入 LangChain 项目，无需修改业务代码。

###### LangSmith 能力覆盖

→ 调用链追踪：结构化时间线，每步推理清晰可见

→ 自动化评估：LLM 评审 + 人工标注混合评分

→ 一键部署：内置异步任务、记忆与容错基础设施

→ 合规认证：HIPAA、SOC 2 Type 2、GDPR
:::

## 谁在用 LangChain，在做什么

### 01 企业知识库问答

将内部文档与 LangChain RAG 流水线结合，构建能引用原始来源、拒绝瞎编的知识问答系统。
PDF、数据库、API 均可接入 LangChain 统一处理。

—— LangChain RAG + 向量检索

### 02 多智能体协作流程

LangGraph 让多个 LangChain 智能体分工协作（一个搜索，一个分析，一个写报告）。
复杂研究分析和自动化工作流编排场景的首选方案。

—— LangGraph 多智能体图编排

### 03 智能客服系统

Klarna 通过 LangChain 生态将案例解决时间缩短了 80%。
LangChain 的对话记忆和工具调用让客服智能体能查订单、改信息、触发退款，不只是回答。

—— LangChain 对话智能体 + HITL

### 04 代码审查与开发辅助

基于 LangChain 构建的代码助手可以读懂仓库上下文，提供有依据的审查意见，
自动生成测试用例，深度嵌入 CI/CD 流程而不是停在聊天框层面。

—— LangChain 工具调用链

### 05 业务流程自动化

C.H. Robinson 用 LangChain 生态每天自动处理 5500 个订单，节省 600+ 小时人工作业。
LangGraph 的持久运行时让长时间异步任务变得可靠。

—— LangGraph 持久化工作流

### 06 数据分析与研究助手

LangChain Deep Agents 能自主规划研究步骤、调用搜索 API、读取数据库、汇总生成结构化报告，
适合需要大量信息采集加工的分析师场景。

—— LangChain Deep Agents

## LangChain 有哪些不可替代的理由

### 01 免费开源，无锁定风险

LangChain 采用 MIT 许可证，永久免费。9 万+ GitHub Stars 背后是活跃的全球贡献者社区，持续添加最新模型和工具的集成支持。

**模型切换零成本**：今天用 OpenAI，明天切到 Claude 或本地 LLaMA，LangChain 的统一接口层不需要改业务代码。

### 02 生产环境真实验证

Fortune 10 中有 5 家企业是 LangChain 生态的活跃用户，LinkedIn、Cloudflare、Workday 等在核心业务中运行基于 LangChain 构建的智能体系统。

**企业合规认证**：LangSmith 通过 HIPAA、SOC 2 Type 2、GDPR 认证，满足金融、医疗等行业的数据安全标准。

### 03 从原型到生产的完整链路

LangChain 框架负责构建，LangSmith 负责可观测性、评估和部署。这条链路覆盖了"跑通了"到"稳定运行在生产环境"的全过程。

**多语言 SDK 全面支持**：Python、TypeScript、Go、Java 四种官方 SDK，不同技术栈的团队都能直接接入 LangChain。

### 04 协议前沿，持续演进

LangChain 生态原生支持 MCP（Model Context Protocol）和 A2A（Agent-to-Agent）协议，与 AI 基础设施最新标准保持同步。

**庞大的集成生态**：1000+ 集成意味着几乎任何你想接的模型、数据库、API，LangChain 社区都有现成的包，不用重复造轮子。

## 学习 LangChain 的推荐顺序

| 序号 | 资源名称                                     | 核心特点                                                               |
| :--: | :------------------------------------------- | :--------------------------------------------------------------------- |
|  01  | LangChain Academy                            | 官方免费课程，从零开始用 Python 构建 LangChain 智能体，有代码、有项目  |
|  02  | [中文文档](https://langchaincn.cn/docs.html) | 六大核心模块全覆盖，带完整可运行代码，20 分钟跑通第一个 LangChain 应用 |
|  03  | LangChain 官方博客                           | 每篇文章都是一个真实工程问题，读完能直接用在项目里                     |
|  04  | LangChain GitHub 源码                        | 遇到不理解的行为，直接看源码，LangChain 代码可读性相当高               |
|  05  | 社区论坛与 Slack                             | 卡住了就去问，LangChain 社区响应很快，常见问题都有已解决的帖子         |

## 参考资料
- [LangChain 中文指南](https://langchaincn.cn/)