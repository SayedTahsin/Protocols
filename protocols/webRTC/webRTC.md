# WebRTC

**WebRTC (Web Real-Time Communication)** is a powerful browser API and protocol suite that enables **real-time, peer-to-peer** communication — directly between browsers or apps — without the need for a central server once the connection is established.

It's used for **video/audio calls**, **screen sharing**, **file transfer**, and **data channels** in modern web apps (like Google Meet, Discord, etc).

> WebRTC is not just a protocol — it's a collection of technologies (STUN, ICE, DTLS, SRTP).

---

## 🚀 Why WebRTC?

- ✅ Peer-to-peer: No intermediary after connection is set, no server load during media exchange
- ✅ Real-time audio/video/data
- ✅ Built into browsers (Chrome, Firefox, Safari, Edge)
- ✅ Secure (enforced encryption via DTLS/SRTP)
- ✅ Works across platforms (desktop, mobile, IoT)

---

## 🧠 How It Works

1. **Signaling** (via WebSocket or HTTP) helps peers exchange:

   - Offer (SDP)
   - Answer (SDP)
   - ICE Candidates (network info)

2. Once signaling is done, a **peer-to-peer connection** is established.

3. Media/data flows directly between users.

> SDP (Session Description Protocol) is a text-based format used in WebRTC (and other real-time protocols) to describe multimedia communication sessions — like what kind of audio/video codecs are supported, IP addresses, ports, and other connection details.

---

## 🧱 WebRTC Stack

```txt
Your App (JavaScript/WebRTC API)
  ↓
RTCPeerConnection / RTCDataChannel
  ↓
ICE (Interactive Connectivity Establishment)
  ↓
STUN / TURN (NAT traversal)
  ↓
DTLS (for encryption & handshake)
  ↓
SRTP / SCTP (Secure media/data transport)
  ↓
UDP (primary) / TCP (fallback)
  ↓
IP
  ↓
Network (Wi-Fi, Ethernet, Cellular, etc.)
```

🔍 Layer Breakdown:

| Layer                              | Description                                                     |
| ---------------------------------- | --------------------------------------------------------------- |
| **App Layer**                      | Your JS app using WebRTC APIs                                   |
| **RTCPeerConnection**              | Core WebRTC API managing media/data connection                  |
| **ICE**                            | Finds best route between peers (network candidates)             |
| **STUN**                           | Lets peers discover public IP (used by ICE)                     |
| **TURN**                           | Relays media if direct connection fails (used by ICE fallback)  |
| **DTLS**                           | Provides encryption and key negotiation over UDP                |
| **SRTP (media)** / **SCTP (data)** | SRTP encrypts audio/video, SCTP over DTLS secures data channels |
| **UDP** (preferred)                | Primary transport protocol (low latency)                        |
| **TCP**                            | Used only if UDP fails (via TURN)                               |
| **IP + Network**                   | Routing through the Internet or LAN                             |

---

## 📦 WebRTC Components

| Component           | Role                                       |
| ------------------- | ------------------------------------------ |
| `RTCPeerConnection` | Handles the connection itself (media/data) |
| `RTCDataChannel`    | Sends arbitrary data (e.g. chat, files)    |
| `MediaStream`       | Represents audio/video stream              |
| STUN/TURN Servers   | Help with NAT traversal/firewalls          |
| Signaling Server    | Needed for initial connection setup        |

## 🔁 Flow of a WebRTC Connection

```
Browser A                     Signaling Server                 Browser B
----------                   ------------------               ----------
Create Offer    ─────────────► send offer  ───────────────►    Receive offer
Set Local Desc  ◄──────────── send answer ◄────────────────    Create Answer
Send ICE cand.  ─────────────► exchange candidates ◄──────────► Receive candidates

After signaling:  🎉 Direct P2P connection is established!

```

## 📉 Limitations

❌ Needs a signaling server (WebRTC doesn’t define one)

❌ NAT/Firewall traversal may fail without TURN servers

❌ Complex to debug due to multiple moving parts

❌ Some enterprise networks may block P2P

## 💡 Common Use Cases

| Use Case       | Why WebRTC?                            |
| -------------- | -------------------------------------- |
| Video Chat     | Real-time, low latency communication   |
| Screen Sharing | Secure peer-to-peer desktop streams    |
| P2P File Share | Fast transfers without uploading files |
| Gaming         | Sync player state in real time         |

## 🚀 How to Run

1. **Start Signaling server**

```bash
node webRTC/server.js
```

2. Open `http://localhost:3000` in your browser.
