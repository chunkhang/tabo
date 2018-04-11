<template>

  <div class="column">
    <Header :title="title" :items="sessionItems" :actions="actions"/>
    <hr>
    <SessionList :items="sessionItems" :editing="editingSessionItems"/>
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
      editingSessionItems: false,
      actions: {
        "Edit": {
          handle: this.handleEdit,
          title: "",
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
        Bus.$emit("sessions-enable-edit");
        Bus.$emit("sessions-enable-clear-all");
      }
    });
    // Hotkey
    window.addEventListener("keydown", function(event) {
      // Escape
      if (event.keyCode == 27 && vue.editingSessionItems) {
        Bus.$emit("sessions-stop-editing");
      }
    });
  },
  mounted: function() {
    var vue = this;
    Bus.$on("sessions-open", vue.openSession);
    Bus.$on("sessions-save", vue.saveSession);
    Bus.$on("sessions-remove", vue.removeSession);
    Bus.$on("sessions-enable-edit", function() {
      vue.actions["Edit"].disabled = false;
    });
    Bus.$on("sessions-stop-editing", function() {
      vue.actions["Edit"].active = false;
      vue.editingSessionItems = false;
      Helper.storeSessions(vue.sessionItems);
    });
    Bus.$on("sessions-enable-clear-all", function() {
      vue.actions["Clear All"].disabled = false;
    });
    Bus.$on("sessions-disable-edit", function() {
      vue.actions["Edit"].disabled = true;
    });
    Bus.$on("sessions-disable-clear-all", function() {
      vue.actions["Clear All"].disabled = true;
    });
  },
  methods: {
    // Handler function for edit action
    handleEdit: function() {
      if (!this.actions["Edit"].disabled) {
        // Toggle editing sessions
        this.actions["Edit"].active = !this.actions["Edit"].active;
        this.editingSessionItems = !this.editingSessionItems;
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
      Bus.$emit("sessions-enable-edit");
      Bus.$emit("sessions-enable-clear-all");
      Helper.storeSessions(this.sessionItems);
    },
    // Remove session
    removeSession: function(index) {
      // Remove session item
      this.sessionItems.splice(index, 1);
      if (this.sessionItems.length == 0) {
        // Deactivate edit action
        this.actions["Edit"].active = false;
        // Disable actions
        Bus.$emit("sessions-disable-edit");
        Bus.$emit("sessions-disable-clear-all");
        // Cancel editing action
        Bus.$emit("sessions-stop-editing");
      }
      Helper.storeSessions(this.sessionItems);
    },
    // Clear sessions
    clearSessions: function() {
      // Empty session items
      this.sessionItems = [];
      // Disable actions
      Bus.$emit("sessions-disable-edit");
      Bus.$emit("sessions-disable-clear-all");
      // Cancel editing action
      Bus.$emit("sessions-stop-editing");
      Helper.storeSessions(this.sessionItems);
    }
  }
}

</script>
