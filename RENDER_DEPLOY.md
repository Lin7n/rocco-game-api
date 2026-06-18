# Render 免费版部署操作手册

> 目标：把 `backend/` 部署到 Render，拿到一个 `https://xxx.onrender.com` 的 HTTPS 地址，朋友扫码就能用。
> 全程约 15 分钟，不用电脑一直开着。

---

## 🎯 为什么选 Render 免费版

| 优势 | 说明 |
|------|------|
| ✅ HTTPS 自动 | 不需要自己申请 SSL 证书 |
| ✅ 新加坡节点 | 国内访问比美国快 |
| ✅ 不要绑卡 | 注册即用 |
| ✅ 0 元 | 750 小时/月免费额度，够用 |
| ⚠️ 会休眠 | 15 分钟没人访问会休眠，下次访问冷启动 ~30 秒 |
| ⚠️ 限流量 | 100GB/月（朋友10来人玩绰绰有余） |

---

## 🚀 5步部署流程

### Step 1: 注册 GitHub 并创建仓库（3分钟）

1. 打开 https://github.com 注册（已有就跳过）
2. 右上角 `+` → `New repository`
3. 填写：
   - **Repository name**: `rocco-game-api`（随便起名）
   - **Description**: 洛克王国手游助手后端
   - **Public** 选中（Render免费版必须 Public 仓库）
   - **不要**勾 Add README / .gitignore
4. 点 `Create repository`
5. **复制仓库地址**（形如 `https://github.com/你的用户名/rocco-game-api.git`）

---

### Step 2: 把代码 push 到 GitHub（3分钟）

打开 **PowerShell** 或 **CMD**，执行：

```bash
# 进入后端目录
cd C:\Users\19640\WorkBuddy\2026-06-18-12-52-26\backend

# 初始化 git（如果还没初始化）
git init
git branch -M main

# 添加所有文件
git add .

# 第一次提交
git commit -m "init: 洛克王国手游助手后端 API"

# 关联你的 GitHub 仓库（替换成你自己的地址）
git remote add origin https://github.com/你的用户名/rocco-game-api.git

# 推送
git push -u origin main
```

**如果弹出登录框**：用 GitHub 用户名 + Personal Access Token（不是密码）
- Token 在 https://github.com/settings/tokens 生成
- 勾选 `repo` 权限即可

**推送成功后**刷新 GitHub 仓库页面，应该能看到 `src/`、`Dockerfile`、`render.yaml` 等文件。

---

### Step 3: 注册 Render 并创建 Web Service（3分钟）

1. 打开 https://render.com
2. 点 `Get Started for Free` → 用 **GitHub 账号登录**（推荐，方便自动部署）
3. 授权 Render 访问你的 GitHub
4. 登录后点右上角 `New` → `Web Service`
5. 选 `rocco-game-api` 仓库 → `Connect`

---

### Step 4: 配置 Render 服务（2分钟）

填这几个关键字段，其他默认：

| 字段 | 填什么 |
|------|--------|
| **Name** | `rocco-game-api`（会变成 `rocco-game-api.onrender.com`） |
| **Region** | `Singapore`（亚太友好） |
| **Branch** | `main` |
| **Runtime** | `Docker`（自动识别 Dockerfile） |
| **Plan** | `Free` |
| **Health Check Path** | `/health` |

**环境变量**（点 `Advanced` → `Add Environment Variable`）：

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3001` |
| `CORS_ORIGINS` | `*` |
| `LOG_LEVEL` | `info` |

点 `Create Web Service` → 开始构建（等 3-5 分钟）。

---

### Step 5: 验证服务（1分钟）

构建成功后页面会显示 `Your service is live 🎉`，顶部有你的 URL：

```
https://rocco-game-api.onrender.com
```

**测试一下**：

```bash
# 健康检查
curl https://rocco-game-api.onrender.com/health

# 完整状态
curl https://rocco-game-api.onrender.com/ready

