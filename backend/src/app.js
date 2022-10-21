const express = require('express');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');


// settings
app.set('port', process.env.PORT || 2000);

// middlewares
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));


// routes
app.use('/api/', require('./routes/users.routes'));
app.use('/api/', require('./routes/app.routes'));
app.use('/api/', require('./routes/ideas.routes'));
app.use('/api/', require('./routes/likes.routes'));
app.use('/api/', require('./routes/reviews.routes'));
app.use('/api/', require('./routes/upload.routes'));


module.exports = app;
