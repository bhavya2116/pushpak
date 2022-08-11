const express = require('express');
const connectDB = require('./config/db')
 
const app = express()

// connect database
connectDB
// init middleware
app.use(express.json())


app.get ('/',(req, res)=>res.send('API Running'))

// routes
app.use('/api/user',require("./routes/api/user"))

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));