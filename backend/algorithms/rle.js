const compress = (data) => {
  if (!data || data.length < 5) {
    return data
  }

  try {
    let result = ""
    let i = 0

    while (i < data.length) {
      const char = data[i]
      let count = 1

      while (i + count < data.length && data[i + count] === char && count < 99) {
        count++
      }

      if (count >= 4) {
        result += `§${count}§${char}`
      } else {
        for (let j = 0; j < count; j++) {
          if (char === "§") {
            result += "§§"
          } else {
            result += char
          }
        }
      }

      i += count
    }

    return result.length < data.length * 0.9 ? result : data
  } catch (error) {
    console.error("RLE compression error:", error)
    return data
  }
}

const decompress = (data) => {
  if (!data) return ""

  try {
    let result = ""
    let i = 0

    while (i < data.length) {
      if (data[i] === "§") {
        if (i + 1 < data.length && data[i + 1] === "§") {
          result += "§"
          i += 2
        } else {
          i++ 

          let count = ""
          while (i < data.length && data[i] !== "§") {
            count += data[i]
            i++
          }

          if (i < data.length) {
            i++ 
            if (i < data.length) {
              const char = data[i]
              result += char.repeat(Number.parseInt(count) || 1)
              i++
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
    console.error("RLE decompression error:", error)
    return data
  }
}

module.exports = { compress, decompress }
