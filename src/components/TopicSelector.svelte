<script lang="ts">
  import TopicSelect from "./TopicSelect.svelte";

  export let selectedTags: string[];
  export let topics: string[][];
  export let start = 0;
  export let length = 10;
</script>

<div class="flex gap-2 text-sm flex-wrap mb-5">
  {#each topics.slice(start, length) as topic}
    <!-- <div class="rounded-md border px-1">{`(${topic[0]}) ${topic[1]}`}</div> -->
    <TopicSelect
      topic={topic[1]}
      count={parseInt(topic[0])}
      bind:selectedTags
    />
  {/each}
</div>
