export async function downloadTikTok(url: string) {
    try {
        const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
        const res = await fetch(apiUrl);
        const data = await res.json();

        if (data.code !== 0) {
            throw new Error(data.msg || "Failed to fetch TikTok video");
        }

        const videoData = data.data;

        return {
            platform: "TikTok",
            title: videoData.title || "TikTok Video",
            thumbnail: videoData.cover,
            url: videoData.play, // No watermark URL
            type: "video",
        };
    } catch (error) {
        console.error("TikTok Download Error:", error);
        throw new Error("Failed to process TikTok video");
    }
}
