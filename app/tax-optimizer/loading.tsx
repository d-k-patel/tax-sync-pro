import { RefreshCw } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <RefreshCw className="h-8 w-8 animate-spin text-orange-600 mx-auto" />
        <p className="text-gray-600">Analyzing your portfolio for tax opportunities...</p>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
