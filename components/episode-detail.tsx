"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ChevronLeft, Zap } from "lucide-react";
import { AudioPlayer } from "./audio-player";

interface Episode {
  id: string;
  title: string;
  date: string;
  duration: string;
  category: string;
  tags: string[];
  summary: string;
  takeaways?: string[];
  content?: string;
  audioUrl?: string;
}

interface EpisodeDetailProps {
  episode: Episode;
}

export default function EpisodeDetail({ episode }: EpisodeDetailProps) {
  const tags = episode.tags || [];
  const takeaways = episode.takeaways || [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Link
        href="/"
        className="mb-6 flex items-center text-xs font-mono text-orange-700 hover:text-orange-500 uppercase tracking-widest group"
      >
        <ChevronLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
        Return to Mempool
      </Link>

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
}
