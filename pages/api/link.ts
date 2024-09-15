import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const websiteUrl = searchParams.get("url");

  if (!websiteUrl) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const { data } = await axios.get(websiteUrl);
    const $ = cheerio.load(data);
    const links: string[] = [];

    $("a").each((_, element) => {
      const href = $(element).attr("href");
      if (href && !href.startsWith("#")) {
        links.push(
          href.startsWith("http") ? href : new URL(href, websiteUrl).href
        );
      }
    });

    return NextResponse.json(links);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch the page" },
      { status: 500 }
    );
  }
}
