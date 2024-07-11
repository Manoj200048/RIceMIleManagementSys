const Storing = require("../Model/StoringModel");

const getAllStoring = async(req,res,next)=>{
    let storing;

    try{
        storing = await Storing.find();
    }catch(err){
        console.log(err);
    }
    //no location
    if(!storing){
        return res.status(404).json({message:"content not found"});
    }

    //display
    return res.status(200).json({ storing });

};

//data insert
const addStoring = async(req, res, next) => {
    const{topic,description}= req.body;

    let storing;

    try{
        storing = new Storing({topic,description});
        await storing.save();
    }catch(err){
        console.log(err);
    }

    //unable to add
    if(!storing){
        return res.status(400).json({message:"unable to add instructions"});
    }
    return res.status(200).json({storing});
};

//update
const updateStoring = async(req,res,next) =>{
    const id = req.params.id;
    const{topic,description}= req.body;

    let storing;

    try{
        storing = await Storing.findByIdAndUpdate(id,
            {topic:topic, description:description});
            storing = await storing.save();
    }catch(err){
        console.log(err);
    }

    //unable to update
    if(!storing){
        return res.status(400).json({message:"unable to update instructions"});
    }
    return res.status(200).json({storing});
};

//delete
const deleteStoring = async(req,res,next)=>{
    const id = req.params.id;

    let storing;

    try{
        storing = await Storing.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    //unable to update
    if(!storing){
        return res.status(400).json({message:"unable to delete instructions"});
    }
    return res.status(200).json({storing});
};

exports.getAllStoring = getAllStoring;
exports.addStoring = addStoring;
//exports.getById = getById;
exports.updateStoring = updateStoring;
exports.deleteStoring = deleteStoring;