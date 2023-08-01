<template>
  <div class="flex items-center justify-center p-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-yn-sunset font-extrabold text-2xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 text-center">Welcome to the world of "Your Name"</h1>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-20">
        <div
          class="backdrop-blur-lg p-4 sm:p-6 lg:p-8 border-4 border-yn-sunset rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 opacity-80 flex flex-col justify-between"
          :class="{ 'bg-yn-cherry-blossom shadow-yn-sunset': isHoveredMitsuha }" @mouseover="isHoveredMitsuha = true"
          @mouseout="isHoveredMitsuha = false">
          <div>
            <h2 class="text-yn-sunset text-xl sm:text-2xl mb-2 sm:mb-4">Mitsuha's Life in Itomori</h2>
            <p class="text-black text-sm sm:text-lg mb-4 sm:mb-8">Mitsuha is a high school girl living in the rural town of Itomori. She's
              tired of her everyday life and wishes for something more exciting to happen.</p>
          </div>
          <nuxt-link to="/mitsuha"
            class="flex items-center justify-center py-2 sm:py-3 bg-gradient-to-tr from-yn-sunset via-yn-sunset to-yn-sunset-light border-2 border-yn-night-sky text-sm sm:text-lg text-white rounded shadow-xl hover:border-yn-golden hover:shadow-none hover:-translate-y-[-2px] transition-all duration-200">
            <span>Learn more about Mitsuha</span>
          </nuxt-link>
        </div>

        <div
          class="backdrop-blur-lg p-4 sm:p-6 lg:p-8 border-4 border-yn-sunset rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 opacity-80 flex flex-col justify-between"
          :class="{ 'bg-yn-soft-lilac shadow-yn-soft-lilac': isHoveredTaki }" 
          @mouseover="isHoveredTaki = true"
          @mouseout="isHoveredTaki = false">
          <div>
            <h2 class="text-yn-sunset text-xl sm:text-2xl mb-2 sm:mb-4">Taki's Life in Tokyo</h2>
            <p class="text-black text-sm sm:text-lg mb-4 sm:mb-8">Taki is a high school boy living in Tokyo. He is balancing his part-time
              job at an Italian restaurant and dreams of becoming an architect or an artist.</p>
          </div>
          <nuxt-link to="/taki"
            class="flex items-center justify-center py-2 sm:py-3 bg-gradient-to-tr from-yn-sunset via-yn-sunset to-yn-sunset-light border-2 border-yn-night-sky text-sm sm:text-lg text-white rounded shadow-xl hover:border-yn-golden hover:shadow-none hover:-translate-y-[-2px] transition-all duration-200">
            <span>Learn more about Taki</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHoveredMitsuha: false,
      isHoveredTaki: false
    }
  },
}
</script>
