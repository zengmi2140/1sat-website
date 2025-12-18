import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface Episode {
  id: string
  title: string
  date: string
  duration: string
  category: string
  hosts: string[]
  guests: string[]
  tags: string[]
  summary: string
  audioUrl: string
  status: "published" | "draft"
  content: string
  slug: string
}

const episodesDirectory = path.join(process.cwd(), "content/episodes")

export function getAllEpisodes(): Episode[] {
  // 检查目录是否存在
  if (!fs.existsSync(episodesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(episodesDirectory)
  const episodes = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(episodesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      let data, content
      try {
        const parsed = matter(fileContents)
        data = parsed.data
        content = parsed.content

        console.log(`[v0 Server] Parsed ${fileName}:`, {
          id: data.id,
          title: data.title,
          audioUrl: data.audioUrl,
          audioUrlType: typeof data.audioUrl,
        })
      } catch (error) {
        console.error(`[v0] Error parsing ${fileName}:`, error)
        console.error(`[v0] File content preview:`, fileContents.substring(0, 200))
        throw new Error(`Failed to parse ${fileName}: ${error}`)
      }

      return {
        slug,
        content,
        id: data.id || "",
        title: data.title || "",
        date: data.date || "",
        duration: data.duration || "",
        category: data.category || "",
        hosts: data.hosts || [],
        guests: data.guests || [],
        tags: data.tags || [],
        summary: data.summary || "",
        audioUrl: data.audioUrl || "",
        status: data.status || "draft",
      } as Episode
    })
    // 按日期降序排序
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    // 只返回已发布的
    .filter((ep) => ep.status === "published")

  return episodes
}

export function getEpisodeBySlug(slug: string): Episode | null {
  const fullPath = path.join(episodesDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    id: data.id || "",
    title: data.title || "",
    date: data.date || "",
    duration: data.duration || "",
    category: data.category || "",
    hosts: data.hosts || [],
    guests: data.guests || [],
    tags: data.tags || [],
    summary: data.summary || "",
    audioUrl: data.audioUrl || "",
    status: data.status || "draft",
  } as Episode
}

// 格式化 hosts 为显示字符串
export function formatHosts(episode: Episode): string {
  const hostStr = episode.hosts.join(" / ")
  if (episode.guests.length > 0) {
    return `${hostStr} / 嘉宾: ${episode.guests.join(", ")}`
  }
  return hostStr
}
