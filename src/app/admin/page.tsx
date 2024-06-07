'use client';
import AddCategoryForm from '@/components/AddCategoryForm';
import AddToyForm from '@/components/Form';
import UpdateProduct from '@/components/ProductManager';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner';

const Page = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        console.log('Checking authentication...');
        const res = await fetch('http://localhost:5000/api/check-auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log('Authentication response:', data);
          setAuthenticated(data.authenticated);
          if (!data.authenticated) {
            router.push('/signup');
          }
        } else {
          router.push('/signup');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        router.push('/signup');
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        console.log('Logout successful');
        toast.success('Logout successful', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAuthenticated(false);
        setTimeout(() => {
          router.push('/signup');
        }, 100);
      } else {
        console.error('Error during logout:', res.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Oval
          height={80}
          width={80}
          color="#B70E28"
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#B70E28"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-black">You are not authorized to access this page.</h2>
          <p className='text-black'>Please log in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full md:p-6 p-2">
      <div className="flex items-center justify-between mb-8">
      <div className="relative inline-block">
            <span className="text-2xl md:text-3xl font-bold text-black">
            Admin
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-600 rounded-full"></span>
          </div>
        <button onClick={handleLogout} className="bg-[#B70E28] text-white px-4 py-2 rounded-2xl hover:bg-red-700 transition duration-300">
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-500 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 md:p-6 p-2">
         <AddToyForm />
        </div>
        <div className="bg-gray-500 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 md:p-6 p-2">
          <UpdateProduct />
        </div>
        <div className="bg-gray-500 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 md:p-6 p-2">
          <AddCategoryForm />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
