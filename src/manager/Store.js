import Vue from "vue";
import Vuex from "vuex";
import Helper from "./Helper.js";

Vue.use(Vuex);

// State
var state = {
  sessions: [],
  tabs: [],
  actions: []
};

// Getters
var getters = {
  getSessions(state) {
    return state.sessions;
  },
  getTabs(state) {
    return state.tabs;
  }
};

// Mutations
var mutations = {
  ADD_SESSION(state, payload) {
    var item = {
      name: payload.name,
      tabs: payload.tabs,
      date: Helper.getDateNow(),
      time: Helper.getTimeNow(),
      hide: false
    };
    state.sessions.unshift(item);
  },
  TOGGLE_SESSION(state, payload) {
    var item = state.sessions[payload];
    item.hide = !item.hide;
  },
  DELETE_SESSION(state, payload) {
    state.sessions.splice(payload, 1);
  },
  CLEAR_SESSIONS(state) {
    state.sessions = [];
  },
  ADD_TAB(state, payload) {
    var item = {
      title: payload.title,
      favicon: payload.favicon,
      url: payload.url
    };
    state.tabs.push(item);
  },
  DELETE_TAB(state, payload) {
    state.tabs.splice(payload, 1);
  },
  CLEAR_TABS(state) {
    state.tabs = [];
  }
};

// Actions
var actions = {
  addSession(context, payload) {
    context.commit("ADD_SESSION", payload);
  },
  toggleSession(context, payload) {
    context.commit("TOGGLE_SESSION", payload);
  },
  deleteSession(context, payload) {
    context.commit("DELETE_SESSION", payload);
  },
  clearSessions(context) {
    context.commit("CLEAR_SESSIONS");
  },
  addTab(context, payload) {
    context.commit("ADD_TAB", payload);
  },
  deleteTab(context, payload) {
    context.commit("DELETE_TAB", payload);
  },
  clearTabs(context) {
    context.commit("CLEAR_TABS");
  }
};

var Store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});

export default Store;
