const express = require("express")
const cors = require("cors")
const compressionRoute = require("./routes/compressionRoute");
const decompressionRoute = require("./routes/decompressionRoute")

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: ["https://compression-algorithms-project.vercel.app", "http://localhost:5173"],
    credentials: true,
  }),
)

app.use(express.json({ limit: "500mb" }))
app.use(express.urlencoded({ extended: true, limit: "500mb"}))

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Compression Portal API is running",
  })
})

app.use("/api/compression", compressionRoute)
app.use("/api/decompression", decompressionRoute)

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
