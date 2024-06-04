'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import { categories } from '../../../../constant';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProductPage = () => {
  const pathname = usePathname();
  const productName = pathname.split('/')[2]; // Extract product name from URL

  // Define the interface for a product
  interface ProductProps {
    image: string;
    name: string;
    isPopular: boolean;
    isShown: boolean;
    description?: string;
    price: number;
  }

  // Specify the type of productData explicitly
  let productData: ProductProps | null = null;

  categories.forEach(category => {
    const foundProduct = category.products.find(product => product.name.toLowerCase() === productName.toLowerCase());
    if (foundProduct) {
      productData = foundProduct;
    }
  });

  if (!productData) {
    return <div>Product not found</div>;
  }

  const { image, name, price, description} = productData;

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-24">
      <h1 className="py-12 text-5xl text-black font-bold text-center">{productName}</h1>
        <div className="py-2 text-center flex flex-col md:flex-row items-center justify-around mb-20">
           <div className="flex justify-center">
            <div className="flex flex-col items-center border border-solid border-black-500 rounded-lg shadow-lg p-4 m-4">
              <div className="w-44 h-40 mb-4">
                <img
                  src={image}
                  alt={productName}
                  className="object-contain w-full h-full rounded-lg"
                />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-xl font-semibold mb-2 text-[#B70E28]">{productName}</h1>
              
                <p className='font-bold'>{price}</p>
                {/* Add more product details here if needed */}
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='max-w-2xl text-center'>
            <p className='text-2xl p-6'>{description}</p>
            </div>
            <div>
                <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Order Now!</button>
            </div>
        </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;
