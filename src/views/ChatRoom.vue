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

        <button @click="startAudioChat">Audio Chat</button>

      </footer>
    </section>
    <v-dialog/>
    <audio id="audio-tag" autoplay playsinline></audio>
  </div>
</template>

<script>
import SimplePeer from 'simple-peer'

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
      users: ['Henry', 'David'],
      peer: null,
      myAudioStream: null,
    }
  },
  sockets: {
    shareAudioModal(name) {
      this.$modal.show('dialog', {
        title: 'Start Audio Conversation',
        text: name + 'would like to start an audio chat with you.',
        buttons: [
          {
            title: 'Accept', // Button title
            default: true, // Will be triggered by default if 'Enter' pressed.
            handler: this.acceptAudioChat, // Button click handler
          },
          {
            title: 'Refuse',
          },
        ],
      })
    },
    updateUserList(users) {
      this.users = users
    },
    newMessage(msg) {
      console.log(msg)
      this.messages.push(msg)
    },
    transmitOffer(data) {
      console.log('receiving Offer', data)
      if (this.peer === null) {
        // peer 2
        this.peer = new SimplePeer({
          initiator: false,
          stream: this.myAudioStream,
          config: {
            iceServers: [
              {
                urls: 'stun:stun.l.google.com:19302',
              },
              {
                urls: 'stun:global.stun.twilio.com:3478?transport=udp',
              },
              {
                urls: 'turn:numb.viagenie.ca',
                credential: 'hiragana',
                username: 'mornirmornir@hotmail.com',
              },
            ],
          },
        })
        this.bindEvents(this.peer)
      }

      this.peer.signal(data)
    },
  },
  methods: {
    async acceptAudioChat() {
      console.log('YES!!')
      this.$modal.hide('dialog')

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        })
        this.peer = new SimplePeer({
          initiator: true,
          stream,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },
              {
                urls: 'turn:numb.viagenie.ca',
                credential: 'hiragana',
                username: 'mornirmornir@hotmail.com',
              },
            ],
          },
        })
        this.bindEvents(this.peer)
      } catch (e) {
        console.log(e.message)
      }
    },
    async startAudioChat() {
      try {
        this.myAudioStream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        })
        this.$socket.emit('askAudio')
      } catch (e) {
        console.log(e.message)
      }
    },
    sendMessage() {
      this.$socket.emit('createMessage', { text: this.message }, () => {
        this.message = ''
      })
    },
    bindEvents(p) {
      p.on('error', err => {
        console.log(err)
      })

      p.on('signal', data => {
        this.$socket.emit('createOffer', data)
      })

      p.on('stream', stream => {
        console.log('got remote audio stream', stream)
        document.querySelector('#audio-tag').srcObject = stream
      })
    },
  },
  created() {
    this.$socket.emit('join', { name: this.name, room: this.room }, err => {
      if (err) {
        alert(err)
      } else {
        console.log('No error')
      }
    })
  },
  components: {
    ChatMessage,
  },
}
</script>

<style>
</style>
