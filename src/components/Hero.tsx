'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion'; 
import img from '../../public/bg.png';

const Hero = () => {
  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: -50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }} 
    >
      <div className="absolute"></div>
      <div className="relative z-10 container mx-auto px-6 py-36 flex flex-col items-center md:items-start text-center md:text-left text-black border border-solid border-red-300">
        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight mb-4"
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 1 }} 
        >
          Welcome to ToySandook
        </motion.h1>
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4, duration: 1 }} 
        >
          <p className="text-lg md:text-xl mb-8 text-gray-700">
            Where imagination knows no bounds
          </p>
          <Link href="/shop">
            <motion.h3
              className="px-8 py-3 max-w-48 bg-[#B70E28] text-white text-lg md:text-xl font-semibold rounded-full shadow-lg hover:bg-red-800 transition-colors duration-300"
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
            >
              Shop Now
            </motion.h3>
          </Link>
        </motion.div>
      </div>
      <Image
        src={img}
        alt="Toys"
        className="absolute inset-0 w-full h-full object-cover opacity-100"
        loading="lazy"
        quality={100}
      />
    </motion.div>
  );
};

export default Hero;
