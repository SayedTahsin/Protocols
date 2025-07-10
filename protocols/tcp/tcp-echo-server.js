const net = require("net")

const server = net.createServer((socket) => {
  console.log("🔌 TCP client connected")

  socket.on("data", (data) => {
    console.log("📥 Received:", data.toString())
    socket.write(`Echo: ${data}`)
  })

  socket.on("end", () => {
    console.log("❌ TCP client disconnected")
  })

  socket.on("error", (err) => {
    console.error("⚠️ Socket error:", err.message)
  })
})

server.listen(5000, () => {
  console.log("🚀 TCP server listening on port 5000")
})
