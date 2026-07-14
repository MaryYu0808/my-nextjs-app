# submissions — 新公司提交申请表

> 对应原始数据结构：`submit_company_request.schema.json`

当外部用户通过 `/submit-company` 页面提交新公司入驻申请时，创建一条 `submissions` 记录。  
审核通过后，由管理员将其写入 `companies` 表。

## DDL

```sql
CREATE TABLE `submissions` (
  `id`                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `submission_id`       VARCHAR(50)     NOT NULL COMMENT '对外暴露的提交ID，如 sub_xxxxxxxx',

  -- 状态流转
  `status`              ENUM(
                          'draft',
                          'submitted',
                          'email_pending',
                          'email_verified',
                          'under_review',
                          'approved',
                          'rejected',
                          'needs_more_info'
                        ) NOT NULL DEFAULT 'email_pending' COMMENT '申请审核状态',

  -- 申请的公司信息（最终写入 companies 表的内容）
  `company_name`        VARCHAR(255)    NOT NULL COMMENT '申请公司名称',
  `company_website`     VARCHAR(500)    NOT NULL COMMENT '申请公司官网',
  `company_hq_country`  VARCHAR(100)    NOT NULL COMMENT '总部国家',
  `company_founded_year` SMALLINT       DEFAULT NULL COMMENT '成立年份',
  `primary_workflow_category` VARCHAR(100) NOT NULL COMMENT '主工作流分类',
  `automation_maturity` ENUM('Assistive','Semi-automated','Autonomous','Agentic')
                                        NOT NULL COMMENT 'AI自动化成熟度等级',
  `short_description`   VARCHAR(600)    NOT NULL COMMENT '公司简述',
  `company_data`        LONGTEXT        NOT NULL COMMENT 'JSON，完整的公司申请数据（含 use_cases、key_modules、sources 等）',

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
  `decision_reason`     TEXT            DEFAULT NULL COMMENT '审核决定说明',
  `reviewer_notes`      TEXT            DEFAULT NULL COMMENT '审核内部备注',

  -- 审核通过后写入的公司ID
  `resulting_company_id` VARCHAR(100)   DEFAULT NULL COMMENT '审核通过后创建的 companies.company_id',

  -- 防滥用
  `submitter_ip`        VARCHAR(45)     DEFAULT NULL COMMENT '提交者 IP 地址（IPv4/IPv6）',

  `created_at`          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_submission_id`  (`submission_id`),
  KEY `idx_status`               (`status`),
  KEY `idx_submitter_email`      (`submitter_email`),
  KEY `idx_email_token`          (`email_token`),
  KEY `idx_created_at`           (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='新公司提交申请表';
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `submission_id` | VARCHAR(50) | ✅ | 对外暴露的业务ID，如 `sub_abc12345` |
| `status` | ENUM | ✅ | 审核状态，见状态流转 |
| `company_name` | VARCHAR(255) | ✅ | 申请的公司名称 |
| `company_website` | VARCHAR(500) | ✅ | 申请的公司官网 |
| `company_hq_country` | VARCHAR(100) | ✅ | 总部国家 |
| `company_founded_year` | SMALLINT | ❌ | 成立年份 |
| `primary_workflow_category` | VARCHAR(100) | ✅ | 8选1的工作流分类 |
| `automation_maturity` | ENUM | ✅ | AI 自动化成熟度 |
| `short_description` | VARCHAR(600) | ✅ | 公司描述 |
| `company_data` | LONGTEXT (JSON) | ✅ | 完整申请数据，含 `use_cases`、`key_modules`、`sources` |
| `submitter_name` | VARCHAR(200) | ✅ | 提交人姓名 |
| `submitter_email` | VARCHAR(200) | ✅ | 提交人工作邮箱 |
| `submitter_job_title` | VARCHAR(200) | ✅ | 提交人职位 |
| `submitter_linkedin` | VARCHAR(500) | ❌ | 提交人 LinkedIn 主页 |
| `submitter_role` | ENUM | ✅ | 提交人在公司角色 |
| `attest_authorized_rep` | TINYINT(1) | ✅ | 授权代表确认，必须为 `1` |
| `attest_info_accurate` | TINYINT(1) | ✅ | 信息准确确认，必须为 `1` |
| `email_token` | VARCHAR(100) | ❌ | 邮件验证 token，验证后可置空 |
| `email_verified_at` | DATETIME | ❌ | 邮件验证完成时间 |
| `domain_match_status` | ENUM | ❌ | `pass` / `review_required` / `unknown` |
| `reviewed_by` | VARCHAR(200) | ❌ | 审核人 |
| `reviewed_at` | DATETIME | ❌ | 审核时间 |
| `decision_reason` | TEXT | ❌ | 通过/拒绝原因（可对外展示） |
| `reviewer_notes` | TEXT | ❌ | 内部审核备注（不对外） |
| `resulting_company_id` | VARCHAR(100) | ❌ | 审核通过后创建的公司ID |
| `submitter_ip` | VARCHAR(45) | ❌ | 提交者 IP，用于反滥用 |

## 状态流转

```
draft (可选)
  └→ submitted
       └→ email_pending
            └→ email_verified
                 └→ under_review
                      ├→ approved   ──→ 创建 companies 记录
                      ├→ rejected
                      └→ needs_more_info → under_review (循环)
```

## `company_data` JSON 结构示例

```json
{
  "use_cases": ["Spend Analytics", "Workflow Automation"],
  "key_modules": ["AnalyticsCore", "WorkflowEngine"],
  "sources": ["https://example.com/about", "https://example.com/product"]
}
```
