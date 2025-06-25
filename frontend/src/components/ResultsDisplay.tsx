import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Download, BarChart3, Info } from "lucide-react"

interface ResultsDisplayProps {
  result: any
  mode: "compress" | "decompress"
  onDownload: () => void
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, mode, onDownload }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (!result) {
    return (
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Results & Statistics
          </CardTitle>
          <CardDescription>View processing statistics and download files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">Upload and process a file to see statistics here</p>
            <p className="text-sm text-gray-400">
              Choose your file{mode === "compress" ? " and algorithm" : ""} to get started
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          Results & Statistics
        </CardTitle>
        <CardDescription>View processing statistics and download files</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {mode === "compress" && (
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-blue-600">Original Size</p>
                <p className="text-2xl font-bold text-blue-900">{formatFileSize(result.originalSize)}</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-green-600">Compressed Size</p>
                <p className="text-2xl font-bold text-green-900">{formatFileSize(result.compressedSize)}</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-purple-600">Compression Ratio</p>
                <p className="text-2xl font-bold text-purple-900">{result.compressionRatio.toFixed(2)}%</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-orange-600">Processing Time</p>
                <p className="text-2xl font-bold text-orange-900">{result.processingTime}ms</p>
              </CardContent>
            </Card>
          </div>
        )}

        {mode === "decompress" && (
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-blue-600">Compressed Size</p>
                <p className="text-2xl font-bold text-blue-900">{formatFileSize(result.compressedSize)}</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-green-600">Decompressed Size</p>
                <p className="text-2xl font-bold text-green-900">{formatFileSize(result.decompressedSize)}</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-orange-600">Processing Time</p>
                <p className="text-2xl font-bold text-orange-900">{result.processingTime}ms</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-purple-600">Detected Algorithm</p>
                <Badge variant="secondary" className="mt-1">
                  {result.detectedAlgorithm || result.algorithm}
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {result.compressionRatio < 0 && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <Info className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700">
              <strong>File Expanded:</strong> This file type doesn't compress well with the selected algorithm. Try a
              different algorithm or use this for learning purposes.
            </AlertDescription>
          </Alert>
        )}

        {mode === "decompress" && result.originalMimeType && (
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              <strong>File Type Restored:</strong> Original file type ({result.originalMimeType}) has been preserved.
            </AlertDescription>
          </Alert>
        )}

        <Button onClick={onDownload} className="w-full" size="lg">
          <Download className="mr-2 h-4 w-4" />
          Download {mode === "compress" ? "Compressed" : "Decompressed"} File
        </Button>
      </CardContent>
    </Card>
  )
}

export default ResultsDisplay
