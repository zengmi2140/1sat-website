# YiCongZheShi (亿聪哲史) - Bitcoin Podcast Website

## Overview

This is a Next.js website for YiCongZheShi (亿聪哲史), a Chinese-language Bitcoin-only podcast. The site displays podcast episodes, guest information, and provides audio playback functionality. The project follows a content-driven architecture where episodes and guest data are stored as Markdown files with YAML frontmatter, parsed at build time for static generation.

## User Preferences

Preferred communication style: Simple, everyday language.

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

## External Dependencies

### Hosting & Deployment
- **Vercel** for hosting and automatic deployments
- **v0.app** integration for AI-assisted development (syncs changes automatically)

### Analytics
- **@vercel/analytics** for website analytics

### Audio Hosting
- Episode audio files hosted on **Anchor.fm** (Spotify for Podcasters)
- CDN delivery via Cloudfront

### UI Components
- **Radix UI** primitives for accessible components
- **Lucide React** for icons
- **react-markdown** with **rehype-raw** for Markdown rendering
- **embla-carousel-react** for carousels
- **cmdk** for command palette functionality

### No Database
- This project uses file-based content storage only
- No database integration currently exists