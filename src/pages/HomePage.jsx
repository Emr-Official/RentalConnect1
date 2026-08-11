import { Link } from 'react-router-dom';
import { Search, Shield, Building2, ArrowRight, Star, Users, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

export default function HomePage() {
  const { listings } = useApp();
  const featured = listings.filter(l => l.status === 'approved').slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your Perfect <span className="text-blue-300">Rental Home</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Browse verified rental properties from trusted landlords and brokers. No fraud, no outdated listings — just your next home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/listings" className="flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors text-lg">
                <Search className="w-5 h-5" />Browse Properties
              </Link>
              <Link to="/register" className="flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors text-lg">
                List Your Property <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[{ icon: Home, value: '500+', label: 'Properties Listed' }, { icon: Users, value: '1,200+', label: 'Happy Tenants' }, { icon: Star, value: '4.8/5', label: 'Average Rating' }].map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{value}</div>
                <div className="text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-500 mt-1">Verified and ready to move in</p>
          </div>
          <Link to="/listings" className="flex items-center gap-1 text-blue-600 font-medium hover:underline">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(l => <PropertyCard key={l.id} listing={l} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How RentalConnect Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: 'Search & Filter', desc: 'Browse hundreds of verified listings. Filter by location, price, type, and amenities.', color: 'bg-blue-50 text-blue-600' },
              { icon: Shield, title: 'Verified Listings', desc: 'Every listing is reviewed by our admin team before going live. No fraud, no fake ads.', color: 'bg-emerald-50 text-emerald-600' },
              { icon: Building2, title: 'Connect Directly', desc: 'Contact landlords or brokers directly. No middlemen, no hidden fees.', color: 'bg-purple-50 text-purple-600' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to List Your Property?</h2>
          <p className="text-blue-100 text-lg mb-8">Join hundreds of landlords and brokers reaching thousands of verified tenants.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors text-lg">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>© 2024 RentalConnect. Solving the problem of rent.</p>
      </footer>
    </div>
  );
}
