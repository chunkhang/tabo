<template>

  <div>
    <h1 class="title is-4">
      {{ title }}
    </h1>
    <ul>
      <li v-for="(item, name) in actions">
        <p
          @click="item.handle()"
          :title="item.tip"
          :class="
            [
              'has-text-weight-normal clickable',
              {'disabled': item.disabled}
            ]
          "
        >{{ name }}</p>
      </li>
    </ul>
  </div>

</template>

<script>

export default {
  props: [
    "title",
    "actions"
  ]
}

</script>

<style lang="scss" scoped>

@import "../variables.scss";

div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h1 {
    color: $white;
    margin-bottom: 0 !important;
    margin-right: 10px;
  }

  ul {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    li {
      display: inline-block;
      margin-bottom: 0;
      margin-left: 15px;
    }

    .disabled {
      color: $grey;
      cursor: not-allowed;
      &:hover {
        text-decoration: none;
      }
    }

  }

}

</style>
