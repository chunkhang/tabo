<template>

  <div>
    <h1 class="title is-4">
      {{ title }} <span v-if="items">({{ items.length }})</span>
    </h1>
    <ul>
      <li v-for="(action, name) in actions">
        <p
          @click="action.handle()"
          :title="action.title"
          :class="
            [
              'has-text-weight-normal clickable',
              {
                'active': action.active,
                'disabled': action.disabled
              }
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
    "actions",
    "items"
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
