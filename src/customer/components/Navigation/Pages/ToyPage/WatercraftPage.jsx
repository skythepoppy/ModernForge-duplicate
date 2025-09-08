import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeSectionCard from "../../../HomeSectionCard/HomeSectionCard";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const WatercraftPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brandFilter, setBrandFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const products_per_page = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch watercraft products
  useEffect(() => {
    async function fetchWatercrafts() {
      try {
        const response = await fetch("https://sri-gp-hardly-frog.trycloudflare.com/api/toys");
        const data = await response.json();

        const watercrafts = data.filter((item) => item.category === "ship");
        setProducts(watercrafts);

        // Initialize price slider range based on watercraft prices
        if (watercrafts.length > 0) {
          const prices = watercrafts.map((p) => p.discountedPrice || p.price);
          setPriceRange([Math.min(...prices), Math.max(...prices)]);
        }
      } catch (error) {
        console.error("Error fetching watercraft products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWatercrafts();
  }, []);

  // Get unique brands for filter checkboxes
  const uniqueBrands = [...new Set(products.map((p) => p.brand))];

  // Filter products by price and brand
  const filteredProducts = products.filter((p) => {
    const price = p.discountedPrice || p.price;
    const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
    const inBrand = brandFilter.length === 0 || brandFilter.includes(p.brand);
    return inPriceRange && inBrand;
  });

  // sort-by logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discountedPrice || a.price;
    const priceB = b.discountedPrice || b.price;

    switch (sortBy) {
      case "priceLowHigh":
        return priceA - priceB;

      case "priceHighLow":
        return priceB - priceA;

      case "discounted":
        // Show discounted items first
        const isDiscountA = a.discountedPrice ? 1 : 0;
        const isDiscountB = b.discountedPrice ? 1 : 0;
        return isDiscountB - isDiscountA; // items with discount appear first

      case "rating":
        // Placeholder: will sort by rating when available
        return 0;

      default:
        return 0; // default order
    }
  })

  // product display limiter (8 per page)
  const totalPages = Math.ceil(sortedProducts.length / products_per_page);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * products_per_page,
    currentPage * products_per_page
  )


  if (loading) return <p className="text-center">Loading watercraft products...</p>;

  return (
    <div className="flex">

      {/* Product Grid */}
      <main className="flex-1 p-4 transition-all duration-300">
        <div className="max-w-7xl text-center mx-auto px-4 mb-2 text-gray-600 text-sm pb-8">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          &gt; <span className="font-semibold">Watercraft Products</span>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center pb-4">Watercraft Products</h1>

        {/* Total products + Sort dropdown */}
        <div className="flex justify-between items-center mb-4 max-w-7xl mx-auto px-4">
          {/* Total products counter */}
          <div className="text-gray-700 font-medium">
            {sortedProducts.length} {sortedProducts.length === 1 ? "Product" : "Products"}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center">
            <label className="mr-2 font-semibold">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded p-1"
            >
              <option value="default">Default</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="discounted">Discounted Items</option>
              <option value="rating">Rating</option> {/* placeholder */}
            </select>
          </div>
        </div>

        {/* divider */}
        <div className="border-t border-gray-300 mb-6 max-w-7xl mx-auto px-4"></div>

        {/* Sidebar + Grid container */}
        <div className="max-w-7xl mx-auto px-4 flex gap-6">
          {/* Sidebar */}
          <aside
            className={`bg-white border-r transition-all duration-300 relative ${isSidebarOpen ? "w-64 p-4" : "w-12 p-2"
              }`}
          >
            {/* Toggle icon */}
            <button
              className="absolute top-1/2 right-[-16px] transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow-md hidden md:flex items-center justify-center"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
            </button>

            {isSidebarOpen && (
              <>
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
                    min={Math.min(...products.map((p) => p.discountedPrice || p.price), 0)}
                    max={Math.max(...products.map((p) => p.discountedPrice || p.price), 100)}
                    value={priceRange}
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
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {paginatedProducts.length === 0 ? (
              <p>No watercraft products found.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-6">
                  {paginatedProducts.map((product) => (
                    <HomeSectionCard
                      key={product.id}
                      id={product.id}
                      imageSrc={product.imageUrl}
                      brand={product.brand}
                      title={product.item}
                      price={product.price}
                      discountedPrice={product.discountedPrice}
                      linkState={{
                        previousPageLabel: "Watercraft Products",
                        previousPagePath: "/watercrafts",
                      }}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {paginatedProducts.length > 0 && (
                  <div className="flex justify-center mt-6 space-x-2">
                    {/* back */}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                      Prev
                    </button>

                    {/* page numbers */}
                    {[...Array(totalPages)].map((_, idx) => {
                      const page = idx + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 border rounded ${page === currentPage ? "bg-orange-500 text-white" : ""
                            }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    {/* next */}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>


      </main>
    </div>
  );
};

export default WatercraftPage;
