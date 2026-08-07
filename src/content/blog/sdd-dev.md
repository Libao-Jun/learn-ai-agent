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
