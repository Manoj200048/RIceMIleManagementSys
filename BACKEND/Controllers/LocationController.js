const Location = require("../Model/LocationModel");

const getAllLocation = async(req,res,next)=>{
    let location;

    try{
        location = await Location.find();
    }catch(err){
        console.log(err);
    }
    //no location
    if(!location){
        return res.status(404).json({message:"location not found"});
    }

    //display
    return res.status(200).json({ location });

};

const addLocation = async (req, res, next) => {
    const { _id, locationName, capacity } = req.body; // Include _id in the request body

    let location;

    try {
        location = new Location({ _id, locationName, capacity }); // Include _id when creating a new Location instance
        await location.save();
    } catch (err) {
        console.log(err);
    }

    // unable to add
    if (!location) {
        return res.status(400).json({ message: "Unable to add location" });
    }
    return res.status(200).json({ location });
};



//get by id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let location;

    try{
        location = await Location.findById(id);
    }catch(err){
        console.log(err);
    }
    //unable to display
    if(!location){
        return res.status(400).json({message:"unable to find location"});
    }
    return res.status(200).json({location});
};

//update
const updateLocation = async(req,res,next) =>{
    const id = req.params.id;
    const{locationName,capacity}= req.body;

    let location;

    try{
        location = await Location.findByIdAndUpdate(id,
            {locationName:locationName, capacity:capacity});
            location = await location.save();
    }catch(err){
        console.log(err);
    }

    //unable to update
    if(!location){
        return res.status(400).json({message:"unable to update location"});
    }
    return res.status(200).json({location});
};

//delete
const deleteLocation = async(req,res,next)=>{
    const id = req.params.id;

    let location;

    try{
        location = await Location.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    //unable to update
    if(!location){
        return res.status(400).json({message:"unable to delete paddy"});
    }
    return res.status(200).json({location});
};

const getAllLocationNames = async (req, res, next) => {
    let locations;

    try {
        locations = await Location.find({}, 'locationName'); // Only fetch locationName field
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }

    // Check if locations exist
    if (!locations || locations.length === 0) {
        return res.status(404).json({ message: "Locations not found" });
    }

    // Extract location names
    const locationNames = locations.map(location => location.locationName);
    return res.status(200).json({ locationNames });
};

exports.getAllLocation = getAllLocation;
exports.addLocation = addLocation;
exports.getById = getById;
exports.updateLocation = updateLocation;
exports.deleteLocation = deleteLocation;
exports.getAllLocationNames = getAllLocationNames;