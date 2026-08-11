import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Users, Building2, MessageSquare, Shield, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const { listings, users, inquiries, approveListing, rejectListing, deleteListing, updateUserStatus } = useApp();
  const [tab, setTab] = useState('listings');

  const pending = listings.filter(l => l.status === 'pending');
  const approved = listings.filter(l => l.status === 'approved');
  const allUsers = users.filter(u => u.role !== 'admin');

  const statusBadge = (status) => ({
    approved: <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2.5 py-1 rounded-full text-xs font-medium"><CheckCircle className="w-3 h-3" />Approved</span>,
    pending: <span className="flex items-center gap-1 text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-full text-xs font-medium"><Clock className="w-3 h-3" />Pending</span>,
    rejected: <span className="flex items-center gap-1 text-red-700 bg-red-50 px-2.5 py-1 rounded-full text-xs font-medium"><XCircle className="w-3 h-3" />Rejected</span>,
  }[status]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
          <Shield className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Platform management & oversight</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Pending Review', value: pending.length, color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock },
          { label: 'Approved', value: approved.length, color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
          { label: 'Total Users', value: allUsers.length, color: 'text-blue-600', bg: 'bg-blue-50', icon: Users },
          { label: 'Inquiries', value: inquiries.length, color: 'text-purple-600', bg: 'bg-purple-50', icon: MessageSquare },
        ].map(({ label, value, color, bg, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className={`text-3xl font-bold ${color}`}>{value}</div>
            <div className="text-gray-500 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
        {['listings', 'users', 'inquiries'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-lg font-medium text-sm capitalize transition-colors ${tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{t}</button>
        ))}
      </div>

      {tab === 'listings' && (
        <div className="space-y-4">
          {listings.length === 0 ? <p className="text-gray-400 text-center py-10">No listings.</p> : listings.map(l => (
            <div key={l.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <img src={l.images[0]} alt={l.title} className="w-20 h-16 object-cover rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-gray-900 truncate">{l.title}</h3>
                  {statusBadge(l.status)}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${l.ownerType === 'broker' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>{l.ownerType}</span>
                </div>
                <p className="text-gray-500 text-sm">{l.location} · UGX {l.price.toLocaleString()}/mo · by {l.ownerName}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link to={`/listings/${l.id}`} className="p-2 text-gray-400 hover:text-blue-500 transition-colors"><Eye className="w-4 h-4" /></Link>
                {l.status === 'pending' && (
                  <>
                    <button onClick={() => approveListing(l.id)} className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                      <CheckCircle className="w-3.5 h-3.5" />Approve
                    </button>
                    <button onClick={() => rejectListing(l.id)} className="flex items-center gap-1 bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                      <XCircle className="w-3.5 h-3.5" />Reject
                    </button>
                  </>
                )}
                <button onClick={() => { if (confirm('Delete this listing?')) deleteListing(l.id); }} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'users' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Name', 'Email', 'Role', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-sm font-medium text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {allUsers.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-900">{u.name}</td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{u.email}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${u.role === 'broker' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {u.role === 'broker' ? u.listingType || 'broker' : 'client'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${u.status === 'suspended' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {u.status === 'suspended' ? 'Suspended' : 'Active'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => updateUserStatus(u.id, u.status === 'suspended' ? 'active' : 'suspended')} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${u.status === 'suspended' ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}>
                      {u.status === 'suspended' ? 'Activate' : 'Suspend'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'inquiries' && (
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 text-gray-200" />
              <p className="text-gray-400">No inquiries yet.</p>
            </div>
          ) : inquiries.map(inq => (
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
