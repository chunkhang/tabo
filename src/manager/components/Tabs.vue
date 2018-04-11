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

import Header from "./Header.vue";
import TabList from "./TabList.vue";
// import InputCard from "./InputCard.vue";

export default {
  components: {
    Header,
    TabList,
    // InputCard
  },
  computed: {
    tabs() {
      return this.$store.getters.getTabs;
    }
  },
  data() {
    return {
      title: "Tabs",
      text: "No tab open.",
      actions: {
        "Refresh": {
          handle: this.handleRefresh,
          title: "Refresh list of current tabs",
          active: false,
          disabled: false
        }
      }
    }
  },
  created() {
    // Reactive tabs
    var vue = this;
    vue.refreshTabs();
    // browser.tabs.onUpdated.addListener(function() {
    //   vue.updateTabItems();
    // });
    // browser.tabs.onRemoved.addListener(function() {
    //   setTimeout(vue.updateTabItems, 500);
    // });
    // // Hotkey
    // window.addEventListener("keydown", function(event) {
    //   // Space
    //   if (event.keyCode == 32) {
    //     vue.handleSave();
    //   }
    // });
  },
  mounted() {
    // var vue = this;
    // Bus.$on("tabs-save", function(name) {
    //   Bus.$emit("sessions-save", name, vue.tabItems);
    // });
    // Bus.$on("tabs-deactivate-save", function() {
    //   vue.actions["Save"].active = false;
    // });
    // Bus.$on("tabs-enable-save", function() {
    //   if (vue.tabItems.length >= 1) {
    //     vue.actions["Save"].disabled = false;
    //   }
    // });
    // Bus.$on("tabs-disable-save", function() {
    //   vue.actions["Save"].disabled = true;
    // });
  },
  methods: {
    refreshTabs() {
      var vue = this;
      // Tabs from current window
      browser.tabs.query({
        currentWindow: true
      }).then((tabs) => {
        var openTabs = tabs.filter((tab) => {
          // Allowed tabs
          if (tab.url.startsWith("http") ||
              tab.url.startsWith("https")) {
            return tab;
          }
        });
        var tabList = openTabs.map((tab) => {
          return {
            title: tab.title,
            favicon: tab.favIconUrl,
            url: tab.url
          };
        });
        vue.clearTabs();
        tabList.forEach((tab) => vue.addTab(tab));
        // // Enable or disable save action
        // if (tabList.length == 0) {
        //   vue.actions["Save"].disabled = true;
        // } else {
        //   vue.actions["Save"].disabled = false;
        // }
      });
    },
    handleRefresh() {
      this.refreshTabs();
    },
    addTab(tab) {
      this.$store.dispatch("addTab", tab);
    },
    clearTabs() {
      this.$store.dispatch("clearTabs");
    }
    // handleSave() {
    //   if (!this.actions["Save"].active && !this.actions["Save"].disabled) {
    //     // Show input card
    //     card.classList.add("is-active");
    //     cardInput.value = "";
    //     cardInput.focus();
    //     this.actions["Save"].active = true;
    //   }
    // }
  }
}

</script>
