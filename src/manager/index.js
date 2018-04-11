import Vue from "vue";
import Store from "./Store.js"
import App from "./App";

new Vue({
  el: "#app",
  store: Store,
  render: h => h(App)
});
