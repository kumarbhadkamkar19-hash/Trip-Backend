const Item = require("../models/items.model");
const Trip = require("../models/trip.model");

// ADD ITEM
exports.addItem = async (req, res) => {
  try {
    const { itemName } = req.body;
    const { tripId } = req.params;

    if (!itemName)
      return res.status(400).json({ message: "Item name required" });

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    const item = await Item.create({
      itemName,
      tripId,
    });

    await Trip.findByIdAndUpdate(tripId, {
      $push: { items: item._id },
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE ITEM
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    await Trip.findByIdAndUpdate(item.tripId, {
      $pull: { items: item._id },
    });

    await item.deleteOne();

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE COLLECTED
exports.toggleCollected = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.isCollected = !item.isCollected;
    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
