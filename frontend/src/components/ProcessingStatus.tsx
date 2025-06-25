import type React from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap } from "lucide-react"

interface ProcessingStatusProps {
  isProcessing: boolean
  progress: number
  error: string
  onSubmit: () => void
  canSubmit: boolean
  mode: "compress" | "decompress"
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  isProcessing,
  progress,
  error,
  onSubmit,
  canSubmit,
  mode,
}) => {
  return (
    <div className="space-y-4">
      <Button
        onClick={onSubmit}
        disabled={!canSubmit || isProcessing}
        className="w-full bg-blue-600 hover:bg-blue-700"
        size="lg"
      >
        {isProcessing ? (
          <>Processing...</>
        ) : (
          <>
            <Zap className="mr-2 h-4 w-4" />
            {mode === "compress" ? "Compress File" : "Decompress File"}
          </>
        )}
      </Button>

      {isProcessing && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Processing...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      )}

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default ProcessingStatus
