require('./db.js');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
var app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

var userRoutes = require('./controllers/userController');
const prdcts = require('./routes/api/prdcts');
const orderRoute = require('./controllers/orderController');
const productRouter = require('./controllers/productController');
var commentsRoutes = require('./controllers/commmentsController');

app.use('/order', orderRoute);
app.use('/product', productRouter);
app.use('/user',userRoutes);
app.use('/api/prdcts', prdcts);
app.use('/comments',commentsRoutes);
app.use('/uploads',express.static('uploads'));

// Serve static assets (front-end), if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen( PORT, ()=>console.log(`Server started at port : ${PORT}`));

