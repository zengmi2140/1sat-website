"use client"

import { getAllEpisodes } from "@/lib/episodes"
import { getAllGuests } from "@/lib/guests"
import ClientPage from "@/components/client-page"
import { Mic, ArrowLeft, ExternalLink, Network, Shield, BookOpen, User, AtSign, LinkIcon } from "lucide-react"

// --- Components ---

const EpisodeList = ({ episodes, onSelect }) => (
  <div className="w-full animate-in fade-in duration-500">
    {/* Table Header - Optimized for the new OP_RETURN column */}
    <div className="hidden md:grid grid-cols-12 gap-4 border-b border-zinc-800 pb-2 mb-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">
      <div className="col-span-1">Height</div>
      <div className="col-span-2">Date</div>
      <div className="col-span-5">Topic / Hash</div>
      <div className="col-span-1">Size</div>
      <div className="col-span-3 text-right">OP_RETURN (Tags)</div>
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
            <span className="md:hidden text-zinc-600 font-mono text-xs mr-2">EP:</span>
            <span className="font-mono text-orange-700/80 group-hover:text-orange-500 transition-colors">{ep.id}</span>
          </div>

          {/* Date */}
          <div className="md:col-span-2 text-zinc-500 font-mono text-xs flex items-center">{ep.date}</div>

          {/* Topic */}
          <div className="md:col-span-5 text-zinc-300 font-mono text-sm group-hover:text-white font-bold truncate">
            {ep.title}
          </div>

          {/* Size (Duration Only) */}
          <div className="md:col-span-1 text-zinc-500 font-mono text-xs flex items-center">{ep.duration}</div>

          {/* OP_RETURN (Tags) - High Visibility */}
          <div className="md:col-span-3 flex md:justify-end items-center gap-2 overflow-hidden">
            <div className="flex gap-1.5 overflow-hidden">
              {ep.tags.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono border border-zinc-800 px-1.5 py-0.5 text-zinc-600 group-hover:text-zinc-400 group-hover:border-zinc-700 transition-colors uppercase whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
              {ep.tags.length > 2 && <span className="text-[10px] text-zinc-700">...</span>}
            </div>
            {/* Status Dot */}
          </div>
        </div>
      ))}
    </div>
  </div>
)

