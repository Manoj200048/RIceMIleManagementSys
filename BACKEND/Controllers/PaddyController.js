const Paddy = require("../Model/PaddyModel");

const getAllPaddy = async(req,res,next)=>{
    let paddy;

    try{
        paddy = await Paddy.find();
    }catch(err){
        console.log(err);
    }
    //no paddy
    if(!paddy){
        return res.status(404).json({message:"Paddy not found"});
    }

    //display
    return res.status(200).json({ paddy });

};

//data insert
const addPaddy = async(req, res, next) => {
    const{weight,mContent,pDate,price,location}= req.body;

    let paddy;

    try{
        paddy = new Paddy({weight,mContent,pDate,price,location});
        await paddy.save();
    }catch(err){
        console.log(err);
    }

    //unable to add
    if(!paddy){
        return res.status(400).json({message:"unable to add paddy"});
    }
    return res.status(200).json({paddy});
};

//get by id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let paddy;

    try{
        paddy = await Paddy.findById(id);
    }catch(err){
        console.log(err);
    }
    //unable to display
    if(!paddy){
        return res.status(400).json({message:"unable to find paddy"});
    }
    return res.status(200).json({paddy});
};

//update
const updatePaddy = async(req,res,next) =>{
    const id = req.params.id;
    const{weight,mContent,pDate,price,location}= req.body;

    let paddy;

    try{
        paddy = await Paddy.findByIdAndUpdate(id,
            {weight:weight, mContent:mContent,pDate:pDate,price:price,location:location});
            paddy = await paddy.save();
    }catch(err){
        console.log(err);
    }

    //unable to update
    if(!paddy){
        return res.status(400).json({message:"unable to update paddy"});
    }
    return res.status(200).json({paddy});
};

//delete
const deletePaddy = async(req,res,next)=>{
    const id = req.params.id;

    let paddy;

    try{
        paddy = await Paddy.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    //unable to update
    if(!paddy){
        return res.status(400).json({message:"unable to delete paddy"});
    }
    return res.status(200).json({paddy});
};

const getTotalPrice = async (req, res, next) => {
    try {
      const totalPrice = await Paddy.aggregate([
        {
          $group: {
            _id: null,
            totalPrice: { $sum: "$price" },
          },
        },
      ]);
      if (!totalPrice || totalPrice.length === 0) {
        return res.status(404).json({ message: "Total price not found" });
      }
      return res.status(200).json({ totalPrice: totalPrice[0].totalPrice });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const getTotalWeight = async (req, res, next) => {
    try {
      const totalWeight = await Paddy.aggregate([
        {
          $group: {
            _id: null,
            totalWeight: { $sum: "$weight" },
          },
        },
      ]);
      if (!totalWeight || totalWeight.length === 0) {
        return res.status(404).json({ message: "Total weight not found" });
      }
      return res.status(200).json({ totalWeight: totalWeight[0].totalWeight });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

exports.getAllPaddy = getAllPaddy;
exports.addPaddy = addPaddy;
exports.getById = getById;
exports.updatePaddy = updatePaddy;
exports.deletePaddy = deletePaddy;
exports.getTotalPrice = getTotalPrice;
exports.getTotalWeight = getTotalWeight;