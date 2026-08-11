import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RegisterPage() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'client', listingType: 'broker' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register(form);
    if (result.success) {
      navigate(form.role === 'broker' ? '/broker' : '/listings');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Home className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-1">Join RentalConnect today</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Min. 6 characters" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              {[{ value: 'client', label: '🏠 Tenant / Client', desc: 'Looking for a rental' }, { value: 'broker', label: '🏢 Landlord / Broker', desc: 'Listing properties' }].map(opt => (
                <button key={opt.value} type="button" onClick={() => setForm({ ...form, role: opt.value })} className={`p-3 rounded-xl border-2 text-left transition-colors ${form.role === opt.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="font-medium text-sm text-gray-900">{opt.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {form.role === 'broker' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Listing as...</label>
              <div className="grid grid-cols-2 gap-3">
                {[{ value: 'broker', label: '🤝 Broker', desc: 'Acting as agent' }, { value: 'seller', label: '🔑 Direct Seller', desc: 'Own the property' }].map(opt => (
                  <button key={opt.value} type="button" onClick={() => setForm({ ...form, listingType: opt.value })} className={`p-3 rounded-xl border-2 text-left transition-colors ${form.listingType === opt.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="font-medium text-sm text-gray-900">{opt.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
