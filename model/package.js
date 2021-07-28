var mongoose = require('mongoose');
 
var package = mongoose.Schema
({
  Id:{
       type:Number,
      
   },
   Name:{
       type:String,
      
 
   },
   Poster:{
       type:String,
       
   },
   
   Type:{
       type:String,
       
    },
   subAdmins:[{
       type:String
   }]
   
  
     
 });
 

 
var Packages= mongoose.model('Packages', package);
 
module.exports =Packages;