const EpisodeDetail = ({ episode, onBack }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
    <button
      onClick={onBack}
      className="mb-6 flex items-center text-xs font-mono text-orange-700 hover:text-orange-500 uppercase tracking-widest group"
    >
      <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
      Return to Mempool
    </button>

    <div className="border border-zinc-800 bg-zinc-950 p-6 md:p-10 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-0 right-0 p-0 opacity-[0.03] grayscale pointer-events-none">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
          alt="Watermark"
          className="w-96 h-96 -mr-20 -mt-20 transform rotate-12"
        />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-zinc-800 pb-6 mb-8">
          <div>
            <div className="font-mono text-orange-700 text-sm mb-2">BLOCK #{episode.id} CONFIRMED</div>
            <h1 className="text-2xl md:text-4xl text-zinc-100 font-bold tracking-tight font-serif">{episode.title}</h1>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-zinc-500 text-xs text-right">
            <div>MINED: {episode.date}</div>
            <div>SIZE: {episode.duration}</div>
          </div>
        </div>

        {/* Player Placeholder */}
        <div className="bg-zinc-900 border border-zinc-800 p-4 mb-8 flex items-center gap-4">
          <div className="w-8 h-8 bg-orange-900/20 flex items-center justify-center rounded-full text-orange-600">
            <Mic size={16} />
          </div>
          <div className="h-1 bg-zinc-800 flex-grow rounded-full overflow-hidden cursor-pointer group">
            <div className="h-full bg-orange-700 w-1/3 group-hover:bg-orange-600 transition-colors"></div>
          </div>
          <span className="font-mono text-xs text-zinc-500">12:34 / {episode.duration}</span>
        </div>

        <div className="prose prose-invert prose-zinc max-w-none font-serif leading-relaxed text-zinc-300">
          <p className="text-lg italic text-zinc-400 border-l-2 border-orange-900/50 pl-4 mb-8">{episode.summary}</p>

          <h3 className="font-mono text-sm text-zinc-500 uppercase tracking-widest mt-8 mb-4">Host Protocol</h3>
          <p>
            本期节目由 <strong>{episode.hosts}</strong> 主持。我们探讨了关于 {episode.category} 的核心争议。如同中本聪在
            2010 年所言：“如果有些东西设计得过于复杂，那么它必然是不安全的。”
          </p>

          <h3 className="font-mono text-sm text-zinc-500 uppercase tracking-widest mt-8 mb-4">Hex Data (Takeaways)</h3>
          <ul className="list-disc pl-5 space-y-2 marker:text-orange-700">
            {episode.takeaways.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-mono text-xs text-zinc-600 uppercase mb-2">Cryptographic Proof</h4>
            <p className="font-mono text-xs text-zinc-700 break-all cursor-pointer hover:text-zinc-500">
              2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs text-zinc-600 uppercase mb-2">Tags</h4>
            <div className="flex gap-2">
              {episode.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs border border-zinc-800 px-2 py-1 text-zinc-500 font-mono hover:border-orange-900/30 cursor-pointer uppercase"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const NodesView = ({ onEpisodeClick }) => {
  const hosts = [
    { name: "Zeng Mi", role: "Operator / Facilitator", status: "SYNCED", twitter: "@zengmi_btc" },
    { name: "Ajian", role: "Protocol Researcher", status: "MINING", twitter: "@ajian_bitcoin" },
  ]

  const guests = [
    {
      name: "Burak",
      desc: "Ark 协议创造者，探索二层扩容新范式。",
      twitter: "@burak_k",
      connected: ["E023"],
      expertise: "Scaling",
    },
    {
      name: "Robin Linus",
      desc: "BitVM 发明人，ZeroSync 项目联合创始人。",
      twitter: "@robin_linus",
      connected: ["E022"],
      expertise: "Computation",
    },
    {
      name: "Shinobi",
      desc: "Bitcoin Magazine 技术编辑，硬核挖矿研究。",
      twitter: "@brian_trollz",
      connected: ["E018", "E012"],
      expertise: "Mining",
    },
    {
      name: "Luke Dashjr",
      desc: "Bitcoin Core 开发者，Ocean 矿池创始人。",
      twitter: "@LukeDashjr",
      connected: ["E015"],
      expertise: "Consensus",
    },
    {
      name: "Gloria Zhao",
      desc: "Bitcoin Core 维护者，专注于 Mempool 与 P2P。",
      twitter: "@glozow",
      connected: ["E012"],
      expertise: "P2P",
    },
    {
      name: "Peter Todd",
      desc: "RBF 倡导者，早期核心开发者与安全顾问。",
      twitter: "@peterktodd",
      connected: ["E009", "E004"],
      expertise: "Security",
    },
  ]

  const resources = [
    { name: "Bitcoin Optech", url: "bitcoinops.org", desc: "Newsletter for Bitcoin technical developments." },
    { name: "Mempool.space", url: "mempool.space", desc: "The best block explorer and visualizer." },
    { name: "Delving Bitcoin", url: "delvingbitcoin.org", desc: "Forum for deep technical discussion." },
    { name: "BIPs Index", url: "github.com/bitcoin/bips", desc: "Bitcoin Improvement Proposals repository." },
  ]

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-2">
          <Shield className="w-4 h-4 text-orange-700" />
          <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500">Core Nodes (Hosts)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hosts.map((host, idx) => (
            <div
              key={idx}
              className="border border-zinc-800 bg-zinc-950 p-6 relative overflow-hidden group hover:border-orange-900/30 transition-colors flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center border border-zinc-800">
                  <User className="w-6 h-6 text-zinc-500" />
                </div>
                <div>
                  <h3 className="font-mono text-lg text-zinc-200 font-bold">{host.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase">{host.role}</span>
                  </div>
                </div>
              </div>
              <a
                href={`https://twitter.com/${host.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 border border-zinc-800 hover:border-orange-700 hover:bg-zinc-900 transition-colors group/link"
              >
                <span className="font-mono text-xs text-zinc-500 group-hover/link:text-orange-500">UPLINK</span>
                <ExternalLink size={12} className="text-zinc-600 group-hover/link:text-orange-500" />
              </a>
              <div className="absolute -bottom-4 -right-4 text-zinc-900/20 font-mono text-6xl pointer-events-none select-none font-bold">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-2">
          <Network className="w-4 h-4 text-orange-700" />
          <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500">Discovered Peers (Guests)</h2>
        </div>
        <div className="border border-zinc-900 bg-zinc-950/50">
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 border-b border-zinc-900 text-[10px] font-mono text-zinc-600 uppercase">
            <div className="col-span-2">Peer ID</div>
            <div className="col-span-4">Descriptor (Info)</div>
            <div className="col-span-2">Net Addr</div>
            <div className="col-span-2">Capabilities</div>
            <div className="col-span-2 text-right">Channels</div>
          </div>
          <div className="divide-y divide-zinc-900">
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
                    className="text-zinc-600 hover:text-orange-500 text-xs flex items-center gap-1 transition-colors"
                  >
                    <AtSign size={10} />
                    {guest.twitter.replace("@", "")}
                  </a>
                </div>
                <div className="md:col-span-2 text-zinc-600 text-xs flex items-center">
                  <span className="border border-zinc-800 px-1.5 py-0.5 rounded-[2px]">{guest.expertise}</span>
                </div>
                <div className="md:col-span-2 flex md:justify-end gap-2 items-center">
                  {guest.connected.map((epId) => (
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

      <section>
        <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-2">
          <BookOpen className="w-4 h-4 text-orange-700" />
          <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500">Consensus Data (Resources)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((res, idx) => (
            <a
              key={idx}
              href={`https://${res.url}`}
              className="flex items-start gap-3 p-3 border border-zinc-900 hover:border-zinc-700 bg-zinc-950 transition-all group"
            >
              <div className="mt-1 text-zinc-600 group-hover:text-orange-600 transition-colors">
                <ExternalLink size={14} />
              </div>
              <div>
                <h4 className="font-mono text-sm text-zinc-300 group-hover:underline decoration-zinc-600 underline-offset-4">
                  {res.name}
                </h4>
                <div className="text-xs font-mono text-zinc-600 mb-1">{res.url}</div>
                <p className="text-xs font-serif text-zinc-500 italic">{res.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

const ManifestoView = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-3xl mx-auto">
    <div className="border border-zinc-800 bg-zinc-950 p-6 md:p-10 font-mono text-sm md:text-base leading-relaxed text-zinc-400 relative">
      <div className="text-zinc-600 text-xs mb-8 select-none">
        -----BEGIN PGP SIGNED MESSAGE-----
        <br />
        Hash: SHA256
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
          <p className="mt-4">在这个充斥着噪音的宇宙中，比特币是唯一的信号。它是数学的必然，而非政治的偶然。</p>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-4 tracking-tight">
            <span className="text-orange-700">#</span> 最大主义不是教条
          </h2>
          <p>我们被贴上“比特币最大主义者”的标签。这不是一种宗教信仰，而是一种工程推论。</p>
          <p className="mt-4">
            我们只关心去中心化。如果一个系统需要你信任它的开发者、它的基金会或它的验证节点联盟，那么它就不是革命，它只是数字化的旧世界。
            我们之所以排斥其他链，是因为它们在去中心化这个核心命题上作出了不可接受的妥协。
          </p>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-4 tracking-tight">
            <span className="text-orange-700">#</span> 验证，而非信任
          </h2>
          <p>"Don't Trust, Verify" 是我们的座营铭，也是我们制作这档播客的原则。</p>
          <p className="mt-4">
            在这档节目里，我们不讨论价格预测，不推荐投资标的。我们讨论协议升级（Protocol）、代码实现（Code）、博弈论（Game
            Theory）和自我主权（Self-Sovereignty）。 我们希望你能运行自己的全节点，掌握自己的私钥，验证我们所说的一切。
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
          <p className="mt-4">我们为密码朋克精神而声，为理性的自由主义者而设。</p>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-zinc-800 text-zinc-600 text-xs select-none">
        -----BEGIN PGP SIGNATURE-----
        <br />
        Version: GnuPG v2.4.0 (GNU/Linux)
        <br />
        <br />
        iQIzBAEBCAAdFiEE...
        <br />
        -----END PGP SIGNATURE-----
      </div>
      <span className="inline-block w-2.5 h-5 bg-orange-700 animate-pulse ml-1 align-middle"></span>
    </div>
  </div>
)

// --- Main App Component (Server Component) ---
export default async function Page() {
  const episodes = await getAllEpisodes()
  const guests = await getAllGuests()

  return <ClientPage episodes={episodes} guests={guests} />
}
