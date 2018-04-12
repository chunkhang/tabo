<template>

  <div class="modal" id="card">
    <div class="modal-background" @click="handleClick()"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        <div class="field">
          <div class="control">
            <input
              @keyup.enter="handleEnter()"
              @keyup.esc="handleEscape()"
              id="cardInput"
              class="input has-text-weight-normal"
              type="text"
              :placeholder="text">
          </div>
        </div>
      </section>
    </div>
  </div>

</template>

<script>

import Bus from "../Bus.js";

export default {
  data() {
    return {
      text: "Name the session...",
    }
  },
  mounted() {
    Bus.$on("open-card", this.showCard);
  },
  methods: {
    showCard() {
      card.classList.add("is-active");
      cardInput.focus();
      this.toggleShowingCard();
    },
    hideCard() {
      card.classList.remove("is-active");
      cardInput.value = "";
      this.toggleShowingCard();
    },
    handleEnter() {
      var name = cardInput.value.trim();
      if (name != "") {
        this.addSession(name);
        this.hideCard();
      }
    },
    handleEscape() {
      this.hideCard();
    },
    handleClick() {
      this.hideCard();
    },
    addSession(name) {
      var session = {
        name: name,
        tabs: this.$store.getters.getTabs
      };
      this.$store.dispatch("addSession", session);
    },
    toggleShowingCard() {
      this.$store.dispatch("toggleShowingCard");
    }
  }
}

</script>

<style lang="scss" scoped>

@import "../variables.scss";

.modal {
  align-items: flex-start;
  padding-top: 25vh;

  .modal-background {
    background-color: $black;
    opacity: 0.5;
  }

  .modal-card {
    width: 400px;

    .modal-card-body {
      padding: 0;
      border-radius: 3px;

      .input {
        height: 35px;
        background-color: $white;
        color: $black;
        border: none;
        box-shadow: none;
        border-radius: inherit;
        font-size: $medium-font;
        padding: 20px 12px;
        &::-moz-placeholder {
          font-size: $medium-font;
          color: $black;
        }
      }

    }

  }

}



</style>
