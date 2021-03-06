const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');


//Load env vars
dotenv.config({path:'./config/config.env'});

// Connect to database
connectDB(); 

// Route files
const links = require('./routes/links');


const app = express();


/* // Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} */

// Mount routers
app.use('/api/v1/links', links);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //close server and exit process
    server.close(() => process.exit(1))
});