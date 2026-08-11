import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

const TYPES = ['All', 'Apartment', 'House', 'Studio', 'Office'];
const AMENITIES = ['WiFi', 'Parking', 'Security', 'Generator', 'Garden', 'AC', 'Water', 'Electricity'];

export default function ListingsPage() {
  const { listings } = useApp();
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');
  const [selAmenities, setSelAmenities] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const approved = listings.filter(l => l.status === 'approved');
  const filtered = approved.filter(l => {
    const matchSearch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.location.toLowerCase().includes(search.toLowerCase());
    const matchType = type === 'All' || l.type === type;
    const matchPrice = !maxPrice || l.price <= Number(maxPrice);
    const matchAmenities = selAmenities.length === 0 || selAmenities.every(a => l.amenities.includes(a));
    return matchSearch && matchType && matchPrice && matchAmenities;
  });

  const toggleAmenity = (a) => setSelAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Properties</h1>
        <p className="text-gray-500">{filtered.length} verified properties available</p>
      </div>

      {/* Search bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title or location..." className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-medium transition-colors ${showFilters ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'}`}>
          <SlidersHorizontal className="w-4 h-4" />Filters
          {(type !== 'All' || maxPrice || selAmenities.length > 0) && <span className="w-2 h-2 bg-red-500 rounded-full" />}
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <div className="flex flex-wrap gap-2">
                {TYPES.map(t => (
                  <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${type === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (UGX/month)</label>
              <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="e.g. 1000000" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {AMENITIES.map(a => (
                  <button key={a} onClick={() => toggleAmenity(a)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selAmenities.includes(a) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{a}</button>
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => { setType('All'); setMaxPrice(''); setSelAmenities([]); }} className="mt-4 flex items-center gap-1 text-sm text-gray-500 hover:text-red-500">
            <X className="w-4 h-4" />Clear all filters
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg">No properties match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(l => <PropertyCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  );
}
