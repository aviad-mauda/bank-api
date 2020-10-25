const mongoose = require('mongoose')
const url = process.env.MONGODB_URL;
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