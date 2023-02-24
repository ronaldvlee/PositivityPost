<script lang="ts">
  let closed = false;
</script>

<nav class="flex items-center justify-between flex-wrap p-6 border-b">
  <a href="/" class="flex items-center flex-shrink-0 mr-6">
    <img
      class="w-20 hidden lg:block"
      src="/logo.svg"
      alt="Positivity Post Logo"
    />
    <span class="font-semibold text-xl tracking-tight block lg:hidden"
      >PositivityPost</span
    >
  </a>
  <!-- Hamburger menu  -->
  <div class="block lg:hidden">
    <button
      class="flex items-center w-3 h-3 p-3 pr-3"
      on:click={() => (closed = !closed)}
    >
      <div
        class:hidden={closed}
        class="items-center text-sm object-scale-down font-semibold"
      >
        &#9587;
      </div>
      <div class:hidden={!closed} class="space-y-1 object-scale-down">
        <div class="w-4 h-0.5 bg-gray-600" />
        <div class="w-4 h-0.5 bg-gray-600" />
        <div class="w-4 h-0.5 bg-gray-600" />
      </div>
    </button>
  </div>
  <div
    class:hidden={closed}
    class="w-full block flex-grow mt-4 lg:mt-0 lg:flex lg:items-center lg:w-auto"
  >
    <!-- Left side elements of Nav -->
    <div class="text-sm lg:flex-grow" />

    <!-- Right side elements of Nav -->
    <div>
      <a
        href="/register"
        class="block lg:inline-block text-sm px-5 py-3 leading-none mt-4 rounded lg:mt-0 lg:bg-blue-600 lg:text-white lg:font-bold"
        >Register</a
      >
      <a
        href="/register"
        class="block lg:inline-block text-sm px-5 py-3 leading-none mt-4 lg:mt-0"
        >Login</a
      >
    </div>
  </div>
</nav>
