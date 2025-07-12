import aedes from "aedes"
import net from "net"

const broker = new aedes()
const server = net.createServer(broker.handle)

const PORT = 1883

server.listen(PORT, () => {
  console.log(`🚀 MQTT broker running on port ${PORT}`)
})

broker.on("client", (client) => {
  console.log(`👤 Client connected: ${client?.id}`)
})

broker.on("clientDisconnect", (client) => {
  console.log(`❌ Client disconnected: ${client?.id}`)
})

broker.on("subscribe", (subscriptions, client) => {
  subscriptions.forEach((sub) => {
    console.log(`📡 Client '${client?.id}' subscribed to '${sub.topic}'`)
  })
})

broker.on("unsubscribe", (subscriptions, client) => {
  subscriptions.forEach((topic) => {
    console.log(`📴 Client '${client?.id}' unsubscribed from '${topic}'`)
  })
})

broker.on("publish", (packet, client) => {
  if (client) {
    console.log(
      `📨 Message published by '${client.id}' to topic '${
        packet.topic
      }': ${packet.payload.toString()}`
    )
  } else {
    console.log(
      `🛰 Message sent to topic '${packet.topic}': ${packet.payload.toString()}`
    )
  }
})
