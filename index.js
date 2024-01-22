const express = require('express');
const {connection} = require('./connect');
const urlroute = require('./routes/url');
const url = require('./models/url')
const app = express();
const PORT = 8001;
connection('mongodb://localhost:27017/shorturl')
.then(()=>console.log('mongodb connected'))

app.use(express.json());

app.use('/url',urlroute);
app.get('/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
  const entry =  await url.findOneAndUpdate({
     shortId
   },{ $push:{
    visitHistroy:{
        timestamp:Date.now(),
    }
   }});
   res.redirect(entry.Redirectedurl);
})
app.listen(PORT,()=>console.log(`server created at ${PORT}`));


