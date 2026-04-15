import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

const Shop = () => {
  const { products } = useShop();
  const location = useLocation();
  
  const [sortOption, setSortOption] = useState('featured');
  
  const searchParams = new URLSearchParams(location.search);
  const categoryQuery = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedProducts = useMemo(() => {
    let filtered = products;

    if (categoryQuery && categoryQuery !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase() === categoryQuery.toLowerCase());
    }

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortOption) {
      case 'price-low':
         filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
         filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
         filtered = [...filtered].reverse();
        break;
      case 'popularity':
         filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
        break;
      case 'featured':
      default:
         // keep it as it is
        break;
    }

    return filtered;
  }, [products, sortOption, categoryQuery, searchQuery]);

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-8 mb-8">
        <div className="container mx-auto px-4 md:px-8 text-center bg-">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop Our Collection</h1>
          <p className="text-gray-500">
            {searchQuery 
              ? `Results for "${searchQuery}"`
              : categoryQuery && categoryQuery !== 'all' 
              ? `Exploring ${categoryQuery.charAt(0).toUpperCase() + categoryQuery.slice(1)}` 
              : "Discover premium products curated just for you."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        
        {/* Products Grid */}
        <div className="w-full">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-6 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm gap-4">
            <div className="text-gray-600 text-sm">
              Showing <span className="font-semibold text-gray-900">{sortedProducts.length}</span> results
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
              <div className="relative">
                <select 
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-10 py-2.5 outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="popularity">Popularity</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
