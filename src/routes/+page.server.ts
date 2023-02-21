import Parser from "rss-parser";
import type { PageServerLoad } from "./$types";
import dayjs from "dayjs";
import { JSDOM } from "jsdom";

function htmlDecode(input: string) {
  return input;
  const dom = new JSDOM(input);
  return dom.window.document.textContent;
}

export interface NewsArticle {
  author: string;
  title: string;
  link: string;
  date: string;
  description: string;
  source: string;
  sentiment: number | null;
  topics?: string[];
}

export const load = (async () => {
  const payload: any = {};
  let parser = new Parser();
  payload["fivethirtyeight"] = await parser.parseURL(
    "https://fivethirtyeight.com/all/feed"
  );
  payload["New York Times"] = await parser.parseURL(
    "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
  );
  payload["Los Angeles Times"] = await parser.parseURL(
    "https://www.latimes.com/world-nation/rss2.0.xml#nt=0000016c-0bf3-d57d-afed-2fff84fd0000-1col-7030col1"
  );

  payload["ABC"] = await parser.parseURL("https://abc7.com/feed/");

  // preprocess rss feeds, everything has a different format for what
  const processed: NewsArticle[] = [];
  for (let article of payload["fivethirtyeight"].items) {
    processed.push({
      title: article.title as string,
      author: article.creator as string,
      link: article.link as string,
      description: htmlDecode(article.content as string) ?? "",
      date: dayjs(article.isoDate as string).toString(),
      source: "FiveThirtyEight",
      sentiment: null,
      topics: article.categories,
    });
  }
  for (let article of payload["New York Times"].items) {
    processed.push({
      title: article.title as string,
      author: (article.creator as string) ?? "N/A",
      link: article.link as string,
      description: article.content as string,
      date: dayjs(article.isoDate as string).toString(),
      source: "New York Times",
      sentiment: null,
      topics: article?.categories?.map((e: any) => e["_"]),
    });
  }
  for (let article of payload["Los Angeles Times"].items) {
    processed.push({
      title: article.title as string,
      author: (article.creator as string) ?? "N/A",
      link: article.link as string,
      description: article.contentSnippet as string,
      date: dayjs(article.isoDate as string).toString(),
      source: "Los Angeles Times",
      sentiment: null,
    });
  }

  for (let article of payload["ABC"].items) {
    processed.push({
      title: article.title as string,
      author: (article.creator as string) ?? "N/A",
      link: article.link as string,
      description: article.contentSnippet as string,
      date: dayjs(article.isoDate as string).toString(),
      source: "ABC",
      sentiment: null,
      topics: article?.categories[0]?.replace(/^\s+|\s+$/g, "").split(","),
    });
  }

  return { articles: JSON.stringify(processed) };
}) satisfies PageServerLoad;
