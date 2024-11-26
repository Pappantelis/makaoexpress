const express = require("express");
const { cancel } = require("../controllers/cancelController");

const router = express.Router();

// Route για την προσθήκη νέας παραγγελίας
router.post("/newCancel", cancel);

module.exports = router;
