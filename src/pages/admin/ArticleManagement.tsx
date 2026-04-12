import { useState, useEffect } from "react"; 
import { Plus, Search, Eye, Edit2, Trash2 } from "lucide-react"; 
import { fetchArticles, deleteArticleById } from "../../services/api";

// Article Management Component
const ArticleManagement = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {                                                     
   const load = async () => {                                               
   try {
      const res = await fetchArticles();
      setArticles(res.data || []);
    } catch (err) {
      console.error("Failed to load articles", err);
      setArticles([]);
    }
  };
  load();
}, []);

  const handleDelete = async (id: string) => {
  if (deleteConfirm === id) {
    try {
      await deleteArticleById(id);
      const res = await fetchArticles();
      setArticles(res.data || []);
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete article");
    }
  } else {
    setDeleteConfirm(id);
    setTimeout(() => setDeleteConfirm(null), 3000);
  }
};


 const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Articles</h2>
        <Link
          to="/admin/articles/new"
          className="btn-primary flex items-center gap-2 w-fit"
        >
          <Plus size={18} />
          New Article
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-dark-900 border border-dark-500 rounded-lg py-3 pl-12 pr-4 text-white 
            placeholder-gray-500 focus:outline-none focus:border-red-600"
        />
      </div>

      {/* Articles Table */}
      <div className="bg-dark-800 rounded-xl border border-dark-500 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-900 border-b border-dark-500">
              <tr>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Title</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Category</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Read Time</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Status</th>
                <th className="text-right px-6 py-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-500">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-dark-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="text-white font-medium line-clamp-1">{article.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{article.category}</td>
                  <td className="px-6 py-4 text-gray-400">{article.readTime} min</td>
                  <td className="px-6 py-4">
                    {article.featured ? (
                      <span className="px-2 py-1 bg-red-600/20 text-red-500 text-xs rounded-full">
                        Featured
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-dark-700 text-gray-400 text-xs rounded-full">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/article/${article.id}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        to={`/articles/edit/${article.id}`}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          deleteConfirm === article.id
                            ? 'text-red-500 bg-red-500/10'
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
                        }`}
                        title={deleteConfirm === article.id ? 'Click again to confirm' : 'Delete'}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No articles found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleManagement; 