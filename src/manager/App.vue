<template>

  <section class="section">
    <div class="container">
      <div class="columns is-6 is-variable">
        <CurrentTabs/>
        <!-- <SavedSessions/> -->
        <!-- <Settings/> -->
    </div>
  </section>

</template>

<script>

import CurrentTabs from "./components/CurrentTabs.vue";
// import SavedSessions from "./components/SavedSessions.vue";
// import Settings from "./components/Settings.vue";

export default {
  components: {
    CurrentTabs,
    // SavedSessions,
    // Settings
  }
}

</script>

<style lang="scss">

@import "~bulma/css/bulma.css";
@import "./variables.scss";

body {
  line-height: 1.2;
}
.section {
  color: $white;
  background-color: $black;
  padding-top: 35px;
  min-height: 100vh;
}
li {
  margin-bottom: 12px;
}
.clickable {
  cursor: pointer;
  -moz-user-select: none;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    color: $grey;
    text-decoration: none;
  }
}

</style>
