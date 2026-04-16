import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import type { Article } from '../data/store';
import { fetchArticles } from "../services/api";

const LatestArticles = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [articles, setArticles] = useState<Article[]>([]);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
  const load = async () => {
    try {
      const res = await fetchArticles();
      // If you want "latest", you can sort by createdAt
      const sorted = (res.data || []).sort(
        (a: Article, b: Article) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setArticles(sorted);
    } catch (err) {
      console.error("Failed to load latest articles", err);
    }
  };
  load();
}, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [articles]);

  return (
    <section id="latest" className="relative py-20 md:py-32 bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-red-600" size={24} />
              <span className="text-red-500 font-medium text-sm uppercase tracking-wider">Fresh Content</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Latest <span className="text-gradient">Articles</span>
            </h2>
            <p className="text-gray-400 text-lg mt-3 max-w-xl">
              Fresh guides and tutorials added recently. Stay updated with new content.
            </p>
          </div>
          <Link 
            to="/search"
            className="mt-6 md:mt-0 text-red-500 font-medium flex items-center gap-2 hover:gap-3 transition-all"
          >
            View All Articles
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Articles Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <Link
              key={article._id}
              to={`/article/${article._id}`}
              ref={(el) => { cardRefs.current[index] = el; }}
              data-index={index}
              className={`group transition-all duration-700 ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="relative bg-dark-800 rounded-xl overflow-hidden border border-dark-500 
                transition-all duration-500 ease-expo-out h-full
                group-hover:border-red-600/30 group-hover:shadow-card-hover
                group-hover:-translate-y-2">
                
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-expo-out group-hover:scale-110"
                  />
                  {/* Shimmer Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent opacity-60" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Read Time */}
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                    <Clock size={12} />
                    <span>{article.readTime} min read</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-500 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {article.description}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-red-500 font-medium text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Read More</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
