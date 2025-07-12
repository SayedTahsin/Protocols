import mqtt from "mqtt"

const client = mqtt.connect("mqtt://localhost:1883")

client.on("connect", () => {
  console.log("📥 Subscriber(receiver) connected on port localhost:1883")
  client.subscribe("test/topic", () => {
    console.log("✅ Subscribed to test/topic")
  })
})

client.on("message", (topic, message) => {
  console.log(`💬 Received message on '${topic}': ${message.toString()}`)
})
