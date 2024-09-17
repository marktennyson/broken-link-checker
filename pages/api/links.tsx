import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";

// A helper function to check if a URL is internal
const isInternalLink = (link: string, baseDomain: string) => {
  try {
    const linkDomain = new URL(link).hostname;
    return linkDomain === baseDomain;
  } catch {
    return false;
  }
};

// Recursive function to fetch links from a page and its subpages
async function fetchLinksRecursively(
  url: string,
  baseDomain: string,
  visitedUrls: Set<string>,
  parentUrl: string | null,
  depth: number = 3 // limit recursion depth
): Promise<{ url: string; parentUrl: string | null }[]> {
  if (visitedUrls.has(url) || depth === 0) return [];
  visitedUrls.add(url);

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const links: { url: string; parentUrl: string | null }[] = [];

    $("a").each((_, element) => {
      const href = $(element).attr("href");
      if (href && !href.startsWith("#")) {
        const resolvedLink = href.startsWith("http")
          ? href
          : new URL(href, url).href;

        if (
          isInternalLink(resolvedLink, baseDomain) &&
          !visitedUrls.has(resolvedLink)
        ) {
          links.push({ url: resolvedLink, parentUrl: url });
        }
      }
    });

    // Recursively fetch links from subpages
    const subpageLinks = await Promise.all(
      links.map(async (link) => {
        return await fetchLinksRecursively(
          link.url,
          baseDomain,
          visitedUrls,
          link.parentUrl,
          depth - 1 // Decrease the depth with each recursive call
        );
      })
    );

    return links.concat(subpageLinks.flat());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching page:", error.message);
    return [];
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let websiteUrl: string = req.query.url as string;

  if (!websiteUrl.startsWith("http")) {
    websiteUrl = `https://${websiteUrl}`;
  }

  if (!websiteUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const url = new URL(websiteUrl);
    const visitedUrls = new Set<string>();

    // Start recursive link fetching from the base URL
    const allLinks = await fetchLinksRecursively(
      websiteUrl,
      url.hostname,
      visitedUrls,
      null
    );

    return res.status(200).json(allLinks);
  } catch (error) {
    console.error("Error fetching page:", error);
    return res.status(500).json({ error: "Failed to fetch the page" });
  }
}
