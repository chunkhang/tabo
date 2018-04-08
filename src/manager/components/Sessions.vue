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
          tabs: [
            {
              favicon: "https://www.google.com/images/branding/product/ico/googleg_lodp.ico",
              url: "httasd",
              title: "Google Me"
            },
            {
              favicon: "https://www.google.com/images/branding/product/ico/googleg_lodp.ico",
              url: "httasd",
              title: "Google Me"
            }
          ]
        },
      ],
      fallbackText: "Nothing here. Try saving from Tabs."
    }
  }
}

</script>
