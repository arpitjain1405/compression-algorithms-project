const validateFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    })
  }

  if (req.file.size === 0) {
    return res.status(400).json({
      success: false,
      message: "Uploaded file is empty",
    })
  }

  next()
}

const validateAlgorithm = (req, res, next) => {
  const { algorithm } = req.body
  const validAlgorithms = ["huffman", "rle", "lz77"]

  if (!algorithm || !validAlgorithms.includes(algorithm.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing algorithm. Valid options: huffman, rle, lz77",
    })
  }

  req.body.algorithm = algorithm.toLowerCase()
  next()
}

const validateMetadata = (req, res, next) => {
  const { algorithm, metadata } = req.body

  // Huffman requires metadata for decompression
  if (algorithm === "huffman" && !metadata) {
    return res.status(400).json({
      success: false,
      message: "Huffman decompression requires metadata",
    })
  }

  next()
}

module.exports = {
  validateFile,
  validateAlgorithm,
  validateMetadata,
}
