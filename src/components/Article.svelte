<script lang="ts">
  import type { NewsArticle } from "../routes/+page.server";
  import axios from "axios";

  async function getSentiment(input: string) {
    const request = await axios.post("./api/sentiment", { text: input });
    const text = await request.data;

    if (text) {
      return text;
    } else {
      throw new Error(text);
    }
  }

  export let post: NewsArticle;
  export let selectedTags: string[];
  let promise: Promise<any>;
  if (post.sentiment == null)
    promise = getSentiment(`${post.title} ${post.description}`).then((res) => {
      post.sentiment = res["sentiment"];
    });
</script>

<a
  class="flex flex-col mb-2 p-8 border text-black rounded-lg hover:bg-sky-100 transition-all hover:cursor-pointer"
  href={post.link}
>
  <h1 class="text-xl font-bold">{post.title}</h1>
  <div class="flex flex-col md:flex-row ">
    <section class="flex flex-col">
      <p class="text-gray-500 text-sm">{post.author}, {post.source}</p>
      <p>{post.description}</p>
      {#await promise}
        <p class="font-bold text-sm mt-1">Analyzing Sentiment...</p>
      {:then}
        <p class="font-bold text-sm mt-1">
          Sentiment: {post.sentiment?.toFixed(2)}
        </p>
      {/await}
    </section>
  </div>
  <div class="flex flex-wrap gap-2 mt-5">
    {#if post.topics}
      {#each post.topics as topic}
        <div
          class="text-sm rounded-lg border px-3 py-1 transition-all border-gray-400"
          class:bg-black={selectedTags.indexOf(topic) > -1}
          class:text-white={selectedTags.indexOf(topic) > -1}
        >
          {topic}
        </div>
      {/each}
    {/if}
  </div>
</a>
