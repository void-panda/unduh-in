import ytdl from "@distube/ytdl-core";

export async function downloadYouTube(url: string) {
    try {
        if (!ytdl.validateURL(url)) {
            throw new Error("Invalid YouTube URL");
        }

        const ytdlOptions = {
            // WEB and WEB_EMBEDDED are essential for parsing watch.html correctly
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
