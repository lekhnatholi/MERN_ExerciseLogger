const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(uri, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


const exerciseRouter = require('./routes/exercise');
const usersRouter = require('./routes/users');
app.use('/exercise', exerciseRouter);
app.use('/users', usersRouter);
app.use('/', (req, res) => {
    res.json('Hello world');
})


app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})
