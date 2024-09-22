const express=require("express");
const router=express.Router();

const credential=[{
    email:"salmanfs953@gmail.com",
    password:"123"
  } ]


//login checking
router.post('/login',(req,res)=>{
    const reqEmail = req.body.email;
    const reqPassword = req.body.password;
    if(credential.find((user) => reqEmail == user.email && reqPassword == user.password)){
        req.session.user=req.body.email;
        res.redirect('/route/dashboard');
        // res.end("Login Successful");
    }else{
      res.render("base",{login:"Invalid Credentials"})  
    }
});

//dashboard route
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{title:"Home"})
    }else{
        res.send("Unauthorize User")
    }
});

//logout route
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.redirect('/')
        }
    })
})

module.exports=router;