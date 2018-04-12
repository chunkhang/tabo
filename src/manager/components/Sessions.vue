<template>

  <div class="column">
    <Header :title="title" :actions="actions"/>
    <hr>
    <SessionList/>
    <p v-if="sessions.length === 0">{{ text }}</p>
  </div>

</template>

<script>

import LocalStorage from "../LocalStorage.js";
import Header from "./Header.vue";
import SessionList from "./SessionList.vue";

export default {
  components: {
    Header,
    SessionList
  },
  computed: {
    sessions() {
      return this.$store.getters.getSessions;
    }
  },
  watch: {
    sessions(newValue) {
      if (newValue.length >= 1) {
        this.actions["Edit"].disabled = false;
        this.actions["Clear"].disabled = false;
      } else {
        this.actions["Edit"].disabled = true;
        this.actions["Clear"].disabled = true;
      }
    }
  },
  data() {
    return {
      title: "Sessions",
      text: "No session found",
      actions: {
        "Edit": {
          tip: "Rename or remove session",
          handle: this.handleEdit,
          disabled: true
        },
        "Clear": {
          tip: "Clear all sessions",
          handle: this.handleClear,
          disabled: true
        }
      }
    }
  },
  created() {
    var vue = this;
    // Load sessions from local storage
    LocalStorage.sessions.load().then(items => vue.addSessions(items));
    // // Hotkey
    // window.addEventListener("keydown", function(event) {
    //   // Escape
    //   if (event.keyCode == 27 && vue.editingSessionItems) {
    //     Bus.$emit("sessions-stop-editing");
    //   }
    // });
  },
  methods: {
    handleClear() {
      if (!this.actions["Clear"].disabled) {
        this.clearSessions();
      }
    },
    addSessions(sessions) {
      sessions.forEach(session => this.$store.dispatch("addSession", session));
    },
    clearSessions() {
      this.$store.dispatch("clearSessions");
    }
    // // Open session
    // openSession: function(index) {
    //   // Open tabs under session
    //   var urls = this.sessionItems[index].tabs.map(tab => tab.url);
    //   browser.windows.create({
    //     url: urls
    //   });
    // },
    // // Remove session
    // removeSession: function(index) {
    //   // Remove session item
    //   this.sessionItems.splice(index, 1);
    //   if (this.sessionItems.length == 0) {
    //     // Deactivate edit action
    //     this.actions["Edit"].active = false;
    //     // Disable actions
    //     Bus.$emit("sessions-disable-edit");
    //     Bus.$emit("sessions-disable-clear-all");
    //     // Cancel editing action
    //     Bus.$emit("sessions-stop-editing");
    //   }
    //   Helper.storeSessions(this.sessionItems);
    // },
  }
}

</script>
