import { Mic, User, LogOut } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { ThemeToggle } from "./ui/theme-toggle"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { useAuth } from "../contexts/AuthContext"

export function Header() {
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()

  const isActive = (path: string) => location.pathname === path

  const getInitials = (firstName?: string, lastName?: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase()
    }
    if (firstName) {
      return firstName[0].toUpperCase()
    }
    return user?.email[0].toUpperCase() || 'U'
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <Mic className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            ShopVoice
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/">
            <Button 
              variant={isActive('/') ? "default" : "ghost"}
              className={isActive('/') ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white" : "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"}
            >
              Home
            </Button>
          </Link>
          <Link to="/about">
            <Button 
              variant={isActive('/about') ? "default" : "ghost"}
              className={isActive('/about') ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white" : "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"}
            >
              About
            </Button>
          </Link>
          <Link to="/contact">
            <Button 
              variant={isActive('/contact') ? "default" : "ghost"}
              className={isActive('/contact') ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white" : "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"}
            >
              Contact Us
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-600 text-white text-sm">
                      {getInitials(user?.firstName, user?.lastName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user?.firstName && user?.lastName && (
                      <p className="font-medium">{user.firstName} {user.lastName}</p>
                    )}
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}