"use client";

import { useState, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Fuse from "fuse.js";
import {
  Radio,
  Hash,
  Cpu,
  Copy,
  Check,
  Zap,
  Shield,
  Youtube,
  Podcast,
  Rss,
  Twitter,
  ExternalLink,
  LinkIcon,
  AtSign,
  ChevronLeft,
  Network,
  Server,
  Computer,
} from "lucide-react";
import { AudioPlayer } from "./audio-player";

// --- Types ---
interface Episode {
  id: string;
  title: string;
  date: string;
  duration: string;
  category: string;
  hosts: string;
  tags: string[];
  summary: string;
  takeaways: string[];
  content?: string;
  slug?: string;
  audioUrl?: string;
}

interface Guest {
  name: string;
  desc: string;
  twitter: string;
  episodes: string[];
}

// --- Components ---
const EpisodeList = ({
  episodes,
  onSelect,
}: {
  episodes: Episode[];
  onSelect: (ep: Episode) => void;
}) => {
  // 如果 episodes 是 undefined 或空数组，显示提示信息
  if (!episodes || episodes.length === 0) {
    return (
      <div className="w-full text-center py-20 text-zinc-600 font-mono">
        <div className="text-sm">// No episodes found</div>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in duration-500">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-2 border-b border-zinc-800 pb-2 mb-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">
        <div className="col-span-1">Height</div>
        <div className="col-span-2">MINED</div>
        <div className="col-span-5">BLOCK HEAD</div>
        <div className="col-span-1">Size</div>
        <div className="col-span-3">Tags</div>
      </div>

      {/* Table Body */}
      <div className="space-y-1">
        {episodes.map((ep) => (
          <div
            key={ep.id}
            onClick={() => onSelect(ep)}
            className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-3 md:p-2 border border-zinc-900 hover:border-orange-900/50 hover:bg-zinc-900/50 cursor-pointer transition-all duration-200 rounded md:rounded-none"
          >
            {/* Height (EP#) */}
            <div className="md:col-span-1 flex items-center md:block">
              <span className="md:hidden text-zinc-600 font-mono text-xs mr-2">
                EP:
              </span>
              <span className="font-mono text-orange-700/80 group-hover:text-orange-500 transition-colors">
                {ep.id}
              </span>
            </div>

            {/* Date */}
            <div className="md:col-span-2 flex items-center text-zinc-500 font-mono text-xs">
              {ep.date}
            </div>

            {/* Topic */}
            <div className="md:col-span-5 text-zinc-300 font-mono text-sm group-hover:text-white font-bold truncate">
              {ep.title}
            </div>

            {/* Size (Duration Only) */}
            <div className="md:col-span-1 flex items-center text-zinc-500 font-mono text-xs">
              {ep.duration}
            </div>

            {/* OP_RETURN (Tags) */}
            <div className="md:col-span-3 flex items-center gap-2 overflow-hidden">
              <div className="flex gap-1.5 overflow-hidden">
                {ep.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono border border-zinc-800 px-1.5 py-0.5 text-zinc-600 group-hover:text-zinc-400 group-hover:border-zinc-700 transition-colors uppercase whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
                {ep.tags.length > 2 && (
                  <span className="text-[10px] text-zinc-700">...</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EpisodeDetail = ({
  episode,
  onBack,
  onEpisodeClick,
}: {
  episode: Episode;
  onBack: () => void;
  onEpisodeClick: (episodeId: string) => void;
}) => {
  const tags = episode.tags || [];
  const takeaways = episode.takeaways || [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-xs font-mono text-orange-700 hover:text-orange-500 uppercase tracking-widest group"
      >
        <ChevronLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
        Return to Mempool
      </button>

      <div className="border border-zinc-800 bg-zinc-950 p-6 md:p-10 relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 p-0 opacity-[0.03] grayscale pointer-events-none">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
            alt=""
            className="w-64 h-64 md:w-96 md:h-96"
          />
        </div>

        <div className="relative z-10 flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-orange-600 text-xl">
                  BLOCK {episode.id}
                </span>
                <span className="font-mono text-zinc-600 text-xs">|</span>
                <span className="font-mono text-zinc-500 text-xs">
                  MINED: {episode.date}
                </span>
                <span className="font-mono text-zinc-600 text-xs">|</span>
                <span className="font-mono text-zinc-500 text-xs">
                  SIZE: {episode.duration}
                </span>
                <span className="bg-zinc-800 text-zinc-400 font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider">
                  {episode.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-serif text-zinc-100 leading-tight">
                {episode.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono border border-zinc-800 px-2 py-1 text-zinc-500 uppercase tracking-wider"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Separator */}
                {tags.length > 0 && (
                  <div className="flex items-center gap-2 font-mono text-zinc-500">
                    {/* Additional separator content here */}
                  </div>
                )}
              </div>
            </div>
          </div>

          {episode.audioUrl && (
            <div className="-mx-6 md:-mx-10 px-6 md:px-10">
              <AudioPlayer audioUrl={episode.audioUrl} />
            </div>
          )}

          {/* Summary Section */}
          <div className="border-l-2 border-orange-900/50 pl-4 py-2">
            <p className="font-serif text-zinc-400 italic leading-relaxed">
              {episode.summary}
            </p>
          </div>

          {/* Content Section - Markdown */}
          {episode.content && (
            <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-mono prose-headings:text-zinc-200 prose-p:font-serif prose-p:text-zinc-400 prose-li:font-serif prose-li:text-zinc-400 prose-code:font-mono prose-code:text-green-500 prose-code:bg-zinc-900 prose-code:px-1 prose-code:py-0.5 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-blockquote:border-orange-900/50 prose-blockquote:text-zinc-500 prose-strong:text-zinc-300">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-orange-700 underline hover:text-orange-500 transition-colors"
                    >
                      {children}
                    </a>
                  ),
                  br: () => <br className="block" />,
                }}
              >
                {episode.content}
              </ReactMarkdown>
            </div>
          )}

          {/* Takeaways Section (legacy support) */}
          {takeaways && takeaways.length > 0 && (
            <div className="bg-zinc-900/50 border border-zinc-800 p-6">
              <h3 className="font-mono text-xs text-orange-700 uppercase tracking-widest mb-4">
                // Key Takeaways
              </h3>
              <ul className="space-y-3">
                {takeaways.map((t, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <Zap className="w-4 h-4 text-orange-700/50 flex-shrink-0 mt-0.5" />
                    <span className="font-serif text-zinc-400">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NodesView = ({
  guests,
  onEpisodeClick,
}: {
  guests: Guest[];
  onEpisodeClick: (episodeId: string) => void;
}) => {
  const hosts = [
    {
      name: "曾汨",
      role: "Host, Bitcoin Maximalism",
      twitter: "@zengmi2140",
      status: "online",
    },
    {
      name: "阿剑",
      role: "Host, Bitcoin Maximalism",
      twitter: "@AurtrianAjian",
      status: "online",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-2">
          <Shield className="w-4 h-4 text-orange-700" />
          <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500">
            Core Nodes (Hosts)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hosts.map((host, idx) => (
            <div
              key={idx}
              className="border border-zinc-800 bg-zinc-950 px-4 py-3 relative overflow-hidden group hover:border-orange-900/30 transition-colors flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-zinc-700 flex items-center justify-center text-zinc-600 flex-shrink-0">
                  {idx === 0 ? <Computer size={16} /> : <Server size={16} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono text-sm text-zinc-200 font-bold">
                      {host.name}
                    </h3>
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                    <span className="font-mono text-xs text-zinc-500">
                      {host.role}
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={`https://twitter.com/${host.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-2 py-1 border border-zinc-800 hover:border-orange-700 hover:bg-zinc-900 transition-colors group/link"
              >
                <span className="font-mono text-[10px] text-zinc-500 group-hover/link:text-orange-500">
                  TWITTER
                </span>
                <ExternalLink
                  size={10}
                  className="text-zinc-600 group-hover/link:text-orange-500"
                />
              </a>
              <div className="absolute -bottom-2 -right-2 text-zinc-900/20 font-mono text-4xl pointer-events-none select-none font-bold">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-2">
          <Network className="w-4 h-4 text-orange-700" />
          <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500">
            Discovered Peers (Guests)
          </h2>
        </div>
        <div className="border border-zinc-900 bg-zinc-950/50">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 border-b border-zinc-900 text-[10px] font-mono text-zinc-600 uppercase">
            <div className="col-span-2">Peer ID</div>
            <div className="col-span-4">Descriptor (Info)</div>
            <div className="col-span-2">Net Addr</div>
            <div className="col-span-4 text-right">Channels</div>
          </div>
          <div className="divide-y divide-zinc-900">
            {/* Table Body */}
            {guests.map((guest, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 py-3 text-sm font-mono hover:bg-zinc-900/30 transition-colors group"
              >
                <div className="md:col-span-2 text-zinc-300 font-bold group-hover:text-orange-500 transition-colors">
                  {guest.name}
                </div>
                <div className="md:col-span-4 text-zinc-500 text-xs md:text-sm font-serif italic md:not-italic md:font-mono md:text-zinc-500 truncate">
                  {guest.desc}
                </div>
                <div className="md:col-span-2 flex items-center">
                  <a
                    href={`https://twitter.com/${guest.twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-orange-500 text-xs flex items-center gap-1 transition-colors"
                  >
                    <AtSign size={10} />
                    {guest.twitter.replace("@", "")}
                  </a>
                </div>
                <div className="md:col-span-4 flex md:justify-end gap-2 items-center flex-wrap">
                  {guest.episodes.map((epId) => (
                    <button
                      key={epId}
                      onClick={() => onEpisodeClick(epId)}
                      className="text-orange-900 hover:text-orange-500 text-xs flex items-center gap-1 transition-colors border-b border-orange-900/30 hover:border-orange-500"
                    >
                      <LinkIcon size={10} />
                      {epId}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ManifestoView = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-3xl mx-auto">
    <div className="border border-zinc-800 bg-zinc-950 p-6 md:p-10 font-mono text-sm md:text-base leading-relaxed text-zinc-400 relative">
      <div className="text-zinc-600 text-sm mb-8 select-none">
        ---
        <br />
        filename: MANIFESTO.md
        <br />
        author: 1sat
        <br />
        created: 2023-05-05
        <br />
        ---
      </div>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-4 tracking-tight">
            <span className="text-orange-700">#</span> 噪音与信号
          </h2>
          <p>
            现代网络正在被熵所吞噬。信息以前所未有的速度产生，却以惊人的速度贬值。
            在加密货币的世界里，这种噪音达到了顶峰：投机、欺诈、庞氏骗局和毫无意义的代币发行。
            它们不是创新，它们是干扰。
          </p>
          <p className="mt-4">
            在这个充斥着噪音的宇宙中，比特币是唯一的信号。它是数学的必然，而非政治的偶然。
          </p>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-4 tracking-tight">
            <span className="text-orange-700">#</span> 最大主义不是教条
          </h2>
          <p>
            我们被贴上"比特币最大主义者"的标签。这不是一种宗教信仰，而是一种工程推论。
          </p>
          <p className="mt-4">
            我们只关心去中心化。如果一个系统需要你信任它的开发者、它的基金会或它的验证节点联盟，那么它就不是革命，它只是数字化的旧世界。
            我们之所以排斥其他链，是因为它们在去中心化这个核心命题上作出了不可接受的妥协。
          </p>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-4 tracking-tight">
            <span className="text-orange-700">#</span> 验证，而非信任
          </h2>
          <p>
            "Don't Trust, Verify" 是我们的座右铭，也是我们制作这档播客的原则。
          </p>
          <p className="mt-4">
            在这档节目里，我们不讨论价格预测，不推荐投资标的。我们讨论协议升级（Protocol）、代码实现（Code）、博弈论（Game
            Theory）和自我主权（Self-Sovereignty）。
            我们希望你能运行自己的全节点，掌握自己的私钥，验证我们所说的一切。
          </p>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-4 tracking-tight">
            <span className="text-orange-700">#</span> 我们的使命
          </h2>
          <p>
            亿聪哲史（YiCongZheShi）的存在，是为了在噪音中提取信号。
            我们对话那些构建底层代码的人，那些维护闪电网络通道的人，那些捍卫隐私的人。
          </p>
          <p className="mt-4">
            我们为密码朋克精神而声，为理性的自由主义者而设。
          </p>
        </div>
      </div>
      <div className="mt-12 text-zinc-600 text-sm select-none break-all">
        ...
        <br />
        VERIFY AUTHOR IDENTITY via NOSTR:
        <br />
        npub1uueww5jpx3nxld06uy36tq9cvztteuepxru038vm74kexx7x8sgs44nmra
      </div>
      <span className="inline-block w-2.5 h-5 bg-orange-700 animate-pulse ml-1 align-middle"></span>
    </div>
  </div>
);

// --- Main Client Component ---
interface ClientPageProps {
  episodes: Episode[];
  guests: Guest[];
}

export default function ClientPage({
  episodes = [],
  guests = [],
}: ClientPageProps) {
  const [currentView, setCurrentView] = useState<
    "list" | "detail" | "nodes" | "manifesto"
  >("list");
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [blockHeight, setBlockHeight] = useState<number>(840000);
  const [nodeCount, setNodeCount] = useState<string>("...");
  const [previousView, setPreviousView] = useState<
    "list" | "detail" | "nodes" | "manifesto"
  >("list");
  const [copiedLightning, setCopiedLightning] = useState(false);
  const [copiedRss, setCopiedRss] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(episodes, {
      keys: [
        { name: "title", weight: 0.3 },
        { name: "tags", weight: 0.25 },
        { name: "content", weight: 0.25 },
        { name: "hosts", weight: 0.1 },
        { name: "guests", weight: 0.1 },
      ],
      threshold: 0.4,
      includeScore: true,
    });
  }, [episodes]);

  const filteredEpisodes = useMemo(() => {
    if (!searchTerm.trim()) {
      return episodes;
    }
    const results = fuse.search(searchTerm);
    return results.map((result) => result.item);
  }, [searchTerm, fuse, episodes]);

  const handleSelectEpisode = (ep: Episode) => {
    setPreviousView(currentView); // 保存当前视图
    setSelectedEpisode(ep);
    setCurrentView("detail");
    window.scrollTo(0, 0);
  };

  const handleSelectEpisodeById = (episodeId: string) => {
    const episode = episodes?.find((ep) => ep.id === episodeId);
    if (episode) {
      handleSelectEpisode(episode);
    }
  };

  const handleViewChange = (
    view: "list" | "detail" | "nodes" | "manifesto",
  ) => {
    setPreviousView(currentView);
    setCurrentView(view);
  };

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
        // 保持初始值 840000 作为后备
      }
    };

    const fetchNodeCount = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const response = await fetch(
          "https://bitnodes.io/api/v1/snapshots/latest/",
          {
            signal: controller.signal,
          },
        );
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          setNodeCount(data.total_nodes || "24000+");
        } else {
          setNodeCount("24000+");
        }
      } catch (error) {
        console.error("Failed to fetch node count:", error);
        setNodeCount("24000+");
      }
    };

    fetchBlockHeight();
    fetchNodeCount();
  }, []);

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
        {/* --- Header --- */}
        <header className="mb-12 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-6">
              <div
                className="w-16 h-16 md:w-20 md:h-20 p-2 bg-zinc-950 flex-shrink-0 group cursor-pointer overflow-hidden"
                onClick={() => handleViewChange("list")}
              >
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain brightness-90 group-hover:brightness-110 transition-all duration-300"
                />
              </div>
              <div>
                <h1
                  className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tighter mb-2 font-mono cursor-pointer"
                  onClick={() => handleViewChange("list")}
                >
                  <span className="text-orange-700">&lt;</span>
                  亿聪哲史
                  <span className="text-orange-700"> /&gt;</span>
                </h1>
                <p className="text-zinc-500 text-sm max-w-lg font-serif italic">
                  "Bitcoin is the signal. Everything else is noise."
                </p>
              </div>
            </div>
            {/* Navigation */}
            <nav className="flex gap-4 text-xs font-bold uppercase tracking-widest">
              <button
                onClick={() => handleViewChange("list")}
                className={`${
                  currentView === "list" || currentView === "detail"
                    ? "text-orange-700 border-b border-orange-700"
                    : "text-zinc-600 hover:text-zinc-400"
                } pb-1 transition-colors`}
              >
                Signals
              </button>
              <button
                onClick={() => handleViewChange("nodes")}
                className={`${
                  currentView === "nodes"
                    ? "text-orange-700 border-b border-orange-700"
                    : "text-zinc-600 hover:text-zinc-400"
                } pb-1 transition-colors`}
              >
                Nodes
              </button>
              <button
                onClick={() => handleViewChange("manifesto")}
                className={`${
                  currentView === "manifesto"
                    ? "text-orange-700 border-b border-orange-700"
                    : "text-zinc-600 hover:text-zinc-400"
                } pb-1 transition-colors`}
              >
                Manifesto
              </button>
            </nav>
          </div>
          {/* Search Box */}
          <div className="mt-8 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-600">
              <span className="font-bold text-orange-700 mr-2">$</span>
              <span className="text-xs">grep</span>
            </div>
            <input
              type="text"
              placeholder="search topics, tags, or guests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  searchTerm &&
                  (currentView === "nodes" || currentView === "manifesto")
                ) {
                  handleViewChange("list");
                }
              }}
              className="block w-full bg-zinc-950 border border-zinc-800 text-zinc-300 py-3 pl-16 pr-12 focus:outline-none focus:border-orange-800 transition-all font-mono text-sm placeholder:text-zinc-700"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
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
          {/* Search Result Count */}
          {searchTerm && (
            <div className="mt-2 text-xs font-mono text-zinc-600">
              <span className="text-green-600">$</span> found{" "}
              <span className="text-orange-700">{filteredEpisodes.length}</span>{" "}
              block(s) matching "
              <span className="text-zinc-400">{searchTerm}</span>"
            </div>
          )}
        </header>

        {/* --- Main Content --- */}
        <main>
          {currentView === "list" && (
            <EpisodeList
              episodes={filteredEpisodes}
              onSelect={handleSelectEpisode}
            />
          )}
          {currentView === "detail" && selectedEpisode && (
            <EpisodeDetail
              episode={selectedEpisode}
              onBack={() => handleViewChange(previousView)}
              onEpisodeClick={handleSelectEpisodeById}
            />
          )}
          {currentView === "nodes" && (
            <NodesView
              guests={guests}
              onEpisodeClick={handleSelectEpisodeById}
            />
          )}
          {currentView === "manifesto" && <ManifestoView />}
        </main>

        {/* --- Footer --- */}
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
              <div className="flex flex-wrap items-center gap-3 md:gap-6">
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
                  {/* Apple Podcasts 链接 */}
                  <a
                    href="https://podcasts.apple.com/us/podcast/%E4%BA%BF%E8%81%AA%E5%93%B2%E5%8F%B2/id1691447234"
                    target="_blank"
                    className="flex items-center gap-2 px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-all text-[10px] uppercase font-mono"
                  >
                    <Podcast size={12} /> Apple
                  </a>
                  {/* Spotify 链接 */}
                  <a
                    href="https://open.spotify.com/show/7Jx7D82u9oYSA0ktbEyQvY"
                    target="_blank"
                    className="flex items-center gap-2 px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-all text-[10px] uppercase font-mono"
                  >
                    <Radio size={12} /> Spotify
                  </a>
                  {/* YouTube 链接 */}
                  <a
                    href="https://www.youtube.com/channel/UCwfpdSLItOAAFDRAXgqhaVg"
                    target="_blank"
                    className="flex items-center gap-2 px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-all text-[10px] uppercase font-mono"
                  >
                    <Youtube size={12} /> YouTube
                  </a>
                  {/* Fountain 链接 */}
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
              <span className="hidden md:inline"> </span>// 数字之中更有力量
            </p>
            <p className="text-xs text-zinc-500 font-mono tracking-[0.3em] uppercase opacity-100 mt-2 md:mt-1">
              <span className="text-zinc-300">Libertas in Cryptographia</span>
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>// 密码学之中更有自由
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
