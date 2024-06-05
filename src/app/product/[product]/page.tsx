'use client'
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProductPage = () => {
  const pathname = usePathname();
  const productName = pathname.split('/')[2]; // Extract product name from URL pathname

  const [product, setProduct] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        if(error === 'string'){
          setError(error)
        }
      } finally {
        setLoading(false);
      }
    };

    if (productName) {
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [productName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const { name, image, price, description } = product;

  return (
    <div>
    <Header />
    <div className="container mx-auto mt-24">
    <h1 className="py-12 text-5xl text-black font-bold text-center">{name}</h1>
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
              <h1 className="text-xl font-semibold mb-2 text-[#B70E28]">{name}</h1>
            
              <p className='font-bold'>₹{price}</p>
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
};

export default ProductPage;
