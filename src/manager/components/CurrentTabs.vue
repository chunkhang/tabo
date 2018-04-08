<template>

  <div class="column">
    <Header :title="headerTitle" :items="currentItems"/>
    <hr>
    <TabList :items="currentItems"/>
    <p v-if="currentItems.length == 0">
      Nothing here. Try opening a few tabs.
    </p>
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
      headerTitle: "Current Tabs",
      currentItems: []
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
    updateCurrentItems() {
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
        vue.currentItems = tabList;
      });
    }
  }
}

</script>

<style lang="scss" scoped>

@import "../variables.scss";

hr {
  margin: 15px 0;
}
p {
  font-size: $medium-font;
}

</style>
