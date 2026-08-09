---
title: "Agent Skills"
date: 2026-05-22
description: "Agent 是智能体，Skills 是技能的意思，Agent Skills（智能体技能）是将专业知识、工作流规范固化为可复用资产的核心工具。"
tags: ["Skills", "Claude Code", "AI", "Agent"]
---

# Agent Skills（智能体技能）

## 本节导读

<div class="sg-card">
  <div class="sg-body">
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">🎯</div>
        <div class="sg-item-label">学习目标</div>
      </div>
      <div class="sg-tags">
        <span class="sg-tag">Skills 概念</span>
        <span class="sg-tag">渐进式披露</span>
        <span class="sg-tag">SKILL.md 结构</span>
        <span class="sg-tag">Skills vs MCP</span>
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
        <li>理解 Skills 工作原理</li>
        <li>掌握 SKILL.md 编写</li>
        <li>创建自定义技能</li>
      </ul>
    </div>
  </div>
</div>

1️⃣ 概念

> Agent 是智能体，Skills 是技能的意思，Agent Skills（智能体技能）是将专业知识、工作流规范固化为可复用资产的核心工具。
> Agent Skills 本质上是一个模块化的 Markdown 文件，能教会 AI 工具 （如 Claude、GitHub Copilot、Cursor 等） 执行特定任务，且支持自动触发、团队共享与工程化管理，彻底告别重复的提示词输入。

2️⃣ Agent Skills 的本质

- Agent Skills（代理技能）是可重用的指令集，用于扩展编码代理的功能。
- `Agent Skills = 行为规范 + 专业知识 + 使用时机的组合`

## Agent Skills 的工作原理

Agent Skills 的关键是渐进式披露，分三层加载

- **层级 1：技能发现**
  > AI 先读取所有技能的元数据（name 和 description），判断任务是否相关，这些元数据始终在系统提示中。
- **层级 2：加载核心指令**
  > 如果相关，AI 自动读取 `SKILL.md` 的正文内容，获取详细指导。
- **层级 3：加载资源文件**
  > 只在需要时读取额外文件（如脚本、示例），或通过工具执行脚本。

## Skills 的两种类型

| 特征     | 全局 Skills（个人） | 项目 Skills（团队）       |
| -------- | ------------------- | ------------------------- |
| 存放位置 | `~/.claude/skills/` | `project/.claude/skills/` |
| 作用范围 | 所有项目            | 当前项目                  |
| 适用场景 | 个人通用技能        | 团队共享、项目特定规范    |

## Skills vs 提示词

| 提示词                     | Skills                 |
| -------------------------- | ---------------------- |
| 临时性的，每次都要重复说   | 持久化的，写一次反复用 |
| 存在对话历史中，占用 Token | 按需加载，节省 Token   |
| 无法在会话间共享           | 可以在团队中共享       |
| 难以版本控制               | 可以用 Git 管理        |

## Skills vs MCP

- `MCP` 是给这个工作人员配备的"工具"（扳手、电脑、访问权限）
- `Skills` 是给这个工作人员的"操作手册"（怎么做代码审查、怎么提交代码）

| 维度     | Skills                   | MCP              |
| -------- | ------------------------ | ---------------- |
| 本质     | 知识和流程               | 工具和接口       |
| 提供什么 | 告诉 AI "怎么做"         | 给 AI "能用什么" |
| 存储位置 | `skills/` 目录           | MCP 服务器       |
| 配置方式 | Markdown 文件            | JSON 配置文件    |
| 触发方式 | `/skill-name` 或自动识别 | 通过配置自动加载 |

## Skills 如何工作

当 Claude Code 启动时，它会

- 扫描 `Skills` 目录
- 解析每个 `SKILL.md` 文件
- 提取 `YAML` frontmatter 元数据
- 将技能内容加入"知识库"
- 根据 `description` 自动匹配触发

## 调试 Skill
- 使用 `/skills` 回车，查看技能是否被识别
- 直接输入技能名称手动触发
- 检查 `SKILL.md` 文件内容是否正确
- 查看 Claude Code 日志

## SKILL.md 文件结构

### 基本结构

```md
.claude/skills/custom-skill/
├── SKILL.md # 必需：技能定义文件
├── scripts/ # 可选：辅助脚本
├── templates/ # 可选：输出模板
├── references/ # 可选：参考文档
└── examples/ # 可选：示例文件
```

### SKILL.md 模板

SKILL.md 文件分为两个部分

1️⃣ 第一部分：YAML Frontmatter（元数据）

```md
---
name: skill-name # 技能名称，会变成 /skill-name 命令
description: 简短描述 # 用于 Claude 自动匹配触发
category: development # 分类
tags: # 标签
  - code
  - automation
---
```

