import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeSectionCard from "../../../HomeSectionCard/HomeSectionCard";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// mapping DB categories
const dbToLabelMap = {
  airplane: "Aircrafts",
  ship: "Watercrafts",
  automobile: "Automobiles",
  programmable: "Programmables",
};

// reverse map for filter clicks
const labelToDbMap = {
  All: null,
  Aircrafts: "airplane",
  Watercrafts: "ship",
  Automobiles: "automobile",
  Programmables: "programmable",
};

// deterministic shuffle based on a seed
function seededShuffle(array, seed) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const WeeklyDealsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [brandFilter, setBrandFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    async function fetchDeals() {
      try {
        const response = await fetch("http://localhost:5050/api/toys");
        const data = await response.json();

        const discounted = data.filter((item) => item.discountedPrice);

        const now = new Date();
        const daysSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));
        const periodIndex = Math.floor(daysSinceEpoch / 3);

        const weeklyDeals = seededShuffle(discounted, periodIndex).slice(0, 8);
        setProducts(weeklyDeals);

        const prices = weeklyDeals.map((p) => p.discountedPrice || p.price);
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

  useEffect(() => setCategoryFilter(null), []);

  const filteredProducts = products.filter((p) => {
    const inCategory = !categoryFilter || p.category === categoryFilter;
    const inBrand = brandFilter.length === 0 || brandFilter.includes(p.brand);
    const price = p.discountedPrice || p.price;
    return inCategory && inBrand && price >= priceRange[0] && price <= priceRange[1];
  });

  const uniqueBrands = [...new Set(products.map((p) => p.brand))];
  const availableCategories = Array.from(new Set(products.map((p) => p.category)));
  const categoryButtons = ["All", ...availableCategories.map((cat) => dbToLabelMap[cat])];

  if (loading) return <p className="text-center">Loading weekly deals...</p>;

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <aside
        className={`bg-white border-r transition-all duration-300 relative
          ${isSidebarOpen ? "w-64 p-4" : "w-12 p-2"}`}
      >

        {/* Toggle icon for desktop */}
        <button
          className="absolute top-1/2 right-[-16px] transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow-md hidden md:flex items-center justify-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
        </button>

        {isSidebarOpen && (
          <>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Category</h3>
              <ul className="space-y-2">
                {categoryButtons.map((label) => (
                  <li key={label}>
                    <button
                      onClick={() => setCategoryFilter(labelToDbMap[label])}
                      className={`w-full text-left hover:underline ${categoryFilter === labelToDbMap[label] ? "font-bold" : ""
                        }`}
                    >
                      {label}
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
                trackStyle={[{ backgroundColor: "#f97316" }, { backgroundColor: "#f97316" }]}
                railStyle={{ backgroundColor: "#d1d5db" }}
                handleStyle={[
                  { borderColor: "#f97316", backgroundColor: "#f97316" },
                  { borderColor: "#f97316", backgroundColor: "#f97316" },
                ]}
              />
              <p className="mt-2">
                ${priceRange[0]} – ${priceRange[1]}
              </p>
            </div>
          </>
        )}
        {!isSidebarOpen && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-xs" />
        )}
      </aside>

      {/* Product Grid */}
      <main className="flex-1 p-4 transition-all duration-300">
        <div className="max-w-7xl text-center mx-auto px-4 mb-2 text-gray-600 text-sm pb-8">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          &gt; <span className="font-semibold">Weekly Deals</span>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center pb-4">Weekly Deals</h1>

        {filteredProducts.length === 0 ? (
          <p>No discounted products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
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
