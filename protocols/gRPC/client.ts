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

client.SayHello({ name: "Tahsin" }, (err: any, response: any) => {
  if (err) console.error(err)
  else console.log("Greeting:", response.message)
})
