const express = require('express');
const app = express();
const connectDB = require('./config/db')
require('dotenv').config();

// Database Connection
connectDB();

// Importing Routes
const userRoutes = require('./routes/user')
const wemeetRoutes = require('./routes/wemeet')

// Routes Middlewares
app.use(userRoutes);
app.use(wemeetRoutes);


const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

