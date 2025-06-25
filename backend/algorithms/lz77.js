const compress = (data) => {
  if (!data || data.length < 10) {
    return data
  }

  try {
    let result = ""
    let i = 0

    while (i < data.length) {
      let bestMatch = { length: 0, distance: 0 }

      const lookBack = Math.min(i, 100)

      for (let j = 1; j <= lookBack; j++) {
        let matchLength = 0

        while (
          i + matchLength < data.length &&
          matchLength < 20 &&
          data[i - j + matchLength] === data[i + matchLength]
        ) {
          matchLength++
        }

        if (matchLength > bestMatch.length && matchLength >= 3) {
          bestMatch = { length: matchLength, distance: j }
        }
      }

      if (bestMatch.length >= 3) {
        result += `◊${bestMatch.distance}◊${bestMatch.length}◊`
        i += bestMatch.length
      } else {
        const char = data[i]
        if (char === "◊") {
          result += "◊◊" 
        } else {
          result += char
        }
        i++
      }
    }

    return result.length < data.length * 0.85 ? result : data
  } catch (error) {
    console.error("LZ77 compression error:", error)
    return data
  }
}

const decompress = (data) => {
  if (!data) return ""

  try {
    let result = ""
    let i = 0

    while (i < data.length) {
      if (data[i] === "◊") {
        if (i + 1 < data.length && data[i + 1] === "◊") {
          result += "◊"
          i += 2
        } else {
          i++ 

          let distance = ""
          while (i < data.length && data[i] !== "◊") {
            distance += data[i]
            i++
          }

          if (i < data.length) {
            i++ 

            let length = ""
            while (i < data.length && data[i] !== "◊") {
              length += data[i]
              i++
            }

            if (i < data.length) {
              i++ 

              const dist = Number.parseInt(distance) || 0
              const len = Number.parseInt(length) || 0

              for (let j = 0; j < len; j++) {
                const pos = result.length - dist + j
                if (pos >= 0 && pos < result.length) {
                  result += result[pos]
                }
              }
            }
          }
        }
      } else {
        result += data[i]
        i++
      }
    }

    return result
  } catch (error) {
    console.error("LZ77 decompression error:", error)
    return data
  }
}

module.exports = { compress, decompress }
