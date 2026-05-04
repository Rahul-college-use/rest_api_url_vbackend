const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/restapi';
const connectdb = mongoose.connect(url).then(()=>{
    console.log('Database connected successfully');
})