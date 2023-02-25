<script lang="ts">
export let selected = false;
export let topic = "";
  export let count = 0;
  export let selectedTags: any = [];
  function toggle() {
    selected = !selected;

    // add to selected tags
    if (selected) selectedTags = [...selectedTags, topic];
    else {
      const index = selectedTags.indexOf(topic);
      if (index > -1) {
        selectedTags.splice(index, 1);
      }
      selectedTags = [...selectedTags];
    }
  }
</script>

<div
  class="rounded-lg border px-3 py-1 hover:cursor-pointer hover:bg-black hover:text-white transition-all border-gray-400"
  class:bg-black={selected == true}
  class:text-white={selected == true}
  on:click={toggle}
  on:keypress={toggle}
>
  {`(${count}) ${topic}`}
</div>
