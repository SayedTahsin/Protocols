## HTTP / HTTPS / HTTP/2

**HTTP** (HyperText Transfer Protocol) is a stateless, application-layer protocol used for transferring data between clients (e.g., browsers) and servers. It powers the World Wide Web.

---

### 📜 Versions

| Version      | Year  | Key Features                                            |
| ------------ | ----- | ------------------------------------------------------- |
| **HTTP/0.9** | 1991  | Only `GET`, plain text only                             |
| **HTTP/1.0** | 1996  | Headers, status codes, MIME types                       |
| **HTTP/1.1** | 1997  | Persistent connections, pipelining, chunked encoding    |
| **HTTP/2**   | 2015  | Binary framing, multiplexed streams, header compression |
| **HTTP/3**   | 2022+ | Based on QUIC over UDP (not TCP)                        |

> **Stateless**: Each request is independent; the server does not store session info between requests.

> ⚠️ HTTP/3 is not yet natively supported in Node.js. It requires external tools like `nghttp3`, `Caddy`, or reverse proxies like `nginx` or `Cloudflare`.

---

### 🔐 HTTPS (HTTP Secure)

- HTTPS = HTTP + **TLS encryption**
- Ensures **confidentiality**, **integrity**, and **authentication**
- Default port: `443` (compared to HTTP’s `80`)

---

### ⚡ HTTP/2 Highlights

- Binary protocol (replaces text-based HTTP/1.x)
- Multiplexing (multiple streams over one TCP connection)
- Header compression via HPACK
- Optional server push (send resources before requested)

| Protocol | Secure | Port | Binary | Multiplexing | Recommended |
| -------- | ------ | ---- | ------ | ------------ | ----------- |
| HTTP/1.1 | ❌ No  | 80   | ❌ No  | ❌ No        | ❌          |
| HTTPS    | ✅ Yes | 443  | ❌ No  | ❌ No        | ✅          |
| HTTP/2   | ✅ Yes | 443  | ✅ Yes | ✅ Yes       | ✅✅        |

---

> HTTP/HTTPS/HTTP2 all run over TCP (Transport-layer)
> Even though HTTP/2 brings multiplexing and binary framing, it still runs over TCP (in contrast to HTTP/3, which uses UDP via QUIC).

```
HTTP / HTTPS / HTTP/2
        ↓
     TLS (for HTTPS)
        ↓
       TCP
```

## 🔒 TLS & Certificates

When you host a HTTPS server, you need a **TLS certificate** issued by a trusted **Certificate Authority (CA)**.

### TLS (Transport Layer Security)

TLS is the encryption protocol used to secure communication over networks. It’s the successor to SSL (more secure and modern).It's what powers HTTPS, FTPS, SMTP over TLS, etc.
TLS handles:

- Handshakes
- Key exchange
- Encryption/decryption
- Message integrity checks

> Think of TLS as the security system.

| TLS Version | Year | Notes                                 |
| ----------- | ---- | ------------------------------------- |
| SSL 2.0     | 1995 | Obsolete, insecure                    |
| SSL 3.0     | 1996 | Deprecated                            |
| TLS 1.0     | 1999 | First modern TLS                      |
| TLS 1.2     | 2008 | Still widely used                     |
| TLS 1.3     | 2018 | Faster, more secure (modern standard) |

### 📄 What is a Certificate?

A certificate is a file like a digital passport which is used by TLS. It:

- Proves the server’s identity (e.g., your domain is authentic)
- Enables TLS encryption for secure connections
- Contains:
  - A **public key**
  - Your **domain info**
  - Issuer info (e.g., Let’s Encrypt, ZeroSSL)
  - A **digital signature** from the CA

### 🔄 How They Work Together

Here’s the simplified handshake between a browser and a server:

🧑‍💻 Client → connects to server via HTTPS

🛡️ Server → sends certificate

✅ Client → checks certificate is valid and trusted

🔐 TLS handshake → negotiates encryption keys

📦 Encrypted communication begins!

> So: 📜 The certificate is used in the 🔐 TLS protocol to enable a secure connection.

### 🔍 Certificate Requirements by Protocol

| Protocol   | Encryption Required? | Certificate Required? | Why?                      |
| ---------- | -------------------- | --------------------- | ------------------------- |
| **HTTP**   | ❌ No                | ❌ No                 | Plaintext, insecure       |
| **HTTPS**  | ✅ Yes               | ✅ Yes                | TLS is mandatory          |
| **HTTP/2** | ✅ Yes (in browsers) | ✅ Yes                | TLS + valid cert required |

---

### 🌐 Dev vs Prod Certificates

| Environment | Certificate Type                | Notes                                                                                     |
| ----------- | ------------------------------- | ----------------------------------------------------------------------------------------- |
| **Dev**     | Self-signed                     | Use `-k` in curl command (`curl -k https://localhost:3443`) or accept manually in browser |
| **Prod**    | CA-signed (e.g., Let’s Encrypt) | Required; auto-renew with Certbot, etc.                                                   |

---

### 🛠️ Generating Self-Signed Certs (for Dev)

```bash
mkdir certs
openssl req -x509 -newkey rsa:2048 -nodes \
  -keyout certs/key.pem \
  -out certs/cert.pem \
  -days 365
```

> 🛠 In production, use tools like [Certbot](https://certbot.eff.org/) to automatically issue and renew TLS certificates using Let’s Encrypt.
