<template>
  <div class="flex items-center justify-center  p-4 sm:p-11 mitsuha">
    <div class="max-w-xs sm:max-w-md lg:max-w-4xl mx-auto">
      <h1 class="text-yn-lavender font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 text-center">Mitsuha's Life
        in Itomori</h1>

      <div
        class="p-4 sm:p-8 border-4 border-yn-lavender rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 backdrop-blur-md">
        <h2 class="text-yn-night-sky text-2xl sm:text-3xl mb-4">Mitsuha's Life in Itomori</h2>
        <p class="text-yn-night-sky text-sm sm:text-lg mb-4 sm:mb-8">Mitsuha is a high school girl living in the rural
          town of Itomori. She's tired of her everyday life and wishes for something more exciting to happen.</p>

        <div
          class="bg-yn-lavender my-2 sm:my-4 p-2 sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-cherry-blossom">
          <h3 class="text-yn-night-sky font-bold text-sm sm:text-lg mb-2">Little Fact</h3>
          <p class="text-yn-night-sky text-xs sm:text-sm">Mitsuha's favorite food is onigiri, and she makes them herself
            for her lunch every day.</p>
        </div>

        <div
          class="bg-yn-lavender my-2 sm:my-4 p-2 sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-cherry-blossom">
          <h3 class="text-yn-night-sky font-bold text-sm sm:text-lg mb-2">Small Story</h3>
          <p class="text-yn-night-sky text-xs sm:text-sm">One day, Mitsuha wakes up to find herself in the body of a boy
            named Taki. They begin to communicate through notes left for each other.</p>
        </div>
        <div class="w-100 flex justify-center">
          <nuxt-link to="/"
            class="flex items-center justify-center w-1/6 sm:px-4 py-2 sm:py-2 bg-gradient-to-tr sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-cherry-blossom hover:shadow-lg">
            <span>go home</span>
          </nuxt-link>
        </div>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>
