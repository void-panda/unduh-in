// @ts-ignore
const instagramFn = require("instagram-url-direct");
const instagramGetUrl = instagramFn.instagramGetUrl;

export async function downloadInstagram(url: string) {
    try {
        const cookies = process.env.INSTAGRAM_COOKIE;

        // Custom headers to mimic a browser better
        const headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Referer": "https://www.instagram.com/",
            "Cookie": cookies || "",
        };

        const data = await instagramGetUrl(url);

        // If the library returns 401, try to log and handle or use fallback
        if (!data || data.error) {
            throw new Error(data?.error || "Failed to fetch Instagram data");
        }

        // data.url_list is an array of strings (urls)
        // We just take the first one
        if (!data.url_list || data.url_list.length === 0) {
            throw new Error("No media found");
        }

        const downloadUrl = data.url_list[0];
        const title = "Instagram Media";

        return {
            platform: "Instagram",
            title,
            thumbnail: "/instagram-placeholder.png",
            url: downloadUrl,
            type: "video",
        };
    } catch (error) {
        console.error("Instagram Download Error:", error);
        throw new Error("Failed to process Instagram media");
    }
}
