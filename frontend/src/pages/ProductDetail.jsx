import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Star, Truck, Shield, RotateCcw, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      window.scrollTo(0, 0);
    } else {
      navigate('/shop');
    }
  }, [id, products, navigate]);

  if (!product) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Could add toast here
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/shop')}>Shop</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden relative group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-zoom-in"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isFeatured && (
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">Best Seller</span>
                )}
                {product.originalPrice > product.price && (
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    Sale
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col pt-2">
            <div className="text-blue-600 font-medium tracking-wider text-sm uppercase mb-2">{product.brand}</div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} Rating ({product.reviews} Reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 mb-6 pb-6 border-b border-gray-100">
              <span className="text-4xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through mb-1">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
               <div className="flex items-center border border-gray-300 rounded-xl bg-white w-32 h-14 shrink-0">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    readOnly 
                    className="flex-1 w-full text-center font-medium text-lg outline-none"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
               </div>

               <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 h-14 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all shadow-sm ${
                  product.inStock 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
               >
                 <ShoppingBag size={20} />
                 {product.inStock ? 'Add to Cart' : 'Out of Stock'}
               </button>

               <button 
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
                  isInWishlist(product.id)
                  ? 'border-red-500 text-red-500 bg-red-50'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                }`}
               >
                 <Heart size={24} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
               </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-gray-100 mb-8">
               <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="text-blue-600" size={20} /> Free shipping over ₹1,500
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="text-blue-600" size={20} /> 1 Year Warranty
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-600">
                  <RotateCcw className="text-blue-600" size={20} /> 30-Day Returns
               </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-20">
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            <button 
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-lg font-semibold transition-colors relative ${activeTab === 'description' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Description
              {activeTab === 'description' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('details')}
              className={`pb-4 text-lg font-semibold transition-colors relative ${activeTab === 'details' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Additional Details
              {activeTab === 'details' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-lg font-semibold transition-colors relative ${activeTab === 'reviews' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Reviews ({product.reviews})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>
              )}
            </button>
          </div>
          <div>
             {activeTab === 'description' && (
               <div className="prose max-w-none text-gray-600">
                  <p>In-depth product information: {product.description}. Designed logically and intuitively to bring your ideas to life.</p>
                  <ul className="mt-4 space-y-2 list-disc pl-5">
                    <li>Premium quality materials</li>
                    <li>Ergonomically designed for performance</li>
                    <li>Sustainably sourced and manufactured</li>
                    <li>Global customer support ready to help</li>
                  </ul>
               </div>
             )}
             {activeTab === 'details' && (
               <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex border-b border-gray-200 bg-gray-50">
                    <div className="w-1/3 py-3 px-6 font-semibold text-gray-700">Brand</div>
                    <div className="w-2/3 py-3 px-6 text-gray-600">{product.brand}</div>
                  </div>
                  <div className="flex border-b border-gray-200">
                    <div className="w-1/3 py-3 px-6 font-semibold text-gray-700">Category</div>
                    <div className="w-2/3 py-3 px-6 text-gray-600">{product.category}</div>
                  </div>
                  <div className="flex bg-gray-50">
                    <div className="w-1/3 py-3 px-6 font-semibold text-gray-700">Weight</div>
                    <div className="w-2/3 py-3 px-6 text-gray-600">1.2 kg</div>
                  </div>
               </div>
             )}
             {activeTab === 'reviews' && (
               <div className="text-gray-600 italic">User reviews will be displayed here dynamically. Data fetching integration pending.</div>
             )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;
