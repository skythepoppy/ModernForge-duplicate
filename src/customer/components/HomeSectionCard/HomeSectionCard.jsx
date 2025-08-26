import React from 'react'
import metalbike from './homesectionassets/metalbike.jpg'

const HomeSectionCard = () => {
  return (
    <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg 
    shadow-lg overflow-hidden w-[15rem] mx-3'>
      
      <div className='h-[13rem] w-[10rem]'>
          <img className='object-cover object-top w-full h-full' src={metalbike} alt=''/>
      </div>

      <div className='p-4'>
        <h3 className='text-lg font-medium text-gray-900'>Metal Bike Kit</h3>
        <p className='mt-2 text-sm text-gray-500'>"Build-It-Yourself" Metal Bike Kit (includes tools)</p>
      </div>
    </div>
  )
}

export default HomeSectionCard
