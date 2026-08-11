import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PropertyCard({ listing }) {
  const { user, favorites, toggleFavorite } = useApp();
  const isFav = favorites.includes(listing.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative overflow-hidden h-52">
        <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${listing.ownerType === 'broker' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'}`}>
            {listing.ownerType === 'broker' ? 'Broker' : 'Direct Seller'}
          </span>
        </div>
        {user && (
          <button onClick={() => toggleFavorite(listing.id)} className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
            <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        )}
        {!listing.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg">Not Available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 leading-tight">{listing.title}</h3>
          <span className="text-blue-600 font-bold text-sm whitespace-nowrap">UGX {listing.price.toLocaleString()}/mo</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5" />{listing.location}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          {listing.bedrooms > 0 && <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{listing.bedrooms} Bed</span>}
          <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{listing.bathrooms} Bath</span>
          <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />{listing.type}</span>
        </div>
        <Link to={`/listings/${listing.id}`} className="block w-full text-center bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm">
          View Details
        </Link>
      </div>
    </div>
  );
}
