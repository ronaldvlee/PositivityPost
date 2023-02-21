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
  // preprocess rss feeds, everything has a different format for what
  const processed: NewsArticle[] = [];
  await Promise.all([
    parser.parseURL("https://fivethirtyeight.com/all/feed").then((payload) => {
      for (let article of payload.items) {
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
    }),
    parser
      .parseURL("https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml")
      .then((payload) => {
        for (let article of payload.items) {
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
      }),
    parser
      .parseURL(
        "https://www.latimes.com/world-nation/rss2.0.xml#nt=0000016c-0bf3-d57d-afed-2fff84fd0000-1col-7030col1"
      )
      .then((payload) => {
        for (let article of payload.items) {
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
      }),
    parser.parseURL("https://abc7.com/feed/").then((payload) => {
      for (let article of payload.items) {
        if (!article || !article.categories) break;
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
    }),
    parser
      .parseURL(
        "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100003114"
      )
      .then((payload) => {
        for (let article of payload.items) {
          processed.push({
            title: article.title as string,
            author: (article.creator as string) ?? "N/A",
            link: article.link as string,
            description: article.contentSnippet as string,
            date: dayjs(article.isoDate as string).toString(),
            source: "CNBC",
            sentiment: null,
          });
        }
      }),
    parser.parseURL("http://feeds.bbci.co.uk/news/rss.xml").then((payload) => {
      for (let article of payload.items) {
        processed.push({
          title: article.title as string,
          author: (article.creator as string) ?? "N/A",
          link: article.link as string,
          description: article.contentSnippet as string,
          date: dayjs(article.isoDate as string).toString(),
          source: "BBC",
          sentiment: null,
        });
      }
    }),
    parser
      .parseURL(
        "https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=bestl"
      )
      .then((payload) => {
        for (let article of payload.items) {
          processed.push({
            title: article.title as string,
            author: (article.creator as string) ?? "N/A",
            link: article.link as string,
            description: article.contentSnippet as string,
            date: dayjs(article.isoDate as string).toString(),
            source: "Reuters",
            sentiment: null,
          });
        }
      }),
    parser
      .parseURL("https://www.cbsnews.com/latest/rss/main")
      .then((payload) => {
        for (let article of payload.items) {
          processed.push({
            title: article.title as string,
            author: (article.creator as string) ?? "N/A",
            link: article.link as string,
            description: article.contentSnippet as string,
            date: dayjs(article.pubDate as string).toString(),
            source: "CBS",
            sentiment: null,
          });
        }
      }),
  ]);

  return { articles: JSON.stringify(processed) };
}) satisfies PageServerLoad;
