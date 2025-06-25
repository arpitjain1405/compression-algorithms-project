import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileArchive, Zap, BarChart3, Shield, Download, Upload } from "lucide-react"

const HomePage = () => {
  const features = [
    {
      icon: <FileArchive className="h-12 w-12 text-blue-600" />,
      title: "Multiple File Types",
      description: "Upload and compress text files, images, and binary data with ease",
    },
    {
      icon: <Zap className="h-12 w-12 text-green-600" />,
      title: "Advanced Algorithms",
      description: "Choose from Huffman Coding, Run-Length Encoding, and LZ77 compression",
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-purple-600" />,
      title: "Detailed Statistics",
      description: "View compression ratios, file sizes, and processing times",
    },
    {
      icon: <Shield className="h-12 w-12 text-red-600" />,
      title: "Error Handling",
      description: "Robust error handling for unsupported files and processing errors",
    },
    {
      icon: <Download className="h-12 w-12 text-orange-600" />,
      title: "Easy Downloads",
      description: "Download your compressed or decompressed files instantly",
    },
    {
      icon: <Zap className="h-12 w-12 text-indigo-600" />,
      title: "Fast Processing",
      description: "Optimized algorithms for quick compression and decompression",
    },
  ]

  const algorithms = [
    {
      name: "Huffman Coding",
      description: "Variable-length coding algorithm that assigns shorter codes to more frequent characters",
      bestFor: "Text files, documents with repeated patterns",
      color: "blue",
    },
    {
      name: "Run-Length Encoding",
      description: "Compresses consecutive identical characters into a count-value pair",
      bestFor: "Images with large areas of solid color, simple graphics",
      color: "green",
    },
    {
      name: "LZ77",
      description: "Dictionary-based compression that replaces repeated strings with references",
      bestFor: "General purpose compression, mixed content types",
      color: "purple",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Data Compression & Decompression Portal</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Efficiently compress and decompress your files using advanced algorithms like Huffman Coding, Run-Length
            Encoding, and LZ77. Reduce file sizes while maintaining data integrity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/compress">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <Upload className="mr-2 h-5 w-5" />
                Start Compressing
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50 px-8 py-3"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                {feature.icon}
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Supported Algorithms</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {algorithms.map((algorithm, index) => (
              <Card
                key={index}
                className={`border-2 border-${algorithm.color}-200 hover:border-${algorithm.color}-400 transition-colors`}
              >
                <CardHeader>
                  <CardTitle className={`text-${algorithm.color}-600`}>{algorithm.name}</CardTitle>
                  <CardDescription>{algorithm.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Best for: {algorithm.bestFor}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Compress Your Files?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Start reducing your file sizes today with our powerful compression tools
          </p>
          <Link to="/compress">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              <Upload className="mr-2 h-5 w-5" />
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
