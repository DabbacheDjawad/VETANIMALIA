import React, { useState, useEffect } from "react";
import { FaDollarSign, FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";
import SideBar from "../component/sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [latestUsers, setLatestUsers] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);
  const [latestAppointments, setLatestAppointments] = useState([]);

  const [userStats, setUserStats] = useState(0);
  const [productStats, setProductStats] = useState(0);
  const [orderStats, setOrderStats] = useState(0);
  const [appointmentStats, setAppointmentStats] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardData, dashboardStats] = await Promise.all([
          axios.get("http://localhost:3000/api/v1/dashboard", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get("http://localhost:3000/api/v1/dashboard/stats", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
        ]);

        setLatestUsers(dashboardData.data.latestUsers.data);
        setLatestProducts(dashboardData.data.latestProducts.data);
        setLatestOrders(dashboardData.data.latestOrders.data);
        setLatestAppointments(dashboardData.data.latestAppointments.data);

        setUserStats(dashboardStats.data.totalUsers);
        setProductStats(dashboardStats.data.totalProducts);
        setOrderStats(dashboardStats.data.totalOrders);
        setAppointmentStats(dashboardStats.data.totalAppointments);
      } catch (err) {
        setError("Erreur de récupération des données du tableau de bord");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-600",
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
  };

  const dashboardItems = [
    { id: 1, label: "Utilisateurs", value: userStats, icon: <FaUsers /> },
    { id: 2, label: "Produits", value: productStats, icon: <FaBox /> },
    { id: 3, label: "Commandes", value: orderStats, icon: <FaShoppingCart /> },
    { id: 4, label: "Rendez-vous", value: appointmentStats, icon: <FaDollarSign /> },
  ];

  if (loading) {
    return (
      <div className="flex h-screen w-full justify-center items-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-row md:flex-row" style={{ fontFamily: "Kiwi Maru, serif" }}>
      <SideBar />
      <main
        className={`p-4 md:p-6 space-y-6 max-sm:ml-0 w-[90%] ${
          i18n.language === "ar" ? "md:mr-20 max-md:mr-10" : "md:ml-20 max-md:ml-10"
        }`}
      >
        {error ? (
          <div className="rounded-lg bg-red-50 text-red-700 p-3 border border-red-200">
            {error}
          </div>
        ) : (
          <>
            {/* Stats Section */}
            <section aria-labelledby="dashboard-stats">
              <h2 id="dashboard-stats" className="sr-only">
                {t("dashboard.a11y.stats")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardItems.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="p-4 rounded-full bg-orange-50 text-orange-500 text-xl">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="text-2xl font-bold">{item.value}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Orders Section */}
            <section className="w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-hidden p-4 max-lg:w-full">
              <header className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t("dashboard.sections.recentOrders")}</h2>
                <Link
                  to="/dashboard/orders"
                  className="text-sm text-white bg-orange-500 px-3 py-1 rounded hover:bg-orange-600"
                >
                  {t("dashboard.actions.viewAll")}
                </Link>
              </header>

              <div className="flex max-lg:flex-col gap-4">
                {latestOrders.map((order) => (
                  <div
                    key={order._id}
                    className="min-w-[250px] bg-gray-50 rounded-lg p-3 shadow hover:shadow-md flex-shrink-0"
                  >
                    <h3 className="font-bold truncate">#{order._id}</h3>
                    <p className="text-sm text-gray-600 truncate">
                      {t("dashboard.labels.client")}: {order.customer ? order.customer.name : t("dashboard.labels.guest")}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {t("dashboard.labels.products")}:{" "}
                      {(order.products || []).map((p) => p.product?.name).filter(Boolean).join(", ")}
                    </p>
                    <p className="text-sm text-gray-800 font-medium">
                      {(order.totalAmount ?? 0).toFixed(2)} DZD
                    </p>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        statusColors[order.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {t(`dashboard.status.${order.status}`, order.status)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Users Section */}
            <section className="w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto p-4 mt-6">
              <header className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t("dashboard.sections.recentUsers")}</h2>
                <Link
                  to="/dashboard/users"
                  className="text-sm text-white bg-orange-500 px-3 py-1 rounded hover:bg-orange-600"
                >
                  {t("dashboard.actions.viewAll")}
                </Link>
              </header>

              <div className="flex gap-4 max-lg:flex-col">
                {latestUsers.map((user) => (
                  <div
                    key={user._id}
                    className="min-w-[200px] bg-gray-50 rounded-lg p-3 shadow hover:shadow-md flex-shrink-0"
                  >
                    <h3 className="font-bold truncate">{user.name}</h3>
                    <p className="text-sm text-gray-600 truncate">
                      {t("dashboard.labels.email")}: {user.email}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {t("dashboard.labels.role")}: {user.role}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Products Section */}
            <section className="w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto p-4 mt-6">
              <header className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t("dashboard.sections.recentProducts")}</h2>
                <Link
                  to="/dashboard/AdminProducts"
                  className="text-sm text-white bg-orange-500 px-3 py-1 rounded hover:bg-orange-600"
                >
                  {t("dashboard.actions.viewAll")}
                </Link>
              </header>

              <div className="flex gap-4 max-lg:flex-col justify-center">
                {latestProducts.map((product) => (
                  <div
                    key={product._id}
                    className="min-w-[200px] flex gap-5 bg-gray-50 p-3 shadow hover:shadow-md flex-shrink-0"
                  >
                    <img
                      src={product?.image?.[0]?.url || ""}
                      alt={product?.name || t("dashboard.alt.product")}
                      height={70}
                      width={70}
                      className="border border-orange-500 rounded-lg"
                    />
                    <div>
                      <h3 className="font-bold truncate">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {t("dashboard.labels.price")}: {product.price} DZD
                      </p>
                      <p className="text-sm text-gray-600">
                        {t("dashboard.labels.stock")}: {product.stock}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
