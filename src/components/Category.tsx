'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { delay, motion } from 'framer-motion'; 
import { Separator } from '@/components/ui/separator';
import Shimmer from './shimmer';

interface CategoryItem {
  name: string;
  image: string;
  products: any[]; 
}

const Category = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <div className="py-12 text-center md:text-left">
        <h1 className="py-2 text-3xl text-black font-bold">Categories</h1>
        <div className='flex items-center justify-center'>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search categories..."
            className="p-2 border border-gray-300 rounded-lg mb-8 text-black mt-4 max-w-78 md:max-w-lg w-full mx-auto"
          />
        </div>
      </div>
      <motion.div
        className="flex flex-wrap justify-center pb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        {loading ? (
          <div className="m-4">
            <Shimmer />
          </div>
        ) : (
          filteredCategories.map(({ name, image, products }, index) => (
            <Link href={`/${name.toLowerCase()}`} key={index}>
              <motion.div
                className="flex flex-col items-center border border-solid bg-white border-black-500 rounded-lg shadow-lg p-4 m-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
                initial={{ opacity:0, y:40 }}
                whileInView={{opacity:1, y:0 }} 
                transition={{duration:1}}
                key={index}
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
              </motion.div>
            </Link>
          ))
        )}
      </motion.div>
      <Separator />
    </div>
  );
};

export default Category;
