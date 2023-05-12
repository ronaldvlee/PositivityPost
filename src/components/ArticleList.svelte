<script lang="ts">
  import type { NewsArticle } from "../routes/+page.server";
  import { fade, fly } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { flip } from "svelte/animate";
  import { page } from "$app/stores"
  import _ from "lodash";

  import Article from "./Article.svelte";

  export let posts: NewsArticle[];
  export let selectedTags: string[];
  // export let search: string;

  export let positiveNews: boolean;
  export let neutralNews: boolean;
  export let negativeNews: boolean;

  const itemsPerPage = 6;
  const maxPages = Math.floor(posts.length / itemsPerPage);
</script>

<div id="articlelist" class="">
  {#each posts.slice(
      itemsPerPage * Number($page.url.searchParams.get('page')), 
      (itemsPerPage * Number($page.url.searchParams.get('page')) + itemsPerPage) < posts.length ? (itemsPerPage * Number($page.url.searchParams.get('page')) + itemsPerPage) : posts.length -1 
    ).filter((e) => {
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
<div class = "my-5">
  {#if Number($page.url.searchParams.get('page')) > 0}
    <a class="float-left block lg:inline-block text-sm px-5 py-3 leading-none mt-4 rounded lg:mt-0 lg:bg-blue-600 lg:text-white lg:font-bold" href="?page={Number($page.url.searchParams.get('page'))-1}">Previous</a>
  {/if}

  {#if Number($page.url.searchParams.get('page')) < maxPages}
    <a class="float-right block lg:inline-block text-sm px-5 py-3 leading-none mt-4 rounded lg:mt-0 lg:bg-blue-600 lg:text-white lg:font-bold" href="?page={Number($page.url.searchParams.get('page'))+1}">Next</a>
  {/if}
</div>
