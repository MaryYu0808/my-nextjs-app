# use_cases — 使用场景表

> 对应原始数据：`use_cases.v1.0.json`

定义采购领域内的具体业务使用场景，Phase 1 共 **32 个**。

## DDL

```sql
CREATE TABLE `use_case` (
  `id`          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `slug`        VARCHAR(100)  NOT NULL COMMENT 'URL slug，如 spend-analytics',
  `name`        VARCHAR(200)  NOT NULL COMMENT '用例展示名，如 Spend Analytics',
  `description` VARCHAR(500)  DEFAULT NULL COMMENT '用例简述',
  `sort_order`  SMALLINT      NOT NULL DEFAULT 0 COMMENT '展示排序，升序',
  `data`        LONGTEXT      NOT NULL COMMENT 'JSON格式的字符串描述数据',
  `created_at`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_slug` (`slug`),
  KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='采购使用场景（32个）';
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | INT UNSIGNED | ✅ | 自增主键 |
| `slug` | VARCHAR(100) | ✅ | URL友好标识，如 `spend-analytics` |
| `name` | VARCHAR(200) | ✅ | 用例完整名称，如 `Spend Analytics` |
| `description` | VARCHAR(500) | ❌ | 用例描述，展示在用例筛选面板 |
| `sort_order` | SMALLINT | ✅ | 展示排序权重，升序排列 |
| `data` | LONGTEXT | ✅ | 各类其他数据 |

## 当前用例列表（32个）

| slug | name |
|------|------|
| `spend-classification` | Spend Classification |
| `spend-analytics` | Spend Analytics |
| `cost-modeling` | Cost Modeling |
| `demand-forecasting` | Demand Forecasting |
| `market-intelligence` | Market Intelligence |
| `supplier-discovery` | Supplier Discovery |
| `rfx-automation` | RFx Automation |
| `bid-evaluation` | Bid Evaluation |
| `scenario-modeling` | Scenario Modeling |
| `negotiation-support` | Negotiation Support |
| `autonomous-negotiation` | Autonomous Negotiation |
| `clause-extraction` | Clause Extraction |
| `contract-lifecycle-management` | Contract Lifecycle Management |
| `obligation-tracking` | Obligation Tracking |
| `supplier-risk-monitoring` | Supplier Risk Monitoring |
| `esg-compliance` | ESG Compliance |
| `sanctions-screening` | Sanctions Screening |
| `intake-management` | Intake Management |
| `guided-buying` | Guided Buying |
| `workflow-automation` | Workflow Automation |
| `policy-enforcement` | Policy Enforcement |
| `invoice-processing` | Invoice Processing |
| `po-matching` | PO Matching |
| `payment-automation` | Payment Automation |
| `exception-handling` | Exception Handling |
| `agentic-sourcing` | Agentic Sourcing |
| `agentic-procurement` | Agentic Procurement |
| `supplier-onboarding` | Supplier Onboarding |
| `catalog-management` | Catalog Management |
| `tail-spend-management` | Tail Spend Management |
| `dynamic-discounting` | Dynamic Discounting |
| `three-way-matching` | Three-way Matching |

## 关联

- `company_use_cases.use_case_slug` → `use_cases.slug`
- `use_case_content.use_case_slug` → `use_cases.slug`
