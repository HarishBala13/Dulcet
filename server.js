const express=require("express");
const app=express();
const sqldb=require("mysql");
const path=require("path");
const ejs=require("ejs");
var nodemailer=require("nodemailer");
var database=sqldb.createConnection({
    host: 'localhost', database:'login_crud', user:'root', password:'Harish@123'
});
database.connect((err,res)=>{
    if(err) console.log(err);
    console.log("MySQL Connected Successfully...");
});

app.use(express.urlencoded({extended:false}));
const location=path.join(__dirname,'./public');
app.use(express.static(location));

app.set("view engine","ejs");

app.get('/',(req,res)=>{
    database.query('SELECT * FROM Singers',(singerserror,singersresult)=>{
        singers=singersresult;
        console.table(singers);
        singerslength=singersresult.length;
        console.log("Singers Table length is : "+singerslength);
        res.render("home",{message:""});
    });
});
app.get('/login',(req,res)=>{
    res.render("login",{message:""});
});
app.post('/dblogin',async(req,res)=>{
        const { email, set_password} = req.body;
     if(email=="dulcetsass22@music.in" && set_password=="@dulcet123"){  
            database.query('SELECT * FROM login_users',(fetcherror,fetchresult)=>{
                userinfo=fetchresult;
                length=fetchresult.length;
            }); 
            database.query('SELECT * FROM SongsImages',(joinerror,joinresult)=>{
                allsongs=joinresult;
                allsongslength=joinresult.length;
                res.render("admin");
            });  
        }
        database.query('SELECT * FROM login_users WHERE U_EMAIL=?',[email], async(error1,result1) =>{
           if(result1.length<= 0){
            res.render("login",{message:"Please Enter correct Email"});
           }
           else{
            if(set_password!=result1[0].U_PASS){
                res.render("login",{message:"Password incorrect"});
            }
            else{  
                data=result1;
                database.query('SELECT * FROM AsideSongs',(fetcherror,fetchresult)=>{
                    asidesong=fetchresult;
                    length=fetchresult.length;
                    var global={
                        serveroutput_asidesongs:asidesong
                    }
                });
                database.query('SELECT * FROM SongsImages',(fullfetcherror,fullfetchresult)=>{
                    mainsongs=fullfetchresult;
                    totallength=fullfetchresult.length;
                });
                database.query('SELECT * FROM Singers',(singerserror,singersresult)=>{
                    singers=singersresult;
                    singerslength=singersresult.length;
                    res.render("loggedin");
                });
            }
            }
        }); 
});

app.get('/register',(req,res)=>{
    res.render("register",{message:""});
});
app.post('/dbregister',(req,res)=>{
    const email=req.body.email;
    const name=req.body.name;
    const password=req.body.set_password;
    database.query('SELECT U_EMAIL FROM login_users WHERE U_EMAIL=?',[email],async(error,result)=>{
        if(error) console.log(error);
        else if(result.length>0){
            res.render("register",{message:"Email Id already taken"});
        }
    });
    database.query('INSERT INTO login_users SET?',{U_NAME:name,U_EMAIL:email,U_PASS:password},(error2,result2)=>{
        if(error2){
            res.render("dbregister");
            throw error2;           
        }
        else{
            var transporter=nodemailer.createTransport({
                service:'gmail',
                host: "2k19me016@kiot.ac.in",
                port: 465,
                secure: true,
                auth:{
                  user:'2k19me016@kiot.ac.in',
                  pass:'harish@13kiot'
                }
                });
                var mailoptions={
                from:'2k19me016@kiot.ac.in',
                to:email,
                subject:'Thanks for Registering',
                text:`Hi `+name,
                html:`<div>
                <h4 style=" font-size:20px; ">Thanks for choosing our Service</h4>
                <img style=" width: 65px; height: 45px; border-radius: 50%; " src="https://live.staticflickr.com/65535/52850396290_e650ce4a0b_n.jpg" alt="Dulcet logo">
                <p style=" text-align:justify; font-weight: 0.45cm; ">We are happy to announce that you are a valuable customer to us and we won't let you down in any situation.</p>
                <p style=" text-align:justify; color:; font-weight: 0.45cm; ">Have fun, and don't hesitate to contact us with your feedback.Once a Dulcet user always a Ghost</p>
                <p style=" text-align:justify; ">Thanks,<br>The Dulcet Team.</p>
                <p style=" text-align:justify; color:rebeccapurple; ">Contact Us</p>
                <a href="https://www.facebook.com/profile.php?id=100089790477429" target="_blank">
                    <i class="fab fa-facebook-f"></i>       Facebook
                </a>
                <a href="https://www.instagram.com/__delcet__23/"  target="_blank">
                    <i class="fab fa-instagram"></i>        Instagram
                </a>
                <a href="https://www.linkedin.com/in/delcet-musicapp-766898265/" target="_blank">
                    <i class="fab fa-linkedin-in"></i>      Linked-in
                </a>
                <a href="mailto:delcetonline2023@gmail.com" target="_blank">
                    <i class="fa-solid fa-envelope"></i>    E-mail
                </a>
                <a href="https://twitter.com/DelcetMusicHB"  target="_blank">
                    <i class="fab fa-twitter" ></i>
                        Twitter
                </a>
                </div>`
              };
              transporter.sendMail(mailoptions,(err,info)=>{
                if(err) {
                    throw err;
                }
                else{
                console.log('email sent : '+info.response);
            }
        })
        ;
            res.redirect("login");
        }
    });
});

