---
title: "Prompt Engineering-提示词工程"
date: 2026-07-27
description: "提示词工程是连接人类意图与大模型能力的桥梁，决定了 AI 应用的可控性与创新力。"
tags: ["Prompt Engineering", "Prompt"]
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
        <span class="sg-tag">Prompt 三层结构</span>
        <span class="sg-tag">核心组成要素</span>
        <span class="sg-tag">六大类结构化技术</span>
        <span class="sg-tag">高级推理框架</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">⏱️</div>
        <div class="sg-item-label">预计阅读</div>
      </div>
      <div class="sg-time">
        <span class="sg-time-num">12</span>
        <span class="sg-time-unit">min</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">📦</div>
        <div class="sg-item-label">你将收获</div>
      </div>
      <ul class="sg-list">
        <li>理解提示词工程的三层结构与工作原理</li>
        <li>掌握 Prompt 六大核心组成要素</li>
        <li>学会使用思维链（CoT）、思维树（ToT）等推理技术</li>
        <li>区分系统提示、角色扮演与上下文提示的应用场景</li>
        <li>了解 ReAct、Self-Consistency 等高级提示框架</li>
      </ul>
    </div>
  </div>
</div>

## 概述

提示词工程（Prompt Engineering）是构建 AI 原生应用的起点，也是连接人类意图与大语言模型（LLM）能力的关键接口。
它不仅仅是**写提示词**，而是一套包含 **结构设计、工程流程、思维建模与输出塑形（Answer Engineering）** 在内的完整方法体系。

### 提示词工程的三层结构

> 提示词工程的基础可以拆分为三层，三层构成一个完整的提示词系统，从输入到输出都有明确的工程闭环。
>
> - **Prompt 结构层**
> - **Prompt 工程方法层**
> - **Answer Engineering 答案工程层**

### 什么是提示词（Prompt）

提示词是传递给大语言模型（LLM）的输入规范，用于约束模型行为、限定任务范围、控制输出格式。
一个 Prompt 本质上是 **任务描述 + 行为规约 + 输出约束** 的组合。

优秀的提示词通常具备以下特征

- 指令明确（Directive）
- 上下文充足（Context）
- 示例有效（Exemplars）
- 格式固定（Format）
- 风格一致（Style）
- 无歧义（Disambiguation）

### 提示词的工作原理

提示词在大语言模型中的作用可以分为以下几个阶段

- **Token 化与编码**：Prompt 转换为 Token 序列，作为模型输入。
- **上下文建模**：模型根据已有知识理解意图，建立语境。
- **概率预测**：逐 token 预测最可能输出，生成响应内容。
- **策略约束**：通过 Temperature、Top-p 等采样策略控制生成过程。
- **输出整形（Answer Engineering）**：结构化、解析、验证输出结果。

提示词质量直接影响模型在上下文建模与概率预测阶段的推理行为，因此 Prompt 的结构与顺序设计会显著改变输出质量。

### 提示词的核心组成

| 组成部分        | 作用                                   |
| --------------- | -------------------------------------- |
| Role            | 设定模型的专业角色（审计员、工程师等） |
| Directive       | 告诉模型 “要做什么”                    |
| Additional Info | 背景知识、限制条件                     |
| Exemplars       | Few-shot 示例                          |
| Format          | 输出格式规范（JSON/Markdown/表格）     |
| Style           | 语气、风格（正式、简洁）               |

## 核心技术

> 提示词工程已成为 AI 应用开发的“新软件工程”，结构化与工程化能力决定了模型的极限。

### Prompt 基础层

- Prompt 组成
- 工程流程
- 输出工程

### Prompt 六大类结构化技术

- In-Context Learning（ICL）
- Thought Generation（思维生成）
- Decomposition（问题分解）
- Ensembling（集成）
- Self-Criticism（自校正）
- Other / Hybrid（其它混合）

### Prompt 工程的扩展领域

- Multilingual Techniques — 多语言技术
- Multimodal Techniques — 多模态技术
- Agents — 智能体 / 代理
- Evaluation — 评估
- Security — 安全
- Benchmarking — 基准测试

### 系统提示（System Prompt）

> 系统提示是模型行为的“操作系统”：它定义了角色、边界、语气、规则和输出框架。

| 能力           | 说明                                             |
| -------------- | ------------------------------------------------ |
| 专业角色设定   | 决定知识边界与回答深度（工程师、分析师、医生等） |
| 安全与伦理约束 | 过滤不合规输出                                   |
| 输出格式规范   | JSON、Markdown、代码块等                         |
| 风格统一控制   | 语气、细节程度、专业维度                         |

### 角色扮演（Role Playing）

> 为模型设定“身份/角色”是让模型进入特定知识域的最有效方法。

| 类型     | 示例                           | 适合任务             |
| -------- | ------------------------------ | -------------------- |
| 专业角色 | 架构师、律师、医生、算法工程师 | 深度专业输出         |
| 行业角色 | PM、DevOps、社区运营、分析师   | 产品/策略分析        |
| 风格角色 | 教练、科普作者、诗人           | 内容创作、解释型任务 |

### 上下文提示（Context Prompt）

> 上下文是提示词工程的核心生产力：给模型足够信息，它会极大提升准确率与一致性。

| 层级     | 内容                           |
| -------- | ------------------------------ |
| 任务背景 | Why — 背景、目的               |
| 目标用户 | Who — 用户画像、需求           |
| 环境约束 | 技术栈、输入输出格式、资源限制 |
| 历史信息 | 过去对话、状态、依赖上下文     |

### 思维链推理（CoT）

> 思维链推理（CoT, Chain-of-Thought）是一种强制模型“逐步思考”的技术，可显著提升逻辑推理与复杂任务正确率。
> 适用于复杂逻辑、数学、多步骤任务、分析型问题（如架构设计、性能优化）。

### 自洽性（Self-Consistency）
> 自洽性技术通过多次推理取最稳定答案，大幅提升准确度。

### 思维树（Tree-of-Thought）
> 思维树（ToT, Tree-of-Thought）通过“树状推理”探索多路径解决方案，比 CoT 更适合开放性问题。
> 适用于架构决策、策略选择、权衡类任务。

### ReAct框架（Reason + Act）
> ReAct 框架结合“推理 + 工具执行”，广泛用于智能体（Agent）与工具调用场景。

### 自动化提示词工程（APE）
> 自动化提示词工程（APE, Automated Prompt Engineering）让模型自己优化 Prompt，实现提示词自动调优。
