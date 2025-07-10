const dgram = require("dgram")
const server = dgram.createSocket("udp4")

server.on("message", (msg, rinfo) => {
  console.log(`UDP server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
  // Echo the message back to sender
  server.send(msg, rinfo.port, rinfo.address)
})

server.bind(41234, () => {
  console.log("UDP Echo server listening on port 41234")
})
