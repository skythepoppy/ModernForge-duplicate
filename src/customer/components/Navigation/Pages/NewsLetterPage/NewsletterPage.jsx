import { useState } from "react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to subscribe");
      setStatus("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("Error subscribing, try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="border rounded p-2 flex-1"
      />
      <button type="submit" className="bg-orange-500 text-white p-2 rounded">
        Subscribe
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </form>
  );
}
