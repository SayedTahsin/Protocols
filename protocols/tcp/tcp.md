# 🌐 TCP – Reliable Data, Delivered

**TCP (Transmission Control Protocol)** is what most internet traffic rides on — from HTTP to email to FTP. It's all about making sure your data **arrives**, **in order**, and **without errors**.

---

## 🔗 How TCP Works (Quickly)

1. **Handshake (3 steps)**  
   → SYN → SYN-ACK → ACK → ✅ Connected!

2. **Data Transfer**  
   → TCP breaks your message into chunks (segments)  
   → Adds numbers, waits for ACKs  
   → Retransmits if something goes missing

3. **It's a stream, not messages**  
   → If you send "hi" and "there", you may get "hithere" or even "hith", "ere"  
   → So you need to frame messages yourself (like adding `\n`)

---

## ⚠️ Heads-Up for Devs

- TCP won’t instantly tell you if the other side is gone → use timeouts or `socket.on("close")`
- Idle connections can be killed by firewalls → keep them alive with pings
- It’s just bytes, not full messages → design your own message boundaries
- It has Head-of-Line (HoL) Blocking issue. As it's streams data in order, if one packet is slow/stuck -> it blocks the next packets (even if they are ready)

---

## 📦 Data Flow (Simple View)

```txt
Application Layer
┌──────────────────────────────┐
│ Your App (e.g., HTTP/HTTPS)  │
└───────────────┬──────────────┘
                ↓
Transport Layer
┌──────────────────────────────┐
│ TCP (segments, ACKs, retries)│
└───────────────┬──────────────┘
                ↓
Network Layer
┌──────────────────────────────┐
│ IP(adds address info, routes)│
└───────────────┬──────────────┘
                ↓
Link/Physical Layer
┌────────────────────────────────────────┐
│ Ethernet / Wi-Fi (sends bits on wires) │
└────────────────────────────────────────┘
```

## 🚫 Why Browsers Can’t Do Raw TCP

Browsers don’t expose TCP or UDP directly (security reasons like port scanning).

| Want to…                   | Use This Instead        |
| -------------------------- | ----------------------- |
| Send TCP data from browser | WebSocket bridge        |
| UDP-like communication     | WebRTC DataChannel      |
| Full TCP socket access     | Use Node.js or Electron |

## 🧪 TCP Bridge Setup

We’ll use a WebSocket → TCP bridge so the browser can indirectly talk to a TCP server.

```txt
Browser ⇄ WebSocket ⇄ Node.js ⇄ TCP Server
```

🛠️ To Run:

```bash
# Terminal 1: TCP echo server
node tcp-echo-server.js

# Terminal 2: WebSocket-to-TCP bridge
node bridge-server.js

# Then open client.html in browser
```
