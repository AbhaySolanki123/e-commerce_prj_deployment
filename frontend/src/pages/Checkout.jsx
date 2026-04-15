import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';

const Checkout = () => {
  const { cart, getCartTotal } = useShop();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    // Real implementation would process payment here and clear cart
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen pt-32 text-center text-gray-500">
        You need items in your cart to checkout.
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 pt-20 px-4">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Order Placed Successfully!</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center">Thank you for your purchase. We have received your order and will begin processing it right away.</p>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm mb-8 text-center">
          <div className="text-sm text-gray-500 mb-1">Order Reference</div>
          <div className="font-mono text-xl font-bold text-gray-900">#ORD-{Math.floor(Math.random() * 1000000)}</div>
        </div>
        <button 
          onClick={() => {
            // Usually we clear cart here
            navigate('/');
            window.location.reload(); // simple reset for mock
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              
              {/* Contact Info */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input type="email" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors" placeholder="you@example.com" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors" placeholder="Doe" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                    <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors" placeholder="123 Main St" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors" placeholder="San Francisco" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code *</label>
                    <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors" placeholder="94105" />
                  </div>
                </div>
              </div>

              {/* Payment Details (Mock) */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                <div className="bg-gray-50 p-4 border border-gray-200 rounded-xl mb-6">
                   <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                      <span className="font-medium flex items-center gap-2"><CreditCard size={18} /> Credit Card</span>
                   </label>
                   <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                     <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Card Number</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-blue-500" />
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-blue-500" />
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">CVC</label>
                        <input type="text" placeholder="123" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-blue-500" />
                     </div>
                   </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 p-3 rounded-lg border border-green-100">
                  <ShieldCheck size={18} /> Payments are secure and encrypted. (Mock UI)
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <button 
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white h-14 rounded-xl font-bold text-lg transition-colors shadow-sm"
                >
                  Pay ₹{total.toLocaleString('en-IN')}
                </button>
              </div>

            </form>
          </div>

          {/* Right Sidebar - Summary */}
          <div className="w-full lg:w-1/3">
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
               <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary ({cart.length})</h2>
               
               <div className="max-h-[40vh] overflow-y-auto mb-6 pr-2 space-y-4">
                 {cart.map(item => (
                   <div key={item.id} className="flex gap-4">
                     <div className="relative">
                       <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100" />
                       <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                         {item.quantity}
                       </span>
                     </div>
                     <div className="flex-1">
                       <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                       <div className="text-sm font-bold text-gray-900 mt-1">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="border-t border-gray-100 pt-4 space-y-3 mb-4 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
                  </div>
               </div>

               <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900 text-2xl">₹{total.toLocaleString('en-IN')}</span>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
