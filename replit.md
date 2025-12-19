# YiCongZheShi (亿聪哲史) - Bitcoin Podcast Website

## Overview

This is a Next.js website for YiCongZheShi (亿聪哲史), a Chinese-language Bitcoin-only podcast. The site displays podcast episodes, guest information, and provides audio playback functionality. The project follows a content-driven architecture where episodes and guest data are stored as Markdown files with YAML frontmatter, parsed at build time for static generation.

## User Preferences

Preferred communication style: Simple, everyday language (中文).

## System Architecture

### Frontend Framework
- **Next.js 16** with App Router and React Server Components
- Server-side rendering for episode and guest data fetching
- Client components for interactive features (audio player, search, navigation)

### Styling Approach
- **Tailwind CSS** with custom CSS variables for theming
- **shadcn/ui** component library (New York style variant)
- Dark-mode-only design with "Cypherpunk Rationalism" aesthetic
- Custom fonts: IBM Plex Mono (monospace) and Libre Baskerville (serif)
- Color scheme: Dark zinc backgrounds, orange accents (#c2410c), green status indicators

### Content Management
- File-based content system using Markdown files in `/content/` directory
- Episodes stored in `/content/episodes/` as individual `.md` files (E00.md, E01.md, etc.)
- Guest data stored in `/content/guests/guests.md` as embedded YAML
- **gray-matter** library parses YAML frontmatter from Markdown files
- Episode metadata includes: id, title, date, duration, hosts, guests, tags, audioUrl, status

### Search Functionality
- **Fuse.js** for client-side fuzzy search across episodes

### Audio Player
- Custom React audio player component with play/pause, progress bar, and time display
- Audio files hosted externally on Anchor.fm/Cloudfront CDN

### Key Components
- `app/page.tsx` - Server component that fetches all episodes and guests
- `components/client-page.tsx` - Main client component handling UI, navigation, and search
- `components/audio-player.tsx` - Custom audio playback controls
- `lib/episodes.ts` - Server-side episode parsing from Markdown files
- `lib/guests.ts` - Server-side guest parsing from YAML in Markdown

### Data Flow
1. Server fetches and parses all Markdown files at request/build time
2. Parsed data passed to client components as props
3. Client handles interactive filtering, search, and audio playback

## UI Features

### Status Bar (Top)
- Real-time Bitcoin network data display
- **NODE ONLINE**: Fetches node count from Bitnodes.io API (2s timeout, fallback: "24000+")
- **BLOCK**: Current block height from mempool.space API
- Clickable links with hover underline effects (green for nodes, orange for block)

### Navigation Views
- **Blocks (Episodes)**: Main episode list with blockchain-style block cards
- **Nodes (Hosts & Guests)**: Core Nodes (hosts) and Discovered Peers (guests)
- **Manifesto**: About page with podcast philosophy

### Core Nodes (Hosts) Cards
- Two hosts: 曾汨 and 阿剑
- Icons: Computer (曾汨), Server (阿剑)
- Role description: "Host, Bitcoin Maximalism"
- Twitter links configured in `components/client-page.tsx` (lines 278-279)

### Footer Structure
Located in `components/client-page.tsx` (lines 813-900):
- **Value 4 Value**: Lightning Address for donations (yicongzheshi@getalby.com)
- **Follow Us**: Twitter and Nostr links (lines 821-832)
- **Subscribe**: Platform links with Chinese comments for easy identification
  - Apple Podcasts (line 847)
  - Spotify (line 855)
  - YouTube (line 863)
  - Fountain (line 871)
- **RSS Feed**: Anchor.fm RSS link with copy functionality

## External Dependencies

### Hosting & Deployment
- **Vercel** for hosting and automatic deployments
- **v0.app** integration for AI-assisted development (syncs changes automatically)

### Analytics
- **@vercel/analytics** for website analytics

### Audio Hosting
- Episode audio files hosted on **Anchor.fm** (Spotify for Podcasters)
- CDN delivery via Cloudfront
- RSS Feed: https://anchor.fm/s/e0b84134/podcast/rss

### External APIs
- **Bitnodes.io**: Bitcoin node count (https://bitnodes.io/api/v1/snapshots/latest/)
- **Mempool.space**: Current block height (https://mempool.space/api/blocks/tip/height)

### UI Components
- **Radix UI** primitives for accessible components
- **Lucide React** for icons (Computer, Server, Monitor, Podcast, Radio, Youtube, Zap, etc.)
- **react-markdown** with **rehype-raw** for Markdown rendering with HTML support
- **embla-carousel-react** for carousels
- **cmdk** for command palette functionality

### No Database
- This project uses file-based content storage only
- No database integration currently exists

## Quick Reference: Key Code Locations

| Feature | File | Lines |
|---------|------|-------|
| Hosts data | `components/client-page.tsx` | 278-279 |
| Status bar | `components/client-page.tsx` | 560-615 |
| Footer links | `components/client-page.tsx` | 813-900 |
| Subscribe platforms | `components/client-page.tsx` | 845-877 |
| Episode parsing | `lib/episodes.ts` | - |
| Guest parsing | `lib/guests.ts` | - |
