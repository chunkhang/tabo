<template>

  <div class="column is-one-quarter">
    <Header :title="title" :actions="actions"/>
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
      title: "Settings",
      actions: {
        "About": {
          handle: this.handleAbout,
          title: "",
          active: false,
          disabled: false
        }
      },
      text: "Coming soon."
    }
  },
  methods: {
    handleAbout: function() {
      var url = "https://github.com/chunkhang/tabo";
      window.open(url, "_blank");
    }
  }
}

</script>
