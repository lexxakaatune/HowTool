import { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  LogOut, 
  Menu,
  Eye
} from 'lucide-react';

import ArticleManagement from "./ArticleManagement"; 
import NewArticle from "./NewArticle";
import EditArticle from "./EditArticle";
import FeedbackManagement from "./FeedbackManagement";
import DashboardOverview from "./DashboardOverview";

// Main Admin Dashboard
const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const handleLogout = () => {
  // Remove token
  localStorage.removeItem("howtool_admin_token");

  // Optionally clear other admin state
  setArticles([]);
  setSearchTerm("");

  // Redirect to login
  navigate("/admin/login");
};

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/articles', label: 'Articles', icon: FileText },
    { path: '/admin/feedback', label: 'Feedback', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-800 border-r border-dark-500 
          transform transition-transform duration-300 lg:transform-none
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-dark-500">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">
              How<span className="text-red-600">To</span>
            </span>
          </Link>
          <p className="text-gray-500 text-sm mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-dark-700'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-500">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 
              hover:bg-red-500/10 rounded-lg transition-colors w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-dark-800 border-b border-dark-500 p-4 flex items-center justify-between lg:justify-end">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              target="_blank"
              className="text-gray-400 hover:text-white text-sm flex items-center gap-2"
            >
              <Eye size={16} />
              View Site
            </Link>
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-medium">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/articles" element={<ArticleManagement />} />
            <Route path="articles/new" element={<NewArticle />} />
            <Route path="/articles/edit/:id" element={<EditArticle />} />
            <Route path="/feedback" element={<FeedbackManagement />} />
            <Route path="*" element={<DashboardOverview />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
