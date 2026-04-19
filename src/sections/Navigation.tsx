import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, MessageSquare, LogIn, UserPlus } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/#categories' },
    { name: 'Featured', href: '/#featured' },
    { name: 'Feedback', href: '/feedback' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass border-b border-dark-500/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              How<span className="text-red-600">To</span>
            </span>
            <span className="w-8 h-1 bg-red-600 rounded-full group-hover:w-12 transition-all duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-300 hover:text-white text-sm font-medium underline-animate transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 lg:w-56 bg-dark-800/80 border border-dark-500 rounded-full py-2 pl-9 pr-4 
                  text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-600 
                  focus:w-48 lg:focus:w-64 transition-all"
              />
            </form>

            {/* Feedback Button */}
            <Link
              to="/feedback"
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium 
                rounded-full hover:bg-red-700 transition-colors"
            >
              <MessageSquare size={16} />
              <span className="hidden lg:inline">Feedback</span>
            </Link>

            {/* Login Button */}
            <Link
              to="/auth/login"
              className="flex items-center gap-2 px-4 py-2 bg-dark-700 text-white text-sm font-medium 
                rounded-full hover:bg-dark-600 transition-colors"
            >
              <LogIn size={16} />
              <span className="hidden lg:inline">Login</span>
            </Link>

            {/* Register Button */}
            <Link
              to="/auth/register"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium 
                rounded-full hover:bg-blue-700 transition-colors"
            >
              <UserPlus size={16} />
              <span className="hidden lg:inline">Register</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass border-t border-dark-500/50 px-4 py-4 space-y-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-800 border border-dark-500 rounded-lg py-3 pl-12 pr-4 
                text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
            />
          </form>

          {/* Mobile Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white text-base font-medium py-2 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Feedback Button */}
          <Link
            to="/feedback"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white 
              rounded-lg font-medium transition-colors"
          >
            <MessageSquare size={18} />
            Send Feedback
          </Link>
       
          {/* Mobile Login Button */}
          <Link
            to="/auth/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 bg-dark-700 text-white 
              rounded-lg font-medium transition-colors"
          >
            <LogIn size={18} />
            Login
          </Link>

          {/* Mobile Register Button */}
          <Link
            to="/auth/register"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white 
              rounded-lg font-medium transition-colors"
          >
            <UserPlus size={18} />
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
