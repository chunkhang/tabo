<template>
  <div class="modal" id="save-card">
    <div
      class="modal-background"
      @click="hideSaveCard()"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        <div class="field">
          <div class="control">
            <input
              ref="nameInput"
              @keyup.enter="handleSaveCardSubmit()"
              @keyup.esc="hideSaveCard()"
              id="name-input"
              class="input has-text-weight-normal"
              type="text"
              placeholder="Name the session...">
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
