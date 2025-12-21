"use client";

import Link from "next/link";
import {
  Shield,
  Network,
  ExternalLink,
  AtSign,
  LinkIcon,
  Server,
  Computer,
} from "lucide-react";

interface Guest {
  name: string;
  desc: string;
  twitter: string;
  episodes: string[];
}

interface NodesViewProps {
  guests: Guest[];
}

export default function NodesView({ guests }: NodesViewProps) {
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
            Seed Nodes (Hosts)
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
                    <Link
                      key={epId}
                      href={`/episodes/${epId}`}
                      className="text-orange-900 hover:text-orange-500 text-xs flex items-center gap-1 transition-colors border-b border-orange-900/30 hover:border-orange-500"
                    >
                      <LinkIcon size={10} />
                      {epId}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
