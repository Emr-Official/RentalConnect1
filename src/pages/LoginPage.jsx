import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.email, form.password);
    if (result.success) {
      const role = result.user.role;
      navigate(role === 'admin' ? '/admin' : role === 'broker' ? '/broker' : '/listings');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Home className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-1">Sign in to your RentalConnect account</p>
        </div>

        {/* Demo credentials */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-sm">
          <p className="font-medium text-blue-800 mb-2">Demo Accounts:</p>
          <div className="space-y-1 text-blue-700">
            <p>Admin: admin@rc.com / admin123</p>
            <p>Broker: broker@rc.com / broker123</p>
            <p>Seller: seller@rc.com / seller123</p>
            <p>Client: client@rc.com / client123</p>
          </div>
        </div>

        {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-600 font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
