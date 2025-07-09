const http2 = require("http2")
const fs = require("fs")

const server = http2.createSecureServer({
  key: fs.readFileSync("certs/key.pem"),
  cert: fs.readFileSync("certs/cert.pem"),
})

server.on("stream", (stream, headers) => {
  console.log(`[HTTP/2] ${headers[":method"]} ${headers[":path"]}`)
  stream.respond({
    "content-type": "text/plain",
    ":status": 200,
  })
  stream.end("Hello from HTTP/2 server!\n")
})

server.listen(3444, () => {
  console.log("⚡ HTTP/2 server running on https://localhost:3444")
})

// curl -k http://localhost:3444
