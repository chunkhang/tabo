<template>

  <div class="column">
    <Header :title="headerTitle" :items="savedItems"/>

    <div class="actions">
      <h1 class="title is-4 primary-color" >
        Saved Sessions ({{ savedItems.length }})
      </h1>
      <ul>
        <li>
          <p
            :class="savedActionClasses"
            @click="handleRemoveAction()"
            id="remove-action"
            title="Hotkey: <shift>"
            >Remove</p>
        </li>
        <li>
          <p
            :class="savedActionClasses"
            @click="handleClearAction()"
            id="clear-action"
            >Clear All</p>
        </li>
      </ul>
    </div>
    <hr>
    <!-- Content -->
    <ul id="saved-list">
      <li
        is="session-list"
        v-for="(item, index) in savedItems"
        :name="item.name"
        :tabs="item.tabs"
        :date="item.date"
        :time="item.time"
        :remove="item.remove"
        @open-item="openSavedItem(index)"
        @remove-item="removeSavedItem(index)"
        @toggle-tabs="handleSavedItemTabs(index)"
      ></li>
    </ul>
    <p
      class="medium-font"
      v-if="savedItems.length == 0"
    >Nothing here. Try saving from Current Tabs.</p>
  </div>

</template>

<script>

export default {
  components: {
    Header,
    SessionList
  },
  data: function() {
    return {
      headerTitle: "Saved Sessions",
      savedItems: []
    }
  }
}

</script>
