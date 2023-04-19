<script lang="ts">
  import type { NewsArticle } from "./+page.server";
  import type { PageData } from "./$types";
  import _ from "lodash";

  import TopicSelector from "../components/TopicSelector.svelte";
  import ToggleSwitch from "../components/ToggleSwitch.svelte";
  import ArticleList from "../components/ArticleList.svelte";

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

<div class="mx-5 mt-5 sm:mx-24 sm:mt-10 grid grid-cols-1 sm:grid-cols-4">
  <section id="main" class="flex flex-col gap-1 order-2 sm:gap-3 sm:col-span-3">
    <h1 class="font-bold pb-5 md:text-4xl text-3xl">Popular Topics</h1>
    <TopicSelector {topics} bind:selectedTags />
    <ArticleList
      bind:positiveNews
      bind:negativeNews
      bind:neutralNews
      bind:posts
      {selectedTags}
    />
  </section>
  <section class="mx-10 max-w-xs order-1 sm:order-3 sm:col-span-1">
    <section class="hidden md:flex items-center gap-5">
      <img src="/excuse me.jpg" alt="user avatar" class="w-20 rounded-full" />
      <section class="flex flex-col">
        <p class="font-bold">Jason Wong</p>
        <p class="text-gray-500">Member</p>
      </section>
    </section>
    <section class="md:flex flex-col gap-1 hidden">
      <h2 class="text-2xl font-bold mt-10 mb-2">Show me only</h2>
      <div class="flex flex-row md:flex-col">
        <ToggleSwitch bind:checked={positiveNews}>Positive News</ToggleSwitch>
        <ToggleSwitch bind:checked={neutralNews}>Neutral News</ToggleSwitch>
        <ToggleSwitch bind:checked={negativeNews}>Negative News</ToggleSwitch>
      </div>
      <div class="md:block hidden">
        <h2 class="text-2xl font-bold mt-10 mb-2">More Topics</h2>
        <TopicSelector start={11} length={25} {topics} bind:selectedTags />
        <div class="flex flex-wrap text-gray-400 gap-2 justify-center">
          <a href="" class="hover:underline hover:cursor-pointer">About</a>
          <a href="" class="hover:underline hover:cursor-pointer"
            >View source on Github</a
          >
          <span> Copyright 2023 </span>
        </div>
      </div>
    </section>
  </section>
</div>
