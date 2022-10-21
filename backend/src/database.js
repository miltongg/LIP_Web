const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/testDB';

mongoose.connect(URI);

mongoose.connection.once('open', () => {
    console.log('DB is connected');
});