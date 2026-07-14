# capabilities — AI能力标签表

> 对应原始数据：`capabilities.v1.0.json`

定义工具/公司具备的 AI 技术能力标签，用于筛选和分类。

## DDL

```sql
CREATE TABLE `capabilities` (
  `id`          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `slug`        VARCHAR(100)  NOT NULL COMMENT 'URL slug，如 workflow-orchestration',
  `name`        VARCHAR(200)  NOT NULL COMMENT '能力标签展示名，如 Workflow Orchestration',
  `description` VARCHAR(500)  DEFAULT NULL COMMENT '能力标签描述',
  `sort_order`  SMALLINT      NOT NULL DEFAULT 0 COMMENT '展示排序，升序',
  `tool_count`  INT           NOT NULL DEFAULT 0 COMMENT '具备该能力的工具/公司数量（冗余缓存字段）',
  `created_at`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_slug` (`slug`),
  KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='AI能力标签';
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | INT UNSIGNED | ✅ | 自增主键 |
| `slug` | VARCHAR(100) | ✅ | URL友好标识，如 `workflow-orchestration` |
| `name` | VARCHAR(200) | ✅ | 能力标签名称，如 `Workflow Orchestration` |
| `description` | VARCHAR(500) | ❌ | 能力描述 |
| `sort_order` | SMALLINT | ✅ | 展示排序 |
| `tool_count` | INT | ✅ | 冗余统计字段，具备该能力的公司数量 |

## 当前能力标签列表

| slug | name |
|------|------|
| `workflow-orchestration` | Workflow Orchestration |
| `api-first-architecture` | API-first Architecture |
| `conversational-interface` | Conversational Interface |
| `embedded-ai` | Embedded AI |
| `predictive-analytics` | Predictive Analytics |
| `spend-classification-ai` | Spend Classification AI |
| `document-ai` | Document AI |
| `clause-intelligence` | Clause Intelligence |
| `knowledge-graph` | Knowledge Graph |
| `risk-modeling` | Risk Modeling |
| `external-data-enrichment` | External Data Enrichment |
| `autonomous-agent` | Autonomous Agent |
| `anomaly-detection` | Anomaly Detection |

## 关联

- `company_capabilities.capability_slug` → `capabilities.slug`
