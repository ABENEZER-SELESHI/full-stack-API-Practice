if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const appRoutes = require('./routes/routes');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.json()); // Add this line to handle JSON payloads
app.use('/', appRoutes);

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => { console.log('connected to database'); });

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
// app.listen(process.env.PORT || 3000,  () => {
//     console.log('http://localhost/3000');
// })
