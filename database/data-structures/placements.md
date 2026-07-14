# placements — 推广投放配置表

> 对应原始数据：`placements.v1.0.json`

用于控制特定公司在列表页、分类页等位置的置顶或推广展示。  
默认为空，按需配置。

## DDL

```sql
CREATE TABLE `placements` (
  `id`              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `placement_id`    VARCHAR(50)     NOT NULL COMMENT '唯一投放标识，如 plc_xxxxxxxx',
  `company_slug`    VARCHAR(100)    NOT NULL COMMENT '关联 companies.slug',

  -- 投放类型
  `placement_type`  ENUM('sponsored','featured','pinned')
                                    NOT NULL DEFAULT 'featured' COMMENT '投放类型',

  -- 展示位置限制（可选）
  `scope`           ENUM('global','category','use_case','homepage')
                                    NOT NULL DEFAULT 'global' COMMENT '生效范围',
  `scope_value`     VARCHAR(100)    DEFAULT NULL COMMENT '范围值，如分类slug或用例slug；global时为NULL',

  -- 有效期
  `starts_at`       DATETIME        DEFAULT NULL COMMENT '投放开始时间（UTC），NULL=立即生效',
  `ends_at`         DATETIME        DEFAULT NULL COMMENT '投放结束时间（UTC），NULL=永久有效',

  -- 展示控制
  `is_active`       TINYINT(1)      NOT NULL DEFAULT 1 COMMENT '是否启用',
  `sort_order`      SMALLINT        NOT NULL DEFAULT 0 COMMENT '同一作用域内的排序权重，升序',

  -- 可选展示信息
  `label`           VARCHAR(50)     DEFAULT NULL COMMENT '展示标签文字，如 "Sponsored"、"Featured"',
  `notes`           VARCHAR(500)    DEFAULT NULL COMMENT '内部备注',

  `created_at`      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_placement_id`  (`placement_id`),
  KEY `idx_company_slug`        (`company_slug`),
  KEY `idx_scope`               (`scope`, `scope_value`),
  KEY `idx_is_active`           (`is_active`),
  KEY `idx_ends_at`             (`ends_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='推广/置顶投放配置表';
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `placement_id` | VARCHAR(50) | ✅ | 唯一业务ID |
| `company_slug` | VARCHAR(100) | ✅ | 关联投放的公司 slug |
| `placement_type` | ENUM | ✅ | `sponsored`（付费推广）/ `featured`（编辑推荐）/ `pinned`（置顶） |
| `scope` | ENUM | ✅ | 生效范围：`global`/ `category`/ `use_case`/ `homepage` |
| `scope_value` | VARCHAR(100) | ❌ | 范围限定值，如 `sourcing-supplier-discovery`；`global` 时为 NULL |
| `starts_at` | DATETIME | ❌ | 投放开始时间，NULL 表示立即生效 |
| `ends_at` | DATETIME | ❌ | 投放结束时间，NULL 表示永久 |
| `is_active` | TINYINT(1) | ✅ | 启用/禁用开关 |
| `sort_order` | SMALLINT | ✅ | 同范围内排序，升序 |
| `label` | VARCHAR(50) | ❌ | 前端展示的标签文字 |
| `notes` | VARCHAR(500) | ❌ | 内部备注，不对外展示 |

## 查询有效投放示例

```sql
SELECT p.*, c.name, c.slug
FROM placements p
JOIN companies c ON c.slug = p.company_slug
WHERE p.is_active = 1
  AND (p.starts_at IS NULL OR p.starts_at <= NOW())
  AND (p.ends_at   IS NULL OR p.ends_at   >  NOW())
  AND p.scope = 'global'
  AND c.deleted_at IS NULL
ORDER BY p.sort_order ASC;
```
