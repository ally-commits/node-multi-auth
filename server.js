const express = require('express');
const mongoose = require('mongoose'); 
const authRoute = require("./routes/authRoute")
const agentRoute = require("./routes/agentRoute")
const customerRoute = require("./routes/customerRouter")
const adminRoute = require("./routes/adminRoute")

const {checkPermission} = require("./middleware/checkPermission")

const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.static('public'));
app.use(express.json()); 
 
const PORT = 9000;

const dbURI = 'mongodb+srv://ally:Asd@1234@cluster0.e694a.mongodb.net/red-carpet?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then((result) => {
    app.listen(PORT,() => {
        console.log("Application Started in Port "+ PORT)
    })
})
.catch((err) => console.log(err));
 

// ROUTES

app.use("/api/auth",authRoute);


app.use("/api/agent/",checkPermission("AGENT"),agentRoute);
app.use("/api/customer",checkPermission("CUSTOMER"),customerRoute)
app.use("/api/admin",checkPermission("ADMIN"),adminRoute)
