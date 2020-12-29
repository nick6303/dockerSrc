<template lang="pug">
AppHeader
AppMain
AppFooter
</template>

<script>
import { AppHeader, AppFooter } from './components/layout'
import AppMain from '@/views/AppMain.vue'

export default {
  name: 'App',
  components: {
    AppHeader, 
    AppFooter,
    AppMain
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
