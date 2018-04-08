<template>

  <ul>
    <li v-for="item in items">
      <p
        :class="savedActionClasses"
        @click="handleRemoveAction()"
        id="remove-action"
        title="Hotkey: <shift>"
        >Remove</p>
    </li>
  </ul>

</template>
