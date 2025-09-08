import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBoxes } from "react-icons/fa";

const SupportPage = () => {
    const [formData, setFormData] = useState({
        businessName: "",
        businessType: "",
        contactName: "",
        email: "",
        phone: "",
        website: "",
        shippingAddress: "",
        billingAddress: "",
        taxId: "",
        estimatedOrderVolume: "",
        productInterest: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://3.15.174.1:5050/api/wholesale', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || 'Your message has been sent! Our team will reach out soon.');
                setFormData({
                    businessName: "",
                    businessType: "",
                    contactName: "",
                    email: "",
                    phone: "",
                    website: "",
                    shippingAddress: "",
                    billingAddress: "",
                    taxId: "",
                    estimatedOrderVolume: "",
                    productInterest: ""
                })
            } else {
                alert(data.message || 'Something went wrong. Please try again later.');
            }
        } catch (error) {
            alert('An error occurred while sending your message.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 pt-6 pb-12">
            {/* Breadcrumb */}
            <div className="max-w-7xl text-center mx-auto px-4 mb-2 text-gray-600 text-sm">
                <Link to="/" className="hover:underline">Home</Link> &gt; <span className="font-semibold">Wholesale</span>
            </div>

            <div className="max-w-4xl mx-auto px-6 bg-white shadow-md rounded-lg p-8">

                <div className="flex items-center justify-center mb-6">
                    <FaBoxes className="text-orange-500 w-12 h-12 mr-2" />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Wholesale Form
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Interested in ordering in bulk? Fill out the form below and our team will get back to you
                    in 24-48 hours regarding additional bulk-order details.
                </p>
                <p className="text-center text-gray-600 font-bold mb-8">
                    Notice: Wholesale form is limited to only one product of interest. If you have multiple products
                    of interest, you must fill out multiple forms.
                </p>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Business Name
                        </label>
                        <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Your business name"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Business Type
                        </label>
                        <input
                            type="text"
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Your business type"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Contact Name
                        </label>
                        <input
                            type="text"
                            name="contactName"
                            value={formData.contactName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Name of contact"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Business Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="you@company.com"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="(XXX) XXX - XXXX"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Website
                        </label>
                        <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Business Website"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Shipping Address
                        </label>
                        <input
                            type="text"
                            name="shippingAddress"
                            value={formData.shippingAddress}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="123 Main St, City, State, ZIP"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Billing Address
                        </label>
                        <input
                            type="text"
                            name="billingAddress"
                            value={formData.billingAddress}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="123 Main St, City, State, ZIP"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Tax ID
                        </label>
                        <input
                            type="text"
                            name="taxId"
                            value={formData.taxId}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter your Tax ID"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Product Interest
                        </label>
                        <input
                            type="text"
                            name="productInterest"
                            value={formData.productInterest}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter the product you are interested in."
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Estimated Order Volume
                        </label>
                        <input
                            type="number"
                            name="estimatedOrderVolume"
                            value={formData.estimatedOrderVolume}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter your desired number of units. If you have multiple products of 
                            interest, include a space after each number. Each number will be interpreted with respect to the order of your products of 
                            interest"
                            disabled={loading}
                        />
                    </div>


                    <button
                        type="submit"
                        className={`w-full font-bold py-3 rounded-lg focus:outline-none focus:ring-4 flex justify-center items-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
                            }`}
                        disabled={loading}
                    >
                        {loading && (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        )}
                        {loading ? "Sending..." : "Submit Inquiry"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default SupportPage;
