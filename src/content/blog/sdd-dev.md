---
title: "规范驱动开发（SDD）"
date: 2026-08-06
description: "规范驱动开发（SDD）是一种软件开发方法，它强调在开发过程中使用规范来指导开发过程。"
tags: ["规范驱动开发", "SDD"]
---

## 本节导读

## 规范驱动开发（SDD）

### 概述

> 规范驱动开发（SDD）的基本概念、核心理念及其与 AI 工具的融合方式。

规范驱动开发（Specification-Driven Development, SDD）是一种以“规范为先”的软件开发方法论。
在 SDD 中，结构化的规范文档被视为整个开发流程的“单一真相源”（single source of truth），它驱动设计、实现、测试与部署。
SDD 把“规格说明”作为驱动开发全过程的核心：清晰的规范（常用自然语言或 Markdown 书写、结构化）作为“可执行的契约”，定义软件要做什么与为何这样做。
AI 与开发者围绕该规范协作，AI 将规范转换为设计、任务、代码与测试，开发者负责编写规范、审阅与监督。

:::note[拓展]

- SDD（Specification-Driven Development，规范驱动开发）：以规范为先，强调在开发过程中使用规范来指导开发过程。
- MDD（Model-Driven Development，模型驱动开发）：以模型为先，强调在开发过程中使用模型来指导开发过程。
- TDD（Test-Driven Development，测试驱动开发）：以测试为先，强调在开发过程中先编写测试，再编写代码。
- BDD（Behavior-Driven Development，行为驱动开发）：以行为为先，强调在开发过程中先编写行为，再编写代码测试。

:::

#### 从氛围编程到 SDD

1️⃣ AI 编程范式演进对比

| 阶段             | 模式         | 核心特征                                           |
| ---------------- | ------------ | -------------------------------------------------- |
| IDE 时代         | 工具辅助开发 | AI 提示或补全，只解决“怎么写”                      |
| AI 编程时代      | 协作式创造   | AI 理解上下文、参与决策与验证                      |
| Vibe Coding 时代 | 流体化共创   | 人与 AI 共处于同一上下文、共享语义空间、共鸣式创作 |

#### 协议栈与系统框架

:::note[AI 编程协议栈三层模型]

- MCP（Model-Context Protocol，模型上下文协议）：定义 AI 与工具的交互方式。
- A2A（Agent-to-Agent Protocol，智能体到智能体协议）：让多个智能体之间能够协作。
- AG-UI（Agent-User Interaction，智能体到用户交互协议）：建立用户与 Agent 的实时可视交互。
  :::

#### 方法论：AI × SDLC

SDD（规范驱动开发）/ Vibe Coding（氛围编程） 的方法论可归纳为五大核心能力

- **结构化任务分解**（Structured Task Decomposition）：AI 任务流建模（如 LangGraph / MCP / CodeFlow）。
- **智能上下文工程**（Context Engineering）：AI 理解你的工作节奏与风格，实现语义共振上下文。
- **标准化交付体系**（Standardized Delivery System）：AI 输出具备一致性与可维护性（模板化、SPEC 流程）。
- **测试驱动的自愈式开发**（Self-Healing TDD）：AI 编程具备自修复、再进化能力。
- **质量驱动的持续优化**（Quality-Driven Optimization）：AI 反馈学习闭环，持续提升上下文与输出质量。

#### 编程模式演进

1️⃣ 从 Prompt 到 Workflow
:::tip[编程模式演进：从 Prompt 到 Workflow]

- 从传统的基于 Prompt 的编程模式，到基于 Workflow 的协作模式。
- 流程中从人到 AI，从人到人，实现人机协作。
  :::

2️⃣ 高准确率的 AI Coding 必须被规则约束，这就是 Spec-Driven AI Coding（规范驱动的 AI 编程）。

- Prompt 有层次、有模板、有约束。
- 上下文通过工具、接口、数据库动态注入。
- 工作流可复用、可编排、可监控。

