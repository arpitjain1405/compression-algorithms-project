import type React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AlgorithmSelectorProps {
  algorithm: string
  onAlgorithmChange: (algorithm: string) => void
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ algorithm, onAlgorithmChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Select Algorithm</label>
      <Select value={algorithm} onValueChange={onAlgorithmChange}>
        <SelectTrigger>
          <SelectValue placeholder="Choose compression algorithm" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="huffman">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Huffman Coding
            </div>
          </SelectItem>
          <SelectItem value="rle">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Run-Length Encoding
            </div>
          </SelectItem>
          <SelectItem value="lz77">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              LZ77
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default AlgorithmSelector
