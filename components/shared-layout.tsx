"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Cpu,
  Copy,
  Check,
  Zap,
  Youtube,
  Podcast,
  Radio,
  Rss,
  Twitter,
  Hash,
} from "lucide-react";

interface SharedLayoutProps {
  children: ReactNode;
  showSearch?: boolean;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  searchResultCount?: number;
}

export default function SharedLayout({
  children,
  showSearch = false,
  searchTerm = "",
  onSearchChange,
  searchResultCount,
}: SharedLayoutProps) {
  const pathname = usePathname();
  const [blockHeight, setBlockHeight] = useState<number>(840000);
  const [nodeCount, setNodeCount] = useState<string>("...");
  const [copiedLightning, setCopiedLightning] = useState(false);
  const [copiedRss, setCopiedRss] = useState(false);

  const handleCopyLightning = () => {
    navigator.clipboard.writeText("1sat@fountain.fm");
    setCopiedLightning(true);
    setTimeout(() => setCopiedLightning(false), 2000);
  };

  const handleCopyRss = () => {
    navigator.clipboard.writeText("https://anchor.fm/s/e0b84134/podcast/rss");
    setCopiedRss(true);
    setTimeout(() => setCopiedRss(false), 2000);
  };

  useEffect(() => {
    const fetchBlockHeight = async () => {
      try {
        const response = await fetch(
          "https://mempool.space/api/blocks/tip/height",
        );
        if (response.ok) {
          const height = await response.text();
          setBlockHeight(Number.parseInt(height, 10));
        }
      } catch (error) {
        console.error("Failed to fetch block height:", error);
      }
    };

    const fetchNodeCount = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const response = await fetch(
          "https://bitnodes.io/api/v1/snapshots/latest/",
          {
            signal: controller.signal,
          },
        );
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          setNodeCount(data.total_nodes || "20000+");
        } else {
          setNodeCount("20000+");
        }
      } catch (error) {
        console.error("Failed to fetch node count:", error);
        setNodeCount("20000+");
      }
    };

    fetchBlockHeight();
    fetchNodeCount();
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path === "/" && pathname?.startsWith("/episodes")) return true;
    if (path !== "/" && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 p-4 md:p-8 lg:p-12 selection:bg-orange-500/30 selection:text-orange-200">
      {/* Top Status Bar */}
      <div className="border-b border-zinc-900 bg-zinc-950 px-4 py-2 flex justify-between items-center text-[10px] md:text-xs uppercase tracking-widest fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-4">
          <a
            href="https://bitnodes.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-green-600 hover:underline hover:decoration-green-600 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
            Node Online: {nodeCount}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://mempool.space/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-700 font-bold flex items-center gap-2 hover:underline hover:decoration-orange-700 transition-all"
          >
            <Cpu size={12} />
            BLOCK: {blockHeight.toLocaleString()}
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 pt-14 md:pt-20">
        {/* Header */}
        <header className="mb-12 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="w-20 h-20 md:w-20 md:h-20 p-2 bg-zinc-950 flex-shrink-0 group cursor-pointer overflow-hidden"
              >
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain brightness-90 group-hover:brightness-110 transition-all duration-300"
                />
              </Link>
              <div>
                <Link href="/">
                  <h1 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tighter mb-2 font-mono cursor-pointer">
                    <span className="text-orange-700">&lt;</span>
                    亿聪哲史
                    <span className="text-orange-700"> /&gt;</span>
                  </h1>
                </Link>
                <p className="text-zinc-500 text-sm max-w-lg font-serif italic">
                  "Bitcoin is the signal. Everything else is noise."
                </p>
              </div>
            </div>
            {/* Navigation */}
            <nav className="flex gap-4 text-xs font-bold uppercase tracking-widest">
              <Link
                href="/"
                className={`${
                  isActive("/")
                    ? "text-orange-700 border-b border-orange-700"
                    : "text-zinc-600 hover:text-zinc-400"
                } pb-1 transition-colors`}
              >
                Signals
              </Link>
              <Link
                href="/nodes"
                className={`${
                  isActive("/nodes")
                    ? "text-orange-700 border-b border-orange-700"
                    : "text-zinc-600 hover:text-zinc-400"
                } pb-1 transition-colors`}
              >
                Nodes
              </Link>
              <Link
                href="/manifesto"
                className={`${
                  isActive("/manifesto")
                    ? "text-orange-700 border-b border-orange-700"
                    : "text-zinc-600 hover:text-zinc-400"
                } pb-1 transition-colors`}
              >
                Manifesto
              </Link>
            </nav>
          </div>
          {/* Search Box */}
          {showSearch && (
            <>
              <div className="mt-8 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-600">
                  <span className="font-bold text-orange-700 mr-2">$</span>
                  <span className="text-xs">grep</span>
                </div>
                <input
                  type="text"
                  placeholder="search topics, tags, or guests..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="block w-full bg-zinc-950 border border-zinc-800 text-zinc-300 py-3 pl-16 pr-12 focus:outline-none focus:border-orange-800 transition-all font-mono text-sm placeholder:text-zinc-700"
                />
                {searchTerm && (
                  <button
                    onClick={() => onSearchChange?.("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-600 hover:text-orange-700 transition-colors"
                    aria-label="Clear search"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {searchTerm && searchResultCount !== undefined && (
                <div className="mt-2 text-xs font-mono text-zinc-600">
                  <span className="text-green-600">$</span> found{" "}
                  <span className="text-orange-700">{searchResultCount}</span>{" "}
                  block(s) matching "
                  <span className="text-zinc-400">{searchTerm}</span>"
                </div>
              )}
            </>
          )}
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="mt-20 border-t border-zinc-900 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-stretch gap-10">
            {/* Left: Input Node (Value 4 Value) */}
            <div className="md:w-[35%] flex items-stretch">
              <div
                className="flex flex-col bg-zinc-950 border border-zinc-900 p-4 group hover:border-orange-900/40 transition-all cursor-pointer w-full h-full"
                onClick={handleCopyLightning}
              >
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-3">
                  Value 4 Value
                </span>
                <div className="flex items-center gap-4 flex-grow">
                  <div className="bg-orange-900/20 p-2.5 text-orange-600 flex-shrink-0">
                    <Zap size={18} fill="currentColor" />
                  </div>
                  <div className="flex flex-col justify-center min-w-0 flex-grow">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                      Lightning Address
                    </span>
                    <code className="text-[13px] text-zinc-300 font-mono tracking-tight">
                      1sat@fountain.fm
                    </code>
                  </div>
                  <div className="text-zinc-600 group-hover:text-zinc-400 flex-shrink-0">
                    {copiedLightning ? (
                      <Check size={14} className="text-green-500" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Uplinks & Relays (3 Stacked Rows) */}
            <div className="md:w-[65%] flex flex-col justify-center gap-3">
              {/* Row 1: Follow Us */}
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest w-20 flex-shrink-0">
                  Follow us:
                </span>
                <div className="flex flex-wrap gap-2 md:gap-4">
                  <a
                    href="https://x.com/1satpod"
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-orange-500 hover:border-orange-700 transition-all text-[10px] uppercase font-mono"
                  >
                    <Twitter size={12} /> Twitter
                  </a>
                  <a
                    href="https://njump.me/npub1uueww5jpx3nxld06uy36tq9cvztteuepxru038vm74kexx7x8sgs44nmra"
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-orange-500 hover:border-orange-700 transition-all text-[10px] uppercase font-mono"
                  >
                    <Hash size={12} /> Nostr
                  </a>
                </div>
              </div>

              {/* Row 2: Subscribe */}
              <div className="flex flex-wrap items-center gap-3 md:gap-6">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest w-20 flex-shrink-0">
                  Subscribe:
                </span>
                <div className="flex flex-wrap gap-2 md:gap-4">
                  <a
                    href="https://podcasts.apple.com/us/podcast/%E4%BA%BF%E8%81%AA%E5%93%B2%E5%8F%B2/id1691447234"
                    target="_blank"
                    className="flex items-center gap-2 px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-all text-[10px] uppercase font-mono"
                  >
                    <Podcast size={12} /> Apple
                  </a>
                  <a
                    href="https://open.spotify.com/show/7Jx7D82u9oYSA0ktbEyQvY"
                    target="_blank"
                    className="flex items-center gap-2 px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-all text-[10px] uppercase font-mono"
                  >
                    <Radio size={12} /> Spotify
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCwfpdSLItOAAFDRAXgqhaVg"
                    target="_blank"
                    className="flex items-center gap-2 px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-all text-[10px] uppercase font-mono"
                  >
                    <Youtube size={12} /> YouTube
                  </a>
                  <a
                    href="https://www.fountain.fm/show/ZEjkCrSr3JcZTzC8ir29"
                    target="_blank"
                    className="flex items-center gap-2 px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-all text-[10px] uppercase font-mono"
                  >
                    <Zap size={12} /> Fountain
                  </a>
                </div>
              </div>

              {/* Row 3: RSS Feed */}
              <div className="flex flex-wrap items-center gap-3 md:gap-6">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest w-20 flex-shrink-0">
                  RSS Feed:
                </span>
                <div
                  className="flex items-center gap-3 bg-zinc-950 border border-zinc-900 px-3 py-1.5 hover:border-zinc-700 transition-colors cursor-pointer group flex-grow max-w-sm"
                  onClick={handleCopyRss}
                >
                  <Rss
                    size={12}
                    className="text-orange-900 group-hover:text-orange-600 flex-shrink-0"
                  />
                  <code className="text-[11px] font-mono text-zinc-600 group-hover:text-zinc-400 truncate">
                    anchor.fm/s/e0b84134/podcast/rss
                  </code>
                  <div className="ml-auto text-zinc-800 flex-shrink-0">
                    {copiedRss ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <Copy size={12} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center pb-12">
            <p className="text-xs text-zinc-500 font-mono tracking-[0.3em] uppercase opacity-100">
              <span className="text-zinc-300">Vires in Numeris</span>
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>// 以数字铸就力量
            </p>
            <p className="text-xs text-zinc-500 font-mono tracking-[0.3em] uppercase opacity-100 mt-2 md:mt-1">
              <span className="text-zinc-300">Libertas in Cryptographia</span>
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>// 以密码学捍卫自由
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
