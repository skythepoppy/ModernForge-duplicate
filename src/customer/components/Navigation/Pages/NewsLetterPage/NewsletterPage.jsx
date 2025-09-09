import React, { useState } from "react";
import { PiEnvelopeSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function NewsletterPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const emailRegex = /\S+@\S+\.\S+/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setStatus("Please enter your email");
            return;
        }
        if (!emailRegex.test(email)) {
            setStatus("Please enter a valid email");
            return;
        }

        setLoading(true);
        setStatus("");

        try {
            const res = await fetch("https://collaborative-hidden-competitions-taste.trycloudflare.com/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to subscribe");

            setStatus("Subscribed successfully! Check your email for confirmation.");
            setEmail("");
            setTimeout(() => setStatus(""), 4000);
        } catch (err) {
            setStatus(err.message || "Error subscribing, try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            {/* Breadcrumb */}
            <div className="max-w-7xl text-center mx-auto px-4 mb-2 text-gray-600 text-sm pb-8">
                <Link to="/" className="hover:underline">Home</Link> &gt; <span className="font-semibold">Newsletter</span>
            </div>

            <div className="max-w-4xl mx-auto px-6 bg-white shadow-md rounded-lg p-8">
                <div className="flex items-center justify-center mb-6">
                    <PiEnvelopeSimpleBold className="text-orange-500 w-12 h-12 mr-2" />
                </div>

                <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
                    Subscribe to our Weekly Newsletter
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Stay updated with the latest releases, exclusive deals, and DIY toy kits!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        disabled={loading}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full font-bold py-3 rounded-lg focus:outline-none focus:ring-4 flex justify-center items-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
                    >
                        {loading && (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                        )}
                        {loading ? "Subscribing..." : "Subscribe"}
                    </button>
                    {status && <p className="mt-2 text-sm text-orange-500">{status}</p>}
                </form>
            </div>
        </div>
    );
}
