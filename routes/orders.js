const express = require("express");
const { addOrder } = require("../controllers/orderController");

const router = express.Router();

// Route για την προσθήκη νέας παραγγελίας
router.post("/new", addOrder);

module.exports = router;
