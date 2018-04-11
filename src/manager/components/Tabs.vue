<template>

  <div class="column">
    <Header :title="title" :items="tabItems" :actions="actions"/>
    <hr>
    <TabList :items="tabItems"/>
    <p v-if="tabItems.length == 0">{{ fallbackText }}</p>
    <InputCard/>
  </div>

</template>

<script>

import Bus from "../EventBus.js";
import Header from "./Header.vue";
import TabList from "./TabList.vue";
import InputCard from "./InputCard.vue";

export default {
  components: {
    Header,
    TabList,
    InputCard
  },
  data: function() {
    return {
      title: "Tabs",
      tabItems: [],
      actions: {
        "Save": {
          handle: this.handleSave,
          title: "Hotkey: <space>",
          active: false,
          disabled: true
        }
      },
      fallbackText: "Nothing here. Try opening a few tabs."
    }
  },
  created: function() {
    // Reactive tabs
    var vue = this;
    vue.updateTabItems();
    browser.tabs.onUpdated.addListener(function() {
      vue.updateTabItems();
    });
    browser.tabs.onRemoved.addListener(function() {
      setTimeout(vue.updateTabItems, 500);
    });
    // Hotkey
    window.addEventListener("keydown", function(event) {
      // Space
      if (event.keyCode == 32) {
        vue.handleSave();
      }
    });
  },
  mounted: function() {
    var vue = this;
    Bus.$on("tabs-save", function(name) {
      Bus.$emit("sessions-save", name, vue.tabItems);
    });
    Bus.$on("tabs-deactivate-save", function() {
      vue.actions["Save"].active = false;
    });
    Bus.$on("tabs-enable-save", function() {
      if (vue.tabItems.length >= 1) {
        vue.actions["Save"].disabled = false;
      }
    });
    Bus.$on("tabs-disable-save", function() {
      vue.actions["Save"].disabled = true;
    });
  },
  methods: {
    // Update tab list with new items
    updateTabItems: function() {
      var vue = this;
      browser.tabs.query({
        currentWindow: true
      }).then(function(tabs) {
        var openTabs = tabs.filter(tab =>
          tab.url.startsWith("http") || tab.url.startsWith("https")
        );
        var tabList = openTabs.map(function(tab) {
          return {
            favicon: tab.favIconUrl,
            title: tab.title,
            url: tab.url
          };
        });
        vue.tabItems = tabList;
        // Enable or disable save action
        if (tabList.length == 0) {
          vue.actions["Save"].disabled = true;
        } else {
          vue.actions["Save"].disabled = false;
        }
      });
    },
    // Handler function for save action
    handleSave: function() {
      if (!this.actions["Save"].active && !this.actions["Save"].disabled) {
        // Show input card
        card.classList.add("is-active");
        cardInput.value = "";
        cardInput.focus();
        this.actions["Save"].active = true;
      }
    }
  }
}

</script>
