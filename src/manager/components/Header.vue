<template>

  <div class="actions">
    <h1 class="title is-4">
      {{ title }} ({{ items.length }})
    </h1>
  </div>
  <!-- <ActionList :actions="actionItems"/> -->

</template>

<script>

export default {
  props: [
    "title",
    "items"
  ]
}

</script>

<style lang="scss" scoped>

@import "../variables.scss";

h1 {
  color: $white;
  margin-bottom: 0 !important;
  margin-right: 10px;
}

</style>
