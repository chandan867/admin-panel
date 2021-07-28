const express=require('express')
const mongoose=require('mongoose')
const csvtojson=require('csvtojson')
const multer=require('multer')
const ejs=require('ejs');
const Course=require('./model/course')
const Quiz=require('./model/quiz')
const session = require('express-session');
const passport=require('passport');
const passportLocal=require('./Config/passport-local-auth');
const User=require('./model/user');
const Packages=require('./model/package')

const app=express() 
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:false}));




app.use(session({
  name: 'agriv4u',
  // TODO change the secret before deployment in production mode
  secret: 'blahsomething',
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: (1000 * 60 * 100)
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.get("/",function(req,res){
 res.render('home')
});

/////////////uploading file through multer//////////
const fileStorageEngine=multer.diskStorage({
  destination: function(req,file,callback){
    callback(null,'./uploads');
  },
  filename: function(req,file,callback){
    callback(null,file.originalname);
  }
});

const upload=multer({storage:fileStorageEngine});

const isLoggedIn = (req, res, next) => {
  if (req.user) 
  return next();

  res.redirect("/");
};

//////////finding all users to display//////////
// let users;
// const findUsers=async()=>{
// users=await User.find({});
// }

// findUsers();
// console.log(users)

let users=[
  {
  name:'User 1',
  email:'abcd@gmail.com',
},
  {
  name:'User 2',
  email:'abcde@gmail.com',
},
  {
  name:'User 3',
  email:'abcdef@gmail.com',
},


]
let courses=[
  {
  name:'Course 1',
},
  {
  name:'Course 2',

},
  {
  name:'Course 3 ',

},


]


//////////converting csv to json//////////////////// 
async function data(filePath,quizName,courseName){  
  try{

    let course=await Course.findOne({name:courseName});
    console.log(filePath)
    const data=await csvtojson().fromFile(filePath);
 let quiz=await Quiz.create({name:quizName,Question:data});
course.quizzes.push(quiz._id);
  await course.save();
console.log(data)
  }catch(err)
  {
    console.log(err)
  }
}

app.post("/quiz",isLoggedIn,upload.single('selectedFile'),async (req,res)=>{
 
  let course=await Course.findOne({name:req.body.course});
  if(course.subAdmins.includes(req.user.email)){

    data(req.file.path,req.body.quiz,req.body.course);
   
   res.send('file uploaded')
  }else{
    res.send("restricted url");
  }

});
  


////////////////////////////////////////////////////////////



app.get('/package', isLoggedIn,(req,res)=>{
  res.render('package',{courses})
})

app.get('/course', isLoggedIn,(req,res)=>{
  res.render('course',{users})
})

app.get('/quiz', isLoggedIn,(req,res)=>{
  res.render('quiz')
})
app.get('/login',(req,res)=>{
  res.render('login')
})
app.get('/register',(req,res)=>{
  res.render('register')
})



app.post('/login',passportLocal.authenticate('local', { failureRedirect: '/login' }),(req,res)=>{
res.render('index')
});


const isAdmin= (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();
  res.redirect("/");
};

app.post('/register',isAdmin,async (req,res)=>{
 
  const {name,email,password}=req.body
    const userExists=await User.findOne({email})
    if(userExists)
    {
    return res.status(400).send({message:"user already exists"})
    };
    const user=await User.create({
      name,
      email,
      password
    });
    return res.redirect('/');
});




app.post('/course',isAdmin,(req,res)=>{
    
   let accessArr=req.body.access.split(',');
   Course.create({name:req.body.name,subAdmins:accessArr});
    return res.redirect('back');
});

app.post('/package',isAdmin,(req,res)=>{
  let subAdmins=req.body.subAdmins.split(',');
const {name,poster,type}=req.body;
Packages.create({
  name,
  poster,
  type,
  subAdmins
});
return res.redirect('back');
});















////connecting to the database

let url='mongodb+srv://chandan:chandan47@cluster0.2ben8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const ConnectDb = async () => {
 
  try {
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

      useCreateIndex: true,
    });
    console.log(`mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error ${error.message}`);
    process.exit(1);
  }
};

ConnectDb();
///////////////////////////////////////////////////////////////


const port =  8000;
app.listen(port, console.log(`server running on port ${port}`));
