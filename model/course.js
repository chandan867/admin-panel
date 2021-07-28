var mongoose = require('mongoose');
 
 
var Sections = mongoose.Schema
({
   name:{
       type:String,
   },
   packages:{
       type:String,
   },
   quizzes:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:'quiz'
   }],
   subAdmins:[{
    type:String
   }]
});
 

 
var section= mongoose.model('section', Sections);
 
module.exports =section;