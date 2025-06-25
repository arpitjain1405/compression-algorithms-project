import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, ImageIcon, File } from "lucide-react"

interface FileUploadProps {
  selectedFile: File | null
  onFileSelect: (file: File | null) => void
  mode: "compress" | "decompress"
}

const FileUpload: React.FC<FileUploadProps> = ({ selectedFile, onFileSelect, mode }) => {
  const getFileIcon = (file: File) => {
    if (file.type.startsWith("text/")) return <FileText className="h-6 w-6 text-blue-600" />
    if (file.type.startsWith("image/")) return <ImageIcon className="h-6 w-6 text-green-600" />
    return <File className="h-6 w-6 text-gray-600" />
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    onFileSelect(file || null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) onFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleClick = () => {
    document.getElementById("file-input")?.click()
  }

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="mr-2 h-5 w-5" />
          Upload File
        </CardTitle>
        <CardDescription>Select a file to {mode === "compress" ? "compress" : "decompress"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500">
            {mode === "compress" ? "Any file type supported" : "Compressed files from this system"}
          </p>
          <input id="file-input" type="file" onChange={handleFileSelect} className="hidden" accept="*/*" />
        </div>

        {selectedFile && (
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                {getFileIcon(selectedFile)}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(selectedFile.size)} • {selectedFile.type || "Unknown type"}
                  </p>
                </div>
                <Badge variant="secondary">
                  {selectedFile.type.startsWith("text/")
                    ? "Text"
                    : selectedFile.type.startsWith("image/")
                      ? "Image"
                      : "Binary"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

export default FileUpload
