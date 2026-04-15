import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Heart, Menu, X, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { categories } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount, wishlist } = useShop();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/shop?category=all' },
    { name: 'Deals', path: '/shop?deals=true' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tighter text-blue-600 flex items-center gap-2">
            <span className="bg-blue-600 text-white p-1 rounded-lg">Shop</span>
            <span>Wave</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-blue-600 ${
                location.pathname === '/' && location.search === '' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`font-medium transition-colors hover:text-blue-600 ${
                location.pathname === '/shop' && !location.search.includes('deals=true') && !location.search.includes('category=') ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              Shop
            </Link>
            
            <div className="relative group/nav cursor-pointer">
              <div
                className={`font-medium flex items-center gap-1 transition-colors hover:text-blue-600 ${
                  location.search.includes('category=') ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                Categories <ChevronDown size={14} className="group-hover/nav:rotate-180 transition-transform duration-300" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 w-48">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-2">
                  <Link to="/shop?category=all" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                    All Categories
                  </Link>
                  {categories.map(cat => (
                    <Link key={cat.id} to={`/shop?category=${cat.name.toLowerCase()}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Icons Context */}
          <div className="hidden md:flex items-center gap-5">
            <div className="relative group flex items-center">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-32 lg:w-48 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-l-lg outline-none text-sm focus:border-blue-500 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch} 
                className="px-3 py-1.5 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors flex items-center justify-center border border-blue-600"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
            
            <Link to="/profile" className="relative group">
              <User className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </Link>

            <Link to="/wishlist" className="relative group">
              <Heart className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative group">
              <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              {getCartCount() > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center"
                >
                  {getCartCount()}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-4 pb-6"
          >
            <div className="flex flex-col gap-6 text-lg">
              <div className="flex gap-2 mb-4">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  onClick={handleSearch} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-medium text-gray-800 border-b pb-2"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-medium text-gray-800 border-b pb-2"
              >
                Shop
              </Link>
              <div className="border-b pb-2">
                <div className="font-medium text-gray-800 mb-2">Categories</div>
                <div className="flex flex-col gap-2 pl-4">
                  <Link to="/shop?category=all" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-blue-600">All Categories</Link>
                  {categories.map(cat => (
                    <Link key={cat.id} to={`/shop?category=${cat.name.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-blue-600">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex gap-6 mt-4">
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <User className="w-5 h-5" /> Profile
                </Link>
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" /> Cart ({getCartCount()})
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
