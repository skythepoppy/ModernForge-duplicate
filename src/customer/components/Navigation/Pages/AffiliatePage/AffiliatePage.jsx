import React, { useState } from "react";
import { PiHandCoinsBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const AffiliatePage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        website: "",
        audienceSize: "",
        niche: "",
        comments: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5050/api/affiliate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || 'Your message has been sent! Our affiliate team will reach out soon.');
                setFormData({ name: "", email: "", website: "", audienceSize: "", niche: "", comments: "" }); // reset form
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
                <Link to="/" className="hover:underline">Home</Link> &gt; <span className="font-semibold">Affliate Partner</span>
            </div>

            <div className="max-w-4xl mx-auto px-6 bg-white shadow-md rounded-lg p-8">
                <div className="flex items-center justify-center mb-6">
                    <PiHandCoinsBold className="text-orange-500 w-12 h-12 mr-2" />
                </div>
                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Become an Affiliate Partner with us!
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Are you a content creator? Earn money by showing your audience where to get authentic DIY
                    toy kits!
                </p>
                <p className="text-center font-bold text-gray-600 mb-8">
                    Earn money and exclusive news regarding the latest releases.
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
                            Website/Content Creation Link
                        </label>
                        <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter your link here"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Audience Size
                        </label>
                        <input
                            type="number"
                            name="audienceSize"
                            value={formData.audienceSize}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter your estimated audience size"
                            disabled={loading}
                        />

                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Niche
                        </label>
                        <textarea
                            name="niche"
                            value={formData.niche}
                            onChange={handleChange}
                            rows="6"
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Describe your adience, content focus, and what makes your niche unique."
                            disabled={loading}
                        />

                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Comments
                        </label>
                        <textarea
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            rows="5"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Any additional comments you'd like to add."
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
                        {loading ? "Sending..." : "Apply"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AffiliatePage;
