<template>

  <div class="column">
    <Header :title="title" :actions="actions"/>
    <hr>
    <TabList/>
    <p v-if="tabs.length === 0">{{ text }}</p>
    <InputCard/>
  </div>

</template>

<script>

import Bus from "../Bus.js";
import Header from "./Header.vue";
import TabList from "./TabList.vue";
import InputCard from "./InputCard.vue";

export default {
  components: {
    Header,
    TabList,
    InputCard
  },
  computed: {
    tabs() {
      return this.$store.getters.getTabs;
    }
  },
  watch: {
    tabs(newValue) {
      if (newValue.length >= 1) {
        this.actions["Save"].disabled = false;
      } else {
        this.actions["Save"].disabled = true;
      }
    }
  },
  data() {
    return {
      title: "Tabs",
      text: "No tab open",
      actions: {
        "Refresh": {
          tip: "Refresh list of current tabs",
          handle: this.handleRefresh,
          disabled: false
        },
        "Save": {
          tip: "Save tabs as new session",
          handle: this.handleSave,
          disabled: true
        }
      }
    }
  },
  created() {
    var vue = this;
    vue.refreshTabs();
    window.addEventListener("keydown", event => {
      if (!vue.$store.getters.getShowingCard) {
        // R
        if (event.keyCode == 82) {
          vue.handleRefresh();
        }
        // Space
        if (event.keyCode == 32) {
          vue.handleSave();
        }
      }
    });
  },
  methods: {
    refreshTabs() {
      var vue = this;
      // Tabs from current window
      browser.tabs.query({
        currentWindow: true
      }).then(tabs => {
        var openTabs = tabs.filter(tab => {
          // Allowed tabs
          if (tab.url.startsWith("http") ||
              tab.url.startsWith("https")) {
            return tab;
          }
        });
        var tabList = openTabs.map(tab => {
          return {
            title: tab.title,
            favicon: tab.favIconUrl,
            url: tab.url
          };
        });
        vue.clearTabs();
        vue.addTabs(tabList);
      });
    },
    handleRefresh() {
      this.refreshTabs();
    },
    handleSave() {
      if (!this.actions["Save"].disabled) {
        Bus.$emit("open-card");
      }
    },
    addTabs(tabs) {
      tabs.forEach(tab => this.$store.dispatch("addTab", tab));
    },
    clearTabs() {
      this.$store.dispatch("clearTabs");
    }
  }
}

</script>
