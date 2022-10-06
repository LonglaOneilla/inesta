import express from 'express'
//import Data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected sucessfully to db');
    })
    .catch((err) => {
        console.log(err.message)
    });

const app = express()

//express() is a method called to return an object
// in this case, app
//app has a method called get

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//the form data in the post request will be converted to a json data in th the body by the above 2 lines of codes

app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
});

app.use('/api/seed', seedRouter);

// app.get('/api/products', (req, res) => {
//     res.send(Data.products)
//     //data is gotten from data.js file
// })
//this fxn is replaced by the one below

app.use('/api/products', productRouter)

//the get method has two params
//the first defines the api route url used to fetch data
//the second is the function that responds to the api
//the second accepts two params

app.use('/api/users', userRouter)

app.use('/api/orders', orderRouter)

//defining the error handler for express
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})

const port = process.env.PORT || 5000
//port part to get the backend and it is the convention to  get a free port
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
})

//the app.listen function starts the server
//has two params
//the port and a function to log the path to the console
//the function can be defined to contain any thing
