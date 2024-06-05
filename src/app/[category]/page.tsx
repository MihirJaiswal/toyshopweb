'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Shimmer from '../../components/shimmer';
import WhatsAppBtn from '@/components/whatsAppBtn';

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
    return(
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
          <h1 className="pb-12 text-4xl text-black font-bold">{categoryName.toUpperCase()}</h1>
          <div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="p-2 border border-gray-300 mb-8 text-black w-78 md:w-96 mx-auto rounded-3xl"
          />
           <div className='absolute right-2 top-2 text-gray-500'>
           <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
           <path fill='#B2A7AF' d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
          </svg>
          </div>
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
      <WhatsAppBtn/>
    </div>
  );
}

export default CategoryPage;
