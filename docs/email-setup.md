# 邮件配置指南

## 概述

WeCV AI 支持邮件验证登录功能，用户可以通过邮件链接直接登录，无需记住密码。

## 邮件服务配置

### 1. Gmail 配置（推荐）

1. **启用两步验证**
   - 登录 Google 账户
   - 进入"安全性"设置
   - 启用"两步验证"

2. **生成应用密码**
   - 在"安全性"设置中找到"应用专用密码"
   - 选择"邮件"应用
   - 生成16位应用密码

3. **配置环境变量**
   ```bash
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-16-digit-app-password
   FRONTEND_URL=https://your-domain.com
   ```

### 2. 其他邮件服务商

#### Outlook/Hotmail
```bash
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-app-password
```

#### QQ邮箱
```bash
EMAIL_USER=your-email@qq.com
EMAIL_PASS=your-authorization-code
```

#### 163邮箱
```bash
EMAIL_USER=your-email@163.com
EMAIL_PASS=your-authorization-code
```

## 环境变量说明

### 必需配置

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `EMAIL_USER` | 邮件发送账户 | your-email@gmail.com |
| `EMAIL_PASS` | 邮件应用密码 | your-app-password |
| `FRONTEND_URL` | 前端网站URL | https://wecv.ai |

### 可选配置

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `EMAIL_SERVICE` | 邮件服务商 | gmail |
| `EMAIL_FROM` | 发件人显示名称 | WeCV AI |

## 测试邮件功能

1. **启动服务**
   ```bash
   docker-compose up -d
   ```

2. **测试邮件发送**
   ```bash
   curl -X POST http://localhost:3001/api/auth/email-login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

3. **检查邮件**
   - 查看目标邮箱是否收到登录链接
   - 点击链接测试登录功能

## 故障排除

### 常见问题

1. **邮件发送失败**
   - 检查邮箱和密码是否正确
   - 确认已启用应用专用密码
   - 检查网络连接

2. **邮件被标记为垃圾邮件**
   - 将发件人邮箱添加到白名单
   - 检查邮件内容是否包含敏感词汇

3. **登录链接无效**
   - 检查 `FRONTEND_URL` 配置是否正确
   - 确认前端服务正在运行

### 安全建议

1. **使用应用专用密码**
   - 不要使用邮箱登录密码
   - 定期更换应用密码

2. **限制邮件发送频率**
   - 避免短时间内大量发送邮件
   - 实现邮件发送频率限制

3. **监控邮件发送状态**
   - 记录邮件发送日志
   - 监控邮件发送成功率

## 生产环境配置

### 使用专业邮件服务

推荐使用以下专业邮件服务：

1. **SendGrid**
   ```bash
   EMAIL_SERVICE=sendgrid
   EMAIL_USER=apikey
   EMAIL_PASS=your-sendgrid-api-key
   ```

2. **Mailgun**
   ```bash
   EMAIL_SERVICE=mailgun
   EMAIL_USER=your-mailgun-domain
   EMAIL_PASS=your-mailgun-api-key
   ```

3. **AWS SES**
   ```bash
   EMAIL_SERVICE=ses
   EMAIL_USER=your-aws-access-key
   EMAIL_PASS=your-aws-secret-key
   ```

### 配置示例

```bash
# 开发环境
EMAIL_USER=your-dev-email@gmail.com
EMAIL_PASS=your-dev-app-password
FRONTEND_URL=http://localhost:3000

# 生产环境
EMAIL_USER=your-prod-email@gmail.com
EMAIL_PASS=your-prod-app-password
FRONTEND_URL=https://wecv.ai
```

## 邮件模板

系统使用HTML邮件模板，支持以下功能：

- 响应式设计
- 品牌化样式
- 安全链接
- 多语言支持

邮件模板位置：`backend/src/controllers/auth.ts` 