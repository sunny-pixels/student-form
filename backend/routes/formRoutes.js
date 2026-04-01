const express = require("express");
const router = express.Router();
const Form = require("../models/Form");

// Save form
router.post("/submit", async (req, res) => {
  try {
    console.log("Received data");
    const newForm = new Form(req.body);
    await newForm.save();
    console.log("Saved to database");
    
    res.json({ message: "Form saved successfully", success: true });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message, success: false });
  }
});

// Get all data (for admin later)
router.get("/all", async (req, res) => {
  try {
    const data = await Form.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;