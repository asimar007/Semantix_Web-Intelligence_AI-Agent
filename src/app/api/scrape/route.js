import { NextResponse } from "next/server";
import { scrapeWebsite } from "@/lib/scraper";

export async function POST(req) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  // Basic URL validation
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
  }

  const content = await scrapeWebsite(parsed.href);

  if (!content || content.length < 50) {
    return NextResponse.json(
      { error: "Unable to extract meaningful content from this website" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    content,
    url: parsed.href,
    contentLength: content.length,
  });
}
