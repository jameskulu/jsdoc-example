const express = require('express');
const db = require('./models');

const app = express();
require('dotenv').config();

// Middleware
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/items', require('./routes/items'));

// Defining PORT
const PORT = process.env.PORT || 5000;

db.sequelize
    .sync()
    .then(() =>
        app.listen(PORT, () =>
            console.log(
                `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
            )
        )
    );
