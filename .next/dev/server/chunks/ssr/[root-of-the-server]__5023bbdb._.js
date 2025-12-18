module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/lib/episodes.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatHosts",
    ()=>formatHosts,
    "getAllEpisodes",
    ()=>getAllEpisodes,
    "getEpisodeBySlug",
    ()=>getEpisodeBySlug
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gray-matter/index.js [app-rsc] (ecmascript)");
;
;
;
const episodesDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "content/episodes");
function getAllEpisodes() {
    // 检查目录是否存在
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(episodesDirectory)) {
        return [];
    }
    const fileNames = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(episodesDirectory);
    const episodes = fileNames.filter((fileName)=>fileName.endsWith(".md")).map((fileName)=>{
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(episodesDirectory, fileName);
        const fileContents = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(fullPath, "utf8");
        let data, content;
        try {
            const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(fileContents);
            data = parsed.data;
            content = parsed.content;
            console.log(`[v0 Server] Parsed ${fileName}:`, {
                id: data.id,
                title: data.title,
                audioUrl: data.audioUrl,
                audioUrlType: typeof data.audioUrl
            });
        } catch (error) {
            console.error(`[v0] Error parsing ${fileName}:`, error);
            console.error(`[v0] File content preview:`, fileContents.substring(0, 200));
            throw new Error(`Failed to parse ${fileName}: ${error}`);
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
            status: data.status || "draft"
        };
    })// 按日期降序排序
    .sort((a, b)=>a.date > b.date ? -1 : 1)// 只返回已发布的
    .filter((ep)=>ep.status === "published");
    return episodes;
}
function getEpisodeBySlug(slug) {
    const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(episodesDirectory, `${slug}.md`);
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(fullPath)) {
        return null;
    }
    const fileContents = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(fullPath, "utf8");
    const { data, content } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(fileContents);
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
        status: data.status || "draft"
    };
}
function formatHosts(episode) {
    const hostStr = episode.hosts.join(" / ");
    if (episode.guests.length > 0) {
        return `${hostStr} / 嘉宾: ${episode.guests.join(", ")}`;
    }
    return hostStr;
}
}),
"[project]/lib/guests.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllGuests",
    ()=>getAllGuests
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const guestsFile = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "content/guests/guests.md");
function getAllGuests() {
    // 检查文件是否存在
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(guestsFile)) {
        console.warn("[v0] guests.md file not found");
        return [];
    }
    try {
        const fileContents = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(guestsFile, "utf8");
        // 提取 YAML 代码块中的内容
        const yamlMatch = fileContents.match(/```yaml\n([\s\S]*?)\n```/);
        if (!yamlMatch) {
            console.warn("[v0] No YAML code block found in guests.md");
            return [];
        }
        const yamlContent = yamlMatch[1];
        // 简单的 YAML 解析器，处理嘉宾列表
        const guests = [];
        const entries = yamlContent.split(/\n- name:/);
        entries.forEach((entry, index)=>{
            if (index === 0 && !entry.includes("name:")) return; // 跳过第一个分割（标题部分）
            const fullEntry = (index === 0 ? "" : "- name:") + entry;
            // 提取 name
            const nameMatch = fullEntry.match(/name:\s*"([^"]+)"/);
            const name = nameMatch ? nameMatch[1] : "";
            // 提取 desc
            const descMatch = fullEntry.match(/desc:\s*"([^"]+)"/);
            const desc = descMatch ? descMatch[1] : "";
            // 提取 twitter
            const twitterMatch = fullEntry.match(/twitter:\s*"([^"]+)"/);
            const twitter = twitterMatch ? twitterMatch[1] : "";
            // 提取 episodes 数组
            const episodesMatch = fullEntry.match(/episodes:\s*\[([\s\S]*?)\]/);
            let episodes = [];
            if (episodesMatch) {
                const episodesStr = episodesMatch[1];
                episodes = episodesStr.split(",").map((e)=>e.trim().replace(/"/g, "")).filter((e)=>e.length > 0);
            }
            if (name) {
                guests.push({
                    name,
                    desc,
                    twitter,
                    episodes
                });
            }
        });
        return guests;
    } catch (error) {
        console.error("[v0] Error parsing guests.md:", error);
        return [];
    }
}
}),
"[project]/components/client-page.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/client-page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/client-page.tsx <module evaluation>", "default");
}),
"[project]/components/client-page.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/client-page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/client-page.tsx", "default");
}),
"[project]/components/client-page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$client$2d$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/client-page.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$client$2d$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/client-page.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$client$2d$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$episodes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/episodes.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$guests$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/guests.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$client$2d$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/client-page.tsx [app-rsc] (ecmascript)");
;
;
;
;
async function Page() {
    const episodes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$episodes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllEpisodes"])();
    const guests = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$guests$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllGuests"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$client$2d$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        episodes: episodes,
        guests: guests
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 9,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5023bbdb._.js.map