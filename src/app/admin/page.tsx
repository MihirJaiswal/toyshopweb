import AddCategoryForm from '@/components/AddCategoryForm'
import AddToyForm from '@/components/Form'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center '>
        <AddToyForm/>
        <AddCategoryForm/>
    </div>
  )
}

export default page