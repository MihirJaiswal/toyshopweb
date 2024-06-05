import React from 'react'
import img from '../../public/WhatsApp.svg'
import Image from 'next/image'
const WhatsAppBtn = () => {
  return (
    <div>
    <div className='scroll-to-top-button'>
      <button className='flex items-center justify-center'>
        <Image
          src={img}
          alt="whatsapp"
          width={40}
          height={40}
        />
      </button>
    </div>
    </div>
  )
}

export default WhatsAppBtn