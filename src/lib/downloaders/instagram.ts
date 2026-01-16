// @ts-ignore
const instagramFn = require("instagram-url-direct");
const instagramGetUrl = instagramFn.instagramGetUrl;

export async function downloadInstagram(url: string) {
    try {
        const data = await instagramGetUrl(url);

        // data.url_list is an array of strings (urls)
        // We just take the first one
        if (!data.url_list || data.url_list.length === 0) {
            throw new Error("No media found");
        }

        const downloadUrl = data.url_list[0];
        const title = "Instagram Media";
        const thumbnail = ""; // This lib might not return generic thumbnail easily, we can use a placeholder or try to fetch it if really needed, but for now empty.

        return {
            platform: "Instagram",
            title,
            thumbnail: "/instagram-placeholder.png", // Or maybe empty string? Frontend handles valid url. Let's send empty string and fix frontend if needed.
            url: downloadUrl,
            type: "video",
        };
    } catch (error) {
        console.error("Instagram Download Error:", error);
        throw new Error("Failed to process Instagram media");
    }
}
