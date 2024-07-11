const Relationship = require("../Model/PaddyWarehouseModel"); // Assuming you have a Relationship model defined

// Controller function to create a relationship between paddy and location
const createRelationship = async (req, res) => {
  const { paddyId, locationId } = req.body;

  try {
    // Create a new relationship document
    const relationship = new Relationship({
      firstDBId: paddyId,
      secondDBId: locationId,
    });

    // Save the relationship document to the database
    await relationship.save();

    res.status(201).json({ message: "Relationship created successfully" });
  } catch (error) {
    console.error("Error creating relationship:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createRelationship,
};
