<template>
  <div class="flex items-center justify-center p-4 sm:p-11 bg-cover bg-center" style="margin-bottom: 30vh; margin-top: 10vh; background-image: url('/images/your-name-bg.jpg')">
    <div class="max-w-xs sm:max-w-md lg:max-w-4xl mx-auto">
      <h1 class="text-yn-deep-purple font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 text-center">Taki's Life in Tokyo</h1>
      <div class="p-4 sm:p-8 border-4 border-yn-blue rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 backdrop-blur-md">
        <h2 class="text-yn-night-sky text-2xl sm:text-3xl mb-4">Taki's Life in Tokyo</h2>
        <p class="text-yn-night-sky text-sm sm:text-lg mb-4 sm:mb-8">Taki is a high school boy living in Tokyo. He is balancing his part-time job at an Italian restaurant and dreams of becoming an architect or an artist.</p>

        <div class="bg-yn-blue my-2 sm:my-4 p-2 sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-sand">
          <h3 class="text-yn-night-sky font-bold text-sm sm:text-lg mb-2">Little Fact</h3>
          <p class="text-yn-night-sky text-xs sm:text-sm">Taki has a talent for drawing and spends his free time sketching buildings and landscapes.</p>
        </div>

        <div class="bg-yn-blue my-2 sm:my-4 p-2 sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-sand">
          <h3 class="text-yn-night-sky font-bold text-sm sm:text-lg mb-2">Small Story</h3>
          <p class="text-yn-night-sky text-xs sm:text-sm">Taki starts to have dreams about living in a rural town as a high school girl named Mitsuha. These dreams become more vivid and intense over time.</p>
        </div>

        <div class="w-100 flex justify-center">
          <nuxt-link to="#more-detail"
            class="flex items-center justify-center px-5 sm:px-4 py-1 mt-3 sm:py-2 bg-gradient-to-tr sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-sand hover:shadow-lg">
            <p style="text-align: center;">Read More</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>

  <div id="more-detail" class="flex items-center justify-center p-4 sm:p-11 bg-cover bg-center" style="margin-bottom: 20vh; background-image: url('/images/your-name-bg.jpg')">
    <div class="max-w-xs sm:max-w-md lg:max-w-4xl mx-auto">
      <div class="p-4 sm:p-8 border-4 border-yn-blue rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 backdrop-blur-md mt-6">
        <h2 class="text-yn-night-sky text-2xl sm:text-3xl mb-4">Character Evolution</h2>
        <p class="text-yn-night-sky text-sm sm:text-lg mb-4 sm:mb-8">Taki's journey in 'Your Name' witnesses a transformation from a city boy with a dream to a young man who understands the profound connections that bind people and times. His experience of switching bodies with Mitsuha made him realize the essence of life beyond the skyscrapers of Tokyo. 🏙️🌠</p>

        <div class="bg-yn-blue my-2 sm:my-4 p-2 sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-sand">
          <h3 class="text-yn-night-sky font-bold text-sm sm:text-lg mb-2">Little Fact</h3>
          <p class="text-yn-night-sky text-xs sm:text-sm">Did you know? Taki's detailed sketches of Itomori, despite never being there physically, signify the depth of his connection with Mitsuha and the surreal experience they shared. ✏️🌸</p>
        </div>

        <div class="bg-yn-blue my-2 sm:my-4 p-2 sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-sand">
          <h3 class="text-yn-night-sky font-bold text-sm sm:text-lg mb-2">Small Story</h3>
          <p class="text-yn-night-sky text-xs sm:text-sm">Taki once used his day as Mitsuha to set up a date with her crush, Katsuhiko Teshigawara. However, after living through Mitsuha's life, Taki gradually developed feelings for her, which eventually led him on a quest to meet her. 💕🌅</p>
        </div>

        <div class="w-100 flex justify-center mt-4">
          <nuxt-link to="/"
            class="flex items-center justify-center px-5 sm:px-4 py-1 mt-3 sm:py-2 bg-gradient-to-tr sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-sand hover:shadow-lg">
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
