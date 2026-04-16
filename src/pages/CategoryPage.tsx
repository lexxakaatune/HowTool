import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Filter } from 'lucide-react';
import { fetchArticlesByCategory } from "../services/api";
import type { Article, Category } from "../data/store";
import { categories } from "../data/store"; // keep if categories are static
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import AdBanner from '../components/ads/AdBanner';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'readTime'>('newest');
  
  const category = categories.find(c => c.id === categoryId);

  useEffect(() => {
  const load = async () => {
    if (!categoryId) return;
    try {
      const res = await fetchArticlesByCategory(categoryId);
      let categoryArticles: Article[] = res.data || [];

      // Sort articles
      switch (sortBy) {
        case "newest":
          categoryArticles = categoryArticles.sort(
            (a, b) =>
              new Date(b.createdAt!).getTime() -
              new Date(a.createdAt!).getTime()
          );
          break;
        case "oldest":
          categoryArticles = categoryArticles.sort(
            (a, b) =>
              new Date(a.createdAt!).getTime() -
              new Date(b.createdAt!).getTime()
          );
          break;
        case "readTime":
          categoryArticles = categoryArticles.sort(
            (a, b) => a.readTime - b.readTime
          );
          break;
      }

      setArticles(categoryArticles);
    } catch (err) {
      console.error("Failed to load category articles", err);
    }
  };
  load();
}, [categoryId, sortBy]);

  if (!category) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Category Not Found</h1>
          <Link to="/" className="text-red-500 hover:underline">Go back home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Top Ad */}
      <div className="pt-20">
        <AdBanner position="top" />
      </div>

      {/* Category Header */}
      <div 
        className="relative h-80 md:h-96 overflow-hidden"
        style={{
          backgroundImage: `url(${category.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition-colors w-fit"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {category.name}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            {category.description}
          </p>
          <div className="flex items-center gap-2 mt-4 text-gray-400">
            <BookOpen size={18} />
            <span>{articles.length} article{articles.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sort Options */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-white">All Articles</h2>
          <div className="flex items-center gap-3">
            <Filter size={18} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-dark-800 border border-dark-500 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-red-600"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="readTime">Read Time</option>
            </select>
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Link
                key={article._id}
                to={`/article/${article._id}`}
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
                  
                  {/* Featured Badge */}
                  {article.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">
                        Featured
                      </span>
                    </div>
                  )}
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
        ) : (
          <div className="text-center py-20">
            <BookOpen className="text-gray-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-white mb-2">No articles yet</h3>
            <p className="text-gray-400">Check back later for new content in this category.</p>
          </div>
        )}
      </main>

      {/* Mid Ad */}
      <AdBanner position="middle" />

      <Footer />
    </div>
  );
};

export default CategoryPage;
