'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '../../../constant';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CategoryPage = () => {
  const pathname = usePathname();
  const categoryName = pathname.split('/')[1]; // Extract category from URL

  // Find the category data based on the category name from the URL
  const categoryData = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());

  if (!categoryData) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <Header/>
    <div className="container mx-auto mt-20">
      <div className="py-12 text-center">
        <h1 className="pb-12 text-4xl text-black font-bold">Popular Products</h1>
        <div className="flex flex-wrap justify-center pb-12">
          {categoryData.products.map((product, index) => (
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
    <Footer/>
    </div>
  );
}

export default CategoryPage;
