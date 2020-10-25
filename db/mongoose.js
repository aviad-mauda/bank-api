const mongoose = require('mongoose')
const url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/bank-api";
mongoose.connect(url , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).
catch(error => handleError(error));

const handleError =  (error) => {
    console.log(error);
}