2️⃣ 第二部分：Markdown 内容（指令）

```md
# 技能标题

## 使用场景

什么时候用这个技能

## 执行步骤

1. 第一步
2. 第二步

## 注意事项

- 注意点 1
- 注意点 2
```

## Skill 执行流程

- 从用户指令开始，先进行 `Skill` 意图识别，决定是否进入受控执行路径。
- 命中 `Skill` 后，系统加载 `SKILL.md`，建立工具权限与行为边界，再结合上下文进行推理。
- 只有在确实需要时才调用被允许的外部工具，否则在规则内完成逻辑。
- 最终结果经过约束整合后输出，用户的下一次输入触发新一轮完整流程。

<img src="https://www.runoob.com/wp-content/uploads/2026/01/claude-agent-skills-runoob.png" width="100%" alt="Skill 执行流程">

## 创建自己的 Skills

1️⃣ **创建 Skills 有两种方法**

- 一种是直接让 `Claude` 帮你创建
- 另一种使用专门的 `skill-creator` 工具

2️⃣ **直接让 Claude 帮你创建**

- 创建目录结构
- 生成 `SKILL.md` 文件
- 填写 `YAML` frontmatter
- 编写技能内容

3️⃣ **使用 skill-creator**

> skill-creator 是一个专门用来创建 Skills 的工具，会引导你一步步完成。

- 引导你明确技能用途
- 生成 `SKILL.md` 草稿
- 创建测试用例
- 运行评估并优化

## 培养 SKill 

> 技能目录包含一个 `SKILL.md` 文件，该文件带有 `YAML` 前置元数据

### 必填字段

- `name`：唯一标识符（小写，允许使用连字符）
- `description`：简要说明该技能的作用

### 选填字段

> `metadata.internal` ：设置为 `true` 可将技能从常规发现列表中隐藏。
> 内部技能仅在设置 `INSTALL_INTERNAL_SKILLS=1` 时可见且可安装。
> 适用于正在开发中的技能或仅供内部工具使用的技能。

```md
---
name: my-internal-skill
description: An internal skill not shown by default
metadata:
  internal: true
---
```

### Example

```md
---
name: my-skill
description: What this skill does and when to use it
---

# My Skill

Instructions for the agent to follow when this skill is activated.

## When to Use

Describe the scenarios where this skill should be used.

## Steps

1. First, do this
2. Then, do that

```

## 进阶 Skill

### Skills 与 Hooks 配合
> Hooks 可以在特定事件时自动执行操作，结合 Skills 可以实现更强大的自动化。

### Skills 与 Commands 配合
> Commands 是简单的快捷命令，Skills 是复杂的工作流。两者可以配合使用。

### 团队协作
1️⃣ 共享项目 Skills
- 将 Skills 放在 `.claude/skills/` 目录
- 提交到 Git 仓库
- 团队成员克隆项目后即可使用

2️⃣ 版本控制
- Skills 可以像代码一样进行版本控制
- 每个 commit 都可以记录 Skills 的变更
- 可以回滚到旧版本

## Skills 相关资源整理

| 资源说明                          | 链接                                                                                                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 开放代理技能生态系统              | [skills.sh](https://www.skills.sh/)                                                                                   |
| 专为中国用户优化的 AI Skills 社区 | [skillhub.cn](https://skillhub.cn/)                                                                                   |
| 发现并探索由社区构建的 Agent Skills | [skillsmp.com](https://skillsmp.com/zh)                                                                                   |
| Skills 教程                       | [Skills 教程](https://www.runoob.com/ai-agent/skills-agent.html)                                                      |
| skill-creator                     | [skill-creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md)                         |
| 自动生成 Skill 的 Skill           | [自动生成 Skill 的 Skill](https://github.com/anthropics/skills/tree/main/skills/skill-creator)                        |
| 用 skill-creator 创建 Skill       | [用 skill-creator 创建 Skill](https://www.runoob.com/claude-code/skill-creator-usage.html)                            |
| Skills 市场（中文界面）           | [Skills 市场（中文界面）](https://skillsmp.com/zh)                                                                    |
| Agent Skills 官方标准站点         | [Agent Skills 官方标准站点](https://agentskills.io)                                                                   |
| Anthropic 官方工程文章            | [Anthropic 官方工程文章](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) |
| Anthropic 官方 Skills GitHub 仓库 | [Anthropic 官方 Skills GitHub 仓库](https://github.com/anthropics/skills)                                             |
| Claude 技能精选列表               | [Claude 技能精选列表](https://github.com/ComposioHQ/awesome-claude-skills)                                            |
