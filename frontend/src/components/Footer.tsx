import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { FileArchive, Github, Twitter, Linkedin, Mail } from "lucide-react"

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Compress Files", href: "/compress" },
    { name: "About Algorithms", href: "/about" },
  ]

  const algorithms = ["Huffman Coding", "Run-Length Encoding", "LZ77 Compression"]

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Mail className="h-5 w-5" />, href: "#", label: "Email" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <FileArchive className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">CompressPortal</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Advanced file compression and decompression tools for efficient data management.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Algorithms</h3>
            <ul className="space-y-2 text-sm">
              {algorithms.map((algorithm, index) => (
                <li key={index} className="text-gray-400">
                  {algorithm}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>File Upload & Processing</li>
              <li>Real-time Statistics</li>
              <li>Multiple File Formats</li>
              <li>Instant Downloads</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2024 CompressPortal. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
