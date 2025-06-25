const huffmanAlgorithm = require("../algorithms/huffman")
const rleAlgorithm = require("../algorithms/rle")
const lz77Algorithm = require("../algorithms/lz77")

const compressFile = async (req, res) => {
  try {
    console.log("Compression request received")
    console.log("Algorithm:", req.body.algorithm)
    console.log("File:", req.file?.originalname, req.file?.size, "bytes")
    console.log("MIME type:", req.file?.mimetype)

    const { algorithm } = req.body
    const file = req.file
    const startTime = Date.now()

    // Determine if file is text or binary
    const isTextFile =
      file.mimetype &&
      (file.mimetype.startsWith("text/") ||
        file.mimetype === "application/json" ||
        file.mimetype === "application/xml" ||
        file.mimetype.includes("javascript") ||
        file.mimetype.includes("css"))

    let originalData
    const originalSize = file.buffer.length

    if (isTextFile) {
      try {
        originalData = file.buffer.toString("utf8")
        console.log("Processing as text file")
      } catch (error) {
        console.log("UTF-8 decode failed, treating as binary")
        originalData = file.buffer.toString("base64")
        const isTextFile = false
      }
    } else {
      originalData = file.buffer.toString("base64")
      console.log("Processing as binary file (base64)")
    }

    console.log(`Original data length: ${originalData.length} chars`)

    let compressedData = ""
    let wasCompressed = false

    try {
      switch (algorithm) {
        case "huffman":
          const huffmanResult = huffmanAlgorithm.compress(originalData)
          compressedData = huffmanResult.compressed
          wasCompressed = !huffmanResult.metadata.noCompression
          break
        case "rle":
          compressedData = rleAlgorithm.compress(originalData)
          wasCompressed = compressedData.length < originalData.length
          break
        case "lz77":
          compressedData = lz77Algorithm.compress(originalData)
          wasCompressed = compressedData.length < originalData.length
          break
        default:
          return res.status(400).json({
            success: false,
            message: `Unknown algorithm: ${algorithm}`,
          })
      }
    } catch (compressionError) {
      console.error("Compression algorithm failed:", compressionError)
      compressedData = originalData
      wasCompressed = false
    }

    console.log(`Compression result: ${wasCompressed ? "compressed" : "no benefit"}`)

    let finalData
    if (wasCompressed) {
      finalData = `COMP|${algorithm}|${file.originalname}|${file.mimetype}|${isTextFile ? "1" : "0"}|${compressedData}`
    } else {
      finalData = `ORIG|${file.originalname}|${file.mimetype}|${isTextFile ? "1" : "0"}|${originalData}`
    }

    const finalSize = Buffer.byteLength(finalData, "utf8")
    const processingTime = Date.now() - startTime
    const compressionRatio = ((originalSize - finalSize) / originalSize) * 100

    console.log(`Final result: ${originalSize} → ${finalSize} bytes (${compressionRatio.toFixed(1)}% change)`)

    let message = ""
    if (!isTextFile) {
      if (compressionRatio < 0) {
        message = "Binary files (like PDFs) typically don't compress well with these simple algorithms. This is normal!"
      } else {
        message = "Surprisingly, this binary file compressed a bit!"
      }
    }

    res.json({
      success: true,
      data: {
        originalSize,
        compressedSize: finalSize,
        compressionRatio,
        processingTime,
        algorithm: algorithm.toUpperCase(),
        compressedData: finalData,
        originalFileName: file.originalname,
        originalMimeType: file.mimetype,
        compressedFileName: `${algorithm}_${file.originalname}`,
        savings: originalSize - finalSize,
        hasEmbeddedMetadata: true,
        isTextFile,
        actuallyCompressed: wasCompressed,
        message: message,
        fileType: isTextFile ? "Text" : "Binary",
      },
    })
  } catch (error) {
    console.error("Compression error:", error)
    console.error("Error stack:", error.stack)
    res.status(500).json({
      success: false,
      message: "Compression failed",
      error: error.message,
      details: "Check server logs for more information",
    })
  }
}

const getAlgorithms = (req, res) => {
  const algorithms = [
    {
      id: "huffman",
      name: "Huffman Coding",
      description: "Assigns shorter codes to frequent characters",
      bestFor: "Text files with repeated letters",
      example: "'hello' → frequent letters get shorter codes",
    },
    {
      id: "rle",
      name: "Run-Length Encoding",
      description: "Replaces repeated characters with count",
      bestFor: "Data with lots of repetition",
      example: "'AAAA' → '~4A'",
    },
    {
      id: "lz77",
      name: "LZ77",
      description: "Replaces repeated phrases with references",
      bestFor: "Text with repeated words or phrases",
      example: "'hello hello' → 'hello <6,5>'",
    },
  ]

  res.json({
    success: true,
    data: algorithms,
  })
}

module.exports = {
  compressFile,
  getAlgorithms,
}
