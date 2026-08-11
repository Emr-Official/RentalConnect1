import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ImagePlus, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AMENITIES = ['WiFi', 'Parking', 'Security', 'Generator', 'Garden', 'AC', 'Water', 'Electricity'];
const TYPES = ['Apartment', 'House', 'Studio', 'Office', 'Room'];

const DEFAULT = { title: '', location: '', price: '', type: 'Apartment', bedrooms: 1, bathrooms: 1, description: '', amenities: [], images: [''] };

export default function AddEditListing() {
  const { id } = useParams();
  const { listings, addListing, updateListing } = useApp();
  const navigate = useNavigate();
  const existing = id ? listings.find(l => l.id === Number(id)) : null;
  const [form, setForm] = useState(existing || DEFAULT);

  const toggleAmenity = (a) => setForm(f => ({ ...f, amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, price: Number(form.price), bedrooms: Number(form.bedrooms), bathrooms: Number(form.bathrooms), images: form.images.filter(Boolean) };
    if (existing) { updateListing(existing.id, data); } else { addListing(data); }
    navigate('/broker');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{existing ? 'Edit Listing' : 'Add New Listing'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="font-semibold text-gray-900">Basic Information</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 2-Bedroom Apartment in Kololo" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Kololo, Kampala" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Price (UGX)</label>
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required min={0} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 800000" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
              <input type="number" value={form.bedrooms} onChange={e => setForm({ ...form, bedrooms: e.target.value })} min={0} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
              <input type="number" value={form.bathrooms} onChange={e => setForm({ ...form, bathrooms: e.target.value })} min={0} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Describe the property..." />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map(a => (
              <button key={a} type="button" onClick={() => toggleAmenity(a)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${form.amenities.includes(a) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{a}</button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">Property Images (URLs)</h2>
          <div className="space-y-3">
            {form.images.map((img, i) => (
              <div key={i} className="flex gap-2">
                <input value={img} onChange={e => { const imgs = [...form.images]; imgs[i] = e.target.value; setForm({ ...form, images: imgs }); }} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
                {form.images.length > 1 && (
                  <button type="button" onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })} className="p-3 text-gray-400 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => setForm({ ...form, images: [...form.images, ''] })} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
              <ImagePlus className="w-4 h-4" />Add another image
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/broker')} className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            {existing ? 'Save Changes' : 'Submit for Review'}
          </button>
        </div>
      </form>
    </div>
  );
}
