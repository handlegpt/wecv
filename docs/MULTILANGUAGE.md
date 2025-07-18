# WeCV AI 多语言功能文档

## 概述

WeCV AI 平台支持多语言简历创建和管理功能，允许用户创建、编辑和导出多种语言的简历版本。

## 支持的语言

- 🇺🇸 English (en-US) - 默认语言
- 🇨🇳 中文简体 (zh-CN)
- 🇹🇼 中文繁體 (zh-TW)
- 🇯🇵 日本語 (ja-JP)
- 🇪🇸 Español (es-ES)
- 🇫🇷 Français (fr-FR)
- 🇩🇪 Deutsch (de-DE)

## 功能特性

### 1. 多语言界面
- 支持7种语言的用户界面
- 实时语言切换
- 用户语言偏好设置

### 2. 多语言简历编辑
- 支持为每种语言创建独立的简历内容
- 智能AI翻译功能
- 批量翻译所有简历

### 3. 多语言简历模板
- 支持不同语言的简历展示
- 语言特定的格式和样式
- 多语言导出功能

## 技术实现

### 前端实现

#### 1. 国际化配置 (`frontend/lib/i18n.ts`)
```typescript
// 支持7种语言的完整翻译
const enUS = { translation: { /* 英文翻译 */ } }
const zhCN = { translation: { /* 简体中文翻译 */ } }
// ... 其他语言
```

#### 2. 语言选择器组件 (`frontend/components/LanguageSelector.tsx`)
- 支持7种语言的切换
- 显示国旗和本地语言名称
- 实时更新界面语言

#### 3. 多语言简历编辑器 (`frontend/components/MultilanguageResumeEditor.tsx`)
- 支持多语言内容编辑
- AI自动翻译功能
- 语言特定的表单验证

#### 4. 多语言简历模板 (`frontend/components/MultilanguageResumeTemplate.tsx`)
- 响应式简历展示
- 语言特定的样式
- 多格式导出支持

### 后端实现

#### 1. 数据库模型 (`backend/prisma/schema.prisma`)
```prisma
model User {
  preferredLanguage String @default("en-US")
  // ...
}

model Resume {
  language   String   @default("en-US")
  translations Json?  // 存储多语言翻译
  // ...
}

model Language {
  code      String   @unique
  name      String
  nativeName String
  flag      String
  isActive  Boolean  @default(true)
  // ...
}
```

#### 2. 多语言API路由 (`backend/src/routes/multilanguage.ts`)
- `GET /api/multilanguage/languages` - 获取支持的语言列表
- `GET /api/multilanguage/resume/:id/:language` - 获取特定语言的简历
- `PUT /api/multilanguage/resume/:id/translations` - 更新简历翻译
- `POST /api/multilanguage/resume/multilanguage` - 创建多语言简历
- `GET /api/multilanguage/user/language` - 获取用户语言偏好
- `PUT /api/multilanguage/user/language` - 更新用户语言偏好

#### 3. AI翻译功能 (`backend/src/controllers/ai.ts`)
```typescript
export async function translateContent(req: Request, res: Response) {
  // 使用OpenAI API进行专业简历翻译
  // 保持JSON结构，只翻译文本内容
}
```

## 使用指南

### 1. 设置语言偏好
1. 登录到WeCV AI平台
2. 点击右上角的语言选择器
3. 选择您偏好的语言
4. 系统会自动保存您的语言偏好

### 2. 创建多语言简历
1. 进入简历编辑器
2. 选择默认语言（通常是您的母语）
3. 填写简历内容
4. 使用"自动翻译"功能翻译到其他语言
5. 手动调整翻译内容以确保准确性

### 3. 管理多语言简历
1. 在简历设置页面查看所有语言的翻译状态
2. 使用"批量翻译"功能翻译所有简历
3. 为每种语言单独编辑和优化内容

### 4. 导出多语言简历
1. 在简历预览页面选择目标语言
2. 选择导出格式（PDF、DOCX等）
3. 下载对应语言的简历文件

## API 端点

### 语言管理
```http
GET /api/multilanguage/languages
POST /api/multilanguage/init-languages
```

### 用户语言偏好
```http
GET /api/multilanguage/user/language
PUT /api/multilanguage/user/language
```

### 多语言简历
```http
GET /api/multilanguage/resume/:id/:language
PUT /api/multilanguage/resume/:id/translations
POST /api/multilanguage/resume/multilanguage
```

### AI翻译
```http
POST /api/ai/translate
```

## 部署说明

### 1. 数据库迁移
```bash
# 在后端目录执行
npm run db:migrate
```

### 2. 初始化语言数据
```bash
# 调用API初始化支持的语言
curl -X POST http://localhost:3001/api/multilanguage/init-languages
```

### 3. 环境变量
确保在 `.env` 文件中设置：
```env
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

## 最佳实践

### 1. 内容翻译
- 使用AI翻译作为起点，然后手动优化
- 注意文化差异和表达习惯
- 保持专业术语的一致性

### 2. 简历格式
- 不同语言可能需要不同的简历格式
- 注意日期格式的本地化
- 考虑不同国家的简历习惯

### 3. 性能优化
- 使用缓存减少翻译API调用
- 实现增量翻译更新
- 优化多语言内容的存储

## 故障排除

### 常见问题

1. **翻译不准确**
   - 检查AI翻译提示词
   - 手动调整翻译内容
   - 考虑使用专业翻译服务

2. **语言切换不生效**
   - 检查浏览器缓存
   - 确认i18n配置正确
   - 验证语言文件加载

3. **数据库连接问题**
   - 检查数据库连接字符串
   - 确认Prisma模型已生成
   - 验证数据库权限

### 调试技巧

1. 检查浏览器控制台的错误信息
2. 查看后端API日志
3. 验证数据库中的数据完整性
4. 测试单个语言功能

## 未来扩展

### 计划中的功能
- 更多语言支持（韩语、俄语等）
- 语音识别和翻译
- 多语言简历模板
- 国际化SEO优化
- 多语言用户反馈系统

### 技术改进
- 实现更智能的翻译算法
- 优化多语言内容存储
- 添加翻译质量评估
- 实现实时协作翻译

## 贡献指南

欢迎为多语言功能贡献代码！

1. Fork 项目仓库
2. 创建功能分支
3. 添加新的语言支持或改进现有功能
4. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证。 