import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const MOCK_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@rc.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'John Broker', email: 'broker@rc.com', password: 'broker123', role: 'broker', listingType: 'broker' },
  { id: 3, name: 'Jane Seller', email: 'seller@rc.com', password: 'seller123', role: 'broker', listingType: 'seller' },
  { id: 4, name: 'Alice Client', email: 'client@rc.com', password: 'client123', role: 'client' },
];

const MOCK_LISTINGS = [
  { id: 1, title: '2-Bedroom Apartment in Kololo', location: 'Kololo, Kampala', price: 800000, type: 'Apartment', bedrooms: 2, bathrooms: 1, amenities: ['WiFi', 'Parking', 'Security'], description: 'Modern apartment with great city views, fully furnished with all amenities.', images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'], ownerId: 2, ownerName: 'John Broker', ownerType: 'broker', status: 'approved', createdAt: '2024-01-15', available: true },
  { id: 2, title: 'Spacious Studio in Ntinda', location: 'Ntinda, Kampala', price: 450000, type: 'Studio', bedrooms: 1, bathrooms: 1, amenities: ['Water', 'Electricity', 'Security'], description: 'Cozy studio apartment perfect for a single professional or student.', images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ownerId: 3, ownerName: 'Jane Seller', ownerType: 'seller', status: 'approved', createdAt: '2024-01-20', available: true },
  { id: 3, title: '3-Bedroom House in Muyenga', location: 'Muyenga, Kampala', price: 1500000, type: 'House', bedrooms: 3, bathrooms: 2, amenities: ['Garden', 'Parking', 'WiFi', 'Security', 'Generator'], description: 'Beautiful family home with a large garden and modern finishes.', images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'], ownerId: 2, ownerName: 'John Broker', ownerType: 'broker', status: 'approved', createdAt: '2024-01-22', available: true },
  { id: 4, title: 'Office Space in Nakasero', location: 'Nakasero, Kampala', price: 2000000, type: 'Office', bedrooms: 0, bathrooms: 2, amenities: ['WiFi', 'Parking', 'Generator', 'AC'], description: 'Prime office space in the heart of Kampala CBD, ideal for businesses.', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'], ownerId: 3, ownerName: 'Jane Seller', ownerType: 'seller', status: 'pending', createdAt: '2024-01-25', available: true },
  { id: 5, title: '1-Bedroom Flat in Bukoto', location: 'Bukoto, Kampala', price: 600000, type: 'Apartment', bedrooms: 1, bathrooms: 1, amenities: ['Water', 'Electricity', 'WiFi'], description: 'Affordable and comfortable flat in a quiet neighborhood.', images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'], ownerId: 2, ownerName: 'John Broker', ownerType: 'broker', status: 'pending', createdAt: '2024-01-28', available: true },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const [users, setUsers] = useState(MOCK_USERS);
  const [favorites, setFavorites] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) { setUser(found); return { success: true, user: found }; }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (data) => {
    const exists = users.find(u => u.email === data.email);
    if (exists) return { success: false, error: 'Email already registered' };
    const newUser = { ...data, id: users.length + 1 };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => setUser(null);

  const addListing = (data) => {
    const newListing = { ...data, id: listings.length + 1, ownerId: user.id, ownerName: user.name, ownerType: user.listingType, status: 'pending', createdAt: new Date().toISOString().split('T')[0], available: true };
    setListings(prev => [...prev, newListing]);
    return newListing;
  };

  const updateListing = (id, data) => setListings(prev => prev.map(l => l.id === id ? { ...l, ...data } : l));
  const deleteListing = (id) => setListings(prev => prev.filter(l => l.id !== id));
  const approveListing = (id) => updateListing(id, { status: 'approved' });
  const rejectListing = (id) => updateListing(id, { status: 'rejected' });

  const toggleFavorite = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const sendInquiry = (listingId, message) => {
    const listing = listings.find(l => l.id === listingId);
    setInquiries(prev => [...prev, { id: prev.length + 1, listingId, listingTitle: listing?.title, senderId: user.id, senderName: user.name, message, createdAt: new Date().toISOString().split('T')[0], read: false }]);
  };

  const updateUserStatus = (id, status) => setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));

  return (
    <AppContext.Provider value={{ user, users, listings, favorites, inquiries, login, register, logout, addListing, updateListing, deleteListing, approveListing, rejectListing, toggleFavorite, sendInquiry, updateUserStatus }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
