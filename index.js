const express = require('express');
const path = require('path');
const {connection} = require('./connect');


const url = require('./models/url')
const urlroute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/routeForAuth');




const app = express();
const PORT = 8001;



connection('mongodb://localhost:27017/shorturl')
.then(()=>console.log('mongodb connected'))



app.set("view engine",'ejs');
app.set("views",path.resolve("./view"))


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/url',urlroute);
app.use('/user',userRoute);
app.use('/',staticRoute);

app.get('/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    try{
  const entry =  await url.findOneAndUpdate({
     shortId
    },
   { $push:{
    visitHistroy:{
        timestamp:Date.now(),
    }
   }});
   if(entry){
    res.redirect(entry.Redirectedurl);
   }else{
    res.status(404).send('not found');
   }
  //  res.redirect(entry.Redirectedurl);
}
catch(error){
console.log(error);
res.status(500).send('internal error');
}
});

app.listen(PORT,()=>console.log(`server created at ${PORT}`));


