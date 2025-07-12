import * as ftp from "basic-ftp"
import * as dotenv from "dotenv"
dotenv.config()

async function runFTPClient() {
  const client = new ftp.Client()
  client.ftp.verbose = true

  try {
    await client.access({
      host: process.env.FTP_HOST!,
      user: process.env.FTP_USER!,
      password: process.env.FTP_PASSWORD!,
      secure: false, // Set to true for FTPS
    })

    console.log("✅ Connected to FTP server")

    // List files
    console.log("📁 Listing files in root:")
    const list = await client.list()
    list.forEach((item) => console.log(" -", item.name))

    // Upload a file
    await client.uploadFrom("test-upload.txt", "uploaded.txt")
    console.log("📤 Uploaded test-upload.txt")

    // Download it back
    await client.downloadTo("downloaded.txt", "uploaded.txt")
    console.log("📥 Downloaded uploaded.txt as downloaded.txt")
  } catch (err) {
    console.error("❌ FTP Error:", err)
  } finally {
    client.close()
  }
}

runFTPClient()
