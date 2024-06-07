'use client'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteProduct from '@/components/DeleteProduct';
import { Separator } from './ui/separator';

const UpdateProduct = () => {
  const [updateForm, setUpdateForm] = useState({
    originalName: '',
    name: '',
    image: '',
    description: '',
    price: '',
    isPopular: false,
    isShown: false,
    categoryName: '',
  });

  const handleProductChange = (e:any) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleProductUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updateData: { [key: string]: string | boolean } = {};
      Object.keys(updateForm).forEach((key) => {
        if (updateForm[key as keyof typeof updateForm] !== '' && key !== 'originalName') {
          updateData[key] = updateForm[key as keyof typeof updateForm];
        }
      });
      if (Object.keys(updateData).length === 0) {
        toast.warn('No fields to update.');
        return;
      }
      const response = await fetch(`http://localhost:5000/api/products/${updateForm.originalName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (response.ok) {
        toast.success('Product updated successfully');
        setUpdateForm({
          ...updateForm,
          ...Object.keys(updateData).reduce((acc, key) => ({ ...acc, [key]: '' }), {})
        });
      } else {
        console.error('Error updating product:', await response.json());
        toast.error('Failed to update product. Please try again.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product. Please try again.');
    }
  };
  

  return (
    <div className="container mx-auto p-4 max-w-md bg-white border border-solid border-black mt-8">
      <h1 className="text-2xl font-semibold mb-10 mt-4 text-black">Update Product</h1>
      <form onSubmit={handleProductUpdate} className="flex flex-col space-y-2">
        <input
          type="text"
          name="originalName"
          value={updateForm.originalName}
          onChange={handleProductChange}
          placeholder="Original Product Name"
          className="p-2 border rounded text-black"
          required
        />
        <input
          type="text"
          name="name"
          value={updateForm.name}
          onChange={handleProductChange}
          placeholder="New Product Name"
          className="p-2 border rounded text-black"
        />
        <input
          type="text"
          name="image"
          value={updateForm.image}
          onChange={handleProductChange}
          placeholder="Product Image URL"
          className="p-2 border rounded text-black"
        />
        <textarea
          name="description"
          value={updateForm.description}
          onChange={handleProductChange}
          placeholder="Product Description"
          className="p-2 border rounded text-black"
        ></textarea>
        <input
          type="number"
          name="price"
          value={updateForm.price}
          onChange={handleProductChange}
          placeholder="Product Price"
          className="p-2 border rounded text-black"
        />
        <label className="flex items-center space-x-2 text-black">
          <input
            type="checkbox"
            name="isPopular"
            checked={updateForm.isPopular}
            onChange={() => setUpdateForm({ ...updateForm, isPopular: !updateForm.isPopular })}
          />
          <span>Popular</span>
        </label>
        <label className="flex items-center space-x-2 text-black">
          <input
            type="checkbox"
            name="isShown"
            checked={updateForm.isShown}
            onChange={() => setUpdateForm({ ...updateForm, isShown: !updateForm.isShown })}
          />
          <span>Featured</span>
        </label>
        <input
          type="text"
          name="categoryName"
          value={updateForm.categoryName}
          onChange={handleProductChange}
          placeholder="Category Name"
          className="p-2 border rounded text-black"
        />
        <button type="submit" className="bg-[#B70E28] text-white p-2 rounded">
          Update Product
        </button>
      </form>
      <div className='mt-12'>
        <Separator/>
      </div>
      <div>
      <DeleteProduct/>
      </div>
    </div>
  );
};

export default UpdateProduct;
