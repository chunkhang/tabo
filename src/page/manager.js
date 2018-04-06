// Components
Vue.component("tab-list", {
  template: `
    <li>
      <div class="currentTabs">
        <img :src=favicon>
        <span class="titles">
          <a
            :href=url
            target="_blank"
            class="medium-font has-text-weight-normal primary-color clickable"
          >{{ title }}</a>
        </span>
      </div>
    </li>
  `,
  props: ["favicon", "title", "url"]
});
Vue.component("session-list", {
  template: `
    <li>
      <div class="sessions">
        <p
          @click="$emit('open-item')"
          class="names medium-font has-text-weight-normal clickable"
        >{{ name }}</p>
        <p class="small-font has-text-weight-light secondary-color">
          <span
            @click="$emit('toggle-tabs')"
            class="tab-toggles primary-color clickable"
          >{{ count | pluralize }}</span>
          @ {{ date }} {{ time }}
        </p>
      </div>
      <p
        v-if="remove"
        @click="$emit('remove-item')"
        class="removes medium-font primary-color has-text-weight-normal"
      >x</p>
      <div class="session-tab-lists hide">
        <hr>
        <ul>
          <li
            is="tab-list"
            v-for="item in tabs"
            :favicon="item.favicon"
            :title="item.title"
            :url="item.url"
          ></li>
        </ul>
      </div>
    </li>
  `,
  props: ["name", "tabs", "date", "time", "remove"],
  filters: {
    pluralize: function(value) {
      var noun = "tab";
      if (value > 1) {
        noun += "s";
      }
      return `${value} ${noun}`;
    }
  },
  computed: {
    count: function() {
      return this.tabs.length;
    }
  }
});

