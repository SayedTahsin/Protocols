const http = require("http")

const server = http.createServer((req, res) => {
  console.log(`[HTTP] ${req.method} ${req.url}`)
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("Hello from HTTP server!\n")
})

server.listen(3000, () => {
  console.log("🚀 HTTP server running on http://localhost:3000")
})

// curl http://localhost:3000
