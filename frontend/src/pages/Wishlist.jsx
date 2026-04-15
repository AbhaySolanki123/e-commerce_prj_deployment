import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 pt-20 px-4">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
          <Heart size={48} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center">Save items you love to your wishlist to easily find them later.</p>
        <Link to="/shop" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-sm hover:shadow-md">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8">
            <Heart className="text-red-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(item => (
            <div key={item.id} className="relative bg-white border border-gray-100 rounded-2xl p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow group">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }} 
                className="absolute top-6 right-6 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50 z-10 hidden sm:flex items-center justify-center group-hover:scale-110 transition-transform"
                title="Remove from wishlist"
              >
                <Trash2 size={16} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }} 
                className="sm:hidden absolute top-6 right-6 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50 z-10 flex items-center justify-center"
              >
                <Trash2 size={16} />
              </button>
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover rounded-xl mb-4 cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={() => navigate(`/product/${item.id}`)} 
              />
              <h3 
                className="font-semibold text-lg text-gray-900 line-clamp-1 cursor-pointer hover:text-blue-600 transition-colors mb-2"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                {item.name}
              </h3>
              <p className="font-bold text-gray-900 mb-6">₹{item.price.toLocaleString('en-IN')}</p>
              <button 
                onClick={() => addToCart(item)}
                className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors text-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
