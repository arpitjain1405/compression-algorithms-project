import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Info, Zap, Download } from "lucide-react"
import FileUpload from "@/components/FileUpload"
import AlgorithmSelector from "@/components/AlgorithmSelector"
import ProcessingStatus from "@/components/ProcessingStatus"
import ResultsDisplay from "@/components/ResultsDisplay"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

const CompressPage = () => {
  // Simple state
  const [mode, setMode] = useState<"compress" | "decompress">("compress")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [algorithm, setAlgorithm] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking")

  // Check server on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/health`)
      .then((res) => setServerStatus(res.ok ? "online" : "offline"))
      .catch(() => setServerStatus("offline"))
  }, [])

  // Handle mode change
  const handleModeChange = (newMode: string) => {
    if(newMode === "compress" || newMode === "decompress")
    setMode(newMode)
    setSelectedFile(null)
    setAlgorithm("")
    setResult(null)
    setError("")
  }

  // Handle file selection
  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file)
    setError("")
    setResult(null)
  }

  // Check if can submit
  const canSubmit = selectedFile && (mode === "decompress" || algorithm) && serverStatus === "online"

  // Handle submit
  const handleSubmit = async () => {
    if (!canSubmit) return

    setIsProcessing(true)
    setProgress(0)
    setError("")
    setResult(null)

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 15, 85))
    }, 300)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile!)

      let endpoint = "/api/decompression"
      if (mode === "compress") {
        formData.append("algorithm", algorithm)
        endpoint = "/api/compression"
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        body: formData,
      })

      const contentType = response.headers.get("content-type")
      if (!contentType?.includes("application/json")) {
        throw new Error(`Server error: ${response.status}`)
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || `${mode} failed`)
      }

      clearInterval(progressInterval)
      setProgress(100)
      setResult(data.data)
    } catch (err) {
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsProcessing(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  // Handle download
  const handleDownload = () => {
    if (!result) return

    const data = mode === "compress" ? result.compressedData : result.decompressedData
    let blob: Blob
    let fileName: string

    if (mode === "compress") {
      blob = new Blob([data], { type: "text/plain" })
      fileName = result.compressedFileName || `compressed_${selectedFile?.name}`
    } else {
      if (result.isTextFile) {
        blob = new Blob([data], { type: result.originalMimeType || "text/plain" })
      } else {
        // Convert base64 to binary
        const binaryData = atob(data)
        const bytes = new Uint8Array(binaryData.length)
        for (let i = 0; i < binaryData.length; i++) {
          bytes[i] = binaryData.charCodeAt(i)
        }
        blob = new Blob([bytes], { type: result.originalMimeType || "application/octet-stream" })
      }
      fileName = result.originalFileName || `decompressed_${selectedFile?.name}`
    }

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">File Compression & Decompression</h1>
          <p className="text-lg text-gray-600">
            Upload your files and choose an algorithm to {mode === "compress" ? "compress" : "decompress"} them
          </p>

          {/* Server Status */}
          <div className="flex justify-center mt-4">
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                serverStatus === "online"
                  ? "bg-green-100 text-green-800"
                  : serverStatus === "offline"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  serverStatus === "online"
                    ? "bg-green-500"
                    : serverStatus === "offline"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                }`}
              />
              Server: {serverStatus === "checking" ? "Checking..." : serverStatus}
            </div>
          </div>
        </div>

        {/* Server Offline Alert */}
        {serverStatus === "offline" && (
          <div className="max-w-4xl mx-auto mb-8">
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                Backend server is offline. Please run <code className="bg-red-100 px-1 rounded">npm run server</code> to
                start the Express server.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Mode Selector */}
        <div className="flex justify-center mb-8">
          <Tabs value={mode} onValueChange={handleModeChange}>
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="compress" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Compress
              </TabsTrigger>
              <TabsTrigger value="decompress" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Decompress
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Decompress Info */}
        {mode === "decompress" && (
          <div className="max-w-4xl mx-auto mb-8">
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                <strong>Decompression Mode:</strong> Upload a file compressed by this system. Algorithm and metadata are
                auto-detected.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload & Controls */}
          <div className="space-y-6">
            <FileUpload selectedFile={selectedFile} onFileSelect={handleFileSelect} mode={mode} />

            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
              {mode === "compress" && (
                <>
                  <AlgorithmSelector algorithm={algorithm} onAlgorithmChange={setAlgorithm} />
                  <Separator />
                </>
              )}

              {mode === "decompress" && (
                <>
                  <Alert className="border-green-200 bg-green-50">
                    <Info className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">
                      <strong>Auto-Detection:</strong> Algorithm and file type will be automatically detected.
                    </AlertDescription>
                  </Alert>
                  <Separator />
                </>
              )}

              <ProcessingStatus
                isProcessing={isProcessing}
                progress={progress}
                error={error}
                onSubmit={handleSubmit}
                canSubmit={!!canSubmit}
                mode={mode}
              />
            </div>
          </div>

          {/* Right Column - Results */}
          <ResultsDisplay result={result} mode={mode} onDownload={handleDownload} />
        </div>
      </div>
    </div>
  )
}

export default CompressPage
