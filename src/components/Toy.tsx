import React from 'react';
import Link from 'next/link';
import { toyArray } from '../../constant';
import { Separator } from "@/components/ui/separator"


const Toy = () => {
  return (
    <div className=''>
        <div>
            <h1 className='mb-4 font-extrabold leading-none tracking-tight text-black text-2xl text-center md:text-left ml-4'>What's in your mind?</h1>
        </div>
        <div className='flex flex-wrap items-center justify-around gap-4'>
            {toyArray.map((toy, index) => (
                <Link href={`/product/${toy.name}`} key={index}>
                    <div className='flex flex-col items-center justify-center p-6 cursor-pointer'>
                        <div className='w-32 h-32'>
                            <img src={toy.image} alt={toy.name} className='object-contain w-full h-full'/>
                        </div>
                        <p className='text-base font-bold p-4'>{toy.name}</p>
                    </div>
                </Link>
            ))}
        </div>
        <Separator />
    </div>

  )
}

export default Toy;
