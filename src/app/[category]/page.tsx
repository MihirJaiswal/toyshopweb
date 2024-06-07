'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Shimmer from '../../components/shimmer';
import WhatsAppBtn from '@/components/whatsAppBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Product {
  name: string;
  image: string;
}

interface Category {
  name: string;
  products: Product[];
}

const CategoryPage = () => {
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const categoryName = decodeURIComponent(pathParts[1]);

  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/categories`);
        if (response.ok) {
          const data: Category[] = await response.json();
          const selectedCategory = data.find(category => category.name.toLowerCase() === categoryName.toLowerCase());
          if (selectedCategory) {
            setCategoryData(selectedCategory);
          } else {
            throw new Error('Selected category not found');
          }
        } else {
          throw new Error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryName]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = categoryData?.products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-black md:text-4xl font-bold'>
          Error: {error.message}
        </h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto mt-20">
          <div className="py-12 text-center">
            <h1 className="pb-12 text-4xl text-black font-bold">{categoryName}</h1>
            <div className="flex flex-wrap justify-center pb-12">
              {Array(5).fill(0).map((_, index) => (
                <div className="m-4" key={index}>
                  <Shimmer />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-20">
        <div className="py-12 text-center">
          <div className="relative inline-block mb-12">
            <span className="text-2xl md:text-3xl font-bold text-black">
              {categoryName.toUpperCase()}
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-600 rounded-full"></span>
          </div>
          <div className="relative w-78 md:w-96 mx-auto mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="p-2 pr-10 border border-gray-300 text-black w-full rounded-3xl"
            />
            <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <div className="flex flex-wrap justify-center pb-12">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <Link href={`/product/${product.name}`} key={index}>
                  <div
                    className="flex flex-col items-center bg-white border border-solid border-black-500 rounded-lg shadow-lg p-4 m-4 hover:scale-105 transition-transform duration-300"
                  >
                    <div className="w-44 h-40 mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain w-full h-full rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <h1 className="text-xl font-semibold mb-2 text-[#B70E28]">{product.name}</h1>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppBtn />
    </div>
  );
};

export default CategoryPage;
