const express = require("express");
const router = express.Router();
const Form = require("../models/Form");
const upload = require("../config/cloudinary");

// Save form with file uploads (files optional for testing)
router.post("/submit", (req, res, next) => {
  // Make file upload optional
  const uploadMiddleware = upload.fields([
    { name: "resultFile", maxCount: 1 },
    { name: "aadharFile", maxCount: 1 }
  ]);
  
  uploadMiddleware(req, res, (err) => {
    if (err) {
      console.error("❌ Upload Error:", err.message);
      // Continue anyway without files
      console.log("⚠️  Continuing without file upload");
    }
    next();
  });
}, async (req, res) => {
  try {
    console.log("=== Received Request ===");
    console.log("Body keys:", Object.keys(req.body));
    console.log("Body.formData:", req.body.formData);
    console.log("Files:", req.files);
    
    if (!req.body.formData) {
      console.log("❌ No formData in request body");
      return res.status(400).json({ error: "No formData provided", success: false });
    }
    
    let formData;
    try {
      formData = JSON.parse(req.body.formData);
      console.log("✓ Parsed formData successfully");
      console.log("Student Name:", formData.studentName);
      console.log("Family Members count:", formData.familyMembers?.length);
      console.log("Students count:", formData.students?.length);
    } catch (parseError) {
      console.log("❌ JSON Parse Error:", parseError.message);
      return res.status(400).json({ error: "Invalid JSON in formData", success: false });
    }
    
    if (req.files && req.files.resultFile) {
      formData.resultFile = req.files.resultFile[0].path;
      console.log("✓ Result file uploaded:", formData.resultFile);
    }
    
    if (req.files && req.files.aadharFile) {
      formData.aadharFile = req.files.aadharFile[0].path;
      console.log("✓ Aadhar file uploaded:", formData.aadharFile);
    }
    
    console.log("=== Saving to database ===");
    console.log(JSON.stringify(formData, null, 2));
    
    const newForm = new Form(formData);
    const savedForm = await newForm.save();
    console.log("✓ Saved to database successfully with ID:", savedForm._id);
    
    res.json({ message: "Form saved successfully", success: true, id: savedForm._id });
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Stack:", error.stack);
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

// Test route without files
router.post("/test", async (req, res) => {
  try {
    console.log("=== Test Route (no files) ===");
    console.log("Body:", req.body);
    
    const newForm = new Form(req.body);
    await newForm.save();
    console.log("✓ Test data saved");
    
    res.json({ message: "Test data saved", success: true });
  } catch (error) {
    console.error("❌ Test Error:", error.message);
    res.status(500).json({ error: error.message, success: false });
  }
});

module.exports = router;