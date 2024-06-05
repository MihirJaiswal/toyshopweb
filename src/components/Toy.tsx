'use client';
import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Shimmer from './shimmer';

interface Product {
  name: string;
  image: string;
  isPopular: boolean;
  // Add other properties if necessary
}

interface Category {
  name: string;
  products: Product[];
  // Add other properties if necessary
}

const Toy = () => {
  const [shownProducts, setShownProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (response.ok) {
          const categories: Category[] = await response.json();
          const allProducts = categories.flatMap(category => category.products);
          const shuffledProducts = shuffleArray(allProducts).slice(0, 5);
          setShownProducts(shuffledProducts);
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
  }, []);

  // Function to shuffle the array
  const shuffleArray = <T extends any>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="container mx-auto">
      <div className="py-12 text-center md:text-left">
        <h1 className="py-2 text-3xl text-black font-bold">
          What's in your mind?
        </h1>
      </div>
      <div className="flex flex-wrap justify-center pb-12">
        {loading ? (
          
            <Shimmer />
          
        ) : (
          shownProducts.map((product, id) => (
            <Link href={`/product/${product.name}`} key={id}>
              <div
                key={id}
                className="flex flex-col items-center border border-solid border-black-500 rounded-lg shadow-lg p-4 m-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
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
        )}
      </div>
      <Separator />
    </div>
  );
}

export default Toy;
