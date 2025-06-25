const express = require("express")
const router = express.Router()
const decompressionController = require("../controllers/decompressionController")
const { uploadMiddleware } = require("../middleware/upload")
const { validateFile, validateAlgorithm, validateMetadata } = require("../middleware/validation")

router.post(
  "/",
  uploadMiddleware,
  validateFile,
  validateMetadata,
  decompressionController.decompressFile,
)

module.exports = router
