import React, { useEffect, useState } from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import searchImage from "../photo/products/searchImage.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { t } = useTranslation();
  const i18n = useTranslation().i18n;
  const [activeCategory, setActiveCategory] = useState("tous");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = ["tous", "chiens", "chats", "oiseaux", "jeux", "accessoires", "nourriture"];

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Filtering logic for category + search
  useEffect(() => {
    let filtered = products;

    // Category filter
    if (activeCategory !== "tous") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, activeCategory, products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className={`max-w-full mx-auto px-6 py-10 flex justify-center flex-col items-center mt-[-100px] ${i18n.language === "fr" ? "" : "mr-16"}`}
      style={{ fontFamily: "Kiwi Maru, serif" }}
    >
      {/* Title & Image */}
      <div className="text-center mb-[-15px] flex flex-row items-center justify-center w-[60%] gap-40">
        <h2 className="text-5xl tracking-wide text-shadow-sm text-shadow-gray-500 max-sm:hidden">
          {t("products.title")}
        </h2>
        <img
          src={searchImage}
          alt={t("products.searchImageAlt")}
          className="h-69 m-0 mb-[-30px] object-contain"
        />
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-center w-full mb-8">
        <div className="flex items-center mainOrange rounded-full px-5 py-3 w-full max-w-2xl shadow-md">
          <FaSearch className="text-black text-lg mr-3" />
          <input
            type="text"
            placeholder={t("products.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder-white text-white text-sm"
          />
          <div className="border-l border-white pl-3">
            <FaSlidersH className="text-white text-lg cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-l-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1 p-2 rounded-full ml-3 text-sm transition-colors ${
              activeCategory === cat
                ? "mainOrange text-white"
                : "text-black hover:bg-orange-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-15">
          {filteredProducts.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id}>
              <div className="rounded-2xl w-[90%] overflow-hidden shadow-lg border border-gray-600 hover:shadow-xl transition-shadow">
                <div className="bg-white flex items-center justify-center p-6">
                  <img
                    src={product.image[0].url}
                    alt={product.name}
                    className="h-40 object-contain"
                  />
                </div>
                <div className="mainOrange text-black p-4">
                  <p className="font-bold text-lg">
                    {product.price} {t("products.currency")}
                  </p>
                  <p className="text-sm leading-snug">{product.name}</p>
                  <p className="text-xs mt-1 text-gray-700">
                    {t("products.category")}: {product.category}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          {t("products.noProducts")}
        </p>
      )}
    </div>
  );
}
