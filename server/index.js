const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');
const PORT=process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
dotenv.config({path:'./config.env'});
//connecting to the database
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("Database is connected");
}).catch((err)=>{
    console.log("No Connection")
})

//Creating the schema
const gallerySchema=new mongoose.Schema({
    ImgName:{
        type:String,
        required:true
    },
    ImgUrl:{
        type:String,
        required:true
    },
    ImgDetails:{
        type:String,
        required:true
    }
})

//Creating the model
const GalleryCrud=new mongoose.model("GalleryCrud",gallerySchema);
app.post('/',async (req,res)=>{
    const {ImgName,ImgUrl,ImgDetails}=req.body;
    try{
        const galleryImg=new GalleryCrud({ImgName,ImgUrl,ImgDetails})
        const saveData=await galleryImg.save();
        if(saveData)
            res.send("Data has been saved");
        else
            res.send("Data has not been saved");
    }catch(err){
        res.send(err);
    }
})
app.get('/',async (req,res)=>{
    const _id=GalleryCrud._id;
    try{
        const findData=await GalleryCrud.find(_id);
        if(findData){
            res.send(findData);
        }
        else{
            res.send("Can't get the data");
        }
    }catch(err){
        res.send(err);
    }
})
app.get('/show/:id',async (req,res)=>{
    // const _id=GalleryCrud._id;
    try{
        const _id=req.params.id;
        const findData=await GalleryCrud.findById(_id);
        if(findData){
            res.send(findData);
        }
        else{
            res.send("Can't get the data");
        }
    }catch(err){
        res.send(err);
    }
})
app.delete('/delete/:id',async (req,res)=>{
    try{
        const _id=req.params.id;
        const findData=await GalleryCrud.findByIdAndDelete(_id);
        if(findData)
            res.send("Deletion Successfull");
        else    
            res.send("Deletion Unsuccessfull");
    }catch(err){
        res.send(err);
    }
})
app.put('/:id/edit',async (req,res)=>{
    try{
        const _id=req.params.id;
        const updateData=await GalleryCrud.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        console.log(updateData)
        if(updateData)
            res.send("Updation successfull");
        else    
            res.send("Updation unsuccessfull");
    }catch(err){
        res.send(err);
    }
})
app.get('/:id/edit',async (req,res)=>{
    try{    
        const _id=req.params.id;
        const findData=await GalleryCrud.findOne({_id});
        // console.log(findData);
        if(findData)
            res.send(findData);
        else
            res.send("Data does not exist");
    }catch(err){
        res.send(err);
    }
})
if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"));
}
app.listen(PORT,()=>{
    console.log("Listening to the port "+PORT);
})