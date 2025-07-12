# 📧 SMTP (Simple Mail Transfer Protocol)

**SMTP** is the standard protocol for sending emails over the internet. It defines how email clients (like Gmail or Outlook) talk to email servers and how those servers forward emails to the right place.

Originally defined in 1982 (RFC 821), SMTP is still the backbone of modern email — often combined with **IMAP** or **POP3** to receive emails.

---

## 🚀 Why SMTP?

- **Reliable delivery** of outgoing email
- Supports **relaying and forwarding** via multiple mail servers
- Extensible via **SMTP extensions (ESMTP)** (e.g., authentication, encryption)
- Widely adopted and supported

---

## 🧠 How It Works

SMTP works like this:

```txt
You (client) → send email via SMTP → Mail server → Recipient's server → Inbox
```

## Basic flow:

1. Connect to SMTP server (usually port 587 or 465)

2. Authenticate (e.g., with your email/password or app token)

3. Send "MAIL FROM" and "RCPT TO" commands

4. Send message content

5. Close connection

### ✉️ SMTP Commands (Simplified)

| Command   | Purpose                              |
| --------- | ------------------------------------ |
| HELO/EHLO | Identify client to the server        |
| AUTH      | Authenticate using login credentials |
| MAIL FROM | Sender email address                 |
| RCPT TO   | Recipient email address              |
| DATA      | Starts the actual email content      |
| QUIT      | End session                          |

### 🔐 Common SMTP Ports

| Port | Purpose                                |
| ---- | -------------------------------------- |
| 25   | Default SMTP (legacy)                  |
| 465  | SMTP over SSL                          |
| 587  | SMTP with STARTTLS (modern, preferred) |

### ⚠️ Caveats

| Limitation               | Explanation                                              |
| ------------------------ | -------------------------------------------------------- |
| No guarantee of inbox    | SMTP only delivers to server — spam filters may block it |
| Not encrypted by default | Use SSL/TLS for security                                 |
| Easily abused            | Without auth, spammers can misuse it                     |

### 🧪 Real-World Use Cases

| Use Case        | Description                    |
| --------------- | ------------------------------ |
| Contact forms   | Send messages from a website   |
| App alerts      | Email notifications to users   |
| Email campaigns | Mass sending from backend apps |
| Auth codes      | OTP/email verification         |

### 📦 Protocol Stack

```txt
App Layer (SMTP)
↓
TCP (Usually port 587/465)
↓
IP
↓
Network (Ethernet/Wi-Fi/etc.)

```

### 🛠️ Tools & Services That Use SMTP

- Gmail / Outlook / Yahoo Mail

- Mailgun / SendGrid / SMTP2Go

- Nodemailer (Node.js)

- Python’s smtplib

- Thunderbird, Outlook, Apple Mail
