import ytdl from "@distube/ytdl-core";

export async function downloadYouTube(url: string) {
    try {
        if (!ytdl.validateURL(url)) {
            throw new Error("Invalid YouTube URL");
        }

        const cookies = process.env.YOUTUBE_COOKIE;

        let agent;
        if (cookies) {
            try {
                // If it looks like a JSON array, parse it.
                // Otherwise, try to use it as a raw cookie string if the library supports it, 
                // but we cast to any to satisfy the strict library types.
                const cookieData = cookies.trim().startsWith('[') ? JSON.parse(cookies) : cookies;
                agent = ytdl.createAgent(cookieData as any);
            } catch (e) {
                console.error("Failed to parse YOUTUBE_COOKIE:", e);
                // Fallback attempt with raw string
                try {
                    agent = ytdl.createAgent(cookies as any);
                } catch (innerE) {
                    console.error("Agent creation failed:", innerE);
                }
            }
        }

        const ytdlOptions = {
            agent,
            playerClients: ["WEB", "WEB_EMBEDDED", "ANDROID", "IOS"] as any,
            requestOptions: {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
                },
            },
        };

        const info = await ytdl.getInfo(url, ytdlOptions);
        const title = info.videoDetails.title;
        const thumbnails = info.videoDetails.thumbnails;
        const thumbnail = thumbnails[thumbnails.length - 1].url; // Best quality

        // Best Video Format (Video + Audio)
        let videoFormat: any = null;
        try {
            videoFormat = ytdl.chooseFormat(info.formats, { quality: "highest", filter: "audioandvideo" });
        } catch (e) {
            videoFormat = ytdl.filterFormats(info.formats, "audioandvideo")[0];
        }

        if (!videoFormat || !videoFormat.url) {
            throw new Error("No suitable video format found");
        }

        return {
            platform: "YouTube",
            title,
            thumbnail,
            url: videoFormat.url,
            type: "video",
            videoQuality: videoFormat.qualityLabel,
        };
    } catch (error) {
        console.error("YouTube Download Error:", error);
        throw new Error("Failed to process YouTube video");
    }
}
