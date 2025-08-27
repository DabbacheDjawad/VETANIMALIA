require("dotenv").config();
require("express-async-errors");

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

//express
const express = require("express");
const app = express();
//port
const port = process.env.PORT || 3000;

//connect DB
const connectDB = require("./db/connect");

//auth middleware
const {authMiddleware , adminAuth} = require("./middleware/authentication");

//routes
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const appointmentsRouter = require("./routes/appointments");
const dashboardRouter = require("./routes/Latest");
const reservationRouter = require("./routes/reservations");
const settingsRouter = require("./routes/settings");


//error handler middleware
const errorHandlerMiddleware = require("./middleware/errorHandler");
const notFound = require("./middleware/not-found");



app.get("/" , (req , res)=>{
    res.send("VETANIMALIA")
})

app.use(express.json())


//security packages
app.use(rateLimit({
    windowMs : 15*60*1000,
    max : 100,
  }));
  app.use(helmet());
  app.use(cors());
  app.use(xss());

//routes
app.use("/api/v1/auth" ,authRouter);
app.use("/api/v1/users" ,authMiddleware ,usersRouter);
app.use("/api/v1/products" , productsRouter);
app.use("/api/v1/orders" ,ordersRouter);
app.use("/api/v1/appointments", authMiddleware, appointmentsRouter);
app.use("/api/v1/dashboard", authMiddleware, adminAuth, dashboardRouter);
app.use("/api/v1/reservations",reservationRouter);
app.use("/api/v1/settings", settingsRouter);

//error handler middleware
app.use(errorHandlerMiddleware);
app.use(notFound);

const start = async()=>{
  try{
    await connectDB(process.env.MONGO_URI);
    app.listen(3000 , ()=>{console.log(`listening to port ${port}`)})
  }catch(error){
    console.log(error);
  }
}
start();
