import type React from "react"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { FileArchive, Menu } from "lucide-react"

const Navbar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Compress", href: "/compress" },
    { name: "About", href: "/about" },
  ]

  const NavLink = ({
    href,
    children,
    mobile = false,
  }: { href: string; children: React.ReactNode; mobile?: boolean }) => (
    <Link
      to={href}
      className={`${
        mobile
          ? "block px-3 py-2 text-base font-medium rounded-md transition-colors"
          : "text-sm font-medium transition-colors hover:text-blue-600"
      } ${
        location.pathname === href
          ? mobile
            ? "text-blue-600 bg-blue-50"
            : "text-blue-600 border-b-2 border-blue-600 pb-1"
          : mobile
            ? "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            : "text-gray-700"
      }`}
      onClick={() => mobile && setIsOpen(false)}
    >
      {children}
    </Link>
  )

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FileArchive className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CompressPortal</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <NavLink key={item.name} href={item.href}>
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <NavLink key={item.name} href={item.href} mobile>
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
