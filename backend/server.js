const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

// init app
const app = express();

// setting middleware
app.use(express.json());

// connect with mongodb
const uri = process.env.MONGODB_URI || keys.MONGODB_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`Database connection successful...`);
  })
  .catch((err) => {
    console.log(`Error connecting MongoDB :: ${err}`);
  });

// Step 1 :: Manage PG, Configure PG
//app.use("/api/resources/manage", require("./routes/api/Manage.router"));
app.use("/api/resources", require("./routes/api/Resources.route"));

// PORT setup
const PORT = process.env.PORT || 5000;

// use available server port or use 5000
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
