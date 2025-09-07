import { useState } from "react";

export default function NewsletterPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const emailRegex = /\S+@\S+\.\S+/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- Validate email format ---
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
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to subscribe");

            setStatus("Subscribed successfully! Check your email for confirmation.");
            setEmail("");

            // Clear message after 4 seconds
            setTimeout(() => setStatus(""), 4000);
        } catch (err) {
            setStatus(err.message || "Error subscribing, try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2"
        >
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="border rounded p-2 flex-1"
            />
            <button
                type="submit"
                className={`bg-orange-500 text-white p-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
            >
                {loading ? "Subscribing..." : "Subscribe"}
            </button>
            {status && <p className="mt-2 text-sm text-orange-500">{status}</p>}
        </form>
    );
}
