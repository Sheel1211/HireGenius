const express = require('express');
const app = express();
const cors = require('cors');
const Routes = require('./routes')
require('dotenv').config();
require('./config/db');

const hostname = process.env.HOST_NAME || "127.0.0.1";
const port = process.env.PORT || 4000;

app.use(
    cors({
        origin:'*'
    })
)

app.use(express.json());

app.get("/",(req,res)=>{
    res.send(`<h1>Hii I'm Running</h1>`);
})

app.use('/api',Routes)

app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})