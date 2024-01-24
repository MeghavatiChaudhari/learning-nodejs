const express = require('express');
const {connection} = require('./connect');
const urlroute = require('./routes/url');
const url = require('./models/url')
const app = express();
const PORT = 8001;
const staticRoute = require('./routes/staticRouter');
const path = require('path');
const exp = require('constants');
app.set("view engine",'ejs');
app.set("views",path.resolve("./view"))
connection('mongodb://localhost:27017/shorturl')
.then(()=>console.log('mongodb connected'))

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/url',urlroute);
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
app.use('/',staticRoute);

app.listen(PORT,()=>console.log(`server created at ${PORT}`));


