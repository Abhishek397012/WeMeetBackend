const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// App
const app = express();

// Importing Routes
const userRoutes = require('./routes/user')
const wemeetRoutes = require('./routes/wemeet')

// Routes Middlewares
app.use(userRoutes);
app.use(wemeetRoutes);

// Database Connection
mongoose.connect( process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
).then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
console.log(`DB connection error: ${err.message}`)
});

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

