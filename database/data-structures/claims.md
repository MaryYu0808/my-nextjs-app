# claims — 公司资料认领/更新申请表

> 对应原始数据结构：`claims.v1.0.json` / `claim_company_request.schema.json`

当已收录公司的授权代表通过 `/claim` 页面申请更新公司信息时，创建一条 `claims` 记录。  
审核通过后，由管理员将 `proposed_changes` 应用到 `companies` 表。

## DDL

```sql
CREATE TABLE `claims` (
  `id`                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `claim_id`            VARCHAR(50)     NOT NULL COMMENT '对外暴露的认领ID，如 clm_xxxxxxxx',

  -- 目标公司
  `target_company_slug` VARCHAR(100)    NOT NULL COMMENT '目标公司 slug，关联 companies.slug',

  -- 状态流转
  `status`              ENUM(
                          'submitted',
                          'email_pending',
                          'email_verified',
                          'under_review',
                          'approved',
                          'rejected',
                          'needs_more_info'
                        ) NOT NULL DEFAULT 'email_pending' COMMENT '认领审核状态',

  -- 变更内容
  `proposed_changes`    LONGTEXT        NOT NULL COMMENT 'JSON，提议修改的字段（partial patch），如 {"short_description":"...","founded_year":2019}',
  `what_changed`        VARCHAR(800)    NOT NULL COMMENT '变更说明，10-800字符',
  `sources`             LONGTEXT        NOT NULL COMMENT 'JSON数组，至少1个证据URL',

  -- 提交者信息
  `submitter_name`      VARCHAR(200)    NOT NULL COMMENT '提交者姓名',
  `submitter_email`     VARCHAR(200)    NOT NULL COMMENT '提交者工作邮箱',
  `submitter_job_title` VARCHAR(200)    NOT NULL COMMENT '提交者职位',
  `submitter_linkedin`  VARCHAR(500)    DEFAULT NULL COMMENT '提交者 LinkedIn URL',
  `submitter_role`      ENUM(
                          'Founder / Co-founder',
                          'Executive',
                          'Product lead',
                          'Marketing lead',
                          'Authorized representative'
                        ) NOT NULL COMMENT '提交者在公司的角色',

  -- 声明确认
  `attest_authorized_rep` TINYINT(1)   NOT NULL DEFAULT 0 COMMENT '确认为授权代表（必须为1）',
  `attest_info_accurate`  TINYINT(1)   NOT NULL DEFAULT 0 COMMENT '确认信息准确（必须为1）',

  -- 邮件验证
  `email_token`         VARCHAR(100)    DEFAULT NULL COMMENT '邮件验证 token',
  `email_verified_at`   DATETIME        DEFAULT NULL COMMENT '邮件验证通过时间（UTC）',
  `domain_match_status` ENUM('pass','review_required','unknown')
                                        DEFAULT NULL COMMENT '邮件域名与网站域名匹配状态',

  -- 审核信息
  `reviewed_by`         VARCHAR(200)    DEFAULT NULL COMMENT '审核人标识',
  `reviewed_at`         DATETIME        DEFAULT NULL COMMENT '审核完成时间（UTC）',
  `decision_reason`     TEXT            DEFAULT NULL COMMENT '审核决定说明（可对外展示）',
  `reviewer_notes`      TEXT            DEFAULT NULL COMMENT '内部审核备注',

  -- 防滥用
  `submitter_ip`        VARCHAR(45)     DEFAULT NULL COMMENT '提交者 IP 地址（IPv4/IPv6）',

  `created_at`          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_claim_id`       (`claim_id`),
  KEY `idx_target_slug`          (`target_company_slug`),
  KEY `idx_status`               (`status`),
  KEY `idx_submitter_email`      (`submitter_email`),
  KEY `idx_email_token`          (`email_token`),
  KEY `idx_created_at`           (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='公司资料认领/更新申请表';
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `claim_id` | VARCHAR(50) | ✅ | 对外业务ID，如 `clm_abc12345` |
| `target_company_slug` | VARCHAR(100) | ✅ | 目标公司 slug |

| `status` | ENUM | ✅ | 审核状态，见状态流转 |
| `proposed_changes` | LONGTEXT (JSON) | ✅ | 提议修改的字段 Patch，格式为 `{field: newValue}` |
| `what_changed` | VARCHAR(800) | ✅ | 变更说明文字，10-800 字符 |
| `sources` | LONGTEXT (JSON) | ✅ | 证据URL数组，至少1个，最多20个 |
| `submitter_name` | VARCHAR(200) | ✅ | 提交人姓名 |
| `submitter_email` | VARCHAR(200) | ✅ | 提交人工作邮箱 |
| `submitter_job_title` | VARCHAR(200) | ✅ | 提交人职位 |
| `submitter_linkedin` | VARCHAR(500) | ❌ | 提交人 LinkedIn 主页 |
| `submitter_role` | ENUM | ✅ | 提交人角色（5选1） |
| `attest_authorized_rep` | TINYINT(1) | ✅ | 必须为 `1` |
| `attest_info_accurate` | TINYINT(1) | ✅ | 必须为 `1` |
| `email_token` | VARCHAR(100) | ❌ | 邮件验证 token |
| `email_verified_at` | DATETIME | ❌ | 邮件验证时间 |
| `domain_match_status` | ENUM | ❌ | 邮箱域名与网站域名匹配状态 |
| `reviewed_by` | VARCHAR(200) | ❌ | 审核人 |
| `reviewed_at` | DATETIME | ❌ | 审核时间 |
| `decision_reason` | TEXT | ❌ | 通过/拒绝说明 |
| `reviewer_notes` | TEXT | ❌ | 内部备注，不对外 |
| `submitter_ip` | VARCHAR(45) | ❌ | 提交IP，用于反滥用 |

## 状态流转

```
submitted
  └→ email_pending
       └→ email_verified
            └→ under_review
                 ├→ approved   ──→ 应用 proposed_changes 到 companies 表，更新 data_last_verified_at
                 ├→ rejected
                 └→ needs_more_info → under_review (循环)
```

## `proposed_changes` JSON 示例

```json
{
  "short_description": "Updated description of the company.",
  "founded_year": 2019,
  "headquarters_country": "Germany",
  "use_cases": ["Spend Analytics", "Supplier Discovery", "RFx Automation"]
}
```

## `sources` JSON 示例

```json
["https://example.com/press-release", "https://example.com/about"]
```
