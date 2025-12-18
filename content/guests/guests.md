---
description: "亿聪哲史播客嘉宾名录"
---

# Guests

嘉宾信息采用 YAML 格式，每位嘉宾包含以下字段：
- name: 嘉宾名字
- desc: 嘉宾介绍
- twitter: 社交媒体账号（Twitter/X）
- episodes: 参与过的节目列表（对应 Episode ID，如 E01, E02）

---

## 嘉宾列表

```yaml
- name: "姚翔"
  desc: "原语里弄发起人"
  twitter: "@TimeOfSand"
  episodes: ["E01", "E03", "E08", "E10", "E12"] 

- name: "张瑜"
  desc: "bitcoiner"
  twitter: "@realoctoshi⁠"
  episodes: ["E01", "E03", "E08", "E13", "E14"]

- name: "刘力心"
  desc: "Keystone 硬件钱包创始人"
  twitter: "@BitcoinLixin"
  episodes: ["E02"]

- name: "Jeffrey Hu"
  desc: "HashKey Capital 技术总监"
  twitter: "@jeffrey_hu"
  episodes: ["E03", "E08", "E13", "E14", "E15", "E17", "E20", "E22"]   

- name: "大山"
  desc: "水滴资本联合创始人"
  twitter: "@shanshan521"
  episodes: ["E04"]

- name: "志宇"
  desc: "BDK 开发者"
  twitter: "@evanlinjin"
  episodes: ["E05"]

- name: "Antonio Yang"
  desc: "kuutamo 工程师"
  twitter: ""
  episodes: ["E07"]

- name: "YY"
  desc: "Lightning Labs 工程师"
  twitter: "@yyforyongyu"
  episodes: ["E09", "E13", "E14", "E17"]

- name: "Kurt Pan"
  desc: "ZKPunk, Crypto Primitive"
  twitter: "@"
  episodes: ["E11"]

- name: "陈东"
  desc: "Keystone CTO"
  twitter: "aaron1sme"
  episodes: ["E16"]

- name: "Retric"
  desc: "Nostr 开发者"
  twitter: "@⁠realdigimonkey"
  episodes: ["E18"]

- name: "Jamie"
  desc: "owner of Joobar"
  twitter: "@joobarsg"
  episodes: ["E19"]

- name: "Aaron Zhang"
  desc: "《Mastering Taproot》作者"
  twitter: "@zzmjxy"
  episodes: ["E21", "E23"]
```

---

## 如何添加新嘉宾

在上方 yaml 代码块中添加新条目，格式如下：

```yaml
- name: "嘉宾名字"
  desc: "嘉宾的简短介绍"
  twitter: "@twitter_handle"
  episodes: ["E01", "E05"]
```

注意事项：
- episodes 中的 ID 必须与 `/content/episodes/` 文件夹中的文件名一致
- twitter 字段需要包含 @ 符号
- desc 建议控制在 50 字以内
