'use client'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteProduct = () => {
  const [productName, setProductName] = useState('');

  const handleProductDelete = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productName}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('Product deleted successfully');
        setProductName('');
      } else {
        console.error('Error deleting product:', await response.json());
        toast.error('Failed to delete product. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-black">Delete Product</h1>
      <form onSubmit={handleProductDelete} className="flex flex-col space-y-2">
        <input
          type="text"
          name="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          className="p-2 border rounded mb-4 text-black"
          required
        />
        <button type="submit" className="bg-[#B70E28] text-white p-2 rounded">
          Delete Product
        </button>
      </form>
    </div>
  );
};

export default DeleteProduct;
