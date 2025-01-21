const express = require('express');
const app = express();
const PORT=8886;

app.get("/ping",(req,res)=>{
    res.send("pong")
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})