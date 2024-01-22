

const shortid = require('shortid');
const URL = require('../models/url')
async function handlegenerateshorturl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"url is required"})

    const shortID = shortid();

     await URL.create({
        shortId:shortID,
        Redirectedurl:body.url,
        visitHistroy:[],
     });

     return res.json({id:shortID});
};

module.exports={
    handlegenerateshorturl,
}