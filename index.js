const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const userRouter = require('./routes/user.js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 8000;

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
});

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render("home");
});

app.use('/user', userRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})