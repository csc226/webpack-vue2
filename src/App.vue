<template>
  <div id="app">
    <div v-if='$route.meta.menu'>
      <Menu></Menu>
      <keep-alive >
        <router-view/>
      </keep-alive>
    </div>
    <keep-alive v-else>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import Menu from '@/components/menu/index.vue';
export default {
  name: 'App',
  components: {
    Menu
  },  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  overflow: hidden;
  /* height: 900px; */
  height: 100%;
  width: 100%;
}
</style>
