const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// App
const app = express();

// Database Connection
mongoose.connect( process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
).then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
console.log(`DB connection error: ${err.message}`)
});

// Routes 
app.get("/", (req, res) => {
    res.send("Hello from Node")
})

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

