import React from 'react';
import { categories } from '../../constant';
import { Separator } from "@/components/ui/separator";

const Category = () => {
  return (
    <div className="container mx-auto">
      <div className="py-12 text-center md:text-left">
        <h1 className="py-2 text-5xl text-black font-bold">
          Categories
        </h1>
      </div>
      <div className="flex flex-wrap justify-center pb-12">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center border border-solid border-black-500 rounded-lg shadow-lg p-4 m-4 hover:scale-105 transition-transform duration-300 "
          >
            <div className="w-44 h-40 mb-4">
              <img
                src={category.image}
                alt={category.name}
                className="object-contain w-full h-full rounded-lg"
              />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-semibold mb-2 text-[#B70E28]">{category.name}</h1>
              <p className="text-gray-600">{category.itemsAvailable} items available</p>
            </div>
          </div>
        ))}
      </div>
      <Separator/>
    </div>
  );
}

export default Category;
