import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function AddProductPage() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [available, setAvailable] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles].slice(0, 10));
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("description", description);
      // Ensure boolean goes as string for most backends:
      formData.append("available", String(available));
      images.forEach((image) => formData.append("image", image));

      await axios.post("http://localhost:3000/api/v1/products", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImages([]);
      setAvailable(true);

      toast.success(t("addProduct.toasts.success"));
    } catch (error) {
      toast.error(t("addProduct.toasts.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="max-w-3xl mx-auto p-8"
      style={{ fontFamily: "Kiwi Maru, serif" }}
    >
      <h1 className="text-2xl font-bold mb-6 p-4 rounded-t-lg">
        {t("addProduct.title")}
      </h1>

      <form
        onSubmit={addProduct}
        className="bg-white shadow-md rounded-lg p-6 space-y-6 border border-zinc-300"
      >
        {/* Name & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">
              {t("addProduct.labels.name")}
            </label>
            <input
              type="text"
              placeholder={t("addProduct.placeholders.name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg px-3 py-2 focus:outline-none ring-1 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              {t("addProduct.labels.price")}
            </label>
            <input
              type="number"
              placeholder={t("addProduct.placeholders.price")}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg px-3 py-2 focus:outline-none ring-1 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1">
            {t("addProduct.labels.description")}
          </label>
          <textarea
            placeholder={t("addProduct.placeholders.description")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-lg px-3 py-2 focus:outline-none ring-1 focus:ring-orange-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-1">
            {t("addProduct.labels.category")}
          </label>
          <input
            type="text"
            placeholder={t("addProduct.placeholders.category")}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg px-3 py-2 focus:outline-none ring-1 focus:ring-orange-400"
          />
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2">
          <input
            id="available"
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          <label htmlFor="available">
            {available
              ? t("addProduct.available")
              : t("addProduct.notAvailable")}
          </label>
        </div>

        {/* Images */}
        <div>
          <label className="block text-gray-700 mb-1">
            {t("addProduct.labels.images", { count: images.length })}
          </label>

          {/* Custom file upload button */}
          <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-orange-400 rounded-lg cursor-pointer text-orange-500 hover:bg-orange-50 transition">
            <span className="text-sm">{t("addProduct.uploadHint")}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* Previews */}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((file, index) => (
                <div
                  key={index}
                  className="relative border rounded-lg overflow-hidden group"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={t("addProduct.alt.preview", { index: index + 1 })}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                    aria-label={t("addProduct.removeImage")}
                    title={t("addProduct.removeImage")}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-400 transition"
        >
          {submitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            t("addProduct.submit")
          )}
        </button>
      </form>
    </div>
  );
}
