const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const crudRoute = require('./routes/crudRoutes');
const path = require('path');

const app = express(); 
dotenv.config();

app.use(cors()); // to allow cross-origin requests
app.use(express.json()); // to parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: false })); // no form data

// Serve static files 
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.use('/', crudRoute);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on: http://localhost:${PORT}`));