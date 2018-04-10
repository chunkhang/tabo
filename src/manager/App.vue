<template>

  <section class="section">
    <div class="container">
      <div class="columns is-6 is-variable">
        <Tabs/>
        <Sessions/>
        <Settings/>
    </div>
  </section>

</template>

<script>

import Tabs from "./components/Tabs.vue";
import Sessions from "./components/Sessions.vue"
import Settings from "./components/Settings.vue";

export default {
  components: {
    Tabs,
    Sessions,
    Settings
  }
}

</script>

<style lang="scss">

@import "./bulma.css";
@import "./variables.scss";

body {
  line-height: 1.2;

  .section {
    color: $white;
    background-color: $black;
    padding-top: 35px;
    min-height: 100vh;
  }

  hr {
    margin: 15px 0;
  }

  li {
    margin-bottom: 12px;
  }

  p {
    font-size: $medium-font;
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

  .active {
    text-decoration: underline;
  }

}

</style>
