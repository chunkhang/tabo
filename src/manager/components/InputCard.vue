<template>

  <div class="modal" id="card">
    <div class="modal-background" @click="hideCard()"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        <div class="field">
          <div class="control">
            <input
              ref="nameInput"
              @keyup.enter="handleSaveCardSubmit()"
              @keyup.esc="hideCard()"
              id="cardInput"
              class="input has-text-weight-normal"
              type="text"
              :placeholder="placeholderText">
          </div>
        </div>
      </section>
    </div>
  </div>

</template>

<script>

export default {
  data: function() {
    return {
      placeholderText: "Name the session...",
    }
  },
  methods: {
    hideCard: function() {
      card.classList.remove("is-active");
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
