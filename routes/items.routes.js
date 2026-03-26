const router = require("express").Router();
const ctrl = require("../controllers/items.controller");

// ADD ITEM TO TRIP
router.post("/add/:tripId", ctrl.addItem);

// DELETE ITEM
router.delete("/delete/:id", ctrl.deleteItem);

// UPDATE ITEM STATUS (Collected true/false)
router.patch("/toggle/:id", ctrl.toggleCollected);

module.exports = router;
