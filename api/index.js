
// initialize libraries
const express = require("express");
const app = express(); // node js framework where app will run
const mongoose = require("mongoose"); // helps make mongo models such as users and posts
const dotenv = require("dotenv"); // helps encrypt urls, passwords..
const helmet = require("helmet"); // secure requests to server
const morgan = require("morgan"); // logging middleware, server request info
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
dotenv.config(); // configure confidential file
/*
mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("Connected to MongoDB database")
}); // use mongoose to connect to database; env.MONGO_URL is "secret" uri
*/


mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true}, () => {
      console.log("Connected to MongoDB database");
    }
  );

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute); //url for user route: http://localhost:8800/api/users
app.use("/api/auth",authRoute); //url for auth route: http://localhost:8800/api/auth
app.use("/api/posts",postRoute)

/*
app.get("/",(req, res)=>{ //testing sending something to server
    res.send("Welcome to Purdue Circle!!")
})

app.get("/users",(req, res)=>{ //testing sending something to server
    res.send("Welcome to user page!!")
})*/ //we are using rest api so will not be using this

app.listen(8800,()=>{ // listen to port
    console.log("Backend Server is Running")
});