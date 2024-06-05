'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppBtn from '@/components/whatsAppBtn';


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
        if (error === 'string'){
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
      <div className='w-full'>
        <Header />
                  <div className="mx-auto mt-24">
                    <div className="py-12 text-center">
                      <h1 className="pb-12 text-5xl text-black font-bold">Loading...</h1>
                      <div className="flex justify-center">
                        <div className="flex flex-col items-center border border-solid border-black-500 rounded-lg shadow-lg p-4 m-4">
                          <div className="w-full mb-4">
                          <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                    <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                    </div>
                    <div className="w-full">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div> 
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
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return(
      <div className='flex h-screen justify-center items-center'><h1 className='text-black text-2xl md:text-4xl font-bold'>
        No Products Found</h1></div>
    );
  }

  const { name, image, price, description } = product;

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-24">
        <h1 className="py-12 text-5xl text-black font-bold text-center">{name}</h1>
        <div className="py-2 text-center flex flex-col md:flex-row items-center justify-around mb-20">
          <div className="flex justify-center">
            <div className="flex flex-col items-center border border-solid bg-white border-black-500 rounded-lg shadow-lg p-4 m-4">
              <div className="w-44 h-40 mb-4">
                <img
                  src={image}
                  alt={productName}
                  className="object-contain w-full h-full rounded-lg"
                />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-xl font-semibold mb-2 text-[#B70E28]">{name}</h1>
                <p className='font-bold text-black'>₹{price}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='max-w-2xl text-center'>
              <p className='text-2xl p-6 text-gray-900'>{description}</p>
            </div>
            <div>
              <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Order Now!</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppBtn/>
    </div>
  );
};

export default ProductPage;
