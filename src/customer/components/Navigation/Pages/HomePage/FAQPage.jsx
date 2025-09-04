import { Link } from 'react-router-dom';
import FAQSection from './FAQSection';

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Breadcrumb */}
      <div className="max-w-7xl text-center mx-auto px-4 mb-6 text-gray-600 text-sm">
        <Link to="/" className="hover:underline">Home</Link> &gt; <span className="font-semibold">FAQs</span>
      </div>

     

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
};

export default FAQPage;
