// const express=require("express")
// const mongoose=require('mongoose')
// const cors=require("cors")
// const EmployeeModel=require('./models/Employees')
// const app=express()
// const PORT=process.env.PORT || 3001 

// app.use(cors(
//   {
//     origin: ["https://65f89a2865bdaa1a01b4db75--unique-gaufre-b57be4.netlify.app"],
//     method:["POST","GET"],
//     credentials:true
//   }
// ));
// app.use(express.json())
// // mongoose.connect("mongodb://127.0.0.1:27017/employee");
// mongoose.connect("mongodb+srv://kushsahu144114:Q1aZGaVCJ9kAAje6@cluster0.peog2iz.mongodb.net/");
// // 
// app.get("/" , (req,res)=>{
//   res.json("hello");
// })

// app.post("/login",(req,res)=>{
//     const {email,password}=req.body;
//     EmployeeModel.findOne({email:email})
//     .then(user=>{
//         if(user){
//             if(user.password===password){
//                 res.json("Success")
//             }else {
//                 res.json("the pass is incorrect")
//             }
//         }else{
//             res.json("No record exist")
//         }
//     })
// })

// app.post('/register',(req,res)=>{
//    EmployeeModel.create(req.body)
//    .then(employees=>res.json(employees))
//    .catch(err=>res.json(err))
// })
// app.listen(PORT,()=>{
//     console.log("server is running")
// })


const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const EmployeeModel = require('./models/Employees');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ["https://65f89a2865bdaa1a01b4db75--unique-gaufre-b57be4.netlify.app"],
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit with failure
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json("No record exists");
      }
      // Implement password hashing and comparison here
      if (user.password === password) {
        res.json("Success");
      } else {
        res.status(401).json("Incorrect password");
      }
    })
    .catch(err => {
      console.error("Login error:", err);
      res.status(500).json("Internal Server Error");
    });
});

app.post('/register', (req, res) => {
  EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => {
      console.error("Registration error:", err);
      res.status(500).json("Internal Server Error");
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

