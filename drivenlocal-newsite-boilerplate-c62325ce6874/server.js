const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();

// Body Parse Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.use('/api/emails', require('./routes/api/emails'));

app.use(compression());

// Set static folder
app.use(express.static('./client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5080;

app.listen(PORT, () =>
    console.log(`Ferocious Media Node Server started on ${PORT}`)
);
