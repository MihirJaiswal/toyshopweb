import Image from 'next/image'
import React from 'react'
import Navbar from './Navbar'
import MobNav from './MobNav'
import SearchBar from './SearchBar'
import logo from '../../public/LOGO.png'


const Header = () => {
  return (
    <div className='fixed w-full text-white font-bold top-0 z-50 bg-[#b70e28] backdrop-blur-sm border-b border-n-6  lg:backdrop-blur-sm'>
        <div className='flex justify-between items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4'>
        <a href="/" className='flex items-center w-[12rem] md:w-[20rem] xl:mr-8'>
            <Image
            alt='logo'
            src={logo}
            width={500}
            height={500}
            className='w-10 md:w-16 bg-white'
            loading='lazy'
            />
            <h1 className='text-2xl md:text-xl px-2 font-code text-n-1 hidden md:block'>TOYSANDOOK</h1>
            </a>
            <div className='mr-12'>
            <SearchBar/>
            </div>
            <Navbar/>
            <div className='flex-between gap-5'>
            <MobNav/>
          </div>
        </div>
    </div>  
  )
}

export default Header