app.post('/dbforgotpass',(req,res)=>{
    const email=req.body.recoveryemail;
    const name=req.body.name;
    database.query('SELECT * FROM login_users WHERE U_EMAIL=?',[email],(error,resultpass)=>{
        var dbname=resultpass[0].U_NAME;
        if(dbname!=name){
            res.render("forgotpass",{message:"Name does not exists"});
        }
        else{
        var transporter=nodemailer.createTransport({
        service:'gmail',
        host: "2k19me016@kiot.ac.in",
        port: 465,
        secure: true,
        auth:{
          user:'2k19me016@kiot.ac.in',
          pass:'Harish@13kiot'
        }
        });
        var mailoptions={
        from:'2k19me016@kiot.ac.in',
        to:email,
        subject:'Please reset your password',
        text:`Hi `+dbname,
        html:`<div style="background: grey; display:grid; place-items:center;">
        <div>
        <h2>Dulcet Password Reset</h2>
        <img style=" width: 65px; height: 45px; border-radius: 50%; " src="https://live.staticflickr.com/65535/52850396290_e650ce4a0b_n.jpg" alt="Dulcet logo">
        <p style="text-align:justify; font-size:0.3cm;">Hey ${dbname}!<br><br>We heard that you lost your Dulcet password. Sorry about that!..</p>
        <p style="text-align:justify;">But don't worry. By clicking the below button you can reset your password😊😊.</p>
        <a style=" border: 2px solid black; border: none;  background: green;  padding: 10px; border-radius: 10px; text-decoration: none; color: white;" href="http://localhost:2002/forgotnewpass">Reset your password</a>
        <p style="text-align:justify;">Thanks,<br>The Dulcet Team.</p></div>
        </div>`
        // html:`<h3 style="color:violet;">Your request for resetting password has been approved</h3>
        //       <button><a href="http://localhost:200/forgotnewpass" style="color:greenyellow;">Reset Password</a></button>`
      };
      transporter.sendMail(mailoptions,(err,info)=>{
        if(err) {
            throw err;
        }
        else{
        console.log('email sent : '+info.response);
    }
});
}
    });    
});

