const WebSocket = require("ws")
const net = require("net")

const wss = new WebSocket.Server({ port: 4000 })
console.log("🌐 WebSocket server listening on ws://localhost:4000")

wss.on("connection", (ws) => {
  console.log("🔗 WebSocket client connected")

  // Connect to TCP server when WebSocket client connects
  const tcpClient = new net.Socket()
  tcpClient.connect(5000, "localhost", () => {
    console.log("🔌 Connected to TCP server")
  })

  ws.on("message", (message) => {
    console.log("📨 From WebSocket:", message.toString())
    tcpClient.write(message.toString())
  })

  tcpClient.on("data", (data) => {
    console.log("↩️ From TCP:", data.toString())
    ws.send(data.toString())
  })

  ws.on("close", () => {
    console.log("❌ WebSocket disconnected")
    tcpClient.destroy()
  })

  tcpClient.on("error", (err) => {
    console.error("TCP error:", err.message)
    ws.send("TCP Error: " + err.message)
  })
})
