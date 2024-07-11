const User = require("../Model/userModel3");

const getAllusers = async(req,res,next)=>{
    let Users;
    //get All Users
    try{
        users = await User.find();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!users){
        return res.status(404).json({message:"User not found"});
    }

    //display all users
    return res.status(200).json({users});

};

//Insert
const addUser = async(req,res,next)=>{
    const {production_ID,date,quantity,variety} = req.body;

    let users;

    try{
        users = new User({production_ID,date,quantity,variety});
        await users.save();
    }catch(err){
        console.log(err);
    }

    //not insert user
    if(!users){
        return res.status(404).json({message:"unable to add user"});
    }

    return res.status(200).json({users});
}
const getById = async(req,res,next) => {
    const id= req.params.id;

    let user;
    try{
        user = await User.findById(id);
    }catch(err){
        console.log(err);
    }
    //user not found
    if(!user){
        return res.status(404).json({message:"user not found"});
    }

    return res.status(200).json({user});


}
//update user details

const updateUser = async(req,res,next) =>{
    const id = req.params.id;
    const {production_ID,date,quantity,variety}= req.body;

    let users;
    try{
        users = await User.findByIdAndUpdate(id,{production_ID:production_ID,date:date,quantity:quantity,variety:variety});
        users = await users.save();
    }catch(err){
        console.log(err);
    }

    if(!users){
        return res.status(404).json({message:"unable to update user details"});
    }

    return res.status(200).json({users});

}

const deleteUser = async(req,res,next)=>{
    const id = req.params.id;

    let user;
     try{
        user = await User.findByIdAndDelete(id);

     }catch(err){
        console.log(err);
     }

     if(!user){
        return res.status(404).json({message:"unable to delete user details"});
    }

    return res.status(200).json({user});

}


exports.getAllusers = getAllusers;
exports.addUser = addUser;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

