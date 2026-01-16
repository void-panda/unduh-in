// @ts-ignore
const fbScrapper = require("fb-downloader-scrapper");

export async function downloadFacebook(url: string) {
    try {
        // Handling CJS import variation
        const getFbVideoInfo = fbScrapper.getFbVideoInfo || fbScrapper.default?.getFbVideoInfo || fbScrapper;

        if (typeof getFbVideoInfo !== 'function') {
            throw new Error("Facebook downloader library malformed: getFbVideoInfo is not a function");
        }

        const data = await getFbVideoInfo(url);

        // Likely returns { success: true, hd: '...', sd: '...', title: '...', thumbnail: '...' }

        // Check for success or valid data
        if (!data) throw new Error("No data returned");

        const title = data.title || "Facebook Video";
        const thumbnail = data.thumbnail || data.image || "";
        const downloadUrl = data.hd || data.sd || data.url;

        if (!downloadUrl) throw new Error("No download URL found");

        return {
            platform: "Facebook",
            title,
            thumbnail,
            url: downloadUrl,
            type: "video",
        };
    } catch (error) {
        console.error("Facebook Download Error:", error);
        throw new Error("Failed to process Facebook video");
    }
}
