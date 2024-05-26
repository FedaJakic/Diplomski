import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const username = req.body.username

    if (!username) {
      return cb(new Error('Username is required'))
    }

    const uploadPath = path.join(
      __dirname,
      '..',
      '..',
      'crypto-dashboard',
      'public',
      'profilePictures',
      username
    )

    // Create directory if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true })

    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Append the file extension to the file name
  },
})

const upload = multer({ storage: storage })

export default upload
