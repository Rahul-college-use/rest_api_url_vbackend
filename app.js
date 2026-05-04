const expreess = require('express');
const app = expreess();
const cors =require('cors');
const connectdb = require('./config/db')
connectdb();

const dns = require('dns');
dns.setServers([
    '8.8.8.8',
    '1.1.1.1'
]);

app.use(cors());
app.use(expreess.json());

const userRouter = require('./routes/usersRoutes')


app.get('/',(req,res)=>{
    res.send("Hello System rest api")
})

app.use('/api/userRouter', userRouter)




app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

/*
1. REST API – Student Management System

Concept: Build an API to manage students (fits your current work too)

Features:

Add student (name, email, reg_no, dept, skills)
Get all students / single student
Update student
Delete student

Tech Stack:

Node.js + Express
MongoDB + Mongoose 
*/