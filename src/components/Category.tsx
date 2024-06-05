// components/Category.js

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import Shimmer from './shimmer';
import SearchBar from './SearchBar';

interface CategoryItem {
  name: string;
  image: string;
  products: any[]; // Assuming products are available in the API response
}

const Category = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          throw new Error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="py-12 text-center md:text-left">
        <h1 className="py-2 text-3xl text-black font-bold">
          Categories
        </h1>
      </div>
      <div className='mb-8 max-w-96 flex justify-center items-center mx-auto'>
      <SearchBar/>
      </div>
      <div className="flex flex-wrap justify-center pb-12">
        {loading ? (
          <div className="m-4">
            <Shimmer />
          </div>
        ) : (
          categories.map(({ name, image, products }, index) => (
            <Link href={`/${name.toLowerCase()}`} key={index}>
              <div
                className="flex flex-col items-center border border-solid bg-white border-black-500 rounded-lg shadow-lg p-4 m-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="w-44 h-40 mb-4">
                  <img
                    src={image}
                    alt={name}
                    className="object-contain w-full h-full rounded-lg"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-semibold mb-2 text-[#B70E28]">{name}</h1>
                  <p className="text-sm text-gray-500">{products.length} Products</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <Separator />
    </div>
  );
};

export default Category;
