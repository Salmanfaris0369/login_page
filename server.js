const express=require('express');
const path = require("path");
const bodyparser=require("body-parser");
const session=require("express-session");
const {v4:uuidv4}=require("uuid");
const nocache=require("nocache");
const router =require('./router');

const app=express();

const port=3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(nocache())

app.set('view engine','ejs');

// static asset
app.use('/static',express.static(path.join(__dirname,'publiccd')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
  secret:uuidv4(),
  resave:false,
  saveuninitialized:true
}));

app.use('/route',router);

//main route
app.get('/',(req,res)=>{
  if(req.session.user){
    res.render("dashboard",{title:"Home"})
  }else{
    res.render('base',{title:"Login System"});
  }
})



app.listen(port,()=>{console.log("Listening to the server on http://localhost:3000")})

