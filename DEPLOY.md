# 部署指南 - 洛克王国：世界 手游助手

> 目标：把后端跑起来，让朋友扫码也能用你的小程序。

---

## 目录

- [方案对比](#方案对比)
- [方案A：本地启动（最快，5分钟）](#方案a本地启动最快5分钟)
- [方案B：Render 一键部署（推荐，10分钟）](#方案brender-一键部署推荐10分钟)
- [方案C：Docker 自托管（VPS/家用服务器）](#方案cdocker-自托管vps家用服务器)
- [方案D：Vercel Serverless（无服务器）](#方案dvercel-serverless无服务器)
- [接入小程序](#接入小程序)
- [常见问题](#常见问题)

---

## 方案对比

| 方案 | 难度 | 费用 | 朋友能用 | 启动时间 | 适合 |
|------|------|------|---------|---------|------|
| **A. 本地** | ⭐ | 0 | ❌ | 5分钟 | 调试/单测 |
| **B. Render** | ⭐⭐ | 0 | ✅ | 10分钟 | 朋友分享 |
| **C. Docker** | ⭐⭐⭐ | 服务器 | ✅ | 30分钟 | 自托管/隐私 |
| **D. Vercel** | ⭐⭐ | 0 | ✅ | 10分钟 | 轻量demo |

> **推荐先用 B（Render 免费版）**，零配置，国内外都能访问，朋友直接扫码就用。

---

## 方案A：本地启动（最快，5分钟）

```bash
# 1. 进入后端目录
cd backend/

# 2. 安装依赖
npm install

# 3. 启动
npm run dev   # nodemon 模式，有热重启
# 或
npm start     # 生产模式
```

启动成功你会看到：

```
============================================
  游戏助手后端已启动
  端口: 3001
  环境: development
  精灵: 64 个
  技能: 111 个
  性格: 30 种
============================================
```

测试：

```bash
curl http://localhost:3001/health
# {"status":"ok","timestamp":"..."}

curl http://localhost:3001/ready
# {"status":"ok","database":"not-required (in-memory mode)","pets":64,...}
```

**限制**：只能你自己访问（除非开内网穿透，见 FAQ）。

---

## 方案B：Render 一键部署（推荐，10分钟）

Render 免费版对中国大陆访问比较友好（新加坡节点），不需要绑卡，零配置。

### 步骤

1. **注册 Render 账号**：https://render.com（GitHub 登录）

2. **把代码 push 到 GitHub**（如果你还没建仓库）：
   ```bash
   cd backend
   git init
   git add .
   git commit -m "init: 洛克王国助手后端"
   # 然后在 GitHub 上建个空仓库，关联并 push
   ```

3. **在 Render 创建 Web Service**：
   - 选 `New` → `Web Service`
   - 选你刚 push 的仓库
   - 关键设置：
     - **Runtime**: `Docker`（自动识别 Dockerfile）
     - **Region**: `Singapore`（亚太友好）
     - **Plan**: `Free`
     - **Health Check Path**: `/health`
   - 点 `Create Web Service`

4. **等 3-5 分钟**让它构建并部署

5. **拿到你的 URL**：`https://你的项目名.onrender.com`

### 验证

```bash
curl https://你的项目名.onrender.com/health
curl https://你的项目名.onrender.com/ready
```

### 免费版限制

- 15 分钟无访问会**休眠**（冷启动 ~30秒）
- 750 小时/月运行时
- 100GB 出站流量

> **够你和朋友用了**。如果想永远不睡，升级到 $7/月 Starter。

---

## 方案C：Docker 自托管（VPS/家用服务器）

适用：你有自己的云服务器（阿里云/腾讯云轻量），或想跑在 NAS / 家里电脑上。

### 前置

- Linux 机器（Ubuntu 22.04 推荐）
- Docker + Docker Compose 已装
- 公网 IP（或者用 frp 内网穿透）

### 步骤

1. **把代码传上服务器**（scp / git clone）

2. **启动**：
   ```bash
   cd backend
   docker compose up -d
   ```

3. **看日志**：
   ```bash
   docker compose logs -f backend
   ```

4. **配 nginx + 域名**（可选但推荐）：
   - `nginx.conf` 文件已经给你写好
   - 用 certbot 申请 SSL：`certbot --nginx -d api.yourdomain.com`

5. **你的 API 地址**：`https://api.yourdomain.com`

### 国内服务器注意

- 阿里云/腾讯云的安全组要放行 443/80 端口
- 备案：80/443 端口要求域名已 ICP 备案
- 替代方案：直接用 3001 端口（不需要备案，但 URL 不优雅）

---

## 方案D：Vercel Serverless（无服务器）

适合：纯 demo 演示，访问量小（< 10万次/天）。

### 步骤

1. **装 Vercel CLI**：
   ```bash
   npm i -g vercel
   ```

2. **部署**：
   ```bash
   cd backend
   vercel --prod
   ```

3. **跟随提示**：登录、确认项目设置，几分钟后给一个 `xxx.vercel.app` 域名

### 注意

- Serverless 是按调用计费，免费额度 100GB·H/月
- 冷启动可能 1-3 秒（不适合频繁调用）
- 数据是**无状态**的（重启就丢），你目前纯内存数据完全 OK

---

## 接入小程序

不管后端跑在哪，最后都要让小程序连上。修改前端 `game-tool-miniapp/utils/request.js`：

```javascript
// 把 BASE_URL 改成你后端的地址
const BASE_URL = 'https://你的项目名.onrender.com/api/v1';
// 或本地
// const BASE_URL = 'http://localhost:3001/api/v1';
```

### 微信小程序配置（关键！）

微信要求 API 域名必须**HTTPS** 且**备案**（除了开发期 `localhost`）。

打开 [微信公众平台](https://mp.weixin.qq.com) → 开发管理 → 服务器域名：

```
request 合法域名: https://你的项目名.onrender.com
uploadFile 合法域名: https://你的项目名.onrender.com
```

**开发期**可以在开发者工具里勾选"不校验合法域名"（仅限你自己的预览）。

### 体验版配置

朋友扫码用体验版（免审核，15人上限）：

1. 微信开发者工具 → 上传代码
2. 公众平台 → 版本管理 → 设为体验版
3. 成员管理 → 添加你朋友（用微信号，最多15人）
4. 把体验版二维码发给他们扫码

---

## 常见问题

### Q1. Render 免费版太慢/总是休眠？

**A**: 三种选择：
- 接受休眠（每次访问多等 30 秒）
- 用 cron-job.org 每 10 分钟 ping 一下你的 URL（保持活跃）
- 升级到 $7/月

### Q2. 部署后 502 / 无法访问？

**A**: 检查：
1. `curl /health` 通不通（不通说明进程没起来）
2. Render Dashboard → Logs 看启动日志
3. 端口是否正确（环境变量 `PORT=3001`）
4. Dockerfile 的 EXPOSE 和 CMD 端口一致

### Q3. 小程序提示"不在合法域名列表"？

**A**: 
- 后端必须有 HTTPS（Render/Vercel 自动给，VPS 需 certbot）
- 去公众平台 → 服务器域名 配置 request 合法域名
- 开发期可在开发者工具勾"不校验合法域名"

### Q4. 我想加更多精灵数据怎么加？

**A**: 编辑 `backend/src/data/pets.js`，在 `PETS` 数组里追加对象，参考现有格式：

```javascript
{
  id: 'newpet',
  no: '080',
  name: '新精灵',
  types: ['火'],
  stats: { hp: 80, atk: 100, spa: 100, def: 80, spd: 80, spe: 100 },
  statsTotal: 540,
  ability: { name: '特性名', desc: '特性描述' },
  category: '分类',
  evolution: { prev: null, next: null, stage: 1, isStarter: false },
  height: '0.5M',
  weight: '5KG',
  price: 100,
  starlight: 0,
  description: '描述...',
  skills: [],  // 技能ID列表
},
```

加完重启服务（Render 自动重新部署）即可。

### Q5. 内网穿透（让本机也能让朋友访问）？

**A**: 用 cpolar / frp / ngrok 之类的工具，5分钟搞定。

例：cpolar（中国工具，免费）
```bash
cpolar http 3001
# 给你一个 https://xxx.cpolar.cn 的公网地址
```

---

## 健康检查 & 监控

部署后建议加个 Uptime 监控（免费的）：

- [UptimeRobot](https://uptimerobot.com/) - 5分钟检测一次
- [Better Stack](https://betterstack.com/) - 通知到微信/邮件

挂了你能马上知道，朋友体验才不掉链子。

---

## 一键命令速查

```bash
# 本地启动
cd backend && npm install && npm run dev

# Docker 本地跑
cd backend && docker compose up -d

# Docker 看日志
cd backend && docker compose logs -f

# Docker 重启
cd backend && docker compose restart

# 测试你的 API
curl https://你的域名/ready
curl "https://你的域名/api/v1/pets?pageSize=3"
curl -X POST https://你的域名/api/v1/teams/score \
  -H "Content-Type: application/json" \
  -d '{"members":[{"petId":"demo"},{"petId":"keshuiwang"},{"petId":"molimao"},{"petId":"huayinglingyang"},{"petId":"lanniao"},{"petId":"yajiji"}],"bossTypes":["龙"]}'
```

---

有其他问题？项目里有 30+ 精灵数据 + 完整 API，跑通后再扩展很快。
