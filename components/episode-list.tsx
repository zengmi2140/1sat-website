"use client";

import Link from "next/link";

interface Episode {
  id: string;
  title: string;
  date: string;
  duration: string;
  tags: string[];
}

interface EpisodeListProps {
  episodes: Episode[];
}

export default function EpisodeList({ episodes }: EpisodeListProps) {
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
          <Link
            key={ep.id}
            href={`/episodes/${ep.id}`}
            className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-3 md:p-2 border border-zinc-900 hover:border-orange-900/50 hover:bg-zinc-900/50 cursor-pointer transition-all duration-200 rounded md:rounded-none block"
          >
            {/* Height (EP#) */}
            <div className="md:col-span-1 flex items-center md:block">
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
          </Link>
        ))}
      </div>
    </div>
  );
}
