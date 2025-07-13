// 🟢 WebSocket Signaling Server for WebRTC using Express + Socket.IO

const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const path = require("path")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// Serve static files from the "public" folder (e.g., index.html, script.js)
app.use(express.static(path.join(__dirname, "public")))

let userCount = 0 // Track number of connected users

// Handle new socket connections
io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id)
  userCount++

  // Let the first user initiate the WebRTC offer
  if (userCount === 1) {
    socket.emit("initiate") // Trigger client-side offer creation
  }

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id)
    userCount--
  })

  // Relay the WebRTC offer to other connected peers
  socket.on("offer", (data) => {
    console.log("📤 Broadcasting offer")
    socket.broadcast.emit("offer", data)
  })

  // Relay the WebRTC answer to the offer creator
  socket.on("answer", (data) => {
    console.log("📤 Broadcasting answer")
    socket.broadcast.emit("answer", data)
  })

  // Relay ICE candidates between peers
  socket.on("candidate", (data) => {
    console.log("📤 Broadcasting candidate")
    socket.broadcast.emit("candidate", data)
  })
})

// Start the signaling server
server.listen(3000, () => {
  console.log("🚀 Signaling server running on http://localhost:3000")
})