# 测个真实接口
curl "https://rocco-game-api.onrender.com/api/v1/pets?pageSize=3"
```

如果返回 JSON 数据，说明部署成功！🎉

---

## 📱 接入微信小程序

### Step 1: 改前端配置

打开 `game-tool-miniapp/utils/request.js`，把第 6 行的 `BASE_URL` 改成：

```javascript
const BASE_URL = 'https://rocco-game-api.onrender.com/api/v1';
```

（替换成你自己 Render 分配的 URL）

### Step 2: 配置微信公众平台服务器域名

打开 https://mp.weixin.qq.com → 登录 → 开发管理 → 服务器域名

| 字段 | 填什么 |
|------|--------|
| **request 合法域名** | `https://rocco-game-api.onrender.com` |
| **uploadFile 合法域名** | `https://rocco-game-api.onrender.com` |

保存（会要求你扫码验证）。

### Step 3: 上传体验版

1. 打开微信开发者工具
2. 导入 `game-tool-miniapp/` 项目
3. 点右上角 `上传` → 填版本号 → 上传
4. 微信公众平台 → 版本管理 → 找到刚上传的版本 → `设为体验版`
5. 成员管理 → 添加你朋友（最多 15 人，用微信号）
6. 把体验版二维码发给他们

**完成！朋友扫码就能用了。**

---

## 🛌 解决 Render 免费版休眠问题

免费版 15 分钟无访问会休眠，下次访问冷启动 ~30 秒。

**3 种解法**：

### A. 接受休眠（最省事）
- 朋友第一次打开等 30 秒，看到加载提示就行
- 在小程序首页加个 loading 动画

### B. cron-job 保活（推荐，0 成本）
1. 打开 https://cron-job.org（免费）
2. 注册 → `Create Cron Job`
3. URL: `https://rocco-game-api.onrender.com/health`
4. Every: `10 minutes`
5. 创建
6. 这样 Render 永远不会休眠（因为每 10 分钟被 ping 一次）

### C. 升级 $7/月 Starter
- 永远不睡
- 性能更好
- 你 10 来个朋友用的话，**完全没必要**

---

## 🔄 以后改数据怎么更新

你后端 `backend/src/data/pets.js`、`skills.js` 等文件就是数据源。

**改了之后**：

```bash
cd C:\Users\19640\WorkBuddy\2026-06-18-12-52-26\backend
git add .
git commit -m "加新精灵"
git push
```

Render 会**自动重新部署**（你前面设了 `autoDeploy: true`），等 2-3 分钟就生效了。

---

## ❓ 常见问题

### Q1: 构建失败？
A: 看 Render Logs：
- 找不到 npm 包 → 检查 `package.json` 是否完整提交
- 端口冲突 → `PORT` 环境变量必须是 `3001`（Dockerfile 里 EXPOSE 3001）
- 健康检查失败 → 访问 `/health` 看返回什么

### Q2: 502 Bad Gateway？
A:
- 免费版休眠中 → 等 30 秒再试
- 构建失败 → 看 Logs 排查
- 端口不对 → 确认环境变量 `PORT=3001` 且代码里用 `process.env.PORT`

### Q3: API 能通但小程序连不上？
A:
- 后端 URL 必须是 HTTPS（onrender.com 自动有）
- 微信公众平台 → 服务器域名配置了吗？
- 开发期勾选 `不校验合法域名`（仅你自己预览时）

### Q4: 想用自定义域名？
A: Render 免费版不支持，自定义域名要 $7/月 Starter。

---

## 📊 部署检查清单

- [ ] GitHub 仓库已建好
- [ ] 代码已 push
- [ ] Render 服务已创建并构建成功
- [ ] `curl /health` 返回 ok
- [ ] `curl /api/v1/pets` 返回精灵数据
- [ ] 前端 `BASE_URL` 已改
- [ ] 微信公众平台已配服务器域名
- [ ] 体验版已上传 + 设为体验版
- [ ] 朋友已加白名单

---

**按这5步走完，你和你的朋友就能用上洛克王国手游助手了！** 🎮✨
