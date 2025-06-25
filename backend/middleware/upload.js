const multer = require("multer")

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024, //500MB limit
  },
})

const uploadMiddleware = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File too large. Maximum size is 500MB",
        })
      }
      return res.status(400).json({
        success: false,
        message: "File upload error",
      })
    } else if (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error during file upload",
      })
    }
    next()
  })
}

module.exports = {
  uploadMiddleware,
}
