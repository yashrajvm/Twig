const express= require("express");
const cors= require("cors");
const monk= require("monk");
const Filter = require("bad-words");


const app= express();

const db=monk("localhost/twig");
const twigs= db.get("twigs");
const filter= new Filter();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.json({
        message: "Twig!!"
    });
});

app.get("/twigs", (req,res)=> {
    twigs
        .find()
        .then(twigs => {
            res.json(twigs);
        });
});


function isvalidTwig(twig){
    return twig.name && twig.name.toString().trim()!=="" &&
    twig.content && twig.content.toString().trim() !=="";
}

app.post("/twigs", (req,res)=>{
    if(isvalidTwig(req.body)){
        const twig={
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        };

        twigs
            .insert(twig)
            .then(createdTwig => {
                res.json(createdTwig);
            });
    }else{
        res.status(422);
        res.json({
            message: "Oh boy! You forgot something!"
        });
    }
});


app.listen(5000, ()=>{
    console.log("Listening on http://localhost:5000");

});
