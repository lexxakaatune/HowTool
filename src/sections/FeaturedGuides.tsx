import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import type { Article } from '../data/store';
import { fetchFeaturedArticles } from '../services/api';

const FeaturedGuides = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [articles, setArticles] = useState<Article[]>([]);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Load featured articles from backend
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchFeaturedArticles();
        const data = res.data;

        setArticles(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load featured articles", err);
      }
    };
    load();
  }, []);

  // IntersectionObserver logic stays the same
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [articles]);

  return (
    <section id="featured" className="relative py-20 md:py-32 bg-dark-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-red-600" size={24} />
              <span className="text-red-500 font-medium text-sm uppercase tracking-wider">Popular Now</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Featured <span className="text-gradient">Guides</span>
            </h2>
            <p className="text-gray-400 text-lg mt-3 max-w-xl">
              Most popular step-by-step tutorials this week, handpicked by our editors.
            </p>
          </div>
          <Link 
            to="/search"
            className="mt-6 md:mt-0 text-red-500 font-medium flex items-center gap-2 hover:gap-3 transition-all"
          >
            View All Guides
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Featured Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {articles.map((article, index) => (
            <Link
              key={article._id}
              to={`/article/${article._id}`}
              ref={(el) => { cardRefs.current[index] = el; }}
              data-index={index}
              className={`group transition-all duration-700 ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative bg-dark-800 rounded-2xl overflow-hidden border border-dark-500 
                transition-all duration-500 ease-expo-out
                group-hover:border-red-600/30 group-hover:shadow-card-hover">
                
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative md:w-2/5 h-48 md:h-auto overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-expo-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-800/50 md:block hidden" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent md:hidden" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                    {/* Read Time */}
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <Clock size={14} />
                      <span>{article.readTime} min read</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm md:text-base line-clamp-2 mb-4">
                      {article.description}
                    </p>

                    {/* Read More Link */}
                    <div className="flex items-center gap-2 text-red-500 font-medium text-sm mt-auto">
                      <span>Read Guide</span>
                      <ArrowRight
                        size={16}
                        className="transform transition-transform duration-300 group-hover:translate-x-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGuides;
