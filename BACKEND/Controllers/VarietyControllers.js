const variety = require("../Model/VarietyModel");


const getAllVarieties = async (req, res, next) => {
    let varieties;
    let totalCount;
    
  
    try {
      varieties = await variety.find();
      totalCount = await variety.countDocuments();
    } catch (err) {
      console.log(err);
    }
  
    // no varieties
    if (!varieties) {
      return res.status(404).json({ message: "Varieties not found" });
    }
  
    // display
    return res.status(200).json({ varieties, totalCount });
  };

//data insert
const addVarieties = async (req, res, next) => {
    const { varietyName } = req.body;
  
    let Variety;
  
    try {
      Variety = new variety({ varietyName });
      await Variety.save();
  
      // Increment the count
      await variety.updateOne({ _id: Variety._id }, { $inc: { count: 1 } });
    } catch (err) {
      console.log(err);
    }
  
    // unable to add
    if (!Variety) {
      return res.status(400).json({ message: "unable to add varieties" });
    }
    return res.status(200).json({ Variety });
  };

//get by id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let Variety;

    try{
        Variety = await variety.findById(id);
    }catch(err){
        console.log(err);
    }
    //unable to display
    if(!Variety){
        return res.status(400).json({message:"unable to find variety"});
    }
    return res.status(200).json({Variety});
};

//update
const updateVariety = async(req,res,next) =>{
    const id = req.params.id;
    const{varietyName}= req.body;

    let Variety;

    try{
        Variety = await variety.findByIdAndUpdate(id,
            {varietyName:varietyName});
            Variety = await Variety.save();
    }catch(err){
        console.log(err);
    }

    //unable to update
    if(!Variety){
        return res.status(400).json({message:"unable to update variety"});
    }
    return res.status(200).json({Variety});
};

//delete
const deleteVariety = async (req, res, next) => {
    const id = req.params.id;
  
    let Variety;
  
    try {
      Variety = await variety.findByIdAndDelete(id);
  
      // Decrement the count
      await variety.updateOne({ _id: id }, { $inc: { count: -1 } });
    } catch (err) {
      console.log(err);
    }
  
    // unable to update
    if (!Variety) {
      return res.status(400).json({ message: "unable to delete variety" });
    }
    return res.status(200).json({ Variety });
  };
exports.getAllVarieties = getAllVarieties;
exports.addVarieties = addVarieties;
exports.getById = getById;
exports.updateVariety = updateVariety;
exports.deleteVariety = deleteVariety;