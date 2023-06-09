const dotenv = require('dotenv');
const express = require('express');
const { engine } = require('express-handlebars');
const { MONGO_URL, PORT } = require('./config/config');
const mongoose = require('mongoose');

dotenv.config();

const { carsRouter, reportRouter, userRouter } = require('./routes');
const ApiError = require('./error/ApiError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('.hbs', engine({ defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/welcome', (req, res) => {

   res.render('welcome');
})

app.use('/cars', carsRouter);
app.use('/reports', reportRouter);
app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_mainErrorHandler);

function _notFoundHandler(req, res, next) {
   next(new ApiError('Not found', 404));
}

function _mainErrorHandler(err, req, res, next) {
   res
      .status(err.status || 500)
      .json({
         messege: err.message || 'Server error',
         status: err.status,
         data: {} // for example
      });
}

mongoose.connect(MONGO_URL).then(value => {
   // console.log(value); // show all info about connection 
   console.log('Connection succes');
})

app.listen(PORT, () => {
   console.log(`App listen ${PORT}`)
});


// 24:02 auth sevice