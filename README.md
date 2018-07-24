# client

## Explanations

1.  User 1 triggers the method `startAudioChat`. He then grants access to his microphone and inform (through socket.io) User 2 that he is ready to initiate a peer-to-peer communication. His media stream is stored in a variable.
1.  If User 2 accepts the invitation, he then grants access to his microphone and iniates a peer-to-peer communication by sending (through socket.io) the Offer (including his media stream) to User 1.
1.  Step 3 happens automatically. User 1 receives the Offer and send back the Answer to User 1 (including his media stream that was stored in step 1)
1.  Now User 1 and User 2 have all the necessary information to communicate with each other via peer-to-peer.

## Note

Before starting the conversation via WebRTC, we want to check 2 things :

1.  Does the user pressing the "audio chat" button has a microphone and allow the website to access it?
2.  Does the receiver really want to engage into a audio conversation?

These two points are the reason why we only store the media stream and do not already iniate the peer-to-peer communication.
Instead we wait for the receiver to accept the audio call. It then can seem counter-intuitive, but it is actually the receiver that iniates the peer-to-peer communication, since we know that user 1 want that communication and has already given access to his microphone. When user 1 receives the offer from user 2, we make use of the store media stream.

## Resources used

### WebSockets

[Official Getting Started Guide](https://socket.io/get-started/chat/)
[Andrew Mead Udemy Course](https://github.com/andrewjmead/node-course-2-chat-app)

### WebRTC

#### Theory

[WebRTC and the mechanics of peer to peer networking](WebRTC and the mechanics of peer to peer networking)

https://www.html5rocks.com/fr/tutorials/webrtc/basics

#### Tutorials

[Grafikart WebRTC](https://www.grafikart.fr/tutoriels/javascript/webrtc-864)

[Simple-Peer](https://github.com/feross/simple-peer)

#### Server list

STUN: https://gist.github.com/zziuni/3741933 (free)
TURN: http://numb.viagenie.ca/ (free)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```
