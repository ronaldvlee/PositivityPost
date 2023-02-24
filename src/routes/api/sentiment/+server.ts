import type { RequestEvent } from "./$types";
import { json } from "@sveltejs/kit";
import aposToLexForm from "apos-to-lex-form";
import natural from "natural";

const { WordTokenizer, SentimentAnalyzer, PorterStemmer } = natural;

function sentiment(string: string, vocabulary: string) {
  const tokenizer = new WordTokenizer();
  const tokenized = tokenizer.tokenize(
    aposToLexForm(string)
      .replace(/[.,\/#\-!$%\^&\*';:{}=\-_`~()]|undefined/g, "")
      .toLowerCase()
  );
  const analyzer = new SentimentAnalyzer("English", PorterStemmer, vocabulary);
  return analyzer.getSentiment(tokenized) * 100;
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: RequestEvent): Promise<Response> {
  const j = await request.json();
  const { text } = j;
  const res = {
    // afinn: sentiment(text, "afinn"),
    sentiment: sentiment(text, "afinn"),
    // pattern: sentiment(text, "pattern"),
  };
  return json(res);
}
