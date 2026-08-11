import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, ToggleLeft, ToggleRight, Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BrokerDashboard() {
  const { user, listings, deleteListing, updateListing, inquiries } = useApp();
  const navigate = useNavigate();
  const myListings = listings.filter(l => l.ownerId === user?.id);
  const myInquiries = inquiries.filter(i => myListings.some(l => l.id === i.listingId));
  const [tab, setTab] = useState('listings');

  const statusBadge = (status) => ({
    approved: <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2.5 py-1 rounded-full text-xs font-medium"><CheckCircle className="w-3 h-3" />Approved</span>,
    pending: <span className="flex items-center gap-1 text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-full text-xs font-medium"><Clock className="w-3 h-3" />Pending</span>,
    rejected: <span className="flex items-center gap-1 text-red-700 bg-red-50 px-2.5 py-1 rounded-full text-xs font-medium"><XCircle className="w-3 h-3" />Rejected</span>,
  }[status]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {user?.name} · <span className="capitalize">{user?.listingType}</span></p>
        </div>
        <Link to="/broker/add" className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors font-medium">
          <Plus className="w-4 h-4" />Add Listing
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[{ label: 'Total Listings', value: myListings.length, color: 'text-blue-600' }, { label: 'Approved', value: myListings.filter(l => l.status === 'approved').length, color: 'text-green-600' }, { label: 'Inquiries', value: myInquiries.length, color: 'text-purple-600' }].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-gray-500 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
        {['listings', 'inquiries'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-lg font-medium text-sm capitalize transition-colors ${tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{t}</button>
        ))}
      </div>

      {tab === 'listings' && (
        <div className="space-y-4">
          {myListings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-400">No listings yet. <Link to="/broker/add" className="text-blue-600 hover:underline">Add your first listing</Link></p>
            </div>
          ) : myListings.map(l => (
            <div key={l.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <img src={l.images[0]} alt={l.title} className="w-20 h-16 object-cover rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{l.title}</h3>
                  {statusBadge(l.status)}
                </div>
                <p className="text-gray-500 text-sm">{l.location} · UGX {l.price.toLocaleString()}/mo</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => updateListing(l.id, { available: !l.available })} title={l.available ? 'Mark unavailable' : 'Mark available'} className="text-gray-400 hover:text-blue-500 transition-colors">
                  {l.available ? <ToggleRight className="w-6 h-6 text-green-500" /> : <ToggleLeft className="w-6 h-6" />}
                </button>
                <Link to={`/listings/${l.id}`} className="p-2 text-gray-400 hover:text-blue-500 transition-colors"><Eye className="w-4 h-4" /></Link>
                <button onClick={() => navigate(`/broker/edit/${l.id}`)} className="p-2 text-gray-400 hover:text-blue-500 transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => { if (confirm('Delete this listing?')) deleteListing(l.id); }} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'inquiries' && (
        <div className="space-y-4">
          {myInquiries.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 text-gray-200" />
              <p className="text-gray-400">No inquiries yet.</p>
            </div>
          ) : myInquiries.map(inq => (
            <div key={inq.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{inq.senderName}</p>
                  <p className="text-sm text-gray-500">Re: {inq.listingTitle}</p>
                </div>
                <span className="text-xs text-gray-400">{inq.createdAt}</span>
              </div>
              <p className="text-gray-700 bg-gray-50 rounded-xl p-3 text-sm">{inq.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
