import React, { useState } from 'react';
import FAQData from "./PageData/FAQData";
import { FaRegQuestionCircle } from "react-icons/fa";


const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex items-center justify-center mb-6">
        <FaRegQuestionCircle className="text-orange-500 w-12 h-12 mr-2" />
      </div>
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {FAQData.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <button
              className="w-full text-left font-semibold"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
