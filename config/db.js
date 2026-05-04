const mongoose = require('mongoose')

const url = 'mongodb+srv://GECJ:gec123@gecj.o4nhqas.mongodb.net/?appName=GECj';
const connectdb = mongoose.connect(url).then(()=>{
    console.log('Database connected successfully');
})