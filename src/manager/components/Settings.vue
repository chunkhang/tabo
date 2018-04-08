<template>

  <div class="column is-one-quarter">
    <Header
      :title="headerTitle"
      :actions="headerActions"
      :items="settingItems"/>
    <hr>
    <p>{{ text }}</p>
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
      headerActions: [
        {
          name: "About",
          click: this.handleAbout
        }
      ],
      settingItems: null,
      text: "Coming soon."
    }
  },
  methods: {
    // Open about page in new tab
    handleAbout: function() {
      var url = "https://github.com/chunkhang/tabo";
      window.open(url, "_blank");
    }
  }
}

</script>
