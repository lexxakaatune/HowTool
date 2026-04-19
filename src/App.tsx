import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import FeedbackPage from './pages/FeedbackPage';
import Register from './pages/auth/Register';
import UserLogin from './pages/auth/UserLogin';
import ErrorBoundary from "./ErrorBoundary";

const isAdminLoggedIn = () => {
  return !!localStorage.getItem("howtool_admin_token");
};

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAdminLoggedIn() ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <ErrorBoundary>
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/article/:articleId" element={<ArticlePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />

        {/* Auth Routes */}
        <Route path="/auth/register" element={<Register/>} />
        <Route path="/auth/login" element={<UserLogin />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
    </ErrorBoundary>
  );
}

export default App;
