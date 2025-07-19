# 谷歌OAuth配置检查

## 错误说明

如果您看到以下错误：
```
Google にログイン
アクセスをブロック: 認証エラーです
The OAuth client was not found.
このアプリのデベロッパーの場合は、エラーの詳細をご確認ください。
エラー 401: invalid_client
```

这表示谷歌OAuth客户端配置有问题。

## 解决步骤

### 1. 检查环境变量

确保在 `.env` 文件中正确配置了谷歌OAuth环境变量：

```bash
# 谷歌OAuth配置
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google-login
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-actual-google-client-id
```

**重要**：不要使用示例值 `your-google-client-id`，必须使用真实的谷歌客户端ID。

### 2. 获取谷歌OAuth凭据

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 选择或创建项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 凭据：
   - 应用类型：Web应用
   - 授权重定向URI：`http://localhost:3000/auth/google-login`
5. 复制客户端ID和客户端密钥

### 3. 配置环境变量

在 `.env` 文件中设置：

```bash
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-actual-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

### 4. 重启服务

```bash
docker-compose down
docker-compose up -d
```

### 5. 检查浏览器控制台

打开浏览器开发者工具，查看控制台输出：

```javascript
Google OAuth configuration: {
  clientId: "your-client-id",
  redirectUri: "http://localhost:3000/auth/google-login",
  scope: "email profile",
  origin: "http://localhost:3000"
}
```

如果看到 `clientId: "your-google-client-id"` 或 `undefined`，说明环境变量没有正确设置。

## 常见问题

### 问题1：客户端ID未配置
**症状**：控制台显示 `clientId: "your-google-client-id"`
**解决**：确保设置了正确的 `NEXT_PUBLIC_GOOGLE_CLIENT_ID` 环境变量

### 问题2：重定向URI不匹配
**症状**：谷歌返回重定向URI错误
**解决**：确保谷歌控制台中的重定向URI与代码中的一致

### 问题3：API未启用
**症状**：客户端ID无效错误
**解决**：在谷歌控制台中启用 Google+ API

### 问题4：项目未选择
**症状**：OAuth客户端未找到
**解决**：确保在正确的谷歌云项目中创建了OAuth凭据

## 调试步骤

1. **检查环境变量**：
   ```bash
   echo $NEXT_PUBLIC_GOOGLE_CLIENT_ID
   ```

2. **查看前端日志**：
   ```bash
   docker-compose logs frontend
   ```

3. **检查浏览器网络请求**：
   - 打开开发者工具
   - 查看Network标签
   - 检查谷歌OAuth请求的URL

4. **验证谷歌控制台配置**：
   - 确认客户端ID正确
   - 确认重定向URI匹配
   - 确认API已启用

## 生产环境配置

对于生产环境，需要：

1. **更新重定向URI**：
   ```
   https://your-domain.com/auth/google-login
   ```

2. **配置HTTPS**：
   - 谷歌OAuth要求HTTPS
   - 确保域名有SSL证书

3. **更新环境变量**：
   ```bash
   GOOGLE_REDIRECT_URI=https://your-domain.com/auth/google-login
   FRONTEND_URL=https://your-domain.com
   ``` 