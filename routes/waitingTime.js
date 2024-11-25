const express = require("express");
const { waitingTime } = require("../controllers/waitingTimeController");

const router = express.Router();

// Route για την προσθήκη νέας παραγγελίας
router.post("/newWaitingTime", waitingTime);

module.exports = router;
