<nav class="flex justify-center items-center my-2 flex-wrap lg:justify-between">
  <div class="flex items-center gap-3 h-16 w-2/3 lg:w-1/2">
    <!-- <img
      class="rounded-full"
      src="/assets/images/wayson.jpg"
      height="40"
      width="40"
    /> -->
    <a class="group transition hover:text-black dark:hover:text-black" href="/">
      PositivityPost
      <span
        class="block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-black dark:bg-black"
      />
    </a>
  </div>
  <input class="hidden peer" checked type="checkbox" id="nav-menu" />
  <label class="flex justify-end w-1/3 gap-4 lg:hidden lg:w-1/2" for="nav-menu">
    <!-- <button
      class="fas fa-moon hover:text-black dark:hover:text-black"
      x-on:click="darkMode = !darkMode"
    /> -->
    <a id="menu-icon" class="text-xl hover:text-black dark:hover:text-black">
      <i class="fa fa-bars" />
    </a>
  </label>
  <div
    class="panel peer-checked:h-0 overflow-hidden lg:h-full lg:peer-checked:h-full lg:overflow-visible lg:flex"
  >
    <ul class="flex p-5 flex-col gap-5 lg:flex-row lg:items-center lg:p-0">
      <li>
        <a
          class="group transition hover:text-black dark:hover:text-black"
          href="https://jason-wong.me"
        >
          portfolio
          <span
            class="block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-black dark:bg-black"
          />
        </a>
      </li>
      <li>
        <a
          class="group transition hover:text-black dark:hover:text-black"
          href="https://jason-wong.me/github"
        >
          github
          <span
            class="block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-black dark:bg-black"
          />
        </a>
      </li>
      <li>
        <a
          class="group transition hover:text-black dark:hover:text-black"
          href="https://jason-wong.me/linkedin"
        >
          linkedin
          <span
            class="block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-black dark:bg-black"
          />
        </a>
      </li>
      <li>
        <a
          class="group transition hover:text-black dark:hover:text-black"
          href="https://jason-wong.me/resume"
        >
          resume
          <span
            class="block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-black dark:bg-black"
          />
        </a>
      </li>
      <li class="hidden lg:block hover:text-black dark:hover:text-black">
        <!-- <button class="fas fa-moon" on:click="darkMode = !darkMode" /> -->
      </li>
    </ul>
  </div>
</nav>
