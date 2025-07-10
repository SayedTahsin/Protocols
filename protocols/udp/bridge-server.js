const WebSocket = require("ws")
const dgram = require("dgram")

const UDP_TARGET_HOST = "127.0.0.1"
const UDP_TARGET_PORT = 41234

const udpClient = dgram.createSocket("udp4")
const wss = new WebSocket.Server({ port: 8080 })
console.log("WebSocket-to-UDP bridge listening on ws://localhost:8080")

wss.on("connection", (ws) => {
  console.log("WebSocket client connected")

  ws.on("message", (message) => {
    console.log(`Received from WS client: ${message}`)

    // Send message via UDP to UDP server
    udpClient.send(message, UDP_TARGET_PORT, UDP_TARGET_HOST, (err) => {
      if (err) console.error("UDP send error:", err)
    })
  })

  // Listen for UDP responses and forward them to the WS client
  udpClient.on("message", (msg, rinfo) => {
    console.log(`Received UDP response: ${msg}`)
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(msg.toString())
    }
  })

  ws.on("close", () => {
    console.log("WebSocket client disconnected")
  })
})
