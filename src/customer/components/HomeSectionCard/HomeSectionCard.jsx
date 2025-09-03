import React from 'react';

const HomeSectionCard = ({ imageSrc, title, brand, price, discountedPrice }) => {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3">
      <div className="h-[13rem] w-[10rem]">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-lg font-bold text-gray-900">{brand}</h3><h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {discountedPrice ? (
          <p className="mt-2 text-sm text-gray-500">
            <span className="line-through mr-2">${price.toFixed(2)}</span>
            <span className="text-orange-500">${discountedPrice.toFixed(2)}</span>
          </p>
        ) : (
          <p className="mt-2 text-sm text-gray-500">${price.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCard;
