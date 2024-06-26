'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { navigation } from '../../constant';
import { FaHome } from 'react-icons/fa'; // Import the home icon

function Navbar() {
  const pathname = usePathname();
  const [openNavigation, setOpenNavigation] = useState(false);

  const handleClick = () => {
    if (!openNavigation) return;
    setOpenNavigation(false);
  };

  return (
    <div>
      <nav
        className={`${
          openNavigation ? 'flex' : 'hidden'
        } fixed top-[5rem] left-0 right-0 bottom-0 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
      >
        <div className="relative z-2 flex flex-col text-[#BE243C] font-bold items-center justify-center m-auto lg:flex-row">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.route}
              onClick={handleClick}
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                item.route === pathname ? 'lg:text-black' : 'lg:text-n-1'
              } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                item.route === pathname ? 'z-2 lg:text-black' : 'lg:text-n-1/50'
              } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
            >
              {item.route === '/' ? (
                <FaHome className="text-xl text-[#B70E28]" /> // Show home icon for home path
              ) : (
                item.title
              )}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
