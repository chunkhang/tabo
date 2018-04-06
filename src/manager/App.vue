<template>
  <div id="app">
    <h1>Hello World</h1>
    <TabList/>
  </div>
</template>

<script>
import TabList from './components/TabList.vue'

export default {
  components: {
    TabList
  }
}
</script>

<style lang="scss">
@import './variables.scss';

 #app {
    background-color: $dark-gray;
  }
</style>
