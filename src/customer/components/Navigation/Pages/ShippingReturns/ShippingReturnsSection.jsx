import React, { useState } from 'react';
import ShippingReturnsData from './ShippingReturnsData/ShippingReturnsData';
import { FaShippingFast } from "react-icons/fa";

const ShippingReturnsSection = () => {
  const [openIndexes, setOpenIndexes] = useState({}); // Track open items per section

  const toggleItem = (sectionIndex, itemIndex) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [sectionIndex]: prev[sectionIndex] === itemIndex ? null : itemIndex,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-12">

      <div className="flex items-center justify-center mb-6">
        <FaShippingFast className="text-orange-500 w-12 h-12 mr-2" />
      </div>

      <h2 className="text-3xl font-bold text-center mb-8">Shipping and Returns</h2>

      {ShippingReturnsData.map((section, sectionIndex) => (
        <div key={section.type} className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">{section.title}</h3>
          <div className="space-y-4">
            {section.content.map((item, itemIndex) => (
              <div key={item.heading} className="border rounded-lg p-4 shadow-md">
                <button
                  className="w-full text-left font-semibold"
                  onClick={() => toggleItem(sectionIndex, itemIndex)}
                >
                  {item.heading}
                </button>
                {openIndexes[sectionIndex] === itemIndex && (
                  <p className="mt-2 text-gray-700">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShippingReturnsSection;
