import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineSupportAgent } from "react-icons/md";


const SupportPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://sri-gp-hardly-frog.trycloudflare.com/api/support', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || 'Your message has been sent! Our support team will reach out soon.');
                setFormData({ name: "", email: "", subject: "", message: "" }); // reset form
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
                <Link to="/" className="hover:underline">Home</Link> &gt; <span className="font-semibold">Customer Support</span>
            </div>

            <div className="max-w-4xl mx-auto px-6 bg-white shadow-md rounded-lg p-8">

                <div className="flex items-center justify-center mb-6">
                    <MdOutlineSupportAgent className="text-orange-500 w-12 h-12 mr-2" />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Contact Customer Support
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Have questions or need help? Fill out the form below and our team will
                    get back to you within 24–48 hours.
                </p>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Your full name"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="you@example.com"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Subject
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Order issue, product question, etc."
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Describe your issue or question..."
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
                        {loading ? "Sending..." : "Send Message"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default SupportPage;
