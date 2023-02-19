<script lang="ts">
  import _ from "lodash";
  import { fade, fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import type { NewsArticle } from "../routes/+page.server";
  import { goto } from "$app/navigation";

  export let posts: NewsArticle[];
  export let selectedTags: string[];
  export let search: string;

  export let positiveNews: boolean;
  export let neutralNews: boolean;
  export let negativeNews: boolean;
</script>

<div class="">
  {#each posts.filter((e) => {
    if (!positiveNews && e.sentiment > 10) return false;
    if (!negativeNews && e.sentiment < -10) return false;
    if (!neutralNews && e.sentiment >= -10 && e.sentiment <= 10) return false;

    if (selectedTags.length == 0) return true;
    if (_.intersection(selectedTags, e.topics).length > 0) {
      return true;
    }
    // else if (new RegExp("^" + search + "$", "i").test(e.title)) return true;
    else return false;
  }) as post (post.title)}
    <!-- {#if selectedTags.length == 0 || _.intersection(selectedTags, post.topics).length > 0} -->
    <a
      class="flex flex-col mb-2 p-8 border text-black rounded-lg hover:bg-sky-100 transition-all hover:cursor-pointer"
      href={post.link}
    >
      <h1 class="text-xl font-bold">{post.title}</h1>
      <div class="flex flex-col md:flex-row ">
        <section class="flex flex-col">
          <p class="text-gray-500 text-sm">{post.author}, {post.source}</p>
          <p>{post.description}</p>
          <p>Sentiment: {post.sentiment.toFixed(2)}</p>
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
    <!-- {/if} -->
  {/each}
</div>
