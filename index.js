const express=require("express")
const mongoose=require('mongoose')
const cors=require("cors")
const EmployeeModel=require('./models/Employees')
const app=express()
const PORT=process.env.PORT || 3001 
app.use(express.json())
app.use(cors(
  // {
  //   origin: ["https://65f89a2865bdaa1a01b4db75--unique-gaufre-b57be4.netlify.app"],
  //   methods:["POST","GET"],
  //   credentials:true
  // }
));

// mongoose.connect("mongodb://127.0.0.1:27017/employee");
mongoose.connect("mongodb+srv://kushsahu144114:Q1aZGaVCJ9kAAje6@cluster0.peog2iz.mongodb.net/");
// 
app.get("/" , (req,res)=>{
  res.json("hello");
})

app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json("Success")
            }else {
                res.json("the pass is incorrect")
            }
        }else{
            res.json("No record exist")
        }
    })
})

app.post('/register',(req,res)=>{
   EmployeeModel.create(req.body)
   .then(employees=>res.json(employees))
   .catch(err=>res.json(err))
})
app.listen(PORT,()=>{
    console.log("server is running")
})
