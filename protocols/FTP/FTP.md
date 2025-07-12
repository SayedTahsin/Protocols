# FTP – File Transfer Protocol

**FTP (File Transfer Protocol)** is a standard network protocol used to transfer files between a **client** and **server** over a TCP-based network (like the internet). It was first standardized in the 1970s (RFC 959) and is still used today in many legacy systems.

---

## 🚀 Why Use FTP?

- Simple way to upload, download, or manage files on remote servers
- Still widely supported in legacy systems and hosting environments
- Available on almost all OSs and networking libraries

---

## 🔄 How FTP Works

FTP runs on **two separate TCP connections**:

| Channel         | Port | Purpose                                      |
| --------------- | ---- | -------------------------------------------- |
| Control Channel | 21   | Commands and responses (e.g., `USER`, `GET`) |
| Data Channel    | 20   | Actual file content is transferred here      |

There are two modes of data connection:

- **Active Mode**: Server initiates data connection back to the client.
- **Passive Mode**: Client initiates data connection to server — better for firewalls.

---

### 💡 Common FTP Commands

| Command | Meaning                 |
| ------- | ----------------------- |
| `USER`  | Username for login      |
| `PASS`  | Password for login      |
| `LIST`  | List files in directory |
| `RETR`  | Download a file         |
| `STOR`  | Upload a file           |
| `QUIT`  | Close the session       |

---

## 🔐 Is FTP Secure?

By default, **FTP is not encrypted**:

- Usernames, passwords, and files are sent in **plain text**
- Anyone on the network can potentially sniff the data

💡 Use **FTPS** (FTP over TLS) or **SFTP** (SSH File Transfer Protocol) for secure alternatives.

---

## 🧪 Real-World Use Cases

| Use Case            | Why FTP?                         |
| ------------------- | -------------------------------- |
| Web hosting uploads | Simple file transfers to servers |
| Backup systems      | Automate file uploads/downloads  |
| Legacy devices      | Routers, printers, IoT modules   |

---

## ⚠️ FTP Caveats

- ❌ **Not encrypted by default**
- ❌ **Harder to use behind firewalls** (especially in active mode)
- ❌ No Native browser support
- ⚠️ **Requires special handling for passive ports in NAT**
- 🐢 Slower compared to modern transfer protocols (like HTTP/2, SFTP)

---

## 📦 Protocol Stack

```txt
Application Layer (FTP commands: USER, PASS, STOR, RETR)
   ↓
TCP (Port 21 for control, Port 20 or random port for data)
   ↓
IP (Routing)
   ↓
Network (Ethernet, Wi-Fi, etc.)
```
