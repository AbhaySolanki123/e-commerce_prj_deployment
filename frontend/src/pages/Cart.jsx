import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useShop();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 pt-20 px-4">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
          <ShoppingBag size={48} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center">Looks like you haven't added anything to your cart yet. Discover our premium products now.</p>
        <Link to="/shop" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-sm hover:shadow-md">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-6 gap-4 p-6 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-3">Product</div>
                <div className="col-span-1 text-center">Price</div>
                <div className="col-span-1 text-center">Quantity</div>
                <div className="col-span-1 text-right">Total</div>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col md:grid md:grid-cols-6 gap-4 items-center">
                    {/* Mobile layout */}
                    <div className="col-span-3 flex w-full md:w-auto items-center gap-4">
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-gray-50" />
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="md:hidden absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div>
                        <Link to={`/product/${item.id}`} className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                          {item.name}
                        </Link>
                        <div className="text-sm text-gray-500">Brand: {item.brand}</div>
                        <div className="md:hidden text-lg font-bold text-gray-900 mt-2">₹{item.price.toLocaleString('en-IN')}</div>
                      </div>
                    </div>

                    <div className="hidden md:block col-span-1 text-center font-medium text-gray-900">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>

                    <div className="col-span-1 flex justify-center w-full md:w-auto mt-4 md:mt-0">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 h-10 w-32">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <input 
                          type="number" 
                          value={item.quantity} 
                          readOnly 
                          className="flex-1 w-full text-center font-medium text-sm bg-transparent outline-none"
                        />
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="hidden md:flex col-span-1 justify-end items-center gap-4">
                      <span className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        title="Remove Item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <Link to="/shop" className="text-blue-600 font-medium hover:underline flex items-center gap-2">
                &larr; Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping limit (₹1,500)</span>
                  <span className="font-medium text-gray-900">{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium text-gray-900">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-gray-900 text-lg">Total</span>
                  <span className="font-bold text-gray-900 text-3xl">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>

              {/* Promo Code Input */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                 <p className="text-sm text-gray-500 mb-3 font-medium">Have a promo code?</p>
                 <div className="flex gap-2">
                    <input type="text" placeholder="Enter code" className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-blue-500 text-sm" />
                    <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Apply</button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
