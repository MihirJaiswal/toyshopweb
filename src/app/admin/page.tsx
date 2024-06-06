'use client';
import AddCategoryForm from '@/components/AddCategoryForm';
import AddToyForm from '@/components/Form';
import UpdateProduct from '@/components/ProductManager';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    return <div>Loading...</div>; 
  }

  if (!authenticated) {
    return <div>You are not authorized to access this page. Please sign up or log in.</div>;
  }

  return (
    <div className='h-full'>
      <div className='flex items-center justify-center'>
      <h1 className='text-3xl font-bold text-black'>Admin Dashboard</h1>
      <button onClick={handleLogout} className='bg-[#B70E28] px-4 py-2  m-2 rounded-2xl'>Logout</button>
      </div>
      <div className='flex flex-col md:flex-row justify-center mb-12 p-6'>
        <AddToyForm />
        <UpdateProduct />
        <AddCategoryForm />
      </div>
    </div>
  );
};

export default Page;
