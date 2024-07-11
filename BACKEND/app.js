//pswrd= 8HHrqj6xydPzcILd

const express = require("express");
const mongoose = require("mongoose");
const Vroute = require("./Routes/VarietyRoute");
const Proute = require("./Routes/PaddyRoute");
const Rroute = require("./Routes/RiceRoute");
const LocRoute = require("./Routes/LocationRoute");
const StoringRoute = require("./Routes/StoringRoute");
const PaddyWarehouse = require("./Routes/PaddyWarehouseRoute");
const InstructionRoute = require("./Routes/InstructionRoute");


//Tharaka
const bodyParser = require("body-parser"); // body-parser
const router = require("./Routes/productRoute");



//manoj
const router3 = require("./Routes/userRoute");
const router1 = require("./Routes/userRoute1");
const router2 = require("./Routes/userRoute2");




//nalinda
const userRoutes = require("./Routes/addeRouter"); 
const userRoutes1 = require("./Routes/salaryRouter"); 





//chathumin
const userRouter = require("./Routes/CusRoute"); // User routes
const orderRouter = require("./Routes/OrderRoute"); // Order routes
const issueRoutes = require('./Routes/IssueRoutes'); // Import routes for issues
const feedbackRouter = require("./Routes/FeedbackRoute"); // Feedback routes





//senuri





const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());
app.use("/varieties", Vroute);
app.use("/paddy", Proute);
app.use("/rice", Rroute);
app.use("/location", LocRoute);
app.use("/storingInst", StoringRoute);
app.use("/relationship", PaddyWarehouse);
app.use("/api",InstructionRoute);



















//Tharaka

app.use(bodyParser.json()); // Parse JSON bodies
app.use("/products", router);






























//manoj
app.use("/users10",router3);
app.use("/users1",router1);
app.use("/users2",router2);














































//nalinda
app.use("/eusers", userRoutes);
app.use("/saddusers", userRoutes1);













































































//chathumin
// User routes
app.use("/users", userRouter);

// Order routes
app.use("/orders", orderRouter);

//feedback routes
app.use("/feedbacks", feedbackRouter);

app.use('/issues', issueRoutes); // Route for issues









































































//senuri



































mongoose
  .connect(
    "mongodb+srv://tharaka:tharaka1234@salescluster.ahfgylg.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log);
