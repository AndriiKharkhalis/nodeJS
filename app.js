const dotenv = require('dotenv');
const express = require('express');
const { engine } = require('express-handlebars');
const { MONGO_URL } = require('./config/config');
const mongoose = require('mongoose');
const { PORT } = require('./config/config');

dotenv.config();

const carsRouter = require('./routes/cars.routers');
const userRouter = require('./routes/user.router');
const reportRouter = require('./routes/report.router');
const ApiError = require('./error/ApiError');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('.hbs', engine({ defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', './views');

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
         data: {}
      });
}

app.get('/welcome', (req, res) => {

   res.render('welcome');
})

mongoose.connect(MONGO_URL).then(value => {
   // console.log(value); // видасть інфу про connection 
   console.log('Connection succes');
})

app.listen(PORT, () => {
   console.log(`App listen ${PORT}`)
});

// video 58:30 - midlewares
// 1:14:32 errors

// middlewares в get & delete
// чи норм боді
// чи є емайл
// чи не мінусовий вік
// чи валідна _id - 24 символи

// 22:43 custom errors 
// 1:01:45 ES Lint