import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, CreditCard, RotateCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { categories } from '../data/mockData';
import { motion } from 'framer-motion';

const Home = () => {
  const { products } = useShop();
  
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const newArrivals = products.slice().reverse().slice(0, 4);

  const features = [
    { icon: <Truck size={32} />, title: 'Free Shipping', desc: 'On all orders over $100' },
    { icon: <ShieldCheck size={32} />, title: 'Secure Payment', desc: '100% encrypted payment' },
    { icon: <RotateCcw size={32} />, title: 'Easy Returns', desc: '30-day return policy' },
    { icon: <CreditCard size={32} />, title: 'Flexible Credit', desc: 'Pay in 4 installments' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="relative rounded-3xl overflow-hidden bg-gray-900 h-[500px] md:h-[600px] flex items-center">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
              alt="Hero" 
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          </div>
          <div className="relative z-10 w-full md:w-2/3 lg:w-1/2 p-8 md:p-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 text-blue-400 font-semibold text-sm mb-6 border border-blue-500/30 backdrop-blur-md"
            >
              Spring Collection 2026
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Discover the New Standard of <span className="text-blue-500">Premium</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-300 mb-8 max-w-lg"
            >
              Explore our curated collection of high-quality products designed to elevate your everyday lifestyle.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/shop" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/shop?category=electronics" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold transition-all">
                Explore Electronics
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4 p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-blue-600 bg-blue-50 p-3 rounded-full">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-gray-500">Find exactly what you're looking for</p>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 hover:underline">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={category.id} to={`/shop?category=${category.name.toLowerCase()}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[300px] rounded-2xl overflow-hidden"
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:translate-x-2 transition-transform">{category.name}</h3>
                  <span className="text-blue-400 text-sm font-medium opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    Explore items &rarr;
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 md:px-8 mb-20 bg-gray-50 pt-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-500">Handpicked items that represent the best of our collection.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <div className="bg-blue-600 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center relative">
          <div className="w-full md:w-1/2 p-10 md:p-16 z-10 text-white">
            <span className="uppercase tracking-wider font-bold text-sm text-blue-200 mb-4 block">Limited Time Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get 20% Off Your First Order</h2>
            <p className="text-blue-100 mb-8 max-w-md">Join our newsletter and receive an exclusive discount code for your first purchase.</p>
            <div className="flex max-w-md bg-white rounded-full p-2">
              <input type="email" placeholder="Enter your email" className="flex-1 bg-transparent px-4 py-2 outline-none text-gray-900" />
              <button className="bg-gray-900 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">Subscribe</button>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-auto absolute right-0 top-0 bottom-0 opacity-20 md:opacity-100 md:relative">
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" alt="Promo" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 md:px-8 mb-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">New Arrivals</h2>
            <p className="text-gray-500">Check out our latest premium additions.</p>
          </div>
          <Link to="/shop?sort=newest" className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 hover:underline">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
