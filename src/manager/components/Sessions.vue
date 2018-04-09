<template>

  <div class="column">
    <Header :title="title" :items="sessionItems" :actions="actions"/>
    <hr>
    <SessionList :items="sessionItems" :removing="removingSessionItems"/>
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
      removingSessionItems: false,
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
    var vue = this;
    Bus.$on("sessions-save", vue.saveSession);
    Bus.$on("sessions-enable-remove", function() {
      vue.actions["Remove"].disabled = false;
    });
    Bus.$on("sessions-enable-clear-all", function() {
      vue.actions["Clear All"].disabled = false;
    });
    Bus.$on("sessions-disable-remove", function() {
      vue.actions["Remove"].disabled = true;
    });
    Bus.$on("sessions-disable-clear-all", function() {
      vue.actions["Clear All"].disabled = true;
    });
  },
  methods: {
    handleRemove: function() {
      console.log("Remove!");
    },
    handleClearAll: function() {
      // Clear session items
      this.sessionItems = [];
      // Disable actions
      Bus.$emit("sessions-disable-remove");
      Bus.$emit("sessions-disable-clear-all");
      // Helper.storeSessions(vue.sessionItems);
    },
    saveSession: function(sessionName, tabItems) {
      // Add session to session items
      var vue = this;
      var sessionItem = {
        date: Helper.getDateNow(),
        time: Helper.getTimeNow(),
        name: sessionName,
        tabs: tabItems,
        hide: false
      };
      vue.sessionItems.unshift(sessionItem);
      // Enable actions
      Bus.$emit("sessions-enable-remove");
      Bus.$emit("sessions-enable-clear-all");
      // Helper.storeSessions(vue.sessionItems);
    }
  }
}

</script>
