<template>

  <div class="column is-one-quarter">
    <Header :title="headerTitle" :items="settingItems"/>
    <hr>
    <p class="fallbacks">{{ text }}</p>
  </div>

</template>

<script>

import Header from "./Header.vue";

export default {
  components: {
    Header
  },
  data: function() {
    return {
      headerTitle: "Settings",
      settingItems: null,
      text: "Coming soon."
    }
  }
}

</script>
