const userSchema = {
    token:{
        type : String
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    }
  };
  
  module.exports = userSchema;