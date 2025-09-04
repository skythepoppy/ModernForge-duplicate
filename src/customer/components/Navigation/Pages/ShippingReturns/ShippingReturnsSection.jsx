import React, { useState } from 'react';
import ShippingReturnsData from './PageData/ShippingReturnsData';


const ShippingReturnsSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleShippingReturns = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Shipping and Returns</h2>
      <div className="space-y-4">
        {ShippingReturnsData.map((shippingreturns, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <button
              className="w-full text-left font-semibold"
              onClick={() => toggleShippingReturns(index)}
            >
              {shippingreturns.heading}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-700">{shippingreturns.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingReturnsSection;
