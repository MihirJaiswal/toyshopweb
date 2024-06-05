// components/Hero.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import img from '../../public/bg.png'

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute"></div>
      <div className="relative z-10 container mx-auto px-6 py-36 flex flex-col items-center md:items-start text-center md:text-left text-black border border-solid border-red-300">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Welcome to ToySandook
        </h1>
        <div className='flex flex-col items-center '>
        <p className="text-lg md:text-xl mb-8 text-gray-700">
          Where imagination knows no bounds
        </p>
        <Link href="/shop">
          <h3 className="px-8 py-3 max-w-48 bg-[#B70E28] text-white text-lg md:text-xl font-semibold rounded-full shadow-lg hover:bg-red-800 transition-colors duration-300">
            Shop Now
          </h3>
        </Link>
        </div>
      </div>
      <Image
        src={img}
        alt="Toys"
        className="absolute inset-0 w-full h-full object-cover opacity-100"
        loading='lazy'
        quality={100}
      />
    </div>
  );
};

export default Hero;