:::note[规范驱动的 AI 编程，核心逻辑]
**通过规则（Spec）约束模型，通过上下文（Context）喂给模型，通过工作流（Workflow）复用经验**。高准确率并非模型的“聪明”，而是系统的“确定性”。
:::

#### SDD 与 AI 基础设施的融合

SDD 对 AI 基础设施（AI Infra, Artificial Intelligence Infrastructure）提出了一个从“自然语言规范到可运行应用”的自动化通路。

**SDD 典型的自动化开发阶段** 💬

- **规范制定（Specify）**
  > 人类与 AI 合作将高层需求扩展为结构化规范（用例、约束、验收标准等），并反复校对确保无歧义。
- **规划设计（Plan）**：
  > AI 基于规范输出实现方案（架构、组件、接口契约、技术栈），并接受组织约束（例如必须使用的框架）。
- **分解任务（Tasks）**
  > AI 将计划拆成一系列小且可测试的任务，每个任务有明确的完成标准。
- **实现与测试（Implement & Test）**
  > AI 逐项实现并运行与规范对应的验证（单元/集成/性能测试），只有通过验证才继续下一个任务。
- **部署与交付（Deploy）**
  > AI 可生成并执行部署脚本、CI/CD 配置，甚至在受控环境中自动化部署。

:::warning[流程闭环]
这一流程通常以 **规范→计划→任务→实现** 的闭环形式运行（如 GitHub SpecKit 的命令式工作流），并辅以自动化验证（构建、静态分析、测试套件）作为“验证”。
:::

#### 代表性工具与项目

SDD 理念已在多个开源项目和工具中得到实践，下文介绍几种典型代表及其核心思想
- Kiro
> Kiro 是轻量级 VS Code 插件，遵循 Requirements → Design → Tasks 流程。其特点是直观但繁琐，适合一次性任务。
- Spec-kit
> Spec-kit 是 GitHub 出品的 CLI 套件。其核心概念为 Constitution（宪章）——定义架构原则。流程为 Constitution → Specify → Plan → Tasks。该工具仍偏向 spec-first，但为团队协作提供模板化结构。
- Qoder
> Qoder 是一个专为 SDD 场景设计的 AI 编程助手，强调“规范即代码”的理念。它支持以结构化 Markdown 编写规范，自动生成项目结构、代码和测试用例，并通过多轮对话协助开发者完善和演进规范。Qoder 集成了 LLM、代码生成、测试与部署等能力，适合团队协作和复杂工程场景，致力于让 AI 成为规范驱动开发流程中的主动参与者和执行者。


#### SDD 在 Agent 规划与治理

- 明确规范让 Agent 有章可循，降低决策随机性。
- 将规则与上下文以可版本化的文档形式提供，Agent 在执行前可加载并遵循这些规则。
- 在规划 - 执行链路中嵌入人类监督，关键步骤需人工确认，从而避免危险或越权操作。
- 规范充当长期记忆或决策记录，便于跨会话、长期运行的 Agent 获取背景知识。

### Prompts

> 介绍如何通过自定义 Prompts 来辅助软件开发，提高开发效率和代码质量。

### Rules

> 介绍如何通过 Rules 文件（如 Cursor Rules）规范 AI 编程助手的开发行为与项目标准。

### AGENTS.md

> 介绍 AGENTS.md 规范的核心要素、编写方法及其在智能体开发中的作用。

### Agent Skill

> 系统梳理 Anthropic 推出的 Agent Skill 规范及其对 AI 能力封装与分发的影响，帮助开发者理解其工程化价值。

### SpecKit

> 系统化介绍 GitHub SpecKit 如何通过规范驱动软件开发流程，提升协作与自动化水平。

### OpenSpec

> OpenSpec 通过本地化、可审计的规范管理，推动 AI 与人类协作的规范驱动开发（SDD）新范式。

### 方法论与工程演进

> 规范驱动开发（SDD）理念到实践的演进路径，结合 Martin Fowler 分析与 AI 原生工程视角，阐述从 PromptOps 到 AgentOps 的规范中枢机制。

### 一次性应用

> AI 时代的短生命周期软件单元，规范驱动自动生成与验证，任务完成后即销毁。
