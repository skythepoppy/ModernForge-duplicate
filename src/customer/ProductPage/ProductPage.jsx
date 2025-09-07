import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // DB column mapping
    const categoryMap = {
        airplane: "Aircrafts",
        ship: "Watercrafts",
        automobile: "Automobiles",
        programmable: "Programmables",
    };
    const statusMap = {
        active: "Active",
        new_release: "New Release",
    };

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch("http://localhost:5050/api/toys");
                const data = await response.json();

                const selectedProduct = data.find(
                    (item) => item.id.toString() === productId
                );

                setProduct(selectedProduct);
            } catch (error) {
                console.error("Error fetching product:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [productId]);

    if (loading) return <p className="p-6">Loading product...</p>;
    if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
    if (!product) return <p className="p-6">Product not found</p>;

    const { price, discountedPrice } = product;

    const handleAddToCart = async () => {
        try {
            const res = await fetch(`/api/cart`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product.id, quantity: 1 }),
            });
            if (!res.ok) throw new Error("Failed to add to cart");
            alert(`${product.item} added to cart`);
        } catch (err) {
            console.error(err);
            alert("Error adding to cart");
        }
    };

    const handleBuyNow = async () => {
        try {
            const res = await fetch(`/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: [{ productId: product.id, quantity: 1 }],
                }),
            });
            if (!res.ok) throw new Error("Failed to create order");
            const order = await res.json();
            alert(`Order #${order.id} placed successfully!`);
        } catch (err) {
            console.error(err);
            alert("Error placing order");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                    src={product.imageUrl}
                    alt={product.item}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Info */}
            <div>
                <h1 className="text-3xl font-bold">{product.item}</h1>

                {/* Price with optional discount slash */}
                {discountedPrice ? (
                    <p className="text-xl font-semibold text-gray-900 mt-2">
                        <span className="line-through mr-2">${price.toFixed(2)}</span>
                        <span className="text-orange-500">${discountedPrice.toFixed(2)}</span>
                    </p>
                ) : (
                    <p className="text-xl font-semibold text-gray-900 mt-2">
                        ${price.toFixed(2)}
                    </p>
                )}

                <p className="mt-4 text-gray-700">{product.description}</p>
                <p className="mt-2 text-gray-500">Brand: {product.brand}</p>
                <p className="mt-1 text-gray-500">
                    Category: {categoryMap[product.category] || product.category}
                </p>
                {product.status && (
                    <p className="mt-1 text-gray-500">
                        Status: {statusMap[product.status] || product.status}
                    </p>
                )}

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    <Button
                        variant="contained"
                        onClick={handleAddToCart}
                        sx={{
                            bgcolor: "#F97316",
                            color: "white",
                            "&:hover": { bgcolor: "#EA580C" },
                        }}
                    >
                        Add to Cart
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleBuyNow}
                    >
                        Buy Now
                    </Button>
                </div>

                {/* Reviews Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-3">Customer Reviews</h2>
                    <p className="text-gray-500">Reviews coming soon...</p>
                </div>
            </div>
        </div>
    );
}
