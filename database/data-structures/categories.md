# categories — 工作流分类表

> 对应原始数据：`categories.v1.0.json`

采购工作流的顶层分类，Phase 1 共 **8 个**固定分类。

## DDL

```sql
CREATE TABLE `categories` (
  `id`          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `slug`        VARCHAR(100)  NOT NULL COMMENT 'URL slug，如 strategy-spend-intelligence',
  `name`        VARCHAR(200)  NOT NULL COMMENT '分类展示名，如 Strategy & Spend Intelligence',
  `description` VARCHAR(500)  DEFAULT NULL COMMENT '分类简述',
  `sort_order`  SMALLINT      NOT NULL DEFAULT 0 COMMENT '展示排序，升序',
  `tool_count`  INT           NOT NULL DEFAULT 0 COMMENT '该分类下的工具/公司数量（冗余缓存字段）',
  `created_at`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_slug` (`slug`),
  KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='采购工作流主分类（8个固定分类）';
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | INT UNSIGNED | ✅ | 自增主键 |
| `slug` | VARCHAR(100) | ✅ | URL友好标识，如 `strategy-spend-intelligence` |
| `name` | VARCHAR(200) | ✅ | 完整分类名称，如 `Strategy & Spend Intelligence` |
| `description` | VARCHAR(500) | ❌ | 分类描述文字，展示在分类页面顶部 |
| `sort_order` | SMALLINT | ✅ | 展示排序权重，升序排列 |
| `tool_count` | INT | ✅ | 冗余统计字段，该分类公司数量 |

## 初始数据（8个分类）

| sort_order | slug | name |
|-----------|------|------|
| 1 | `strategy-spend-intelligence` | Strategy & Spend Intelligence |
| 2 | `sourcing-supplier-discovery` | Sourcing & Supplier Discovery |
| 3 | `negotiation-decision-intelligence` | Negotiation & Decision Intelligence |
| 4 | `contract-commercial-intelligence` | Contract & Commercial Intelligence |
| 5 | `supplier-risk-esg-intelligence` | Supplier Risk & ESG Intelligence |
| 6 | `intake-orchestration` | Intake & Orchestration |
| 7 | `procure-to-pay-automation` | Procure-to-Pay Automation |
| 8 | `autonomous-procurement-systems` | Autonomous Procurement Systems |

## 分类描述（来自前端常量）

| 分类 | 描述 |
|------|------|
| Strategy & Spend Intelligence | Spend visibility, classification, and cost optimization insights. |
| Sourcing & Supplier Discovery | Supplier discovery, market intelligence, and sourcing workflow support. |
| Negotiation & Decision Intelligence | Bid analysis, negotiation support, and guided decision-making. |
| Contract & Commercial Intelligence | AI-powered contract review, clause extraction, and compliance checks. |
| Supplier Risk & ESG Intelligence | Continuous monitoring of supplier risk signals, ESG, and disruptions. |
| Intake & Orchestration | Automate procurement requests, triage, and workflow orchestration. |
| Procure-to-Pay Automation | Invoice capture, coding, approvals, and exception handling automation. |
| Autonomous Procurement Systems | Agentic and autonomous procurement execution across workflows. |

## 关联

- `companies.primary_workflow_category` → `categories.slug`
- `category_content.category_slug` → `categories.slug`
