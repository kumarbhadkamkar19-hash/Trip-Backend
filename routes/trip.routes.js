const router = require("express").Router();
const ctrl = require("../controllers/trip.controller");

// CREATE TRIP
router.post("/create", ctrl.createTrip);

// GET ALL TRIPS
router.get("/getAllTrip", ctrl.getAllTrip);

// GET ONE TRIP
router.get("/getOneTrip/:id", ctrl.getOneTrip);

// TRIP SUMMARY
router.get("/summary/:id", ctrl.getTripSummary);

// DELETE TRIP
router.delete("/delete/:id", ctrl.deleteTrip);

module.exports = router;
