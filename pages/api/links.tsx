import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let websiteUrl: string = req.query.url as string;

  if (!websiteUrl.startsWith("http")) {
    websiteUrl = `http://${websiteUrl}`;
  }

  if (!websiteUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const url = new URL(websiteUrl);

    const { data } = await axios.get(url.toString());
    const $ = cheerio.load(data);
    const links: string[] = [];

    $("a").each((_, element) => {
      const href = $(element).attr("href");

      if (href && !href.startsWith("#")) {
        const resolvedLink = href.startsWith("http")
          ? href
          : new URL(href, websiteUrl).href;
        const linkDomain = new URL(resolvedLink).hostname;

        // Only include links that match the base domain (internal links)
        if (linkDomain === url.hostname) {
          links.push(resolvedLink);
        }
      }
    });

    return res.status(200).json(links);
  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({ error: "Failed to fetch the page" });
  }
}
