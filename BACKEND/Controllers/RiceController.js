const Rice = require("../Model/RiceModel");

const getAllRice = async (req, res, next) => {
  let rice;

  try {
    rice = await Rice.find();
  } catch (err) {
    console.log(err);
  }
  //no paddy
  if (!rice) {
    return res.status(404).json({ message: "Rice not found" });
  }

  //display
  return res.status(200).json({ rice });
};

//data insert
const addRice = async (req, res, next) => {
  const { variety, description, MFD, EXD, price, weight } = req.body;

  let rice;

  try {
    rice = new Rice({ variety, description, MFD, EXD, price, weight });
    await rice.save();
  } catch (err) {
    console.log(err);
  }

  //unable to add
  if (!rice) {
    return res.status(400).json({ message: "unable to add rice" });
  }
  return res.status(200).json({ rice });
};

//get by id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let rice;

  try {
    rice = await Rice.findById(id);
  } catch (err) {
    console.log(err);
  }
  //unable to display
  if (!rice) {
    return res.status(400).json({ message: "unable to find rice" });
  }
  return res.status(200).json({ rice });
};

//update
const updateRice = async (req, res, next) => {
  const id = req.params.id;
  const { variety, description, MFD, EXD, price, weight } = req.body;

  let rice;

  try {
    rice = await Rice.findByIdAndUpdate(id, {
      variety: variety,
      description: description,
      MFD: MFD,
      EXD: EXD,
      price: price,
      weight: weight,
    });
    rice = await rice.save();
  } catch (err) {
    console.log(err);
  }

  //unable to update
  if (!rice) {
    return res.status(400).json({ message: "unable to update rice" });
  }
  return res.status(200).json({ rice });
};

//delete
const deleteRice = async (req, res, next) => {
  const id = req.params.id;

  let rice;

  try {
    rice = await Rice.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  //unable to update
  if (!rice) {
    return res.status(400).json({ message: "unable to delete rice" });
  }
  return res.status(200).json({ rice });
};

exports.getAllRice = getAllRice;
exports.getById = getById;
exports.addRice = addRice;
exports.updateRice = updateRice;
exports.deleteRice = deleteRice;
