// models/Reservation.js
const mongoose =require( "mongoose");

const ReservationSchema = new mongoose.Schema({

  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  estimatedArrival: { type: String, enum: ["Morning", "Evening"], required: true },

  ownerInfo: {
    firstName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true }
  },

  catInfo: {
    catName: { type: String },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    numberOfCats: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    sterilized: { type: Boolean, required: true },
    vaccinationNotebook: { type: String, enum: ["Updated", "Not updated"], required: true },
    antiParasiteTreatment: { type: Boolean, required: true },
    lastTreatmentDate: { type: Date }
  },

  healthProblems: {
    type : String,
  },

  usualFood: {
    type: String,
  },

  specialNotes: { type: String },

  additionalServices: {
    cleaningDecorating: { type: Boolean, default: false },
    specialMedicalCare: { type: Boolean, default: false },
    sendPicturesVideos: { type: Boolean, default: false }
  },

},{timestamps: true});

module.exports = mongoose.model("Reservation", ReservationSchema);