const path=require('path');
const fs=require('fs');
const bodyparser=require('body-parser')

const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true,useUnifiedTopology:true});

const express=require('express');
const app=express();
const hostname='127.0.0.1';
const port=80;

//Express specific
app.use('/static',express.static('public'))
app.use(express.urlencoded())

// Pug specific
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'))

// Bootstrap specific
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Endpoints
app.get('/',(req,res)=>{
    const params={'title':'Home of Dance'};
    // res.status(200).render('index.pug',params);
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const params_about={'title':'Get in Touch'}
    res.status(201).render('contact.pug',params_about);
})

// Define Mongoose Schema
const contactSchema=new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
})

const Client=mongoose.model('Client',contactSchema);

// via MongoDb
app.post('/contact',(req,res)=>{

    var myData=new Client(req.body);
    // myData.save(function(err){
    //     if(err)return console.error(err);
    //   });
    
    myData.save().then(()=>{
        res.status(201).render('contact_success.pug',params_about);
    }).catch(()=>{
        res.status(201).render('contact_failure.pug',params_about);
    });
    const params_about={'title':'Get in Touch'}
})

// via Output.txt
// app.post('/contact',(req,res)=>{
//     // console.log(req.body);

//     let name=req.body.name;
//     let phone=req.body.phone;
//     let email=req.body.email;
//     let address=req.body.address;
//     let query=req.body.desc;

//     let str=`Name of client: ${name}\nPhone no. of client: ${phone}\nEmail of client: ${email}\nAddress of client: ${address}\nClient Query: ${query}\n\n`

//     fs.appendFileSync('output.txt',str);

//     const params_about={'title':'Get in Touch'}
//     res.status(201).render('contact.pug',params_about);
// })


// Start the server 
app.listen(port,hostname,()=>{
    console.log(`Application running successfully on http://${hostname}:${port}/`);
})