'use client'
import React, { ChangeEvent, useState } from 'react'

const SearchBar = () => {
    const [value, setValue] = useState('Search here..');

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {target} = event;
        setValue(target.value)
        console.log(value)
    }
  return (
    <div className='relative w-full text-gray-600'>
        <input 
        type={'search'} 
        name={'search'}
        placeholder={value}
        className='w-full bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none'
        onChange={searchHandler}
        />

        <button type='submit' className='absolute right-2 top-2 text-gray-500'>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
        <path fill='#B2A7AF' d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
        </svg>
        </button>

    </div>
  )
}

export default SearchBar