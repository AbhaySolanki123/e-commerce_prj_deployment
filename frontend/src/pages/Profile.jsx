import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { User, Package, Settings, LogOut, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { wishlist, toggleWishlist } = useShop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-1/4 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div 
                  className="relative group cursor-pointer w-16 h-16 shrink-0" 
                  onClick={() => fileInputRef.current?.click()}
                  title="Change Profile Picture"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl overflow-hidden border-2 border-transparent group-hover:border-blue-600 transition-all">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      "JD"
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={18} className="text-white" />
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleImageChange} 
                  />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">John Doe</h2>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>
              </div>

              <nav className="flex flex-col gap-2 border-t border-gray-100 pt-6">
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Package size={20} /> My Orders
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Settings size={20} /> Account Settings
                </button>
                <button 
                  onClick={() => {
                     // mock logout
                     navigate('/login');
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-500 hover:bg-red-50 transition-colors mt-auto"
                >
                  <LogOut size={20} /> Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
             {activeTab === 'orders' && (
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
                 {/* Mock Order List */}
                 <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                       <div className="flex flex-wrap justify-between items-center border-b border-gray-100 pb-4 mb-4 gap-4">
                         <div>
                           <p className="text-sm text-gray-500">Order Placed</p>
                           <p className="font-semibold text-gray-900">April 08, 2026</p>
                         </div>
                         <div>
                           <p className="text-sm text-gray-500">Total Amount</p>
                           <p className="font-semibold text-gray-900">₹{parseFloat(34900).toLocaleString('en-IN')}</p>
                         </div>
                         <div>
                           <p className="text-sm text-gray-500">Order ID</p>
                           <p className="font-semibold text-gray-900">#ORD-123456</p>
                         </div>
                         <div>
                           <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                             Delivered
                           </span>
                         </div>
                       </div>
                       <div className="flex gap-4 items-center">
                          <img 
                            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=100" 
                            alt="Product" 
                            className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity" 
                            onClick={() => navigate('/product/1')}
                          />
                          <div>
                            <p 
                               className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                               onClick={() => navigate('/product/1')}
                            >
                                Premium Wireless Noise-Cancelling Headphones
                            </p>
                            <p className="text-sm text-gray-500">Qty: 1</p>
                          </div>
                          <button 
                            onClick={() => navigate('/product/1')}
                            className="ml-auto bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            View Details
                          </button>
                       </div>
                    </div>
                 </div>
               </div>
             )}

             {activeTab === 'settings' && (
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                 <form className="max-w-md space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" defaultValue="John Doe" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" defaultValue="john@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password (optional)</label>
                      <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500" />
                    </div>
                    <button type="button" className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium mt-4">
                      Save Changes
                    </button>
                 </form>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
