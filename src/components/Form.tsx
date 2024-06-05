'use client'
import React, { useState } from 'react';

const AddToyForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isPopular, setIsPopular] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newToy = {
      name,
      image,
      description,
      price: parseFloat(price), 
      isPopular,
      isShown,
      categoryName: category 
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newToy),
      });
  
      if (response.ok) {
        const createdToy = await response.json();
        console.log('New toy created:', createdToy);
        setName('');
        setImage('');
        setDescription('');
        setPrice('');
        setIsPopular(false);
        setIsShown(true);
        setCategory('');
      } else {
        const errorText = await response.text();
        console.error('Error creating toy:', errorText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-lg border-solid border border-gray-400">
      <h2 className="text-2xl font-semibold mb-4 text-black">Add a New Toy</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">Name:</label>
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
          <label className="block text-sm font-bold mb-2" htmlFor="image">Image URL:</label>
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
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full text-black"
            placeholder="Enter description"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full text-black"
            placeholder="Enter price"
            required
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isPopular}
              onChange={(e) => setIsPopular(e.target.checked)}
              className="form-checkbox h-5 w-5 text-[#B70E28]"
            />
            <span className="ml-2">Popular</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isShown}
              onChange={(e) => setIsShown(e.target.checked)}
              className="form-checkbox h-5 w-5 text-[#B70E28]"
            />
            <span className="ml-2">Shown</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="category">Category Name:</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full text-black"
            placeholder="Enter category ID"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#B70E28] hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
        >
          Add Toy
        </button>
      </form>
    </div>
  );
};

export default AddToyForm;
