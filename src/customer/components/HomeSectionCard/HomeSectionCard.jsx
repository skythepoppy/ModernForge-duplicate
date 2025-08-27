import React from 'react';

const HomeSectionCard = ({ imageSrc, title, description }) => {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3">
      <div className="h-[13rem] w-[10rem]">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default HomeSectionCard;