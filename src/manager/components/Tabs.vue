<template>

  <div class="column">
    <Header :title="title" :items="tabItems" :actions="actions"/>
    <hr>
    <TabList :items="tabItems"/>
    <p v-if="tabItems.length == 0">{{ fallbackText }}</p>
    <!-- <Card/> -->
  </div>

</template>

<script>

import Header from "./Header.vue";
import TabList from "./TabList.vue";
// import Card from "./Card.vue";

export default {
  components: {
    Header,
    TabList,
    // Card
  },
  data: function() {
    return {
      title: "Tabs",
      tabItems: [],
      actions: [
        {
          name: "Save",
          click: this.handleSave
        }
      ],
      fallbackText: "Nothing here. Try opening a few tabs."
    }
  },
  created: function() {
    // Reactive current tabs
    var vue = this;
    vue.updateCurrentItems();
    browser.tabs.onUpdated.addListener(function() {
      vue.updateCurrentItems();
    });
    browser.tabs.onRemoved.addListener(function() {
      setTimeout(vue.updateCurrentItems, 500);
    });
  },
  methods: {
    // Refresh tabs
    updateCurrentItems: function() {
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
      });
    },
    handleSave: function() {
      console.log("Save!");
    }
  }
}

</script>
