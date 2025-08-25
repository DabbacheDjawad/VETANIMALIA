import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import SideBar from "../component/sidebar";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AdminProducts() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/products");
      const list = response?.data?.products ?? [];
      setProducts(list);
      setFilteredProducts(list);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(t("adminProducts.toasts.fetchError"));
    } finally {
      setLoading(false);
    }
  };

  // Filter Products when searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const q = searchTerm.toLowerCase();
      setFilteredProducts(
        products.filter((p) => (p.name || "").toLowerCase().includes(q))
      );
    }
  }, [searchTerm, products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete Product
  const handleDeleteProduct = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setFilteredProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success(t("adminProducts.toasts.deleted"));
    } catch (error) {
      toast.error(t("adminProducts.toasts.deleteError"));
    }finally{
      setDeletingId(null);
    }
  };

  const currency = t("products.currency");

  // Loader UI
  if (loading) {
    return (
      <div className="flex h-screen w-full justify-center items-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-full w-[90%] ml-[5%] bg-gray-50"
      style={{ fontFamily: "Kiwi Maru, serif" }}
    >
      <SideBar />
      <main className="flex-1 p-4 md:p-6">
        {/* Header + Add Product */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-0">
            {t("adminProducts.title")}
          </h3>
          <Link
            to={"/dashboard/AdminProducts/add"}
            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md"
          >
            {t("adminProducts.add")}
          </Link>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder={t("adminProducts.searchPlaceholder")}
          className="w-full mb-6 p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label={t("adminProducts.searchAria")}
        />

        {/* Products Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <li
              key={p._id}
              className="h-[500px] bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <Link className="h-[300px]" to={`/dashboard/AdminProducts/${p._id}`}>
                <img
                  src={p?.image?.[0]?.url || ""}
                  alt={p?.name || t("adminProducts.alt.product")}
                  height={200}
                  width={200}
                  className="object-cover h-full w-full"
                />
              </Link>
              <div className="flex-1 h-fit">
                <h4 className="text-lg font-semibold mb-2">{p.name}</h4>
                <p className="text-sm text-gray-500 mb-1">
                  {t("adminProducts.labels.category")}: {p.category}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  {t("adminProducts.labels.price")}: {p.price} {currency}
                </p>
                <p className="text-sm text-gray-500">
                  {t("adminProducts.labels.stock")}: {p.available ? "Disponible" : "Indisponible"}
                </p>
              </div>
              <div className="mt-4 flex space-x-2">
                <Link
                  to={`/dashboard/AdminProducts/edit/${p._id}`}
                  className="text-orange-400 hover:text-orange-600"
                  aria-label={t("adminProducts.a11y.edit", { name: p.name })}
                  title={t("adminProducts.a11y.edit", { name: p.name })}
                >
                  <FaEdit />
                </Link>
                <button
                  className="text-red-400 hover:text-red-600"
                  onClick={() => handleDeleteProduct(p._id)}
                  aria-label={t("adminProducts.a11y.delete", { name: p.name })}
                  title={t("adminProducts.a11y.delete", { name: p.name })}
                >
                  {deletingId === p._id ? (
  <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
) : (
  <FaTrash />
)}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
