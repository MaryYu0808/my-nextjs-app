# companies — 公司主表

> 对应原始数据：`companies.v1.0.json` / `companies.v1.0.expanded.json`

## DDL

```sql
CREATE TABLE `companies` (
  `id`                       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`                     VARCHAR(255)    NOT NULL COMMENT '公司展示名称',
  `slug`                     VARCHAR(100)    NOT NULL COMMENT 'URL slug，小写字母+数字+连字符',
  `vendor_name`              VARCHAR(255)    DEFAULT NULL C                                                                                                                        OMMENT '供应商名称（兼容旧字段，与 name 相同时可省略）',
  `website`                  VARCHAR(500)    NOT NULL COMMENT '公司官网 URL',
  `logo_url`                 VARCHAR(500)    DEFAULT NULL COMMENT 'Logo 图片 URL',
  `short_description`        VARCHAR(600)    DEFAULT NULL COMMENT '简短描述，最多600字符',
  `one_liner`                VARCHAR(300)    DEFAULT NULL COMMENT '一句话简介（兼容旧字段）',
  `headquarters_country`     VARCHAR(100)    DEFAULT NULL COMMENT '总部所在国家',
  `founded_year`             SMALLINT        DEFAULT NULL COMMENT '成立年份',
  `primary_workflow_category` VARCHAR(100)   NOT NULL COMMENT '主工作流分类，关联 categories.slug',
  `automation_maturity`      ENUM('Assistive','Semi-automated','Autonomous','Agentic')
                                             NOT NULL COMMENT 'AI自动化成熟度等级',
  `tier`                     ENUM('tier_1','tier_2')
                                             NOT NULL DEFAULT 'tier_1' COMMENT '分层级别，tier_1=采购原生，tier_2=采购相邻',
  `taxonomy_version`         VARCHAR(20)     DEFAULT NULL COMMENT '数据分类版本号，如 v12.10',
  `use_cases`                LONGTEXT        DEFAULT NULL COMMENT 'JSON数组，使用场景列表，1-5个，如 ["Clause Extraction","Spend Analytics"]',
  `capability_tags`          LONGTEXT        DEFAULT NULL COMMENT 'JSON数组，AI能力标签列表，如 ["Workflow Orchestration","Embedded AI"]',
  `key_modules`              LONGTEXT        DEFAULT NULL COMMENT 'JSON数组，核心产品模块名称',
  `sources`                  LONGTEXT        DEFAULT NULL COMMENT 'JSON数组，证据/来源URL列表',
  `original_tool_slugs`      LONGTEXT        DEFAULT NULL COMMENT 'JSON数组，合并前的原始 tool slug 列表（内部字段）',
  `tool_count`               SMALLINT        DEFAULT 1 COMMENT '合并的产品条目数量（内部字段）',
  `data_last_verified_at`    DATETIME        DEFAULT NULL COMMENT '数据最后验证时间（UTC）',
  `created_at`               DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`               DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at`               DATETIME        DEFAULT NULL COMMENT '软删除时间',

  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_slug`        (`slug`),
  KEY `idx_primary_category`  (`primary_workflow_category`),
  KEY `idx_tier`              (`tier`),
  KEY `idx_automation`        (`automation_maturity`),
  KEY `idx_deleted_at`        (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='采购AI工具/公司主表';
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | BIGINT UNSIGNED | ✅ | 自增主键 |
| `name` | VARCHAR(255) | ✅ | 公司名称，用于展示 |
| `slug` | VARCHAR(100) | ✅ | URL 友好标识符，`^[a-z0-9-]+$` |
| `vendor_name` | VARCHAR(255) | ❌ | 旧字段兼容，通常与 `name` 相同 |
| `website` | VARCHAR(500) | ✅ | 公司官网，需符合 URI 格式 |
| `logo_url` | VARCHAR(500) | ❌ | Logo URL，可为空 |
| `short_description` | VARCHAR(600) | ✅ | 核心描述，最多600字符 |
| `one_liner` | VARCHAR(300) | ❌ | 一句话简介，旧字段兼容 |
| `headquarters_country` | VARCHAR(100) | ✅ | 总部国家，如 `USA`、`UK` |
| `founded_year` | SMALLINT | ❌ | 成立年份，范围 1800–2100 |
| `primary_workflow_category` | VARCHAR(100) | ✅ | 关联 `categories.slug`，8选1 |
| `automation_maturity` | ENUM | ✅ | `Assistive` / `Semi-automated` / `Autonomous` / `Agentic` |
| `tier` | ENUM | ✅ | `tier_1`（采购原生）/ `tier_2`（采购相邻） |
| `taxonomy_version` | VARCHAR(20) | ❌ | 数据版本，如 `v12.10` |
| `use_cases` | LONGTEXT (JSON) | ✅ | 1–5个用例名称数组 |
| `capability_tags` | LONGTEXT (JSON) | ❌ | AI能力标签数组 |
| `key_modules` | LONGTEXT (JSON) | ❌ | 核心模块名称数组，最多20个 |
| `sources` | LONGTEXT (JSON) | ❌ | 来源URL数组，最多20个 |
| `original_tool_slugs` | LONGTEXT (JSON) | ❌ | 内部字段，合并前原始 slug 列表 |
| `tool_count` | SMALLINT | ❌ | 内部字段，合并的产品计数 |
| `data_last_verified_at` | DATETIME | ✅ | 数据最后审核验证时间（UTC） |
| `deleted_at` | DATETIME | ❌ | 软删除标记，NULL 表示未删除 |

## 枚举值

### `automation_maturity`
| 值 | 含义 |
|----|------|
| `Assistive` | 辅助型，提供建议和洞察 |
| `Semi-automated` | 半自动，减少手工操作 |
| `Autonomous` | 自主型，端到端自动完成流程 |
| `Agentic` | 智能体型，跨系统自主决策执行 |

### `tier`
| 值 | 含义 |
|----|------|
| `tier_1` | 采购原生，核心价值主张面向采购 |
| `tier_2` | 采购相邻，采购是主要使用场景之一 |

## JSON 字段示例

```json
// use_cases
["Clause Extraction", "Contract Lifecycle Management", "Workflow Automation"]

// capability_tags
["Workflow Orchestration", "Conversational Interface", "Embedded AI"]

// key_modules
["Aavenir Contractflow", "Aavenir Sourcing"]

// sources
["https://aavenir.com", "https://aavenir.com/products"]

// original_tool_slugs
["aavenir-contractflow", "aavenir-sourcing"]
```

## 关联

- `primary_workflow_category` → `categories.slug`
- 用例列表：`use_cases` 字段（LONGTEXT JSON，直接存储）
- 能力标签：`capability_tags` 字段（LONGTEXT JSON，直接存储）
