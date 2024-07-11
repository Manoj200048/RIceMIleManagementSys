const Text = require("../Model/InstructionModel");

exports.getText = async (req, res) => {
    try {
      const text = await Text.findOne();
      res.json({ content: text ? text.content : '' });
    } catch (error) {
      console.error('Error fetching text:', error);
      res.status(500).json({ error: 'Failed to fetch text' });
    }
  };
  
exports.saveText = async (req, res) => {
    try {
      const { text } = req.body;
      let newText = await Text.findOne();
      if (!newText) {
        newText = new Text({
          content: text,
        });
      } else {
        newText.content = text;
      }
      await newText.save();
      res.status(201).json({ message: 'Text saved successfully' });
    } catch (error) {
      console.error('Error saving text:', error);
      res.status(500).json({ error: 'Failed to save text' });
    }
  };