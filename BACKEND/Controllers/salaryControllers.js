const User = require("../Model/salaryModel");

const getALLusers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const addUsers = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).json({ newUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Other controller functions...


const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ updatedUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

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
module.exports = {
  getALLusers,
  addUsers,
  getById,
  updateUser,
  deleteUser,
};
