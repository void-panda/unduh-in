import { NextRequest, NextResponse } from "next/server";
import { downloadTikTok } from "@/lib/downloaders/tiktok";
import { downloadYouTube } from "@/lib/downloaders/youtube";
import { downloadInstagram } from "@/lib/downloaders/instagram";
import { downloadFacebook } from "@/lib/downloaders/facebook";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let result;

    if (url.includes("tiktok.com")) {
      result = await downloadTikTok(url);
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
      result = await downloadYouTube(url);
    } else if (url.includes("instagram.com")) {
      result = await downloadInstagram(url);
    } else if (url.includes("facebook.com") || url.includes("fb.watch")) {
      result = await downloadFacebook(url);
    } else {
      return NextResponse.json({ error: "Unsupported platform" }, { status: 400 });
    }

    if (!result) {
      return NextResponse.json({ error: "Failed to fetch download link" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Download API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
