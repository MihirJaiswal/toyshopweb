import React from 'react';
import logo from '../../public/LOGO.png'
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-nav rounded-lg shadow h-96 max-h-60">
      <div className="w-[99vw] max-w-screen-3xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-center">
          <a href="" className="flex items-center justify-center ml-2 md:ml-0 mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <Image 
            src={logo} 
            className="w-12"
            alt="logo"
            width={500}
            />
            <span className="self-center text-lg md:text-2xl font-semibold whitespace-nowrap text-gray-900 pr-12">Toy-Sandook</span>
          </a>
          <ul className="flex flex-wrap items-center justify-around mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400">© 2024 <a href="" className="hover:underline">Toy-Sandook™</a>. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
