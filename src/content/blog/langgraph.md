---
title: "LangGraph"
date: 2026-08-17
description: "LangGraph 是一个低级别的编排框架，用于构建、管理和部署长时间运行、有状态的智能体，受到 Klarna、Replit、Elastic 等塑造智能体未来的公司的信任。"
tags: ["LangGraph"]
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
        <span class="sg-tag">了解 LangGraph</span>
        <span class="sg-tag">了解 LangGraph 四大核心组件</span>
        <span class="sg-tag">了解 LangGraph 的安装与环境搭建</span>
        <span class="sg-tag">了解 LangGraph 创建 Agent 步骤</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">⏱️</div>
        <div class="sg-item-label">预计阅读</div>
      </div>
      <div class="sg-time">
        <span class="sg-time-num">5</span>
        <span class="sg-time-unit">min</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">📦</div>
        <div class="sg-item-label">你将收获</div>
      </div>
      <ul class="sg-list">
        <li>LangGraph是什么</li>
        <li>LangGraph 有哪些核心组件</li>
        <li>LangGraph 的安装与环境搭建</li>
        <li>LangGraph 创建 Agent 步骤</li>
      </ul>
    </div>
  </div>
</div>

## LangGraph 介绍

LangGraph 是 LangChain 团队推出的 **Agent 编排框架**。它用"图"（Graph）来定义 Agent 的工作流——每个处理步骤是一个节点，
步骤之间的流转是边，整个 Agent 就是一张有向图。

## LangGraph 四大核心组件

### State（状态）

> State 是在节点之间传递的共享数据。

State 不是某一个节点的局部变量，而是整个图共享的全局状态。任何节点都能读取和修改它。

### Node（节点）

> Node 是一个 Python 函数，接收 State，返回 State 的更新。

计算单元，接收状态并返回更新后的状态，可执行 API 调用、数据处理或 LLM 推理。

### Edge（边）

> Edge 定义节点之间的执行顺序。

定义节点间的执行路径，支持普通边、条件边、条件入口边，实现动态路由和循环。

### Checkpointer（检查点）

> LangGraph 中负责**状态持久化**的核心机制

Checkpointer 在 **每个节点执行后**自动保存完整 State 快照，是持久化、时间旅行、HIL 的基础

## 安装与环境搭建

- 1、**创建虚拟环境**：建议使用虚拟环境，避免依赖冲突
- 2、**安装 LangGraph**：最简单的方式 — 只安装 LangGraph 核心
- 3、**设置 API Key**：若你使用 OpenAI 的模型，需要设置 API Key
- 4、**LangGraph 的包结构**

| 包名                              | 说明                                    |
| :-------------------------------- | :-------------------------------------- |
| **langgraph**                     | 主包，安装它即可，会自动拉取子包        |
| **langgraph-core**                | 核心图引擎（StateGraph、Node、Edge 等） |
| **langgraph-checkpoint**          | 状态持久化的基础抽象                    |
| **langgraph-checkpoint-sqlite**   | SQLite 存储（开发调试用）               |
| **langgraph-checkpoint-postgres** | PostgreSQL 存储（生产推荐）             |

> 日常开发只需要 `pip install langgraph`，不需要单独安装子包。

- 5、**验证安装**

## 创建 Agent 步骤

- 第一步：**定义状态**。这个状态会在节点之间传递。
- 第二步：**定义节点函数**。每个节点函数接收完整的 State，返回 State 的部分更新
- 第三步：**构建图**。先创建 StateGraph 实例，然后用 add_node 添加节点，用 add_edge 添加边。
- 第四步：**编译并运行**。
