const compress = (text) => {
  if (!text || text.length < 50) {
    return { compressed: text, metadata: { noCompression: true } }
  }

  try {
    console.log("Building efficient Huffman tree...")

    const frequencies = {}
    for (const char of text) {
      frequencies[char] = (frequencies[char] || 0) + 1
    }

    const uniqueChars = Object.keys(frequencies).length
    console.log(`📊 Found ${uniqueChars} unique characters`)

    if (uniqueChars <= 2 || uniqueChars > 100) {
      return { compressed: text, metadata: { noCompression: true } }
    }

    const root = buildSimpleHuffmanTree(frequencies)
    const codes = generateCodes(root)

    console.log("🔤 Sample Huffman codes:")
    const sampleCodes = Object.entries(codes).slice(0, 5)
    for (const [char, code] of sampleCodes) {
      const displayChar = char === "\n" ? "\\n" : char === "\t" ? "\\t" : char === " " ? "SPACE" : char
      console.log(`  '${displayChar}' → ${code}`)
    }

    let encoded = ""
    for (const char of text) {
      encoded += codes[char]
    }

    const estimatedCompressedSize = Math.ceil(encoded.length / 8) + Object.keys(codes).length * 3 
    if (estimatedCompressedSize >= text.length * 0.7) {
      console.log("No significant compression benefit")
      return { compressed: text, metadata: { noCompression: true } }
    }

    const compressedResult = bitsToCompactFormat(encoded, codes)

    console.log(
      `Huffman compression: ${text.length} → ${compressedResult.length} bytes (${((1 - compressedResult.length / text.length) * 100).toFixed(1)}% reduction)`,
    )

    return {
      compressed: compressedResult,
      metadata: {
        compressed: true,
        codes: codes,
        originalLength: text.length,
      },
    }
  } catch (error) {
    console.error("Huffman compression error:", error)
    return { compressed: text, metadata: { noCompression: true } }
  }
}

const decompress = (compressedData, metadata) => {
  if (!metadata || metadata.noCompression || !metadata.codes) {
    return compressedData
  }

  try {
    console.log("Decompressing with Huffman codes...")

    const bits = compactFormatToBits(compressedData, metadata.codes)

    const reverseMap = {}
    for (const [char, code] of Object.entries(metadata.codes)) {
      reverseMap[code] = char
    }

    let result = ""
    let currentCode = ""

    for (const bit of bits) {
      currentCode += bit
      if (reverseMap[currentCode]) {
        result += reverseMap[currentCode]
        currentCode = ""
      }
    }

    console.log(`Huffman decompressed to ${result.length} characters`)
    return result
  } catch (error) {
    console.error("Huffman decompression error:", error)
    return compressedData
  }
}

module.exports = { compress, decompress }

const buildSimpleHuffmanTree = (frequencies) => {
  const nodes = Object.entries(frequencies).map(([char, freq]) => ({
    char,
    freq,
    left: null,
    right: null,
    isLeaf: () => char !== null,
  }))

  if (nodes.length === 1) {
    return {
      char: nodes[0].char,
      freq: nodes[0].freq,
      left: null,
      right: null,
      isLeaf: () => true,
    }
  }

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq)

    const left = nodes.shift()
    const right = nodes.shift()

    const merged = {
      char: null,
      freq: left.freq + right.freq,
      left: left,
      right: right,
      isLeaf: () => false,
    }

    nodes.push(merged)
  }

  return nodes[0]
}

const generateCodes = (root) => {
  const codes = {}

  if (root.isLeaf()) {
    codes[root.char] = "0"
    return codes
  }

  const traverse = (node, code) => {
    if (node.isLeaf()) {
      codes[node.char] = code || "0"
      return
    }

    if (node.left) traverse(node.left, code + "0")
    if (node.right) traverse(node.right, code + "1")
  }

  traverse(root, "")
  return codes
}

const bitsToCompactFormat = (bits, codes) => {
  let codesTable = ""
  for (const [char, code] of Object.entries(codes)) {
    codesTable += char + ":" + code + ";"
  }

  const padding = (8 - (bits.length % 8)) % 8
  const paddedBits = bits + "0".repeat(padding)

  let bytes = ""
  for (let i = 0; i < paddedBits.length; i += 8) {
    const byte = paddedBits.substr(i, 8)
    bytes += String.fromCharCode(Number.parseInt(byte, 2))
  }

  // Format: [table_length][codes_table][padding][data]
  const tableLength = codesTable.length
  return (
    String.fromCharCode(tableLength & 0xff) +
    String.fromCharCode((tableLength >> 8) & 0xff) +
    codesTable +
    String.fromCharCode(padding) +
    bytes
  )
}

const compactFormatToBits = (data, codes) => {
  const tableLength = data.charCodeAt(0) + (data.charCodeAt(1) << 8)

  const padding = data.charCodeAt(2 + tableLength)
  const bytes = data.substr(3 + tableLength)

  let bits = ""
  for (let i = 0; i < bytes.length; i++) {
    bits += bytes.charCodeAt(i).toString(2).padStart(8, "0")
  }

  if (padding > 0) {
    bits = bits.slice(0, -padding)
  }

  return bits
}
