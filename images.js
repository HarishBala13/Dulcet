const express=require("express");
const app=express();
const sqldb=require("mysql");
const path=require("path");
global.ans="";
var database=sqldb.createConnection({
    host: 'localhost', database:'ejsserver', user:'root', password:'Harish@123'
});
database.connect((err,res)=>{
    if(err) console.log(err);
    console.log("MySQL Connected Successfully...");
});
app.get('/',require('./routes/routes'));
app.use(express.urlencoded({extended:false}));
const location=path.join(__dirname,'./public');
app.use(express.static(location));
var partial=path.join(__dirname,"./views");
app.set("view engine","ejs");
// app.get('/',(req,res)=>{
//     res.render("images");
// });
app.post('/imagesstore',(req,res)=>{
   const id=req.body.id;
   //const name=req.body.name;
   //const imagepath=req.body.imagepath;
    database.query('SELECT * FROM Imagefolder WHERE IMG_ID=?',[id],(err,result)=>{
        //console.log("Result Array after Inserting"+result);
        //if(database.query('UPDATE FROM ImageFolder WHERE ',{},()=>{}));
        if(err) throw err;
        else {
        console.log("Image after inserting into database is : "+imagepath);
        console.log("Result Array after else part running is: "+result);
        res.render("home",{ans});
        }
    });
});

app.get("/log",(req,res)=>{
    res.render("log");
})
app.post("/Value",(req,res)=>{
    const value=req.body.value;

    console.log(value);

    if(value>16){
        msg=value;
        res.render("log");
    }
    else{
        res.render("summa",{msg:"Krinc"});
    }

})

app.get("/summa",(req,res)=>{
    res.render("summa");
})
app.listen(200,(error,res)=>{
    if(error) console.log(error);
    console.log("Connected and Listening the port 200");
    // res.render("<h1>Connected to Port 200 and Running Successfuly...</h1>");
});