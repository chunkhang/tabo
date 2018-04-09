<template>

  <ul id="sessionList">
    <li
      v-for="(item, index) in items"
      :class="['items', {'hide': item.hide}]"
    >
      <div>
        <p
          @click="handleClickName(index)"
          class="has-text-weight-normal clickable"
        >{{ item.name }}</p>
        <p class="subtitles has-text-weight-light">
          <span
            @click="handleClickTab(index)"
           :class="['clickable', {'active': showingTabs}]"
          >{{ item.tabs.length | pluralize }}</span>
          @ {{ item.date }} {{ item.time }}
        </p>
      </div>
      <p
        v-if="removing"
        @click="handleClickCross(index)"
        class="crosses has-text-weight-normal"
      >x</p>
      <div :class="['tabLists', {'hide': !showingTabs}]">
        <hr>
        <TabList :items="item.tabs"/>
      </div>
    </li>
  </ul>

</template>

<script>

import Bus from "../EventBus.js";
import TabList from "./TabList.vue";

export default {
  components: {
    TabList
  },
  data: function() {
    return {
      showingTabs: false
    }
  },
  props: [
    "items",
    "removing"
  ],
  created: function() {
    // Hotkey
    var vue = this;
    window.addEventListener("keydown", function(event) {
      // Escape
      if (event.keyCode == 27) {
        if (vue.showingTabs) {
          vue.handleClickTab();
        }
      }
    });
  },
  filters: {
    pluralize: function(count) {
      var noun = "tab";
      if (count > 1) {
        noun += "s";
      }
      return `${count} ${noun}`;
    }
  },
  methods: {
    // Handler function for click on session name
    handleClickName: function(index) {
      // Open session tabs
      var urls = this.items[index].tabs.map(tab => tab.url);
      browser.windows.create({
        url: urls
      });
    },
    // Handler function for click on session number of tabs
    handleClickTab: function(index) {
      if (!this.showingTabs) {
        // Show only clicked session
        this.items.forEach(item => item.hide = true);
        this.items[index].hide = false;
        // Disable actions
        Bus.$emit("tabs-disable-save");
        Bus.$emit("sessions-disable-remove");
        Bus.$emit("sessions-disable-clear-all");
        // Cancel removing action
        Bus.$emit("sessions-stop-removing");
      } else {
        // Show all sessions
        this.items.forEach(item => item.hide = false);
        // Enable actions
        Bus.$emit("tabs-enable-save");
        Bus.$emit("sessions-enable-remove");
        Bus.$emit("sessions-enable-clear-all");
      }
      // Show or hide tabs for session
      this.showingTabs = !this.showingTabs;
    },
    // Handler function for click on session cross
    handleClickCross: function() {

    }
  }
}

</script>

<style lang="scss" scoped>

@import "../variables.scss";

.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;

  .subtitles {
    margin-top: 3px;
    font-size: $small-font;
    color: $grey;

    span {
      color: $white;
    }

  }

  .crosses {
    margin-top: -2px;
    margin-left: 10px;
    font-size: $big-font;
    cursor: pointer;
    line-height: 1;
    -moz-transform: scale(1, 0.8);
    color: $red;
    &:hover {
      color: $bright-red;
    }
    &:active {
      color: $grey;
    }
  }

  .tabLists {
    flex-basis: 100%;
  }

}

.hide {
  display: none !important;
}

</style>
