import React from 'react';
import { categories } from '../../constant';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const Popular = () => {
  const popularProducts = categories.flatMap(category =>
    category.products.filter(product => product.isPopular)
  ).slice(0, 5); // Limit to 5 products

  return (
    <div className="container mx-auto">
      <div className="py-12 text-center md:text-left">
        <h1 className="py-2 text-5xl text-black font-bold">
          Popular
        </h1>
      </div>
      <div className="flex flex-wrap justify-center pb-12">
        {popularProducts.map((product, index) => (
          <Link href={`/product/${product.name}`} key={index}>
            <div
              key={index}
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
      <Separator />
    </div>
  );
}

export default Popular;
