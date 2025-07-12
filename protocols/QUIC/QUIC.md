# QUIC

**QUIC** is a modern, secure, and fast transport protocol built by Google. It runs on top of **UDP**, but brings many of the advantages of **TCP + TLS + HTTP/2** all in one protocol.

Originally designed to fix TCP's weaknesses (like head-of-line blocking and slow handshake), QUIC now powers **HTTP/3** and is used by **Google**, **Cloudflare**, **Meta**, and more.

---

### 🚀 Why QUIC Matters

- ✅ **Fast**: 0-RTT connection setup (faster than TCP+TLS)
- ✅ **Secure by default**: Always encrypted (TLS 1.3 built-in)
- ✅ **Multiplexed streams**: No head-of-line blocking
- ✅ **Built for modern web**: Foundation for HTTP/3
- ✅ **UDP-based**: Bypasses legacy TCP limitations

---

### 🔄 How QUIC Works

| Layer          | What it does                                 |
| -------------- | -------------------------------------------- |
| **App**        | e.g. HTTP/3, gRPC, file transfer, game logic |
| **QUIC**       | Multiplexing, congestion control, encryption |
| **UDP**        | Datagram transport (unreliable, fast)        |
| **IP+Network** | Routing the packets                          |

📦 Unlike TCP, QUIC includes:

- TLS handshake
- Packet loss recovery
- Stream multiplexing

All over **UDP**.

---

### 🧠 Key Concepts

- **Streams**: You can send multiple streams of data independently in a single connection.
- **0-RTT**: A returning client can send data immediately without waiting for handshake.
- **Built-in encryption**: All QUIC connections are **always** encrypted.
- **Connection IDs**: Connections can migrate across IPs (mobile switching from Wi-Fi to LTE? No problem).

---

### 📉 QUIC vs TCP

| Feature               | TCP + TLS   | QUIC           |
| --------------------- | ----------- | -------------- |
| Transport layer       | TCP         | UDP            |
| Connection setup      | Slow        | Fast (0-RTT)   |
| Multiplexed streams   | HTTP/2 only | Built-in       |
| Head-of-line blocking | Yes         | No             |
| Encryption required?  | Optional    | Always TLS 1.3 |
| Mobility (IP change)  | No          | Yes (CID)      |

---

### ⚠️ Caveats

- 🔒 **All QUIC traffic is encrypted** — hard to inspect/debug like raw HTTP
- 🔧 Harder to implement than TCP (you can’t just read a socket)
- 🔥 Still not fully supported in all environments (but growing fast!)
- ❌ Not usable in browsers directly (you use HTTP/3 over QUIC)

---

### 🧪 Real Use Cases

| Use Case        | Why QUIC?                                   |
| --------------- | ------------------------------------------- |
| HTTP/3          | Core transport layer                        |
| Video streaming | Faster startup, less buffering              |
| Real-time apps  | Low latency, fast recovery from loss        |
| Gaming          | Smooth movement, tolerant of network issues |
| Mobile apps     | Seamless connection when switching networks |

---

### 🌐 QUIC Powers HTTP/3

```txt
Browser → HTTP/3 (QUIC) → UDP → IP → Server
```

## 🧠 What is Head-of-Line (HoL) Blocking?

Head-of-Line Blocking happens when one slow or lost packet delays everything else behind it, even if other data has already arrived.

Think of It Like a Line at a Toll Booth. Imagine you're on a highway:

- 🚗 Car #1 is fumbling with coins at the toll booth (it's slow)

- 🚗 Cars #2–#10 are ready, but they can't move until Car #1 is done

Even though Cars #2–#10 could go, they're stuck behind the first — that's head-of-line blocking.

🧱 In Networking (especially TCP):

TCP is a stream-based protocol — it guarantees that all data arrives in order. So if packet #1 is missing or delayed, packets #2, #3, #4... must wait. Even if those later packets arrived on time, they can't be processed. This causes delays and poor performance, especially in high-latency or lossy networks.

🚫 HoL Blocking in HTTP/2:

HTTP/2 introduced multiplexing over TCP (multiple streams on one connection). BUT it still runs on TCP → so HoL blocking at the transport layer still exists. If one stream has a blocked packet, all streams are delayed.

✅ How QUIC Fixes It :

- QUIC runs over UDP and manages streams independently:

- Each stream is isolated.

- If packet for Stream A is lost, Stream B keeps going without waiting.

No more “everyone gets stuck behind one missing piece.”

> QUIC eliminates HoL blocking at the transport layer — big win for speed and reliability.

---

### 🔐 TLS Requirement

QUIC **requires TLS encryption** by design — all QUIC connections are secure from the start.

- TLS provides authentication and confidentiality.
- QUIC integrates TLS 1.3 handshake into its transport layer to reduce latency.
- You **must provide TLS certificates** (self-signed for demos or real certs for production).

Without TLS, QUIC connections will not work.

---

Need to generate self-signed certs (if you don't have):

```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout cert/key.pem -out cert/cert.pem -days 365 -subj "/CN=localhost"
```
