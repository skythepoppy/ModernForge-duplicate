import React, { useState } from "react";

const SupportPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you’d send formData to your backend / email service (e.g. Nodemailer, SendGrid, etc.)
        console.log("Form submitted:", formData);
        alert("Your message has been sent! Our support team will reach out soon.");
        setFormData({ name: "", email: "", subject: "", message: "" }); // reset form
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-6 bg-white shadow-md rounded-lg p-8">
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
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SupportPage;
