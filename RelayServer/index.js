// Example using Express.js
const express = require('express');

const app = express();

const logger = require('./utils/logger');

logger.print("Start--------------------------------------");

// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Include route files
const usersRoute = require('./routes/chain');
// Use routes
app.use('/', usersRoute);

// Example specifying the port and starting the server
const port = process.env.PORT || 3000; // You can use environment variables for port configuration
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
