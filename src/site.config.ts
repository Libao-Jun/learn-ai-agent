/**
 * 站点公共配置 — 博客标题、描述、作者等信息统一从此处引用。
 * 修改一处，全局生效，避免多处硬编码。
 */
const SITE = {
  /** 博客标题，用于 <title> 后缀、导航栏、RSS 等 */
  title: 'AI 生态学习',

  /** 博客描述，用于首页 meta、RSS 等 */
  description: '个人博客，记录 AI 生态学习与思考。',

  /** Hero 徽章文字 */
  heroBadge: 'AI 生态',

  /** 页脚标语 */
  tagline: '记录学习，分享成长。',

  /** 作者 */
  author: 'Libao-Jun',

  /** 语言 */
  language: 'zh-CN',

  /** 版权 */
  copyright: 'AI 生态笔记',
} as const;

export { SITE };
