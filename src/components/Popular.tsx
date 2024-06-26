'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Shimmer from './shimmer';

interface Product {
  name: string;
  image: string;
  isPopular: boolean;
}

interface Category {
  name: string;
  products: Product[];
}

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsToShow, setProductsToShow] = useState(4);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (response.ok) {
          const categories: Category[] = await response.json();
          const popularProducts = categories
            .flatMap(category => category.products.filter(product => product.isPopular));
          setPopularProducts(popularProducts);
          setDisplayedProducts(popularProducts.slice(0, productsToShow));
        } else {
          throw new Error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [productsToShow]);

  const handleLoadMore = () => {
    setProductsToShow(prevCount => prevCount + 4);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="py-12 text-center md:text-left">
        <h1 className="py-2 text-3xl text-black font-bold">
          Popular
        </h1>
      </div>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center pb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        {loading ? (
          <div className="m-4">
            <Shimmer />
          </div>
        ) : (
          displayedProducts.map((product, id) => (
            <Link href={`/product/${product.name}`} key={id}>
              <motion.div
                key={id}
                className="flex flex-col items-center border border-solid bg-white border-black-500 rounded-lg shadow-lg p-4 md:m-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
                initial={{ opacity: 0, y:40 }}
                whileInView={{ opacity: 1, y:0 }}
                transition={{ duration: 1 }}
              >
                <div className="md:w-44 md:h-40 w-20 h-20 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full h-full rounded-lg"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="md:text-xl text-sm font-semibold mb-2 text-[#B70E28]">{product.name}</h1>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </motion.div>
      {displayedProducts.length < popularProducts.length && (
        <div className="flex justify-center">
          <motion.button
            onClick={handleLoadMore}
            className="mb-12 px-6 py-2 text-white bg-[#B70E28] rounded-lg shadow-lg hover:bg-[#A00D24] transition-colors duration-300"
            whileHover={{ scale: 1.05 }} 
          >
            Load More
          </motion.button>
        </div>
      )}
      <Separator />
    </div>
  );
};

export default Popular;
