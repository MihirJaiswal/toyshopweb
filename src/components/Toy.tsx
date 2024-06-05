import React from 'react';
import Link from 'next/link';
import { categories } from '../../constant';
import { Separator } from '@/components/ui/separator';

// Define the interface for a product
interface ProductProps {
  id: string;
  image: string;
  name: string;
  isPopular: boolean;
  isShown: boolean;
  price: number;
  description?: string;
}

// Define the interface for a category
interface CategoryProps {
  id: string;
  image: string;
  name: string;
  itemsAvailable: number;
  products: ProductProps[];
}

const Toy: React.FC = () => {
  // Flatten all products arrays into a single array
  const allProducts: ProductProps[] = categories.flatMap(category => category.products);
  // Shuffle the array of products
  const shuffledProducts = shuffleArray(allProducts);
  // Get the first 5 items from the shuffled array
  const fiveRandomProducts = shuffledProducts.filter(product => product.isShown).slice(0, 5);

  // Function to shuffle the array
  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div>
        <h1 className='mb-8 font-extrabold leading-none tracking-tight text-black text-2xl text-center md:text-left ml-4'>
          What's in your mind?
        </h1>
      </div>
      <div className='flex flex-wrap justify-center'>
        {fiveRandomProducts.map((product, index) => (
          <Link href={`/product/${product.name}`} key={product.id}>
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
