# 亿聪哲史 (1sat) - 播客官网

## 概述

这是亿聪哲史的官方网站，一档中文比特币播客。网站使用 AI 工具 Replit 和 v0 构建。网站展示播客单集、嘉宾信息，并提供音频播放功能。项目采用内容驱动架构，单集和嘉宾数据以 Markdown 文件存储，带有 YAML 前置元数据，在构建时解析用于静态生成。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

开发服务器默认运行在 `http://localhost:5000`

## 系统架构

### 前端框架
- **Next.js 16** 使用 App Router 和 React Server Components
- 服务端渲染用于获取单集和嘉宾数据
- 客户端组件用于交互功能（音频播放器、搜索、导航）

### 样式方案
- **Tailwind CSS** 带自定义 CSS 变量用于主题
- **shadcn/ui** 组件库（New York 风格变体）
- 纯深色模式设计，"赛博朋克理性主义"美学
- 自定义字体：IBM Plex Mono（等宽）和 Libre Baskerville（衬线）
- 配色方案：深色 zinc 背景、橙色强调色 (#c2410c)、绿色状态指示

### 内容管理
- 基于文件的内容系统，使用 `/content/` 目录下的 Markdown 文件
- 单集存储在 `/content/episodes/` 目录，每集一个 `.md` 文件（E00.md、E01.md 等）
- 嘉宾数据存储在 `/content/guests/guests.md`，使用嵌入式 YAML
- **gray-matter** 库解析 Markdown 文件的 YAML 前置元数据
- 单集元数据包括：id、title、date、duration、hosts、guests、tags、audioUrl、status

### 搜索功能
- **Fuse.js** 用于客户端模糊搜索单集

### 音频播放器
- 自定义 React 音频播放器组件，带播放/暂停、进度条和时间显示
- 音频文件托管在 Anchor.fm/Cloudfront CDN

### 核心组件
- `app/page.tsx` - 首页，服务端获取单集和嘉宾数据
- `app/nodes/page.tsx` - Nodes（主持人和嘉宾）页面
- `app/manifesto/page.tsx` - Manifesto（宣言）页面
- `app/episodes/[id]/page.tsx` - 单集详情页面，支持静态生成
- `components/home-page.tsx` - 首页客户端组件，处理搜索和单集列表
- `components/shared-layout.tsx` - 共享布局组件，包含状态栏、Header、Footer
- `components/episode-list.tsx` - 单集列表组件
- `components/episode-detail.tsx` - 单集详情展示组件
- `components/nodes-view.tsx` - Nodes 视图组件
- `components/manifesto-view.tsx` - Manifesto 视图组件
- `components/audio-player.tsx` - 自定义音频播放控件
- `lib/episodes.ts` - 服务端从 Markdown 文件解析单集
- `lib/guests.ts` - 服务端从 Markdown 中的 YAML 解析嘉宾

### 数据流
1. 服务端在请求/构建时获取并解析所有 Markdown 文件
2. 解析后的数据作为 props 传递给客户端组件
3. 客户端处理交互式筛选、搜索和音频播放

## UI 功能

### 状态栏（顶部）
- 实时比特币网络数据展示
- **NODE ONLINE**：从 Bitnodes.io API 获取节点数量
- **BLOCK**：从 mempool.space API 获取当前区块高度
- 可点击链接，悬停时显示下划线效果

### 导航和页面路由
- **首页** (`/`)：主单集列表，带搜索功能，区块链风格的区块卡片
- **Nodes** (`/nodes`)：Seed Nodes（主持人）和 Discovered Peers（嘉宾）页面
- **Manifesto** (`/manifesto`)：播客宣言和理念页面
- **单集详情** (`/episodes/E00`, `/episodes/E01` 等)：每一集的独立可分享页面，包含完整内容、音频播放器和嘉宾信息

### 页脚
- **Value 4 Value**：闪电网络地址用于捐赠（1sat@fountain.fm）
- **Follow Us**：Twitter 和 Nostr 链接
- **Subscribe**：Apple Podcasts、Spotify、YouTube、Fountain 平台链接
- **RSS Feed**：Anchor.fm RSS 链接，带复制功能

## 外部依赖

### 托管与部署
- **Vercel** 用于托管和自动部署

### 分析
- **@vercel/analytics** 用于网站分析

### 音频托管
- 单集音频文件托管在 **Anchor.fm**（Spotify for Podcasters）
- 通过 Cloudfront CDN 分发
- RSS Feed：https://anchor.fm/s/e0b84134/podcast/rss

### 外部 API
- **Bitnodes.io**：比特币节点数量
- **Mempool.space**：当前区块高度

### UI 组件
- **Radix UI** 原语用于无障碍组件
- **Lucide React** 图标库
- **react-markdown** 配合 **rehype-raw** 用于 Markdown 渲染
- **embla-carousel-react** 用于轮播
- **cmdk** 用于命令面板功能

## 项目结构

```
├── app/                          # Next.js App Router 页面
│   ├── page.tsx                  # 首页
│   ├── nodes/
│   │   └── page.tsx              # Nodes 页面
│   ├── manifesto/
│   │   └── page.tsx              # Manifesto 页面
│   └── episodes/
│       └── [id]/
│           └── page.tsx          # 单集详情页面
├── components/                   # React 组件
│   ├── home-page.tsx             # 首页组件
│   ├── shared-layout.tsx         # 共享布局
│   ├── episode-list.tsx          # 单集列表
│   ├── episode-detail.tsx        # 单集详情
│   ├── nodes-view.tsx            # Nodes 视图
│   ├── manifesto-view.tsx        # Manifesto 视图
│   ├── audio-player.tsx          # 音频播放器
│   └── ui/                       # shadcn/ui 组件
├── content/                      # Markdown 内容文件
│   ├── episodes/                 # 单集 Markdown 文件（E00.md、E01.md 等）
│   └── guests/                   # 嘉宾数据（guests.md）
├── lib/                          # 工具函数
│   ├── episodes.ts               # 单集解析
│   └── guests.ts                 # 嘉宾解析
├── public/                       # 静态资源
└── styles/                       # 全局样式
```

## 添加新单集

### 快速流程
只需在 `/content/episodes/` 目录创建新的 Markdown 文件，网站会自动生成对应的页面和路由。

### 详细步骤

1. **创建新文件**：在 `/content/episodes/` 目录创建新的 `.md` 文件（如 `E24.md`）

2. **添加 YAML 前置元数据和内容**：

```markdown
---
id: "E24"
title: "单集标题"
date: "2025-01-15"
duration: "45m"
category: "对谈"
hosts: ["曾汨", "阿剑"]
guests: ["嘉宾名字"]
tags: ["标签1", "标签2"]
audioUrl: "https://..."
status: "published"
---

## 简介

这里写节目简介...

## 内容

这里写详细内容...
```

### 自动功能
- 新单集自动在首页显示
- 自动生成独立的页面路由：`/episodes/E24`
- 支持搜索新单集的内容和标签
- 可在任何单集页面分享具体链接

### 添加新嘉宾
如果有新嘉宾，需要在 `/content/guests/guests.md` 中添加对应信息

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 联系方式

- Twitter: [@1satpod](https://x.com/1satpod)
