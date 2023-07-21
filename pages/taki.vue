<template>
  <div class="flex items-center justify-center p-4 sm:p-11">
    <div class="max-w-xs sm:max-w-md lg:max-w-3xl">
      <h1 class="text-yn-deep-purple font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 text-center">Taki's Life in Tokyo</h1>
  
      <div class="backdrop-blur-md p-4 sm:p-8 border-4 border-yn-blue rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200">
        <h2 class="text-yn-deep-purple text-2xl sm:text-3xl mb-4">Taki's Life in Tokyo</h2>
        <p class="text-yn-deep-purple text-sm sm:text-lg mb-4 sm:mb-8">Taki is a high school boy living in Tokyo. He is balancing his part-time job at an Italian restaurant and dreams of becoming an architect or an artist.</p>
        
        <div class="bg-yn-golden backdrop-blur-md  my-2 sm:my-4 p-2 sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-sand hover:shadow-lg">
          <h3 class="text-yn-night-sky font-bold text-sm sm:text-lg mb-2">Little Fact</h3>
          <p class="text-yn-night-sky text-xs sm:text-sm">Taki has a talent for drawing and spends his free time sketching buildings and landscapes.</p>
        </div>
        
        <div class="bg-yn-golden my-2 sm:my-4 p-2 sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-sand hover:shadow-lg">
          <h3 class="text-yn-night-sky font-bold text-sm sm:text-lg mb-2">Small Story</h3>
          <p class="text-yn-night-sky text-xs sm:text-sm">Taki starts to have dreams about living in a rural town as a high school girl named Mitsuha. These dreams become more vivid and intense over time.</p>
        </div>
        <div class="w-100 flex justify-center">
          <nuxt-link to="/"
            class="flex items-center justify-center w-1/6 sm:px-4 py-2 sm:py-2 bg-gradient-to-tr sm:p-4 rounded-lg transition-all duration-200 hover:bg-yn-sky hover:shadow-lg">
            <span>home</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
