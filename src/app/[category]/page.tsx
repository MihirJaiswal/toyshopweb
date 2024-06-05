'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


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
  console.log('Current pathname:', pathname);
  console.log('Path parts:', pathParts);

  // Use index 1 to get the category name
  const categoryName = decodeURIComponent(pathParts[1]);
  console.log('Category name:', categoryName);

  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/categories`);
        if (response.ok) {
          const data: Category[] = await response.json();
          console.log('Fetched categories:', data);

          // Find the selected category by its name
          const selectedCategory = data.find(category => category.name.toLowerCase() === categoryName.toLowerCase());
          console.log('Selected category:', selectedCategory);

          if (selectedCategory) {
            setCategoryData(selectedCategory);
          } else {
            setError('Selected category not found');
          }
        } else {
          throw new Error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
        if(typeof error === "string"){
          setError(error);
        }
      }
    };

    fetchCategoryData();
  }, [categoryName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!categoryData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
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
      <Footer />
    </div>
  );
}

export default CategoryPage;
