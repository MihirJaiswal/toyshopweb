'use client';
import React, { useState } from 'react';
import DeleteCategory from '@/components/DeleteCategory';
import { Separator } from './ui/separator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategoryForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const newCategory = {
      name,
      image,
    };

    try {
      const response = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        const createdCategory = await response.json();
        // Optionally, reset form fields
        setName('');
        setImage('');
        toast.success('Category added successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const errorText = await response.text();
        toast.error(`Error: ${errorText}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-md mt-8 p-6 bg-white rounded shadow-lg border border-solid border-gray-600">
      <h2 className="text-2xl font-semibold mb-4 text-black">Add a New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-black" htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full text-black"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-black" htmlFor="image">Image URL:</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full text-black"
            placeholder="Enter image URL"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#B70E28] hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
        >
          Add Category
        </button>
      </form>
      <div className='mt-12'>
        <Separator/>
      </div>
      <div className='mt-2'>
        <DeleteCategory/>
      </div>
    </div>
  );
};

export default AddCategoryForm;
