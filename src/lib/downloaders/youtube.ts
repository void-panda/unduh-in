import { Innertube, UniversalCache } from "youtubei.js";

// Initialize a static client to reuse connections
let yt: Innertube | null = null;

async function getYouTubeClient() {
    if (!yt) {
        // Use a cache to store session data if needed
        yt = await Innertube.create({
            cache: new UniversalCache(false),
            generate_session_locally: true,
            cookie: process.env.YOUTUBE_COOKIE || ""
        });
    }
    return yt;
}

export async function downloadYouTube(url: string) {
    try {
        console.log(`[YouTube] Starting download with youtubei.js. Cookie present: ${!!process.env.YOUTUBE_COOKIE}`);

        const client = await getYouTubeClient();

        // Extract video ID from URL
        const videoId = extractVideoId(url);
        if (!videoId) {
            throw new Error("Could not extract Video ID from URL");
        }

        const info = await client.getInfo(videoId);
        if (!info) {
            throw new Error("Failed to get video info");
        }

        // Check if streaming data is present (if missing, we are likely blocked)
        if (!info.streaming_data) {
            console.error("[YouTube] Metadata retrieved, but streaming_data is missing. This usually means the server IP is blocked or a cookie is required.");
            throw new Error("Streaming data not available (YouTube Blocked)");
        }

        const title = info.basic_info.title || "YouTube Video";
        const thumbnail = info.basic_info.thumbnail?.[0]?.url || "";

        // Choose the best format that has both video and audio
        let format;
        try {
            format = info.chooseFormat({
                type: 'video+audio',
                quality: 'best'
            });
        } catch (e) {
            console.warn("[YouTube] Failed to find best video+audio format, trying fallback...");
        }

        if (!format) {
            // Fallback: search for any video format
            format = info.chooseFormat({ type: 'video', quality: 'best' });
        }

        if (!format) {
            throw new Error("No suitable video format found");
        }

        // Decipher URL if needed (InnerTube formats usually have .url or .signature_cipher)
        const downloadUrl = format.decipher(client.session.player);

        if (!downloadUrl) {
            throw new Error("Failed to get or decipher download URL");
        }

        console.log(`[YouTube] Successfully retrieved media for: ${title}`);

        return {
            platform: "YouTube",
            title,
            thumbnail,
            url: downloadUrl,
            type: "video" as const,
            videoQuality: format.quality_label || "Unknown",
        };
    } catch (error) {
        console.error("YouTube Download Error:", error);
        throw new Error("Failed to process YouTube video");
    }
}

function extractVideoId(url: string): string | null {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
