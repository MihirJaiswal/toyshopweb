'use client'
import React, { useState } from 'react';


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
      } else {
        const errorText = await response.text();
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="mx-auto w-full max-w-md mt-8 p-6 bg-white rounded shadow-lg border border-solid border-gray-600">
      <h2 className="text-2xl font-semibold mb-4">Add a New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="image">Image URL:</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
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
    </div>
  );
};

export default AddCategoryForm;
