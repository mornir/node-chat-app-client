<template>
  <div class="chat">

    <aside class="chat__sidebar">
      <h3>People</h3>
      <div id="users">
        <ol>
          <li v-for="user in users" :key="user">{{ user }}</li>
        </ol>
      </div>
    </aside>

    <section class="chat__main">
      <ol class="chat__messages">
        <chat-message v-for="msg in messages" :msg="msg" :key="msg.createAt"></chat-message>
      </ol>

      <footer class="chat__footer">

        <form @submit.prevent="sendMessage">
          <input type="text" placeholder="Message" required v-model="message" autofocus autocomplete="off" />

          <button type="submit">Send</button>
        </form>

        <!--   <button @click="startAudioChat" style="margin-right: 0.2rem">Audio Chat</button> -->
        <button @click="sendLocation" :disabled="isButtonDisabled">{{ sendLocationButtonText }}</button>

      </footer>
    </section>

    <!--     <audio id="audio-tag" autoplay playsinline></audio> -->
  </div>
</template>

<script>
import ChatMessage from '@/components/ChatMessage'
export default {
  name: 'chat-room',
  props: {
    name: {
      type: String,
      default: 'Henry',
    },
    room: {
      type: String,
      default: 'A',
    },
  },
  data() {
    return {
      message: '',
      messages: [],
      isButtonDisabled: false,
      sendLocationButtonText: 'Send Location',
      users: ['Henry', 'David'],
      peer: null,
    }
  },
  sockets: {
    newMessage(msg) {
      console.log(msg)
      this.messages.push(msg)
    },
  },
  methods: {
    sendMessage() {
      this.$socket.emit('createMessage', { text: this.message }, () => {
        this.message = ''
      })
    },
    sendLocation() {
      this.isButtonDisabled = true
      this.sendLocationButtonText = 'Sending location...'
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          this.$socket.emit('createLocationMessage', {
            latitude,
            longitude,
          })
        },
        () => {
          alert('Unable to fetch location.')
          this.isButtonDisabled = false
          this.sendLocationButtonText = 'Send Location'
        }
      )
    },
  },
  components: {
    ChatMessage,
  },
}
</script>

<style>
</style>
