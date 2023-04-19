<script lang="ts">
  import type { NewsArticle } from "../routes/+page.server";
  import { fade, fly } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { flip } from "svelte/animate";
  import _ from "lodash";

  import Article from "./Article.svelte";

  export let posts: NewsArticle[];
  export let selectedTags: string[];
  // export let search: string;

  export let positiveNews: boolean;
  export let neutralNews: boolean;
  export let negativeNews: boolean;
</script>

<div class="">
  {#each posts.filter((e) => {
    if (!positiveNews && (e.sentiment ?? 0) > 10) return false;
    if (!negativeNews && (e.sentiment ?? 0) < -10) return false;
    if (!neutralNews && (e.sentiment ?? 0) >= -10 && (e.sentiment ?? 0) <= 10) return false;

    if (selectedTags.length == 0) return true;
    if (_.intersection(selectedTags, e.topics).length > 0) {
      return true;
    }
    // else if (new RegExp("^" + search + "$", "i").test(e.title)) return true;
    else return false;
  }) as post (post.key)}
    <!-- {#if selectedTags.length == 0 || _.intersection(selectedTags, post.topics).length > 0} -->
    <Article bind:post {selectedTags} />
    <!-- {/if} -->
  {/each}
</div>
