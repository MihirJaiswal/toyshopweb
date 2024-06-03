import React from 'react';
import logo from '../../public/LOGO.png'
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow  m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <Image src={logo} className="w-24" alt="" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white pr-12">Toy-Sandook</span>
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
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="" className="hover:underline">Toy-Sandook™</a>. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
