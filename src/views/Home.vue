<template>
  <div class="centered-form">

    <div class="centered-form__form">
      <form @submit.prevent="goToRoom">
        <div class="form-field">
          <h3>Join a Chat</h3>
        </div>
        <div class="form-field">
          <label for="name">Display name</label>
          <input type="text" name="name" autofocus required v-model="name">
        </div>
        <div class="form-field">
          <label for="room">Room name</label>
          <input type="text" name="room" required v-model="room">
        </div>
        <div class="error-message" v-if="err">{{ err }}</div>
        <div class="form-field">
          <button type="submit" :disabled="disableButton">JOIN</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      name: '',
      room: '',
      err: null,
      disableButton: true,
    }
  },
  sockets: {
    // prevent joining if server is not up and running
    // in main.js linking socket.io to vue-sockets triggers the connect hook immediately on the first page displayed.
    connect_error(err) {
      console.error(err)
      this.disableButto = true
      this.err = `Cannot connect to server: ${err.message}`
    },
    connect() {
      console.log('connect')
      this.disableButton = false
    },
    reconnect() {
      console.log('reconnect')
      this.disableButton = false
    },
  },
  methods: {
    goToRoom() {
      this.$router.push(`/chat-room/${this.room}/${this.name}`)
    },
  },
}
</script>

<style scoped>
.error-message {
  color: #ff4136;
}
</style>

