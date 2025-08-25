import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProduct(response.data.product);

        if (response.data.product?.image?.length > 0) {
          setSelectedImage(response.data.product.image[0].url);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDeleteProduct = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/dashboard/AdminProducts");
    } catch (error) {
      alert("Error deleting product.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6" style={{ fontFamily: "Kiwi Maru, serif" }}>
      <div className="bg-white shadow-xl rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-semibold text-orange-600">Product Details</h1>
          <Link
            to="/dashboard/adminProducts"
            className="text-sm text-orange-500 hover:underline"
          >
            Retour Vers la liste des produits
          </Link>
        </div>

        <div className="flex space-x-8">
          {/* Image gallery */}
          <div className="w-1/3">
            <div className="mb-4 bg-gray-200 rounded-xl h-80 flex items-center justify-center overflow-hidden">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product?.name}
                  className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-300 ease-in-out"
                />
              ) : (
                <span className="text-gray-500">No image available</span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product?.image?.map((img, index) => (
                <div
                  key={index}
                  className={`bg-gray-200 rounded-lg h-24 flex items-center justify-center shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer overflow-hidden 
                  ${selectedImage === img.url ? "ring-2 ring-orange-500" : ""}`}
                  onClick={() => setSelectedImage(img.url)}
                >
                  <img
                    src={img.url}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="w-2/3">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{product?.name}</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{product?.description}</p>
            <div className="text-sm text-gray-600 mb-4">
              <span className="font-semibold text-gray-800">Category:</span>{" "}
              {product?.category}
            </div>
            <div className="text-sm text-gray-600 mb-6">
              <span className="font-semibold text-gray-800">Product ID:</span>{" "}
              {product?._id}
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-semibold text-orange-600">
                {product?.price} DZD
              </span>
            </div>
            <div className="flex space-x-6">
              <Link
                to={`/dashboard/AdminProducts/edit/${product?._id}`}
                className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition duration-200"
              >
                Modifier produit
              </Link>
              <button
                onClick={handleDeleteProduct}
                disabled={isDeleting}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition duration-200 flex items-center"
              >
                {isDeleting ? (
                  <div className="spinner small mr-2"></div>
                ) : null}
                Supprimer le produit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetails;
