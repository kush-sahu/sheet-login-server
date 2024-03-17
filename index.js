const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const EmployeeModel = require('./models/Employees');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'https://65f75fd5a4d565d6126a2f57--whimsical-daifuku-c61cd3.netlify.app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect("mongodb+srv://kushsahu144114:Q1aZGaVCJ9kAAje6@cluster0.peog2iz.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("the pass is incorrect");
        }
      } else {
        res.json("No record exist");
      }
    });
});

app.post('/register', (req, res) => {
  EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err));
});

// Server listening
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
