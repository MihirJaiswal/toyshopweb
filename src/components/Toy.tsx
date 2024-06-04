import React from 'react';
import Link from 'next/link';
import { categories } from '../../constant';
import { Separator } from '@/components/ui/separator';

const Toy = () => {
  // Flatten all products arrays into a single array
  const allProducts = categories.flatMap(category => category.products);
  // Get the first 5 items from the combined array
  const fiveProducts = allProducts.filter(product => product.isShown).slice(0, 5);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div>
        <h1 className='mb-8 font-extrabold leading-none tracking-tight text-black text-2xl text-center md:text-left ml-4'>
          What's in your mind?
        </h1>
      </div>
      <div className='flex flex-wrap justify-center'>
        {fiveProducts.map((product, index) => (
          <Link href={`/product/${product.name}`} key={index}>
            <div className='flex flex-col items-center justify-center p-6 cursor-pointer transition-transform transform hover:scale-105'>
              <div className='w-32 h-32'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='object-contain w-full h-full rounded-lg'
                />
              </div>
              <p className='text-base font-bold p-4 text-center'>{product.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <Separator />
    </div>
  );
}

export default Toy;
