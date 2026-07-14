# 数据结构总览

本目录包含 ProcurementAI 后端 MySQL 数据库的所有数据结构定义。

## 实体列表

| 文件 | 表名 | 说明 |
|------|------|------|
| [companies.md](./companies.md) | `companies` | 供应商/工具公司主表 |
| [categories.md](./categories.md) | `categories` | 采购工作流分类（8个主分类） |
| [use_cases.md](./use_cases.md) | `use_cases` | 采购使用场景（32个） |
| [capabilities.md](./capabilities.md) | `capabilities` | AI能力标签（参考枚举，暂无关联表） |
| [placements.md](./placements.md) | `placements` | 推广/置顶投放配置 |
| [submissions.md](./submissions.md) | `submissions` | 新公司提交申请 |
| [claims.md](./claims.md) | `claims` | 公司资料认领/更新申请 |
| [category_content.md](./category_content.md) | `category_content` | 分类页面 SEO/GEO 内容 |
| [use_case_content.md](./use_case_content.md) | `use_case_content` | 用例页面 SEO/GEO 内容 |

## 关系图

```
categories (1) ──────────────── (N) companies  [primary_workflow_category]

companies.use_cases       = LONGTEXT JSON  (直接存储用例名称列表)
companies.capability_tags = LONGTEXT JSON  (直接存储能力标签列表)

submissions ──── (审核通过后写入) ──── companies
claims      ──── (审核通过后更新) ──── companies

placements ──── (外键 slug) ──── companies

category_content ──── (外键 category_slug) ──── categories
use_case_content ──── (外键 use_case_slug)  ──── use_cases
```

## 设计原则

1. **`LONGTEXT` 存储灵活 JSON 字段**：数组类字段（如 `sources`、`key_modules`、`proposed_changes`）使用 `LONGTEXT` 存储 JSON，保持灵活扩展。
2. **字段命名规范**：原型中带 `tool_*` 前缀的字段在后端统一规范为语义化命名（如 `tool_name` → `name`，`tool_slug` → `slug`）。
3. **软删除**：主要业务表使用 `deleted_at` 字段实现软删除。
4. **枚举值**：固定选项使用 `ENUM` 类型，避免脏数据。
5. **时间字段**：统一使用 `DATETIME` 并存储 UTC 时间。