app.get('/forgotnewpass',(req,res)=>{
    res.render("forgotnewpass",{message:""});
});
app.post('/dbforgotpassvalue',(req,res)=>{
    const recoverysetpassword=req.body.recoverysetpassword;
    database.query('UPDATE login_users SET U_PASS=? WHERE U_PASS=?',[recoverysetpassword],(error3,resultpassvalue)=>{
        if(resultpassvalue?.length>0){
            res.render("forgotnewpass",{message:"Password already exists"});
        }
        else{
            res.render("login",{message:""});
        }
    });
});
app.get('/profile',(req,res)=>{
    res.render("profile",{message:""});
});
app.get('/premium',(req,res)=>{
    database.query('SELECT * FROM Singers',(singerserror,singersresult)=>{
        singers=singersresult;
        // console.log("Singers");
        // console.table(singers);
        singerslength=singersresult.length;
        // console.log("Singers Table length is : "+singerslength);
        res.render("premium");
    });
});
app.get('/forgotpass',(req,res)=>{
    res.render("forgotpass",{message:""});
});
app.get('/loggedin',(req,res)=>{
    database.query('SELECT * FROM AsideSongs',(fetcherror,fetchresult)=>{
        asidesong=fetchresult;
        console.log("AsideSongs");
        console.table(asidesong);
        length=fetchresult.length;
        console.log("AsideSongs Table length : "+length); 
        var global={
            serveroutput_asidesongs:asidesong
        }
    });
    database.query('SELECT * FROM SongsImages',(fullfetcherror,fullfetchresult)=>{
        mainsongs=fullfetchresult;
        console.log("SongsImages");
        console.table(mainsongs);
        totallength=fullfetchresult.length;
        console.log("SongsImages Table length is : "+totallength);
    });
    database.query('SELECT * FROM Singers',(singerserror,singersresult)=>{
        singers=singersresult;
        console.log("Singers");
        console.table(singers);
        singerslength=singersresult.length;
        console.log("Singers Table length is : "+singerslength);
        res.render("loggedin");
    });
});

app.get('/admin',(req,res)=>{
    database.query('SELECT * FROM login_users',(fetcherror,fetchresult)=>{
        userinfo=fetchresult;
        length=fetchresult.length;
    });
    // database.query('SELECT * FROM AsideSongs UNION SELECT * FROM SongsImages',(joinerror,joinresult)=>{
    //     allsongs=joinresult;
    //     allsongslength=joinresult.length;
    //     res.render("admin");
    // });
    database.query('SELECT * FROM SongsImages',(joinerror,joinresult)=>{
        allsongs=joinresult;
        allsongslength=joinresult.length;
        res.render("admin");
    });
})

app.post('/adminsongs',(req,res)=>{
    // console.log(req.body);
     const{audioname,audio,moviename,image,audioid,Update,Delete,Save}=req.body;
    if(Save=="sav"){
        database.query('INSERT INTO SongsImages SET AUD_NAME=?, AUDIO=?, MOVIE_NAME=?, IMAGE=?',[audioname,audio,moviename,image],(saveerror,saveresult)=>{
            if(saveerror)   console.error(saveerror);
            else{
                console.log("Data Saved Successfully...........");
            res.render("admin");
        }
        })
    }
    else if(Update=="upd"){
    database.query('UPDATE SongsImages SET AUD_NAME=?, AUDIO=?, MOVIE_NAME=?, IMAGE=? WHERE AUD_ID=?',[audioname,audio,moviename,image,audioid],(updateerror,updateresult)=>{
        if(updateerror) {
            console.error(updateerror);
             throw updateerror
        }
        else {console.log("Data Updated in MySql Successfully........") ;
        res.render("admin");
    };
    });
}
    else if(Delete=="del"){
        database.query('DELETE FROM SongsImages WHERE AUD_ID=?',[audioid],(deleteerror,deleteresult)=>{
            if(deleteerror) {
                console.error(deleteerror);
                 throw deleteerror;
            }
            else {console.log("Data Deleted in MySql Successfully.........");
            res.render("admin");
        }
        });
    }
});

app.get('/logout',(req,res)=>{
    res.render("login");
});
app.get('/gmail',(req,res)=>{
    res.render("gmail");
});
// database.query('SELECT * FROM login_users',(fetcherror,fetchresult)=>{
//     console.table(fetchresult);
// });

app.listen(2002,(error,res)=>{
    if(error) console.log(error);
    console.log("Connected and Listening the port 2002");
});