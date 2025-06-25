const express = require("express");
const router = express.Router();
const compressionController = require("../controllers/compressionController");
const { validateFile, validateAlgorithm } = require("../middleware/validation");
const { uploadMiddleware } = require("../middleware/upload");

router.post(
  "/",
  uploadMiddleware,
  validateFile,
  validateAlgorithm,
  compressionController.compressFile
);

router.get("/algorithms", compressionController.getAlgorithms);

module.exports = router;
