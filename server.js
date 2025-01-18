const express = require('express');
const app = express();
const PORT=8884;

app.get("/ping",(req,res)=>{
    res.send("pong")
})