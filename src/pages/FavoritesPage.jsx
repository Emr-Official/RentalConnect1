import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

export default function FavoritesPage() {
  const { listings, favorites } = useApp();
  const favListings = listings.filter(l => favorites.includes(l.id) && l.status === 'approved');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Properties</h1>
      <p className="text-gray-500 mb-8">{favListings.length} saved properties</p>
      {favListings.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-12 h-12 mx-auto mb-4 text-gray-200" />
          <p className="text-gray-400 text-lg">No saved properties yet.</p>
          <Link to="/listings" className="mt-4 inline-block text-blue-600 hover:underline">Browse properties</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favListings.map(l => <PropertyCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  );
}
