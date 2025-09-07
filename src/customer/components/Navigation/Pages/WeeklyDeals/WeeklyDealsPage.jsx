import React, { useState, useEffect } from "react";
import HomeSectionCard from "../../../HomeSectionCard/HomeSectionCard";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const WeeklyDealsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]); 

  useEffect(() => {
    async function fetchDeals() {
      try {
        const response = await fetch("http://localhost:5050/api/toys");
        const data = await response.json();

        // only toys that have a discountedPrice
        const discounted = data.filter((item) => item.discountedPrice);

        setProducts(discounted);

        // dynamically set price range
        const prices = discounted.map((p) => p.discountedPrice || p.price);
        if (prices.length > 0) {
          setPriceRange([Math.min(...prices), Math.max(...prices)]);
        }

      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDeals();
  }, []);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const inCategory =
      categoryFilter === "All" || p.category === categoryFilter;

    const inBrand =
      brandFilter.length === 0 || brandFilter.includes(p.brand);

    const price = p.discountedPrice || p.price;
    const inPrice = price >= priceRange[0] && price <= priceRange[1];

    return inCategory && inBrand && inPrice;
  });

  // Collect unique brands
  const uniqueBrands = [...new Set(products.map((p) => p.brand))];

  if (loading) return <p className="text-center">Loading weekly deals...</p>;

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <aside className="w-1/4 p-4 border-r hidden md:block">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Category</h3>
          <ul className="space-y-2">
            {["All", "Beyblades", "Accessories", "Collectibles"].map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setCategoryFilter(cat)}
                  className={`w-full text-left hover:underline ${
                    categoryFilter === cat && "font-bold"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Brands</h3>
          {uniqueBrands.map((brand) => (
            <label key={brand} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={brandFilter.includes(brand)}
                onChange={() => {
                  if (brandFilter.includes(brand)) {
                    setBrandFilter(brandFilter.filter((b) => b !== brand));
                  } else {
                    setBrandFilter([...brandFilter, brand]);
                  }
                }}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <Slider
            range
            min={0}
            max={Math.max(...products.map((p) => p.discountedPrice || p.price), 100)}
            defaultValue={priceRange}
            onChange={(val) => setPriceRange(val)}
          />
          <p className="mt-2">
            ${priceRange[0]} – ${priceRange[1]}
          </p>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-6">Weekly Deals</h1>
        {filteredProducts.length === 0 ? (
          <p>No discounted products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <HomeSectionCard
                key={index}
                imageSrc={product.imageUrl}
                brand={product.brand}
                title={product.item}
                price={product.price}
                discountedPrice={product.discountedPrice}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default WeeklyDealsPage;
