import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useFavorites } from "@/hooks/useFavorites";
import { AuthContext } from "@/App";
import ApperIcon from "@/components/ApperIcon";
import Favorites from "@/components/pages/Favorites";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { favorites } = useFavorites()
  const { logout } = useContext(AuthContext)
  const { user, isAuthenticated } = useSelector((state) => state.user)

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="bg-surface shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div className="hidden md:block">
              <span className="text-xl font-display font-bold text-primary">PropertyHub</span>
            </div>
          </Link>

{/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`font-medium transition-all duration-200 hover:text-accent ${
                isActive("/") ? "text-accent" : "text-primary"
              }`}
            >
              Browse
            </Link>
            <Link
              to="/favorites"
              className={`font-medium transition-all duration-200 hover:text-accent flex items-center ${
                isActive("/favorites") ? "text-accent" : "text-primary"
              }`}
            >
              <ApperIcon name="Heart" className="w-4 h-4 mr-1" />
              Favorites
              {favorites.length > 0 && (
                <span className="ml-1 bg-secondary text-white text-xs rounded-full px-2 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.firstName || user?.name || 'User'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-error hover:text-error/80"
                >
                  <ApperIcon name="LogOut" className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            <ApperIcon 
              name={isMobileMenuOpen ? "X" : "Menu"} 
              className="w-5 h-5" 
            />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="md:hidden">
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-medium transition-all duration-200 hover:text-accent ${
                    isActive("/") ? "text-accent" : "text-primary"
                  }`}
                >
                  <ApperIcon name="Home" className="w-4 h-4 mr-2 inline" />
                  Browse Properties
                </Link>
                <Link
                  to="/favorites"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-medium transition-all duration-200 hover:text-accent flex items-center ${
                    isActive("/favorites") ? "text-accent" : "text-primary"
                  }`}
                >
                  <ApperIcon name="Heart" className="w-4 h-4 mr-2" />
                  Favorites
                  {favorites.length > 0 && (
                    <span className="ml-2 bg-secondary text-white text-xs rounded-full px-2 py-0.5">
                      {favorites.length}
                    </span>
                  )}
                </Link>
                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      handleLogout()
                    }}
                    className="justify-start text-error hover:text-error/80"
                  >
                    <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header