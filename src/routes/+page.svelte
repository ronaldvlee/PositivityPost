<script lang="ts">
  import type { PageData } from "./$types";
  import type { NewsArticle } from "./+page.server";
  import _ from "lodash";

  import ArticleList from "../components/ArticleList.svelte";
  import Nav from "../components/Nav.svelte";
  import TopicSelector from "../components/TopicSelector.svelte";

  export let data: PageData;
  let posts: NewsArticle[] = JSON.parse(data["articles"]) as NewsArticle[];
  let topicCounts: any = [];
  posts = posts.sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
  );
  posts.forEach((post) => {
    if (post.topics)
      post.topics.forEach((t) => (topicCounts[t] = (topicCounts[t] || 0) + 1));
  });
  let topics: string[][] = Object.keys(topicCounts).map((key) => [
    topicCounts[key],
    key,
  ]);

  topics = topics.sort().reverse();

  let selectedTags: string[] = [];
  let search = "";

  let positiveNews = true;
  let neutralNews = true;
  let negativeNews = true;
</script>

<!-- <img src="https://mdbootstrap.com/img/new/slides/041.jpg" class="max-w-full h-auto" alt="..." /> -->

<!-- <form>
  <label
    for="default-search"
    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    >Search</label
  >
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5 text-gray-500 dark:text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        /></svg
      >
    </div>
    <input
      type="search"
      id="default-search"
      class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search..."
      required
    />
    <button
      type="submit"
      class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >Search</button
    >
  </div>
</form> -->

<div class="mx-24 mt-10 layout">
  <!-- <nav>
    asdf
    <input class="w-6/12 rounded lg border border-gray-400" />
  </nav> -->
  <section id="main" class="flex flex-col gap-3">
    <h1 class="text-4xl font-bold">Popular Topics</h1>
    <TopicSelector {topics} bind:selectedTags />
    <ArticleList
      bind:positiveNews
      bind:negativeNews
      bind:neutralNews
      bind:posts
      {selectedTags}
    />
  </section>
  <section id="aside" class="mx-10 max-w-xs">
    <section class="flex items-center gap-5">
      <img src="/excuse me.jpg" alt="user avatar" class="w-20 rounded-full" />
      <section class="flex flex-col">
        <p class="font-bold">Jason Wong</p>
        <p class="text-gray-500">Member</p>
      </section>
    </section>
    <h2 class="text-2xl font-bold mt-10 mb-2">Show me only</h2>
    <section class="flex flex-col gap-1">
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          class="sr-only peer"
          bind:checked={positiveNews}
        />
        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
        />
        <span class="ml-3 text-sm font-medium">Positive News</span>
      </label>
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          class="sr-only peer"
          bind:checked={neutralNews}
        />
        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
        />
        <span class="ml-3 text-sm font-medium">Neutral News</span>
      </label>
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          class="sr-only peer"
          bind:checked={negativeNews}
        />
        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
        />
        <span class="ml-3 text-sm font-medium">Negative News</span>
      </label>
    </section>
    <!-- <h2 class="text-2xl font-bold mt-10 mb-2">Search</h2>
    <input
      class="w-full rounded-lg lg border border-gray-400 h-10 p-1"
      bind:value={search}
    /> -->
    <h2 class="text-2xl font-bold mt-10 mb-2">More Topics</h2>
    <TopicSelector start={11} length={25} {topics} bind:selectedTags />
  </section>
</div>

<style>
  .layout {
    display: grid;
    grid-template-columns: 4fr 1fr;
    /* grid-template-rows: 1fr 3fr; */
    grid-template-areas:
      "nav nav nav nav nav"
      "main main main main aside";
  }
  #main {
    grid-area: main;
  }
  #aside {
    grid-area: aside;
  }
  /* nav {
    grid-area: nav;
  } */
</style>
