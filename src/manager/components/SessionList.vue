<template>

  <ul v-if="items.length != 0">
    <li v-for="item in items" class="items">
      <div>
        <p
          @click="$emit('open-item')"
          class="has-text-weight-normal clickable"
        >{{ item.name }}</p>
        <p class="subtitles has-text-weight-light">
          <span
            @click="$emit('toggle-tabs')"
            class="clickable"
          >{{ item.tabs.length | pluralize }}</span>
          @ {{ item.date }} {{ item.time }}
        </p>
      </div>
      <p
        @click="$emit('remove-item')"
        class="crosses has-text-weight-normal"
      >x</p>
      <!-- <div class="session-tab-lists hide"> -->
      <!--   <hr> -->
      <!--   <ul> -->
      <!--     <li -->
      <!--       is="tab-list" -->
      <!--       v-for="item in tabs" -->
      <!--       :favicon="item.favicon" -->
      <!--       :title="item.title" -->
      <!--       :url="item.url" -->
      <!--     ></li> -->
      <!--   </ul> -->
      <!-- </div> -->
    </li>
  </ul>

</template>

<script>

export default {
  props: [
    "items",
    "removing"
  ],
  filters: {
    pluralize: function(count) {
      var noun = "tab";
      if (count > 1) {
        noun += "s";
      }
      return `${count} ${noun}`;
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
}
.subtitles {
  margin-top: 3px;
  font-size: $small-font;
  color: $grey;
}
span {
  color: $white;
}
.hide {
  display: none !important;
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

</style>
