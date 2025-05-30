import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, Package, Plus, Menu, X } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-xl border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink 
              to="/" 
              className="flex items-center space-x-2 group"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl shadow-lg transform group-hover:scale-110 transition-all duration-300">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Do'kon
              </span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) => 
                  `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-purple-600/30 text-purple-200 shadow-lg shadow-purple-500/25' 
                      : 'text-gray-300 hover:bg-purple-600/20 hover:text-purple-200 hover:shadow-lg hover:shadow-purple-500/10'
                  }`
                }
              >
                <Package className="h-4 w-4" />
                <span>Mahsulotlar</span>
              </NavLink>
              
              <NavLink
                to="/add-product"
                className={({ isActive }) => 
                  `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-purple-600/30 text-purple-200 shadow-lg shadow-purple-500/25' 
                      : 'text-gray-300 hover:bg-purple-600/20 hover:text-purple-200 hover:shadow-lg hover:shadow-purple-500/10'
                  }`
                }
              >
                <Plus className="h-4 w-4" />
                <span>Mahsulot Qo'shish</span>
              </NavLink>
              
              <NavLink
                to="/cart"
                className={({ isActive }) => 
                  `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-purple-600/30 text-purple-200 shadow-lg shadow-purple-500/25' 
                      : 'text-gray-300 hover:bg-purple-600/20 hover:text-purple-200 hover:shadow-lg hover:shadow-purple-500/10'
                  }`
                }
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Savat</span>
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                  3
                </span>
              </NavLink>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-purple-600/20 hover:bg-purple-600/30 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/50 rounded-lg mt-2 backdrop-blur-sm">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => 
                `flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-purple-600/30 text-purple-200' 
                    : 'text-gray-300 hover:bg-purple-600/20 hover:text-purple-200'
                }`
              }
            >
              <Package className="h-5 w-5" />
              <span>Mahsulotlar</span>
            </NavLink>
            
            <NavLink
              to="/add-product"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => 
                `flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-purple-600/30 text-purple-200' 
                    : 'text-gray-300 hover:bg-purple-600/20 hover:text-purple-200'
                }`
              }
            >
              <Plus className="h-5 w-5" />
              <span>Mahsulot Qo'shish</span>
            </NavLink>
            
            <NavLink
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => 
                `flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-purple-600/30 text-purple-200' 
                    : 'text-gray-300 hover:bg-purple-600/20 hover:text-purple-200'
                }`
              }
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Savat</span>
              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                3
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;