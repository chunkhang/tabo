<template>

  <div class="column">
    <Header :title="title" :items="sessionItems" :actions="actions"/>
    <hr>
    <SessionList :items="sessionItems"/>
    <p v-if="sessionItems.length == 0">{{ fallbackText }}</p>
  </div>

</template>

<script>

import Header from "./Header.vue";
import SessionList from "./SessionList.vue";

export default {
  components: {
    Header,
    SessionList
  },
  data: function() {
    return {
      title: "Sessions",
      sessionItems: [],
      actions: [
        {
          name: "Remove",
          click: this.handleRemove
        },
        {
          name: "Clear All",
          click: this.handleClearAll
        }
      ],
      fallbackText: "Nothing here. Try saving from Tabs."
    }
  },
  methods: {
    handleRemove: function() {
      console.log("Remove!");
    },
    handleClearAll: function() {
      console.log("Clear All!");
    }
  }
}

</script>
