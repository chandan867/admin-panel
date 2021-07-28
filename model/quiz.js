var mongoose = require('mongoose');


var questSchema = mongoose.Schema
({
    serialNumber:{
        type:String,
        required:true,
    },
   Question:{
       type:String,
       required:true

   },
   OptionA:{
       type:String,
       required:true
   },
   OptionB:{
       type:String,
       required:true
   },
   OptionC:{
       type:String,
       required:true
   },
   OptionD:{
    type:String,
    required:true
},
   CorrectOption:{
    type:String,
    required:true
   }


    
});
 



var Quiz = mongoose.Schema
({
  name:{
      type:String
  },
   Day:{
       type:String,
       
   },
   Question:[questSchema],
   
});
 


 
var quiz= mongoose.model('quiz',Quiz);
 
module.exports =quiz;