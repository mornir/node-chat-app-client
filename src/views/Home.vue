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
          <label for="room">Roon name</label>
          <input type="text" name="room" required v-model="room">
        </div>
        <div class="error-message" v-if="err">{{ err }}</div>
        <div class="form-field">
          <button type="submit">JOIN</button>
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
    }
  },
  sockets: {
    connect_error(err) {
      console.error(err)
      this.err = `Cannot connect to server: ${err.message}`
    },
  },
  methods: {
    goToRoom() {
      this.$socket.emit('join', { name: this.name, room: this.room }, err => {
        if (err) {
          alert(err)
        } else {
          console.log('No error')

          this.$router.push({
            name: 'chat-room',
            params: { name: this.name, room: this.room },
          })
        }
      })
    },
  },
}
</script>

<style scoped>
.error-message {
  color: #ff4136;
}
</style>

