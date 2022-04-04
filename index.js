const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/nodejs",{
    useNewUrlParser: true
})
.then(()=>{
    const app = express();
    app.use(bodyParser.json());

    app.use("/api", routes);

    app.listen(8000, ()=>{
        console.log("Server is started on port")
    })
})
.catch(error=>console.log(error))