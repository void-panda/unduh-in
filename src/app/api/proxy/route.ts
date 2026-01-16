import { NextRequest, NextResponse } from "next/server";
import https from "https";
import { Readable } from "stream";

export async function GET(req: NextRequest) {
    const encodedUrl = req.nextUrl.searchParams.get("url");
    const filename = req.nextUrl.searchParams.get("filename") || "download";

    if (!encodedUrl) {
        return NextResponse.json({ error: "Missing URL" }, { status: 400 });
    }

    // Decode Base64 URL
    let url: string;
    try {
        url = Buffer.from(encodedUrl, 'base64').toString('utf-8');
    } catch (e) {
        return NextResponse.json({ error: "Invalid encoded URL" }, { status: 400 });
    }

    // Return a promise that resolves to a NextResponse
    return new Promise<NextResponse>((resolve) => {
        const options = {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
                "Accept": "*/*",
                "Accept-Language": "en-US,en;q=0.9",
                "Range": "bytes=0-",
                "Referer": "https://www.youtube.com/",
                "Origin": "https://www.youtube.com",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "cross-site",
                "Sec-Fetch-Dest": "video",
            }
        };

        const proxyReq = https.get(url, options, (res) => {
            console.log(`Upstream Response: ${res.statusCode} ${url.substring(0, 50)}...`);

            if (res.statusCode && (res.statusCode >= 400)) {
                console.error("Upstream Error Status:", res.statusCode);
                // Inform user about rejection
                resolve(NextResponse.json({
                    error: "Platform refused request (Error " + res.statusCode + ")",
                    status: res.statusCode
                }, { status: 502 }));
                return;
            }

            const contentType = res.headers["content-type"] || "video/mp4";
            const contentLength = res.headers["content-length"];

            const headers = new Headers();
            headers.set("Content-Type", contentType);
            if (contentLength) {
                headers.set("Content-Length", contentLength);
            }

            const safeFilename = filename.replace(/[^a-zA-Z0-9.\-_ ]/g, '_');
            headers.set("Content-Disposition", `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(filename)}`);

            // Convert Node.js Readable to Web ReadableStream
            const nodeStream = Readable.toWeb(res as any);

            resolve(new NextResponse(nodeStream as any, {
                status: 200,
                headers,
            }));
        });

        proxyReq.on('error', (error) => {
            console.error("Proxy Request Error:", error);
            resolve(NextResponse.json({
                error: "Proxy internal error",
                message: error.message
            }, { status: 500 }));
        });
    });
}
