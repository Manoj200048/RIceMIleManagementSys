const User = require("../Model/CusModel");

// dis users
const gellAllUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    
    if (!users) {
        return res.status(404).json({ message: "User not found" });
    }
    // diplay users
    return res.status(200).json({ users });
};

//data insert
const addUsers = async (req , res , next )=>{
    const {userName,password,firstName,lastName,bName,bRegName,bOwner,address} = req.body;

    let users;

    try{
        users = new User ({userName,password,firstName,lastName,bName,bRegName,bOwner,address});
        await users.save();
    }catch(err){
        console.log(err);
    }

    if (!users) {
        return res.status(404).json({ message: "cant insert" });
    }
    return res.status(200).json({ users });
};

// display by id
const getById = async (req, res , next)=>{

    const id = req.params.id;

    let user;

    try {
        users = await User.findById(id);
    } catch (err) {
        console.log(err);
    }
    
    if (!users) {
        return res.status(404).json({ message: "User not found" });
    }
    // diplay users
    return res.status(200).json({ users });
    
};

// update
const updateUser = async (req, res , next)=>{

    const id = req.params.id;
    const {userName,password,firstName,lastName,bName,bRegName,bOwner,address} = req.body;

    let users;

    try{
        users = await User.findByIdAndUpdate(id,
        {userName : userName,password: password,firstName :firstName,lastName :lastName,bName :bName,bRegName : bRegName,bOwner :bOwner,address :address});
        users = await users.save();

    }catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: "Counld not Update" });
    }
    // diplay users
    return res.status(200).json({ users });

};

// delete user
const deleteUser = async (req, res , next)=>{

    const id = req.params.id;

    let users;

    try{
        users = await User.findByIdAndDelete(id)

    }catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: "Counld not Delete" });
    }
    // diplay users
    return res.status(200).json({ users });

};


exports.gellAllUsers = gellAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;