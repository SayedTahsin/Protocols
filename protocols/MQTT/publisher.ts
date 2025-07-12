import mqtt from "mqtt"

const client = mqtt.connect("mqtt://localhost:1883")

client.on("connect", () => {
  console.log("📤 Publisher(sender) connected on port localhost:1883")

  setInterval(() => {
    const msg = `Hello MQTT! ${new Date().toLocaleTimeString()}`
    client.publish("test/topic", msg)
    console.log("📨 Published:", msg)
  }, 5000)
})
