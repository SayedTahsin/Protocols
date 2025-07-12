import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import path from "path"

const packageDef = protoLoader.loadSync(
  path.join(__dirname, "./protos/greeter.proto")
)

const grpcObj = grpc.loadPackageDefinition(packageDef) as any
const greeter = grpcObj.greeter

const client = new greeter.Greeter(
  "localhost:50051",
  grpc.credentials.createInsecure()
)

const call = client.Chat()

call.on("data", (msg: any) => {
  console.log("Received from server:", msg.message)
})

call.on("end", () => {
  console.log("Chat ended by server")
})

// Send some messages with delay
const messages = [
  "Hello",
  "How are you?",
  "This is bi-directional streaming",
  "Bye!",
]

let index = 0
const interval = setInterval(() => {
  if (index < messages.length) {
    console.log("Sending to server:", messages[index])
    call.write({ message: messages[index] })
    index++
  } else {
    clearInterval(interval)
    call.end() // Signal end of client messages
  }
}, 1000)
