import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, MessageSquare } from "lucide-react";
import { fetchArticles, fetchFeedbacks } from "../../services/api";

// Dashboard Overview
const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalArticles: 0,
    featuredArticles: 0,
    totalFeedback: 0,
    pendingFeedback: 0,
  });

  useEffect(() => {
    const articles = await fetchArticles();
    const feedback = await fetchFeedbacks();
    setStats({
      totalArticles: articles.length,
      featuredArticles: articles.filter(a => a.featured).length,
      totalFeedback: feedback.length,
      pendingFeedback: feedback.filter(f => f.status === 'pending').length,
    });
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-800 rounded-xl border border-dark-500 p-6">
          <div className="text-gray-400 text-sm mb-2">Total Articles</div>
          <div className="text-3xl font-bold text-white">{stats.totalArticles}</div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-500 p-6">
          <div className="text-gray-400 text-sm mb-2">Featured Articles</div>
          <div className="text-3xl font-bold text-red-500">{stats.featuredArticles}</div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-500 p-6">
          <div className="text-gray-400 text-sm mb-2">Total Feedback</div>
          <div className="text-3xl font-bold text-white">{stats.totalFeedback}</div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-500 p-6">
          <div className="text-gray-400 text-sm mb-2">Pending Feedback</div>
          <div className="text-3xl font-bold text-yellow-500">{stats.pendingFeedback}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-dark-800 rounded-xl border border-dark-500 p-6">
        <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/articles/new"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus size={18} />
            Create Article
          </Link>
          <Link
            to="/admin/feedback"
            className="flex items-center gap-2 px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors"
          >
            <MessageSquare size={18} />
            View Feedback
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview; 