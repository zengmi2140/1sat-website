import fs from "fs"
import path from "path"

export interface Guest {
  name: string
  desc: string
  twitter: string
  episodes: string[]
}

const guestsFile = path.join(process.cwd(), "content/guests/guests.md")

export function getAllGuests(): Guest[] {
  // 检查文件是否存在
  if (!fs.existsSync(guestsFile)) {
    console.warn("[v0] guests.md file not found")
    return []
  }

  try {
    const fileContents = fs.readFileSync(guestsFile, "utf8")

    // 提取 YAML 代码块中的内容
    const yamlMatch = fileContents.match(/```yaml\n([\s\S]*?)\n```/)
    if (!yamlMatch) {
      console.warn("[v0] No YAML code block found in guests.md")
      return []
    }

    const yamlContent = yamlMatch[1]

    // 简单的 YAML 解析器，处理嘉宾列表
    const guests: Guest[] = []
    const entries = yamlContent.split(/\n- name:/)

    entries.forEach((entry, index) => {
      if (index === 0 && !entry.includes("name:")) return // 跳过第一个分割（标题部分）

      const fullEntry = (index === 0 ? "" : "- name:") + entry

      // 提取 name
      const nameMatch = fullEntry.match(/name:\s*"([^"]+)"/)
      const name = nameMatch ? nameMatch[1] : ""

      // 提取 desc
      const descMatch = fullEntry.match(/desc:\s*"([^"]+)"/)
      const desc = descMatch ? descMatch[1] : ""

      // 提取 twitter
      const twitterMatch = fullEntry.match(/twitter:\s*"([^"]+)"/)
      const twitter = twitterMatch ? twitterMatch[1] : ""

      // 提取 episodes 数组
      const episodesMatch = fullEntry.match(/episodes:\s*\[([\s\S]*?)\]/)
      let episodes: string[] = []
      if (episodesMatch) {
        const episodesStr = episodesMatch[1]
        episodes = episodesStr
          .split(",")
          .map((e) => e.trim().replace(/"/g, ""))
          .filter((e) => e.length > 0)
      }

      if (name) {
        guests.push({
          name,
          desc,
          twitter,
          episodes,
        })
      }
    })

    return guests
  } catch (error) {
    console.error("[v0] Error parsing guests.md:", error)
    return []
  }
}
