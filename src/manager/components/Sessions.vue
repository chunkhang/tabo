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
      savingSession: false,
      actions: {
        "Remove": {
          handle: this.handleRemove,
          title: "Hotkey: <shift>",
          active: false,
          disabled: true
        },
        "Clear All": {
          handle: this.handleClearAll,
          title: "",
          active: false,
          disabled: true
        }
      },
      fallbackText: "Nothing here. Try saving from Tabs.",
    }
  },
  created: function() {
    // Load saved sessions from storage
    var vue = this;
    browser.storage.local.get("sessions").then(function(results) {
      if (Object.keys(results).length != 0) {
        vue.sessionItems = results.sessions;
      }
      if (vue.sessionItems.length >= 1) {
        Bus.$emit("sessions-enable-remove");
        Bus.$emit("sessions-enable-clear-all");
      }
    });
    // Hotkey
    window.addEventListener("keydown", function(event) {
      // Shift
      if (event.keyCode == 16 && !vue.savingSession) {
        vue.handleRemove();
      }
    });
  },
  mounted: function() {
    var vue = this;
    Bus.$on("sessions-open", vue.openSession);
    Bus.$on("sessions-save", vue.saveSession);
    Bus.$on("sessions-remove", vue.removeSession);
    Bus.$on("sessions-enable-remove", function() {
      vue.actions["Remove"].disabled = false;
    });
    Bus.$on("sessions-stop-removing", function() {
      vue.actions["Remove"].active = false;
      vue.removingSessionItems = false;
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
    Bus.$on("sessions-saving", function() {
      vue.savingSession = true;
    });
    Bus.$on("sessions-saving-done", function() {
      vue.savingSession = false;
    });
  },
  methods: {
    // Handler function for remove action
    handleRemove: function() {
      if (!this.actions["Remove"].disabled) {
        // Toggle removing sessions
        this.actions["Remove"].active = !this.actions["Remove"].active;
        this.removingSessionItems = !this.removingSessionItems;
      }
    },
    // Handler function for clear all action
    handleClearAll: function() {
      if (!this.actions["Clear All"].disabled) {
        this.clearSessions();
      }
    },
    // Open session
    openSession: function(index) {
      // Open tabs under session
      var urls = this.sessionItems[index].tabs.map(tab => tab.url);
      browser.windows.create({
        url: urls
      });
    },
    // Save new session
    saveSession: function(sessionName, tabItems) {
      // Add session to session items
      var sessionItem = {
        date: Helper.getDateNow(),
        time: Helper.getTimeNow(),
        name: sessionName,
        tabs: tabItems,
        hide: false
      };
      this.sessionItems.unshift(sessionItem);
      // Enable actions
      Bus.$emit("sessions-enable-remove");
      Bus.$emit("sessions-enable-clear-all");
      Helper.storeSessions(this.sessionItems);
    },
    // Remove session
    removeSession: function(index) {
      // Remove session item
      this.sessionItems.splice(index, 1);
      if (this.sessionItems.length == 0) {
        // Deactivate remove action
        this.actions["Remove"].active = false;
        // Disable actions
        Bus.$emit("sessions-disable-remove");
        Bus.$emit("sessions-disable-clear-all");
        // Cancel removing action
        Bus.$emit("sessions-stop-removing");
      }
      Helper.storeSessions(this.sessionItems);
    },
    // Clear sessions
    clearSessions: function() {
      // Empty session items
      this.sessionItems = [];
      // Disable actions
      Bus.$emit("sessions-disable-remove");
      Bus.$emit("sessions-disable-clear-all");
      // Cancel removing action
      Bus.$emit("sessions-stop-removing");
      Helper.storeSessions(this.sessionItems);
    }
  }
}

</script>
