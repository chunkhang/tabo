<template>

  <ul v-if="items.length != 0">
    <li v-for="item in items">
      <div>
        <img :src="item.favicon">
        <span>
          <a
            :href="item.url"
            target="_blank"
            class="has-text-weight-normal clickable"
          >{{ item.title }}</a>
        </span>
      </div>
    </li>
  </ul>

</template>

<script>

export default {
  props: [
    "items"
  ]
}

</script>

<style lang="scss" scoped>

@import "../variables.scss";

div {
  display: flex;
  justify-content: flex-start;
}
img {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
span {
  display: flex;
}
a {
  font-size: $medium-font;
  color: $white;
  white-space: pre-wrap;
}

</style>
