import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Shield } from 'lucide-react';
import { adminLogin } from '../../services/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try {
    // Call backend login
    const res = await adminLogin(formData);
    const token = res.data.token;

    // Save JWT for axios interceptor
    localStorage.setItem("howtool_admin_token", token);

    // Redirect to dashboard
    navigate("/admin");
  } catch (err) {
    setError("Invalid username or password");
  }

  setIsLoading(false);
};

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-dark-800/80 backdrop-blur-xl rounded-2xl p-8 border border-dark-500 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="text-red-500" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400 text-sm">
              Sign in to manage articles and feedback
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-600/10 border border-red-600/30 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-white font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="username"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-dark-900 border border-dark-500 rounded-lg py-3 pl-12 pr-4 text-white 
                    placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 
                    focus:ring-red-600/20 transition-all"
                  placeholder="Enter username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-white font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-dark-900 border border-dark-500 rounded-lg py-3 pl-12 pr-12 text-white 
                    placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 
                    focus:ring-red-600/20 transition-all"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Default Credentials Info */}
          <div className="mt-8 p-4 bg-dark-900 rounded-lg border border-dark-500">
            <p className="text-xs text-gray-500 text-center">
              Default credentials for testing:
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              Username: <span className="text-red-500">codeByLex</span>
            </p>
            <p className="text-xs text-gray-400 text-center">
              Password: <span className="text-red-500">LexHowTo2024!</span>
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <a 
              href="/" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
