const https = require("https")
const fs = require("fs")

const options = {
  key: fs.readFileSync("certs/key.pem"),
  cert: fs.readFileSync("certs/cert.pem"),
}

const server = https.createServer(options, (req, res) => {
  console.log(`[HTTPS] ${req.method} ${req.url}`)
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("Hello from HTTPS server!\n")
})

server.listen(3443, () => {
  console.log("🔐 HTTPS server running on https://localhost:3443")
})

// curl -k http://localhost:3443
