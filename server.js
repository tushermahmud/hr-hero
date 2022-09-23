const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute")
const app = express();

//app middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
//app middlewares

//app routers
app.get("/", (req, res) => {
  res.send("welcome to my kingdom");
});
app.use("/users", userRoute);
//app routers

const PORT = process.env.PORT || 4000;

mongoose
  .connect(
    "mongodb+srv://tusher:sazzadkueturp2k14@cluster0-jaavp.mongodb.net/hr-hero?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    app.listen(PORT, (req, res) => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
