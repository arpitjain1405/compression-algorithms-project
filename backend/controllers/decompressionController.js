const huffmanAlgorithm = require("../algorithms/huffman")
const rleAlgorithm = require("../algorithms/rle")
const lz77Algorithm = require("../algorithms/lz77")

const decompressFile = async (req, res) => {
  try {
    console.log("Decompression request received")

    const file = req.file
    const startTime = Date.now()
    const fileData = file.buffer.toString("utf8")

    // Parse the simple header: TYPE|algorithm|filename|mimetype|istext|data
    const parts = fileData.split("|")
    if (parts.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Invalid file format - not compressed by this system",
      })
    }

    const type = parts[0]
    let algorithm, originalFileName, originalMimeType, isTextFile, compressedData

    if (type === "ORIG") {
      originalFileName = parts[1]
      originalMimeType = parts[2]
      isTextFile = parts[3] === "1"
      compressedData = parts.slice(4).join("|")
      algorithm = "none"
    } else if (type === "COMP") {
      algorithm = parts[1]
      originalFileName = parts[2]
      originalMimeType = parts[3]
      isTextFile = parts[4] === "1"
      compressedData = parts.slice(5).join("|")
    } else {
      return res.status(400).json({
        success: false,
        message: "Unknown file format",
      })
    }

    console.log(`Type: ${type}, Algorithm: ${algorithm}, File: ${originalFileName}`)

    // Decompress the data
    let decompressedData = ""

    if (type === "ORIG") {
      decompressedData = compressedData
    } else {
      switch (algorithm) {
        case "huffman":
          decompressedData = huffmanAlgorithm.decompress(compressedData, { compressed: true })
          break
        case "rle":
          decompressedData = rleAlgorithm.decompress(compressedData)
          break
        case "lz77":
          decompressedData = lz77Algorithm.decompress(compressedData)
          break
        default:
          return res.status(400).json({
            success: false,
            message: `Unknown algorithm: ${algorithm}`,
          })
      }
    }

    // Handle text vs binary
    let finalData, decompressedSize

    if (isTextFile) {
      finalData = decompressedData
      decompressedSize = Buffer.byteLength(finalData, "utf8")
    } else {
      try {
        const binaryBuffer = Buffer.from(decompressedData, "base64")
        finalData = binaryBuffer.toString("base64")
        decompressedSize = binaryBuffer.length
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to restore binary file",
        })
      }
    }

    const processingTime = Date.now() - startTime

    console.log(`Decompressed: ${originalFileName} (${decompressedSize} bytes) in ${processingTime}ms`)

    res.json({
      success: true,
      data: {
        compressedSize: file.size,
        decompressedSize,
        processingTime,
        algorithm: algorithm.toUpperCase(),
        decompressedData: finalData,
        originalFileName,
        originalMimeType,
        decompressedFileName: originalFileName,
        detectedAlgorithm: algorithm.toUpperCase(),
        isTextFile,
        isBinaryFile: !isTextFile,
      },
    })
  } catch (error) {
    console.error("Decompression error:", error)
    res.status(500).json({
      success: false,
      message: "Decompression failed",
      error: error.message,
    })
  }
}

module.exports = {
  decompressFile,
}
