import Vue from "vue";
import Vuex from "vuex";
import Helper from "./Helper.js";
import LocalStorage from "./LocalStorage.js";

Vue.use(Vuex);

// State
var state = {
  sessions: [],
  tabs: [],
  showingCard: false
};

// Getters
var getters = {
  getSessions(state) {
    return state.sessions;
  },
  getTabs(state) {
    return state.tabs;
  },
  getShowingCard(state) {
    return state.showingCard;
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
      // hide: false
    };
    state.sessions.unshift(item);
    LocalStorage.sessions.save(state.sessions);
  },
  TOGGLE_SESSION(state, payload) {
    var item = state.sessions[payload];
    item.hide = !item.hide;
  },
  DELETE_SESSION(state, payload) {
    state.sessions.splice(payload, 1);
    LocalStorage.sessions.save(state.sessions);
  },
  CLEAR_SESSIONS(state) {
    state.sessions = [];
    LocalStorage.sessions.save(state.sessions);
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
  },
  TOGGLE_SHOWING_CARD(state) {
    state.showingCard = !state.showingCard;
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
  },
  toggleShowingCard(context) {
    context.commit("TOGGLE_SHOWING_CARD");
  }
};

var Store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});

export default Store;
