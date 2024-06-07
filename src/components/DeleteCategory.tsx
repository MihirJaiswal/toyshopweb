'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteCategory = () => {
  const [deleteName, setDeleteName] = useState('');
  const [message, setMessage] = useState('');

  const handleDeleteCategory = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${deleteName}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      setMessage(`Category ${deleteName} deleted successfully.`);
      toast.success(`Category ${deleteName} deleted successfully.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDeleteName('');
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      setMessage(`Error: ${errorMessage}`);
      toast.error(`Error: ${errorMessage}`, {
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-black">Delete Category</h1>   
      <div className="flex flex-col gap-4 md:flex-row mb-4">
        <input 
          type="text" 
          placeholder="Category Name" 
          value={deleteName} 
          onChange={(e) => setDeleteName(e.target.value)} 
          className="border rounded px-2 py-1 mr-2 text-black"
        />
        <button 
          onClick={handleDeleteCategory} 
          className="bg-[#B70E28] text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
      {message && <p className="text-red-500 mb-4">{message}</p>}
    </div>
  );
};

export default DeleteCategory;
