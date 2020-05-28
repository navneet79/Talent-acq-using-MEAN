const express = require('express');
const app = express();
const { mongoose } = require('./db.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoutes');
const profileRoute = require('./routes/profileRoutes');
// const emailRoute = require('./routes/emailRoutes');
app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

app.use('/userDetails', userRoute);
// app.use('/emailDetails', emailRoute);
app.use('/profileDetails', profileRoute);

const PORT = process.env.PORT || 4041;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
