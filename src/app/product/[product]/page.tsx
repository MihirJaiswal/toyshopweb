'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppBtn from '@/components/whatsAppBtn';
import { Separator } from '@/components/ui/separator';

const ProductPage = () => {
  const pathname = usePathname();
  const productName = pathname.split('/')[2];

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
        console.error('Error fetching product:', error);
        if (typeof error === 'string') {
          setError(error);
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
    return (
      <div className="w-full min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-8">Loading...</h1>
            <div className="flex justify-center">
              <div className="flex flex-col items-center border border-solid border-gray-300 bg-white rounded-lg shadow-lg p-8 m-4">
                <div className="w-48 h-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                  <div className="h-4 bg-gray-200 rounded w-64"></div>
                  <div className="h-4 bg-gray-200 rounded w-56"></div>
                  <div className="h-4 bg-gray-200 rounded w-60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-red-500 text-2xl font-bold">Error: {error}</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-black text-2xl md:text-4xl font-bold">No Products Found</h1>
      </div>
    );
  }

  const { name, image, price, description } = product;

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto mt-12 px-4 flex-grow">
      <div className='flex items-center justify-center mt-4'>
      <div className="relative inline-block my-12 text-center">
            <span className="text-3xl md:text-4xl font-bold text-black text-center">
            {name}
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-600 rounded-full"></span>
          </div>
      </div>
        <div className="flex flex-col md:flex-row items-center justify-around mb-20">
          <div className="flex justify-center mb-8 md:mb-0">
            <div className="flex flex-col items-center bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-400 p-6">
              <div className="w-64 h-64 mb-4">
                <img
                  src={image}
                  alt={name}
                  className="object-contain w-full h-full rounded-lg"
                />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-semibold mb-2 text-[#B70E28]">{name}</h1>
              </div>
            </div>
          </div>
          <div>
          <div className="flex flex-col items-center gap-6 max-w-2xl md:text-left text-center">
            <div className='h-full w-full bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-400 p-12'>
            <div>
            <p className="text-xl md:text-2xl text-gray-900 ">{description}</p>
            </div>
            <div className='my-4'>
            <Separator/>
            </div>
            <div className='flex flex-col '>
            <p className='text-gray-800 font-medium text-xl'>M.R.P.: <span className='text-black font-bold'>₹{price}</span></p>
            <span className='font-light text-gray-700 text-sm'>Inclusive of all taxes</span>
            </div>
            </div>
          </div>
          <div className='flex items-center '>
          <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-6 py-3 mt-4">
              Order Now!
            </button>
          </div>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppBtn />
    </div>
  );
};

export default ProductPage;