// Application
new Vue({
  el: "#vue-app",
  data: function() {
    return {
      actionClasses: ["medium-font", "has-text-weight-normal", "clickable"],
      currentItems: [],
      savedItems: [],
      sessionTabsOpen: false,
      sessionIndex: 0
    };
  },
  created: function() {
    var vue = this;
    // Reactive current tabs
    vue.updateCurrentItems();
    browser.tabs.onUpdated.addListener(function() {
      vue.updateCurrentItems();
    });
    browser.tabs.onRemoved.addListener(function() {
      setTimeout(vue.updateCurrentItems, 500);
    });
    // Load saved sessions from storage
    browser.storage.local.get("sessions").then(function(results) {
      if (Object.keys(results).length != 0) {
        vue.savedItems = results.sessions;
      }
    });
    // Global hotkeys
    window.addEventListener("keydown", function(event) {
      if (!element.saveAction.classList.contains("active")) {
        // Space
        if (event.keyCode == 32) {
          vue.handleSaveAction();
        // Shift
        } else if (event.keyCode == 16) {
          vue.handleRemoveAction();
        // Escape
        } else if (event.keyCode == 27) {
          if (vue.sessionTabsOpen) {
            vue.handleSavedItemTabs(vue.sessionIndex);
          } else if (element.removeAction.classList.contains("active")) {
            vue.handleRemoveAction();
          }
        }
      }
    });
  },
  computed: {
    // Toggle save action
    currentActionClasses: function() {
      var classes = this.actionClasses.join(" ");
      if (this.currentItems.length == 0) {
        classes += " disabled";
      }
      return classes;
    },
    // Toggle remove and clear actions
    savedActionClasses: function() {
      var classes = this.actionClasses.join(" ");
      if (this.savedItems.length == 0) {
        classes += " disabled";
      }
      return classes;
    }
  },
  methods: {

    /* Current Tabs */

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
    },

    // Handler function for save action
    handleSaveAction() {
      if (!element.saveAction.classList.contains("disabled")) {
        element.removeAction.classList.remove("active");
        this.savedItems.forEach(item => item.remove = false);
        this.showSaveCard();
      }
    },

    // Handler function for input card submit
    handleSaveCardSubmit() {
      var name = this.$refs.nameInput.value.trim();
      if (name != "") {
        this.saveCurrentItems(name);
        this.hideSaveCard();
      }
    },

    // Show input card for saving tabs
    showSaveCard() {
      element.saveAction.classList.add("active");
      element.saveCard.classList.add("is-active");
      element.saveInput.value = "";
      element.saveInput.focus();
    },

    // Hide input card for saving tabs
    hideSaveCard() {
      element.saveAction.classList.remove("active");
      element.saveCard.classList.remove("is-active");
    },

    // Save tabs as session
    saveCurrentItems(sessionName) {
      var items = this.currentItems;
      if (items.length >= 1) {
        var session = {
          date: helper.getDateNow(),
          time: helper.getTimeNow(),
          name: helper.capitalize(sessionName),
          tabs: items,
          remove: false
        };
        this.savedItems.unshift(session);
      }
      helper.storeSessions(this.savedItems);
    },

    /* Saved Sessions */

    // Handler function for remove action
    handleRemoveAction() {
      if (!element.removeAction.classList.contains("disabled")) {
        element.removeAction.classList.toggle("active");
        this.toggleRemoveButtons();
      }
    },

    // Toggle showing remove buttons
    toggleRemoveButtons() {
      this.savedItems.forEach(item => item.remove = !item.remove);
    },

    // Remove session
    removeSavedItem(index) {
      this.savedItems.splice(index, 1);
      helper.storeSessions(this.savedItems);
    },

    // Handler function for clear action
    handleClearAction() {
      if (!element.removeAction.classList.contains("disabled")) {
        this.clearSavedItems();
      }
    },

    // Remove all sessions
    clearSavedItems() {
      this.savedItems = [];
      helper.storeSessions(this.savedItems);
    },

    // Open session as tabs
    openSavedItem(index) {
      var urls = this.savedItems[index].tabs.map(tab => tab.url);
      browser.windows.create({
        url: urls
      });
    },

    // Handler function for tabs toggle for session
    handleSavedItemTabs(index) {
      var sessionItems = element.savedList.childNodes;
      var item;
      for (var i = 0; i < sessionItems.length; i++) {
        if (i == index) {
          item = sessionItems[i];
        } else {
          sessionItems[i].classList.toggle("hide");
        }
      }
      var tabToggle = item.getElementsByClassName("tab-toggles")[0];
      var tabList = item.getElementsByClassName("session-tab-lists")[0];
      if (element.removeAction.classList.contains("active")) {
        element.removeAction.classList.remove("active");
        this.toggleRemoveButtons();
      }
      if (tabList.classList.contains("hide")) {
        element.saveAction.classList.add("disabled");
        element.removeAction.classList.add("disabled");
        element.clearAction.classList.add("disabled");
        this.sessionTabsOpen = true;
        this.sessionIndex = index;
      } else {
        if (this.currentItems.length >= 1) {
          element.saveAction.classList.remove("disabled");
        }
        element.removeAction.classList.remove("disabled");
        element.clearAction.classList.remove("disabled");
        this.sessionTabsOpen = false;
      }
      tabToggle.classList.toggle("active");
      tabList.classList.toggle("hide");
    },

    /* Settings */

    // Open about page in new tab
    openAboutPage() {
      var url = "https://github.com/chunkhang/tabo";
      window.open(url, "_blank");
    }

  }
});

// Elements
var element = {
  saveAction: document.getElementById("save-action"),
  saveCard: document.getElementById("save-card"),
  saveInput: document.getElementById("name-input"),
  savedList: document.getElementById("saved-list"),
  removeAction: document.getElementById("remove-action"),
  clearAction: document.getElementById("clear-action")
};

// Helper functions
var helper = {
  capitalize: function(text) {
    var words = text.split(" ");
    words = words.map(function(word) {
      return word[0].toUpperCase() + word.slice(1);
    });
    return words.join(" ");
  },
  getDateNow: function() {
    var today = new Date();
    var date = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    ].map(helper.formatDigit);
    return date.join("/");
  },
  getTimeNow: function() {
    var today = new Date();
    var time = [
      today.getHours(),
      today.getMinutes(),
      today.getSeconds()
    ].map(helper.formatDigit);
    return time.join(":");
  },
  formatDigit: function(number) {
    if (number < 10) {
      number = "0" + number;
    }
    return number;
  },
  storeSessions: function(sessions) {
    var items = JSON.parse(JSON.stringify(sessions));
    items = items.map(function(item) {
      item.remove = false;
      return item;
    });
    browser.storage.local.set({"sessions": items});
  }
};
