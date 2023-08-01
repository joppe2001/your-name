<template>
  <div class="flex items-center justify-center p-4 sm:p-11 bg-cover bg-center" style="margin-bottom: 30vh; margin-top: 10vh;">
    <div class="max-w-xs sm:max-w-md lg:max-w-4xl mx-auto">
      <h1 class="text-yn-lavender font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 text-center">Mitsuha's Journey</h1>
  
      <div class="p-4 sm:p-8 border-4 border-yn-lavender rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 backdrop-blur-md">
        <h2 class="text-yn-night-sky text-2xl sm:text-3xl mb-4">Life in Itomori</h2>
        <p class="text-yn-night-sky text-sm sm:text-lg mb-4 sm:mb-8">In the serene town of Itomori, Mitsuha, a high school girl, yearns for an escape from her mundane routine.</p>

        <div class="bg-yn-lavender my-2 sm:my-4 p-2 sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-cherry-blossom">
          <h3 class="text-yn-night-sky font-bold text-sm sm:text-lg mb-2">Interesting Fact</h3>
          <p class="text-yn-night-sky text-xs sm:text-sm">Mitsuha's favorite food is onigiri, and she makes them herself for her lunch every day.</p>
        </div>

        <div class="bg-yn-lavender my-2 sm:my-4 p-2 sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-cherry-blossom">
          <h3 class="text-yn-night-sky font-bold text-sm sm:text-lg mb-2">Brief Anecdote</h3>
          <p class="text-yn-night-sky text-xs sm:text-sm">One day, Mitsuha wakes up to find herself in the body of a boy named Taki. They begin to communicate through notes left for each other.</p>
        </div>

        <div class="w-100 flex justify-center">
          <nuxt-link to="#more-detail"
            class="flex items-center justify-center px-5 sm:px-4 py-1 mt-3 sm:py-2 bg-gradient-to-tr sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-cherry-blossom hover:shadow-lg">
            <p style="text-align: center;">Read More</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>

  <div id="more-detail" class="flex items-center justify-center p-4 sm:p-11 bg-cover bg-center" style="margin-bottom: 20vh;">
    <div class="max-w-xs sm:max-w-md lg:max-w-4xl mx-auto">
      <div class="p-4 sm:p-8 border-4 border-yn-lavender rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 backdrop-blur-md mt-6">
        <h2 class="text-yn-night-sky text-2xl sm:text-3xl mb-4">Evolution of Character</h2>
        <p class="text-yn-night-sky text-sm sm:text-lg mb-4 sm:mb-8">From a shy school girl to a vibrant woman, Mitsuha's journey in 'Your Name' is nothing short of a transformation. Her evolution has not only altered her perspective on life but has also left a lasting impression on those around her. 🦋</p>

        <div class="bg-yn-lavender my-2 sm:my-4 p-2 sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-cherry-blossom">
          <h3 class="text-yn-night-sky font-bold text-sm sm:text-lg mb-2">Curious Fact</h3>
          <p class="text-yn-night-sky text-xs sm:text-sm">Did you know? Mitsuha's name is derived from the Japanese word 'mitsu', which means 'three', symbolizing her journey of self-discovery which is intertwined with the elements of time, space, and destiny. 🕰️🌌</p>
        </div>

        <div class="bg-yn-lavender my-2 sm:my-4 p-2 sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-cherry-blossom">
          <h3 class="text-yn-night-sky font-bold text-sm sm:text-lg mb-2">Interesting Story</h3>
          <p class="text-yn-night-sky text-xs sm:text-sm">During her high school days, Mitsuha always wished for a life in the bustling city of Tokyo. However, it was only after swapping bodies with Taki, she realized the charm of her tranquil town and the importance of cherishing her roots. 🏞️💖</p>
        </div>

        <div class="w-100 flex justify-center mt-4">
          <nuxt-link to="/"
            class="flex items-center justify-center px-5 sm:px-4 py-1 mt-3 sm:py-2 bg-gradient-to-tr sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-cherry-blossom hover:shadow-lg">
            <p>Back to home</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
html {
  scroll-behavior: smooth;
}

</style>