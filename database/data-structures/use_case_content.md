# use_case_content — 用例页面 SEO/GEO 内容表

> 对应原始数据：`use_case_content.v1.0.json`

为用例页面（如 `/use-case/spend-analytics`）提供可选的富文本 SEO/GEO 内容。  
默认为空，按需逐条添加。

## DDL

```sql
CREATE TABLE `use_case_content` (
  `id`              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `use_case_slug`   VARCHAR(100)    NOT NULL COMMENT '关联 use_cases.slug',

  -- SEO 基础字段
  `page_title`      VARCHAR(200)    DEFAULT NULL COMMENT 'HTML <title> 标签内容',
  `meta_description` VARCHAR(300)   DEFAULT NULL COMMENT 'HTML <meta name="description"> 内容',

  -- 页面主体内容
  `heading`         VARCHAR(200)    DEFAULT NULL COMMENT '页面 H1 标题',
  `intro_text`      TEXT            DEFAULT NULL COMMENT '用例介绍段落（纯文本或 Markdown）',
  `body_content`    LONGTEXT        DEFAULT NULL COMMENT '富文本正文内容（Markdown/HTML），用于 GEO 提升',

  -- 结构化信息
  `faq`             LONGTEXT        DEFAULT NULL COMMENT 'JSON数组，常见问题列表，格式：[{"question":"...","answer":"..."}]',
  `related_category_slugs` LONGTEXT DEFAULT NULL COMMENT 'JSON数组，关联推荐的分类 slug 列表',
  `related_use_case_slugs` LONGTEXT DEFAULT NULL COMMENT 'JSON数组，关联推荐的其他用例 slug 列表',

  -- 版本控制
  `schema_version`  VARCHAR(20)     NOT NULL DEFAULT 'v1.0',
  `is_published`    TINYINT(1)      NOT NULL DEFAULT 0 COMMENT '是否对外发布',

  `created_at`      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_use_case_slug` (`use_case_slug`),

  CONSTRAINT `fk_uc_content_use_case`
    FOREIGN KEY (`use_case_slug`) REFERENCES `use_cases` (`slug`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='用例页面SEO/GEO内容';
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `use_case_slug` | VARCHAR(100) | ✅ | 关联用例，唯一（每个用例最多一条内容记录） |
| `page_title` | VARCHAR(200) | ❌ | SEO 页面标题，建议 50-60 字符 |
| `meta_description` | VARCHAR(300) | ❌ | SEO 描述，建议 120-160 字符 |
| `heading` | VARCHAR(200) | ❌ | 页面主标题（H1） |
| `intro_text` | TEXT | ❌ | 用例介绍段落 |
| `body_content` | LONGTEXT | ❌ | 详细正文，支持 Markdown/HTML |
| `faq` | LONGTEXT (JSON) | ❌ | FAQ 问答列表 |
| `related_category_slugs` | LONGTEXT (JSON) | ❌ | 推荐关联的分类 slug |
| `related_use_case_slugs` | LONGTEXT (JSON) | ❌ | 推荐关联的其他用例 slug |
| `is_published` | TINYINT(1) | ✅ | `1`=已发布，`0`=草稿 |

## `faq` JSON 示例

```json
[
  {
    "question": "What is Spend Analytics in procurement?",
    "answer": "Spend analytics involves collecting, categorizing, and analyzing procurement spend data..."
  }
]
```
