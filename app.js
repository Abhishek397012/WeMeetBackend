const express = require('express');
const app = express();
const connectDB = require('./config/db')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Database Connection
connectDB();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

// Importing Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const wemeetRoutes = require('./routes/wemeet')

// Routes Middlewares
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wemeets", wemeetRoutes);

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

