import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { FileText, ImageIcon, File, Zap, BarChart3, Gauge, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"

const AboutPage = () => {
  const algorithms = [
    {
      id: "huffman",
      name: "Huffman Coding",
      subtitle: "Variable-length prefix coding algorithm",
      color: "blue",
      badge: "Lossless",
      description:
        "A compression algorithm that assigns variable-length codes to characters based on their frequency of occurrence.",
      howItWorks: [
        "Analyzes character frequency in the input",
        "Builds a binary tree with frequent characters near the root",
        "Assigns shorter codes to more frequent characters",
        "Creates a prefix-free code system",
      ],
      bestFor: [
        { icon: <FileText className="h-4 w-4" />, text: "Text files with repeated patterns" },
        { icon: <File className="h-4 w-4" />, text: "Documents and source code" },
        { icon: <BarChart3 className="h-4 w-4" />, text: "Data with non-uniform distribution" },
      ],
      performance: {
        compressionRatio: "20-60% typical",
        speed: "Moderate",
        memoryUsage: "Low-Medium",
      },
    },
    {
      id: "rle",
      name: "Run-Length Encoding",
      subtitle: "Simple compression for consecutive identical data",
      color: "green",
      badge: "Lossless",
      description:
        "A simple compression technique that replaces consecutive identical characters with a count-value pair.",
      howItWorks: [
        "Scans data for consecutive identical values",
        "Replaces runs with count-value pairs",
        "Example: 'AAABBB' becomes '3A3B'",
        "Simple and fast implementation",
      ],
      bestFor: [
        { icon: <ImageIcon className="h-4 w-4" />, text: "Images with solid color areas" },
        { icon: <File className="h-4 w-4" />, text: "Simple graphics and logos" },
        { icon: <BarChart3 className="h-4 w-4" />, text: "Data with long repeated sequences" },
      ],
      performance: {
        compressionRatio: "Highly variable",
        speed: "Very Fast",
        memoryUsage: "Very Low",
      },
    },
    {
      id: "lz77",
      name: "LZ77",
      subtitle: "Dictionary-based compression with sliding window",
      color: "purple",
      badge: "Lossless",
      description:
        "A dictionary-based compression algorithm that uses a sliding window to find and replace repeated strings.",
      howItWorks: [
        "Uses a sliding window to find repeated strings",
        "Replaces repeated data with distance-length pairs",
        "Maintains a dictionary of previously seen patterns",
        "Foundation for many modern compression formats",
      ],
      bestFor: [
        { icon: <File className="h-4 w-4" />, text: "General purpose compression" },
        { icon: <FileText className="h-4 w-4" />, text: "Mixed content types" },
        { icon: <BarChart3 className="h-4 w-4" />, text: "Files with repeated substrings" },
      ],
      performance: {
        compressionRatio: "30-70% typical",
        speed: "Fast",
        memoryUsage: "Medium",
      },
    },
  ]

  const comparisonData = [
    {
      algorithm: "Huffman",
      useCase: "Text files, documents",
      compression: "20-60%",
      speed: "Moderate",
      complexity: "Medium",
      color: "blue",
    },
    {
      algorithm: "RLE",
      useCase: "Images, simple graphics",
      compression: "Variable",
      speed: "Very Fast",
      complexity: "Low",
      color: "green",
    },
    {
      algorithm: "LZ77",
      useCase: "General purpose",
      compression: "30-70%",
      speed: "Fast",
      complexity: "Medium",
      color: "purple",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Compression Algorithms Explained</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn about the different compression algorithms available in our portal and understand when to use each one
            for optimal results.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <Tabs defaultValue="huffman" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {algorithms.map((algo) => (
                <TabsTrigger key={algo.id} value={algo.id} className="flex items-center gap-2">
                  <div className={`w-2 h-2 bg-${algo.color}-500 rounded-full`}></div>
                  {algo.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {algorithms.map((algo) => (
              <TabsContent key={algo.id} value={algo.id}>
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className={`text-2xl text-${algo.color}-600 mb-2`}>{algo.name}</CardTitle>
                        <CardDescription className="text-lg">{algo.subtitle}</CardDescription>
                      </div>
                      <Badge className={`bg-${algo.color}-100 text-${algo.color}-800`}>{algo.badge}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-700">{algo.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          How it works:
                        </h4>
                        <ul className="space-y-2 text-gray-600">
                          {algo.howItWorks.map((step, index) => (
                            <li key={index}>• {step}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Best for:
                        </h4>
                        <div className="space-y-2">
                          {algo.bestFor.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <span className={`text-${algo.color}-600`}>{item.icon}</span>
                              <span className="text-gray-600">{item.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <Card className={`bg-${algo.color}-50 border-${algo.color}-200`}>
                      <CardContent className="p-4">
                        <h4 className={`font-semibold text-${algo.color}-900 mb-3 flex items-center gap-2`}>
                          <Gauge className="h-4 w-4" />
                          Performance Characteristics:
                        </h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className={`font-medium text-${algo.color}-700`}>Compression Ratio:</span>
                            <p className={`text-${algo.color}-600`}>{algo.performance.compressionRatio}</p>
                          </div>
                          <div>
                            <span className={`font-medium text-${algo.color}-700`}>Speed:</span>
                            <p className={`text-${algo.color}-600`}>{algo.performance.speed}</p>
                          </div>
                          <div>
                            <span className={`font-medium text-${algo.color}-700`}>Memory Usage:</span>
                            <p className={`text-${algo.color}-600`}>{algo.performance.memoryUsage}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                Algorithm Comparison
              </CardTitle>
              <CardDescription>Quick reference guide to help you choose the right algorithm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Algorithm</th>
                      <th className="text-left py-3 px-4 font-semibold">Best Use Case</th>
                      <th className="text-left py-3 px-4 font-semibold">Avg. Compression</th>
                      <th className="text-left py-3 px-4 font-semibold">Speed</th>
                      <th className="text-left py-3 px-4 font-semibold">Complexity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 bg-${row.color}-500 rounded-full`}></div>
                            <span className={`font-medium text-${row.color}-600`}>{row.algorithm}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{row.useCase}</td>
                        <td className="py-3 px-4">{row.compression}</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">{row.speed}</Badge>
                        </td>
                        <td className="py-3 px-4">{row.complexity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Try These Algorithms?</h2>
          <p className="text-gray-600 mb-6">Upload your files and see how different algorithms perform on your data</p>
          <Link to="/compress">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Zap className="mr-2 h-4 w-4" />
              Start Compressing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
