
const Reservation = require("../models/reservations.js");
const { StatusCodes } = require("http-status-codes");
const Settings = require("../models/Settings");
// Create new reservation
 const createReservation = async (req, res) => {
  const reservation = new Reservation(req.body);
  const settings = await Settings.findOne();
  if (settings && !settings.reservationsOpen) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: "Reservations are currently closed." });
  }
  await reservation.save();
  res.status(StatusCodes.CREATED).json({ reservation });
};

// Get all reservations
 const getReservations = async (req, res) => {
  const reservations = await Reservation.find().sort({ createdAt: -1 });
  res.json({ reservations });
};

// Get single reservation
 const getReservationById = async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: "Reservation not found" });
  }
  res.json({  reservation });
};

// Update reservation
 const updateReservation = async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!reservation) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Reservation not found" });
  }
  res.json({ success: true, reservation });
};

// Delete reservation
 const deleteReservation = async (req, res) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.id);
  if (!reservation) {
    return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: "Reservation not found" });
  }
  res.json({ success: true, message: "Reservation deleted" });
};

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation
};
