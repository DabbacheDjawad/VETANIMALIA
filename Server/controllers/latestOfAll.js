const{ StatusCodes }= require("http-status-codes");
const User = require("../models/users");
const Appointment = require('../models/appointments');
const Order = require("../models/orders");
const Product = require("../models/products");

const getDashboardData = async (req, res) => {
  const [users, products, orders, appointments] = await Promise.all([
    User.find().sort({ createdAt: -1 }).limit(5),
    Product.find().sort({ createdAt: -1 }).limit(5),
    Order.find()
      .populate("user", "name email phone")
      .populate("products.product", "name")
      .sort({ createdAt: -1 })
      .limit(4),
    Appointment.find().sort({ createdAt: -1 }).limit(5),
  ]);

  res.status(StatusCodes.OK).json({
    latestUsers: { data: users, count: users.length },
    latestProducts: { data: products, count: products.length },
    latestOrders: { data: orders, count: orders.length },
    latestAppointments: { data: appointments, count: appointments.length },
  });
};


const getDashboardStats = async (req, res) => {
  const [userCount, productCount, orderCount, appointmentCount] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
    Appointment.countDocuments(),
  ]);

  res.status(StatusCodes.OK).json({
    totalUsers: userCount,
    totalProducts: productCount,
    totalOrders: orderCount,
    totalAppointments: appointmentCount,
  });
};


module.exports = {
  getDashboardData,
  getDashboardStats
};