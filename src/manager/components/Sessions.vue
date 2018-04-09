<template>

  <div class="column">
    <Header :title="title" :items="sessionItems" :actions="actions"/>
    <hr>
    <SessionList :items="sessionItems"/>
    <p v-if="sessionItems.length == 0">{{ fallbackText }}</p>
  </div>

</template>

<script>

import Bus from "../EventBus.js";
import Helper from "../Helper.js";
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
      actions: {
        "Remove": {
          handle: this.handleRemove,
          active: false,
          disabled: true
        },
        "Clear All": {
          handle: this.handleClearAll,
          active: false,
          disabled: true
        }
      },
      fallbackText: "Nothing here. Try saving from Tabs."
    }
  },
  mounted: function() {
    Bus.$on("sessions-save", this.saveSession);
  },
  methods: {
    handleRemove: function() {
      console.log("Remove!");
    },
    handleClearAll: function() {
      console.log("Clear All!");
    },
    saveSession: function(sessionName, tabItems) {
      var sessionItem = {
        date: Helper.getDateNow(),
        time: Helper.getTimeNow(),
        name: sessionName,
        tabs: tabItems
      };
      this.sessionItems.unshift(sessionItem);
      // Helper.storeSessions(this.sessionItems);
    }
  }
}

</script>
