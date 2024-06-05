import AddCategoryForm from '@/components/AddCategoryForm'

import AddToyForm from '@/components/Form'
import UpdateProduct from '@/components/ProductManager'
import CategoryProductManager from '@/components/ProductManager'
import React from 'react'

const page = () => {
  return (
    <div className='h-full'>
      <div className='flex flex-col md:flex-row justify-center mb-12 p-6'>
        <AddToyForm/>
        <UpdateProduct/>
        <AddCategoryForm/>
        
    </div>
    </div>
  )
}

export default page