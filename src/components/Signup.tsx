'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'; 

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      router.push('/admin');
    } else {
      const errorData = await res.json();
      console.error('Login error:', errorData);
      alert('Invalid credentials');
    }
  };
  
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/check-auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log('Authentication response:', data);

          if (data.authenticated) {
            router.push('/admin');
          }
        } else {
          console.error('Response not ok:', res.statusText);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuthentication();
  }, [router]);

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
       <div className='container w-full max-w-96 bg-white flex flex-col items-center justify-center p-12 border border-solid  border-gray-700 rounded-2xl'>
       <h1 className="text-3xl font-bold mb-4 text-black">Sign Up</h1>
       <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-4">
      <input
        type="text"
        placeholder="Username"
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 text-black"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 text-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-[#B70E28] text-white px-4 py-2 rounded-md mt-8">Sign Up</button>
    </form>
       </div>
    </div>
  );
}
