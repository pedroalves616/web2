<template>
  <div class="homeEquipes">
    
    <HomeEquipes msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeEquipes from '@/components/HomeEquipes.vue'

export default {
  name: 'Home',
  components: {
    HomeEquipes
  }
}
</script>
