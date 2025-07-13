const socket = io()
const localVideo = document.getElementById("localVideo")
const remoteVideo = document.getElementById("remoteVideo")

let isInitiator = false
let gotAnswer = false

const peer = new RTCPeerConnection({
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
})

// Get user media
navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    console.log("🎥 Got local media stream")
    localVideo.srcObject = stream
    stream.getTracks().forEach((track) => peer.addTrack(track, stream))
  })
  .catch((err) => {
    console.error("❌ Failed to get local stream", err)
  })

// Handle remote stream
peer.ontrack = (event) => {
  console.log("📥 Received remote stream")
  remoteVideo.srcObject = event.streams[0]
  remoteVideo.play().catch(console.error)
}

// ICE candidate generation
peer.onicecandidate = (event) => {
  if (event.candidate) {
    console.log("📡 Sending ICE candidate")
    socket.emit("candidate", event.candidate)
  }
}

// Join signaling server
socket.on("connect", () => {
  console.log("🔌 Connected to signaling server")
  socket.emit("join")
})

// Who goes first?
socket.on("initiate", () => {
  isInitiator = true
  console.log("🚀 You are the initiator")

  peer
    .createOffer()
    .then((offer) => peer.setLocalDescription(offer))
    .then(() => {
      console.log("📤 Sending offer")
      socket.emit("offer", peer.localDescription)
    })
    .catch(console.error)
})

// Receiving an offer
socket.on("offer", async (offer) => {
  if (!isInitiator) {
    console.log("📩 Received offer")
    await peer.setRemoteDescription(new RTCSessionDescription(offer))
    const answer = await peer.createAnswer()
    await peer.setLocalDescription(answer)
    console.log("📤 Sending answer")
    socket.emit("answer", answer)
  }
})

// Receiving an answer
socket.on("answer", async (answer) => {
  console.log("📩 Received answer")
  await peer.setRemoteDescription(new RTCSessionDescription(answer))
})

// Receiving ICE candidate
socket.on("candidate", async (candidate) => {
  console.log("🌐 Received ICE candidate")
  try {
    await peer.addIceCandidate(new RTCIceCandidate(candidate))
  } catch (err) {
    console.error("❌ Error adding ICE candidate", err)
  }
})
