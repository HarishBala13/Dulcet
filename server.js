var kenexp=require("express");
var dev=kenexp();
var sql=require("mysql");
var ejs=require("ejs");
var path=require("path");
// const { router } = require("json-server");
var db=sql.createConnection({hostname:'localhost',
                            database:'ejsserver',
                            user:'root',
                            password:'Harish@123'});
dev.use('/',require("./routes/routes"));


dev.use(kenexp.urlencoded({extended:false}));


dev.post('/value',(req,res)=>{
    const name=req.body.name;
    db.query('SELECT * FROM RegisterDetails WHERE USERNAME=?',[name],(err,result)=>{        
        if(err) console.log(err);
        else if(result.length>0){
            globalmsg=result;
            res.render("reg");
        }
        // else if(db.query('SELECT USERNAME FROM RegisterDetails WHERE USERNAME=?'),[name],(err,res)=>{
        //     if(err) console.log(err);
        //     else if(name!)
        // });
        else{
            res.render("home",{globalmsg:globalmsg});
        }
    });
    
});


var location=path.join(__dirname,'./public');
dev.use(kenexp.static(location));
var partial=path.join(__dirname,"./view");
dev.set("view engine","ejs");
dev.listen(202,()=>{
    console.log("port is running");
})