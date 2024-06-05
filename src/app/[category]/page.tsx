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

  if (error) {
    return <div>Error: {error.message}</div>;
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
          <h1 className="pb-12 text-4xl text-black font-bold">{categoryName}</h1>
          <div className="flex flex-wrap justify-center pb-12">
            {categoryData && categoryData.products.map((product, index) => (
              <Link href={`/product/${product.name}`} key={index}>
                <div
                  className="flex flex-col items-center border border-solid border-black-500 rounded-lg shadow-lg p-4 m-4 hover:scale-105 transition-transform duration-300"
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
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppBtn/>
    </div>
  );
}

export default CategoryPage;
