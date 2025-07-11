import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import path from "path"

// 1. Load the .proto file
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

// 2. Load the gRPC package definition
const grpcObj = grpc.loadPackageDefinition(packageDef) as any

// 3. Get the greeter service
const greeterPackage = grpcObj.greeter

// 4. Create the server
const server = new grpc.Server()

// 5. Add the Greeter service implementation
server.addService(greeterPackage.Greeter.service, {
  SayHello: (call: any, callback: any) => {
    const name = call.request.name
    callback(null, { message: `Hello, ${name}!` })
  },
})

// 6. Bind the server to a port and start it
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("✅ gRPC server running at http://0.0.0.0:50051")
  }
)
