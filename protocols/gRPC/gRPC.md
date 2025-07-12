# gRPC

**gRPC** is a modern **Remote Procedure Call (RPC)** framework developed by Google. It's not a transport protocol like TCP or UDP — it’s a high-level system that helps services talk to each other using HTTP/2 and Protocol Buffers.

---

## 🚀 What Makes gRPC Special?

- **Built on HTTP/2** → So it gets multiplexing, streaming, and binary framing out of the box.
- **Uses Protocol Buffers** → Compact, fast, and strongly typed data format.
- **Defines services, not routes** → You call functions, not URLs.
- **Supports streaming** → Bi-directional streams like a chat or live feed.
- **Cross-language** → Works in C++, Go, Java, Python, Node.js, Rust, etc.

---

## 🧠 How gRPC Works

1. Define services and messages in a `.proto` file.
2. Generate client/server code using `protoc`.
3. Client calls functions like `sayHello()` as if they were local.
4. Data is serialized with Protobuf and sent over HTTP/2.
5. Server decodes the message and executes the function.

---

## 📦 Protocol Stack

```txt
App Layer (gRPC) -> HTTP/2 (Transport) ->  TCP (Reliable Delivery) -> IP (Routing) -> Network (Ethernet/Wi-Fi/etc.)
```

Your data → Protobuf serializer → compact binary → send/store binary → Protobuf deserializer → original structured object

## 🔄 Data Flow

```txt
Client Calls: sayHello(name: "Tahsin")
    ↓
Encodes using Protobuf (Your data → Protobuf serializer → compact binary)
    ↓
Sends binary via HTTP/2 stream
    ↓
Server receives, decodes (Protobuf deserializer), calls the actual function
    ↓
Response encoded & sent back via HTTP/2
    ↓
Client receives result like a normal function return
```

## 💬 RPC Types in gRPC

| Type                     | Description                       |
| ------------------------ | --------------------------------- |
| Unary RPC                | One request → One response        |
| Server streaming         | One request → Stream of responses |
| Client streaming         | Stream of requests → One response |
| Bi-directional streaming | Both sides stream simultaneously  |

## 🧪 Real Use Cases

| Use Case          | Why gRPC?                                    |
| ----------------- | -------------------------------------------- |
| Microservices     | Strong typing, fast binary format            |
| Mobile-backend    | Efficient communication over mobile networks |
| Real-time systems | Bidirectional streaming via HTTP/2           |
| Polyglot systems  | Language-agnostic client/server generation   |

### ⚠️ Key Caveats of gRPC

- Browsers don’t fully support native gRPC — use gRPC-Web + a proxy.

- You’ll need to install the protoc compiler and gRPC libraries for your language.

- Debugging is trickier than plain HTTP (binary, not human-readable).

- Protobuf ≠ JSON — it’s faster but not self-describing.

### 📦 What is Protocol Buffers (Protobuf)?

Protocol Buffers (Protobuf) is a language-agnostic, efficient, and extensible binary serialization format developed by Google. It’s used to encode structured data — like JSON or XML — but in a much smaller, faster, and strongly-typed way.

Think of it like: JSON, but: Smaller, Faster, Type-safe, Not human-readable

💡 Why use Protobuf?

- **Compact** → Binary format takes less space than JSON

- **Fast** → Parsing is quicker than text-based formats

- **Cross-language** → Supports many languages (Node.js, Go, Python, Java, etc.)

- **Schema-driven** → Defines data with .proto files

- **Forward/backward compatible** → Easy to evolve over time

> 🧠 gRPC requires Protobuf to define the service methods and messages it uses. It’s the default and only serialization format supported in gRPC (though some workarounds exist for JSON).

---

#### ▶️ Run Unary RPC Example

1. run server

```bash
 npx ts-node ./gRPC/server.ts
```

2. run client

```bash
npx ts-node ./gRPC/client.ts
```

#### ▶️ Run Bi-directional streaming Example

1. run server

```bash
 npx ts-node ./gRPC/chat-server.ts
```

2. run client

```bash
npx ts-node ./gRPC/chat-client.ts
```
