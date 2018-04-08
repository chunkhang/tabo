<template>

  <div class="column">
    <Header :title="headerTitle" :items="sessionItems"/>
    <hr>
    <SessionList :items="sessionItems"/>
    <p v-if="sessionItems.length == 0">{{ fallbackText }}</p>
  </div>

</template>

<script>

import Header from "./Header.vue";
import SessionList from "./SessionList.vue";

export default {
  components: {
    Header,
    SessionList
  },
  data: function() {
    return {
      headerTitle: "Sessions",
      sessionItems: [
        {
          name: "Apple",
          date: "2018/04/06",
          time: "19:30:01",
          tabs: [1, 2, 3]
        },
        {
          name: "Apple",
          date: "2018/04/06",
          time: "19:30:01",
          tabs: [1, 2, 3]
        },
        {
          name: "Apple",
          date: "2018/04/06",
          time: "19:30:01",
          tabs: [1, 2, 3]
        }
      ],
      fallbackText: "Nothing here. Try saving from Tabs."
    }
  }
}

</script>
