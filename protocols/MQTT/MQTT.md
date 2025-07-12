# MQTT

**MQTT (Message Queuing Telemetry Transport)** is a lightweight, publish/subscribe messaging protocol designed for **low-bandwidth**, **high-latency**, or **unstable networks** — perfect for **IoT**, mobile apps, and sensors.

Originally developed by IBM in 1999, MQTT is now an OASIS standard and widely used across smart devices and edge computing.

---

## 🚀 Why MQTT?

- **Low overhead** → Ideal for slow, unreliable, or battery-powered devices
- **Pub/Sub model** → Decouples senders (publishers) from receivers (subscribers)
- **Persistent sessions** → Devices can reconnect and resume where they left off
- **QoS levels** → Choose how reliable each message should be (fire-and-forget, at least once, exactly once)
- **Tiny packet size** → Can run on 1KB RAM microcontrollers
- **Works over TCP** (often uses port `1883`, or `8883` for TLS)

> MQTT v5 also supports optional authentication, session expiry, and message properties.

---

## 🔄 How MQTT Works

### The Core Components

| Component  | Role                                          |
| ---------- | --------------------------------------------- |
| **Broker** | Central server that routes messages           |
| **Client** | Device/app that connects to broker to pub/sub |
| **Topic**  | Hierarchical string that acts like a channel  |

### 🔁 Message Flow

```txt
Device A (Publisher)     Device B (Subscriber)
         │                     │
         └───> MQTT Broker <───┘
              (routes messages based on topics)
```

- Clients publish messages to a topic

- Other clients subscribe to that topic

- The broker handles all routing and delivery

### 📶 QoS (Quality of Service)

| Level | Delivery Guarantee        | Use Case                    |
| ----- | ------------------------- | --------------------------- |
| 0     | At most once (no retry)   | Sensor sending temp updates |
| 1     | At least once (may retry) | Chat messages               |
| 2     | Exactly once              | Payment instructions        |

## ⚠️ Caveats

- MQTT messages are not encrypted by default → use TLS (port 8883)

- It’s not built for large files → use it for telemetry, not video uploads

- Topics are just strings — no strict schema or validation

- MQTT is not browser-native → you'll need a client lib or proxy for web apps

- Message delivery isn't guaranteed unless QoS > 0

## 🧪 Common Use Cases

| Domain         | Example                         |
| -------------- | ------------------------------- |
| IoT            | Smart bulbs, thermostats, locks |
| Vehicles       | GPS tracking, telemetry data    |
| Mobile apps    | Push notifications              |
| Edge computing | Remote sensors/actuators        |
| Messaging      | Lightweight group chat systems  |

---

📡 Protocol Stack

```txt
App Layer (MQTT)
  ↓
TCP (Usually port 1883)
  ↓
IP
  ↓
Ethernet/Wi-Fi
```

### 5️⃣ Run the Demo

Open 3 terminals:

Terminal 1 – start the broker:

```bash
npx ts-node broker.ts
```

Terminal 2 – run the subscriber:

```bash
npx ts-node subscriber.ts
```

Terminal 3 – run the publisher:

```bash
npx ts-node publisher.ts
```
