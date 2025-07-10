# 📦 UDP

**UDP (User Datagram Protocol)** is a fast, connectionless transport protocol defined in **RFC 768 (1980)**. It sends data without setup, tracking, or guarantees — making it perfect for speed-critical tasks.

---

## ⚡ Why Use UDP?

- No connection setup — just send and forget.
- Low overhead, minimal delay.
- Great for real-time use cases like **DNS**, **VoIP**, **gaming**, and **video streaming**.

---

## 🧠 How It Works

1. Your app creates a message (datagram).
2. UDP adds source/destination ports + checksum.
3. IP adds IP headers and sends it off.
4. On the other side: IP → UDP → your app.

> It’s like mailing a letter with no tracking — it may arrive, may not, and may even show up late.

---

## 🔍 What Makes It Different?

| Feature         | UDP    | TCP           |
| --------------- | ------ | ------------- |
| Setup required? | ❌ No  | ✅ Yes        |
| Reliable?       | ❌ No  | ✅ Yes        |
| Ordered?        | ❌ No  | ✅ Yes        |
| Fast?           | ✅ Yes | ⚠️ Slower     |
| Streaming?      | ✅     | ✅            |
| Browser use?    | ❌     | ✅ (via HTTP) |

---

### 🧱 UDP Packet Structure

| Field       | Size  | Description                                 |
| ----------- | ----- | ------------------------------------------- |
| Source Port | 16bit | Sending app’s port number                   |
| Dest Port   | 16bit | Receiving app’s port number                 |
| Length      | 16bit | Total length of header + data               |
| Checksum    | 16bit | Optional error check (some systems skip it) |
| Data        | Var.  | Actual payload                              |

---

### ⚠️ Key Caveats of UDP

| Limitation               | Explanation                                                                       |
| ------------------------ | --------------------------------------------------------------------------------- |
| ❌ No reliability        | UDP does **not** confirm if data was received.                                    |
| ❌ No ordering           | Packets may arrive **out of order**.                                              |
| ❌ No retransmission     | If a packet is lost, it is **not resent**.                                        |
| ❌ No congestion control | You can flood the network, causing packet loss or throttling.                     |
| ❌ Packet size limit     | Usually capped at 512–1472 bytes (due to IP/MTU limits). Fragmentation may occur. |

> 🔍 If you need these features, use TCP (or build reliability on top of UDP).

---

### 🧪 Real-World Use Cases

| Use Case              | Why UDP?                                     |
| --------------------- | -------------------------------------------- |
| DNS                   | Fast, no need for persistent connections     |
| Online games          | Speed > reliability; game logic handles loss |
| Video/audio streaming | Loss-tolerant; minor loss is acceptable      |
| VoIP calls            | Low latency is critical                      |
| QUIC (HTTP/3)         | Modern protocol built on top of UDP          |

---

### 🔄 UDP Data Flow Diagram

```txt
App Layer (DNS, Game, etc.)
  ↓
UDP Layer
- Adds port numbers & checksum
- Sends datagram to IP
  ↓
IP Layer
- Adds source/destination IP
  ↓
Network (Ethernet, Wi-Fi, etc.)

Network
  ↓
  IP
  ↓
 UDP
- Validates checksum
- Routes to application port
  ↓
App receives message

```

### 📉 What Happens When Things Go Wrong?

| Problem                | UDP Behavior                      |
| ---------------------- | --------------------------------- |
| Packet lost            | Disappears silently (no resend)   |
| Packet delayed         | Still delivered, maybe too late   |
| Packet duplicated      | Delivered twice                   |
| Packet out of order    | Delivered as-is, app must reorder |
| Receiver not listening | OS discards packet (no RST)       |
| Network buffer full    | Packet is dropped                 |

> There’s no notification — your app has to detect and handle issues manually.

## UDP in Browsers

Browsers **can’t use raw UDP** because it’s a security risk (like TCP).

## What You Can Do Instead

- **WebRTC DataChannels:**  
  Real-time peer-to-peer connections using UDP under the hood.

- **WebTransport (Experimental):**  
  New API for UDP-like communication in browsers (not yet widely supported in all browsers).

- **Backend Proxy:**  
  Browser talks to your server via WebSocket, server forwards messages over UDP.

- **Desktop Apps (like Electron):**  
  Can use UDP directly since they aren’t limited by browser rules.

## Quick Summary

| Protocol  | Browser Support | Notes                      |
| --------- | --------------- | -------------------------- |
| Raw UDP   | ❌ No           | Use WebRTC or proxy server |
| WebRTC    | ✅ Yes          | UDP-based peer connection  |
| WebSocket | ✅ Yes          | TCP-based communication    |

---

## 🧩 WebSocket-to-UDP Bridge

Browsers can't talk directly to raw UDP servers, so we use a **Node.js backend as a proxy** to bridge communication between the browser (via WebSocket) and a UDP server.

```
Browser ⇄ WebSocket ⇄ Node.js ⇄ UDP Server
```

## 🚀 How to Run

1. **Start the UDP Echo Server**  
   This will receive messages and echo them back over UDP.

```bash
node udp-echo-server.js
```

2. Start the WebSocket-to-UDP Bridge
   This connects WebSocket clients to the UDP server.

```bash
node bridge-server.js
```

3. Open `client.html` in your browser.
