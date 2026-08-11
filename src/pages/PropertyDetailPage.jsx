import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Tag, Heart, Phone, Mail, ChevronLeft, ChevronRight, CheckCircle, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const { listings, user, favorites, toggleFavorite, sendInquiry } = useApp();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === Number(id));
  const [imgIdx, setImgIdx] = useState(0);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!listing) return <div className="text-center py-20 text-gray-400">Property not found.</div>;

  const isFav = favorites.includes(listing.id);

  const handleInquiry = (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    sendInquiry(listing.id, message);
    setSent(true);
    setMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" />Back to listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Image gallery */}
          <div className="relative rounded-2xl overflow-hidden h-80 mb-4 bg-gray-100">
            <img src={listing.images[imgIdx]} alt={listing.title} className="w-full h-full object-cover" />
            {listing.images.length > 1 && (
              <>
                <button onClick={() => setImgIdx(i => (i - 1 + listing.images.length) % listing.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => setImgIdx(i => (i + 1) % listing.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {listing.images.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i === imgIdx ? 'bg-white' : 'bg-white/50'}`} />)}
                </div>
              </>
            )}
          </div>
          {listing.images.length > 1 && (
            <div className="flex gap-2 mb-6">
              {listing.images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === imgIdx ? 'border-blue-500' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{listing.title}</h1>
                <div className="flex items-center gap-1 text-gray-500"><MapPin className="w-4 h-4" />{listing.location}</div>
              </div>
              <button onClick={() => toggleFavorite(listing.id)} className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:border-red-300 transition-colors">
                <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>

            <div className="flex items-center gap-6 py-4 border-y border-gray-100 mb-4">
              {listing.bedrooms > 0 && <div className="flex items-center gap-2 text-gray-600"><Bed className="w-5 h-5 text-blue-500" /><span>{listing.bedrooms} Bedrooms</span></div>}
              <div className="flex items-center gap-2 text-gray-600"><Bath className="w-5 h-5 text-blue-500" /><span>{listing.bathrooms} Bathrooms</span></div>
              <div className="flex items-center gap-2 text-gray-600"><Tag className="w-5 h-5 text-blue-500" /><span>{listing.type}</span></div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{listing.description}</p>

            <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {listing.amenities.map(a => (
                <span key={a} className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />{a}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-1">UGX {listing.price.toLocaleString()}</div>
            <div className="text-gray-500 text-sm mb-4">per month</div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium mb-4 ${listing.available ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              <div className={`w-2 h-2 rounded-full ${listing.available ? 'bg-green-500' : 'bg-red-500'}`} />
              {listing.available ? 'Available' : 'Not Available'}
            </div>
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${listing.ownerType === 'broker' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {listing.ownerType === 'broker' ? 'Broker' : 'Direct Seller'}
                </span>
              </div>
              <p className="font-semibold text-gray-900">{listing.ownerName}</p>
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-2"><Phone className="w-4 h-4" />+256 700 000 000</div>
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1"><Mail className="w-4 h-4" />contact@rentalconnect.ug</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Send Inquiry</h3>
            {sent ? (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-xl">
                <CheckCircle className="w-5 h-5" />Inquiry sent successfully!
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-3">
                <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Hi, I'm interested in this property..." rows={4} required className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm" />
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                  <Send className="w-4 h-4" />{user ? 'Send Inquiry' : 'Login to Inquire'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
