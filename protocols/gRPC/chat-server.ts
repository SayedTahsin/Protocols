import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import path from "path"

const packageDef = protoLoader.loadSync(
  path.join(__dirname, "./protos/greeter.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
)

const grpcObj = grpc.loadPackageDefinition(packageDef) as any
const greeter = grpcObj.greeter

const server = new grpc.Server()

server.addService(greeter.Greeter.service, {
  Chat: (call: grpc.ServerDuplexStream<any, any>) => {
    console.log("Client connected to Chat")

    call.on("data", (msg) => {
      console.log("Received from client:", msg.message)
      // Echo the message back prepended with "Server says: "
      call.write({ message: `Server says: ${msg.message}` })
    })

    call.on("end", () => {
      console.log("Client ended chat")
      call.end()
    })
  },
})

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("gRPC bi-di streaming server running on port 50051")
  }
)
