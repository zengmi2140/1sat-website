# 亿聪哲史 (YiCongZheShi) - 比特币播客网站

## 概述

这是亿聪哲史的 Next.js 网站，一档中文比特币播客。网站展示播客单集、嘉宾信息，并提供音频播放功能。项目采用内容驱动架构，单集和嘉宾数据以 Markdown 文件存储，带有 YAML 前置元数据，在构建时解析用于静态生成。

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
- `app/page.tsx` - 服务端组件，获取所有单集和嘉宾
- `components/client-page.tsx` - 主客户端组件，处理 UI、导航和搜索
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
- **NODE ONLINE**：从 Bitnodes.io API 获取节点数量（2秒超时，回退值："24000+"）
- **BLOCK**：从 mempool.space API 获取当前区块高度
- 可点击链接，悬停时显示下划线效果（节点为绿色，区块为橙色）

### 导航视图
- **Blocks（单集）**：主单集列表，区块链风格的区块卡片
- **Nodes（主持人和嘉宾）**：Core Nodes（主持人）和 Discovered Peers（嘉宾）
- **Manifesto**：关于页面，播客理念

### Core Nodes（主持人）卡片
- 两位主持人：曾汨 和 阿剑
- 图标：Computer（曾汨）、Server（阿剑）
- 角色描述："Host, Bitcoin Maximalism"
- Twitter 链接配置在 `components/client-page.tsx`（第 278-279 行）

### 页脚结构
位于 `components/client-page.tsx`（第 813-900 行）：
- **Value 4 Value**：闪电网络地址用于捐赠（yicongzheshi@getalby.com）
- **Follow Us**：Twitter 和 Nostr 链接（第 821-832 行）
- **Subscribe**：平台链接，带中文注释便于识别
  - Apple Podcasts（第 847 行）
  - Spotify（第 855 行）
  - YouTube（第 863 行）
  - Fountain（第 871 行）
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
- **Bitnodes.io**：比特币节点数量（https://bitnodes.io/api/v1/snapshots/latest/）
- **Mempool.space**：当前区块高度（https://mempool.space/api/blocks/tip/height）

### UI 组件
- **Radix UI** 原语用于无障碍组件
- **Lucide React** 图标库（Computer、Server、Monitor、Podcast、Radio、Youtube、Zap 等）
- **react-markdown** 配合 **rehype-raw** 用于 Markdown 渲染，支持 HTML
- **embla-carousel-react** 用于轮播
- **cmdk** 用于命令面板功能

### 无数据库
- 本项目仅使用基于文件的内容存储
- 目前没有数据库集成

## 快速参考：关键代码位置

| 功能 | 文件 | 行号 |
|------|------|------|
| 主持人数据 | `components/client-page.tsx` | 278-279 |
| 状态栏 | `components/client-page.tsx` | 560-615 |
| 页脚链接 | `components/client-page.tsx` | 813-900 |
| 订阅平台 | `components/client-page.tsx` | 845-877 |
| 单集解析 | `lib/episodes.ts` | - |
| 嘉宾解析 | `lib/guests.ts` | - |
