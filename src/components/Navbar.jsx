import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, Heart, LogOut, User, Shield, Building2, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); setOpen(false); };

  const navLinks = user?.role === 'admin'
    ? [{ to: '/admin', label: 'Dashboard', icon: Shield }]
    : user?.role === 'broker'
    ? [{ to: '/broker', label: 'My Listings', icon: Building2 }, { to: '/broker/add', label: 'Add Listing', icon: Home }]
    : user
    ? [{ to: '/listings', label: 'Browse', icon: Search }, { to: '/favorites', label: 'Favorites', icon: Heart }]
    : [{ to: '/listings', label: 'Browse', icon: Search }];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">RentalConnect</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 font-medium transition-colors">
                <Icon className="w-4 h-4" />{label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : user.role === 'broker' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {user.role === 'broker' ? user.listingType : user.role}
                  </span>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors">Sign Up</Link>
              </div>
            )}
          </div>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} className="flex items-center gap-2 text-gray-700 py-2">
              <Icon className="w-4 h-4" />{label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 py-2 w-full">
              <LogOut className="w-4 h-4" />Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="block text-gray-700 py-2">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
