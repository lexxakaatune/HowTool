import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowLeft, Clock, Filter, X } from 'lucide-react';
import type { Article } from '../data/store';
import { searchArticles } from '../services/api';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import AdBanner from '../components/ads/AdBanner';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

useEffect(() => {
  setIsSearching(true);

  const timer = setTimeout(async () => {
    try {
      const res = await searchArticles(query);
      let searchResults: Article[] = res.data || [];

      // Filter by category if selected
      if (selectedCategory !== "all") {
        searchResults = searchResults.filter(
          (a) => a.categoryId === selectedCategory
        );
      }

      setResults(searchResults);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setIsSearching(false);
    }
  }, 400); // debounce

  return () => clearTimeout(timer);
}, [query, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchParams({});
  };

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'gardening', name: 'Gardening' },
    { id: 'cooking', name: 'Cooking' },
    { id: 'technology', name: 'Technology' },
    { id: 'home-repair', name: 'Home Repair' },
    { id: 'health', name: 'Health' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Top Ad */}
      <div className="pt-20">
        <AdBanner position="top" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Search Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Search <span className="text-gradient">Results</span>
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for guides..."
                className="w-full bg-dark-800 border border-dark-500 rounded-xl py-4 pl-12 pr-12 text-white 
                  placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 
                  focus:ring-red-600/20 transition-all"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </form>

          {/* Results Count */}
          {query && (
            <p className="text-gray-400 mt-4">
              {isSearching ? 'Searching...' : 
                `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 text-gray-400">
            <Filter size={18} />
            <span className="text-sm">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${selectedCategory === cat.id 
                  ? 'bg-red-600 text-white' 
                  : 'bg-dark-800 text-gray-400 hover:text-white border border-dark-500'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        {isSearching ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full" />
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((article, index) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="group bg-dark-800 rounded-xl overflow-hidden border border-dark-500 
                  hover:border-red-600/30 hover:shadow-card-hover transition-all duration-500
                  hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/70 text-white text-xs rounded">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                    <Clock size={12} />
                    <span>{article.readTime} min read</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-red-500 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                    {article.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-gray-500" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              We couldn&apos;t find any articles matching &quot;{query}&quot;. 
              Try different keywords or browse our categories.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Browse All Articles
            </Link>
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="text-gray-500 mx-auto mb-4" size={48} />
            <p className="text-gray-400">Enter a search term to find articles</p>
          </div>
        )}
      </main>

      {/* Bottom Ad */}
      <AdBanner position="bottom" />

      <Footer />
    </div>
  );
};

export default SearchResults;
