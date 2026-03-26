const Trip = require("../models/trip.model");
const Item = require("../models/items.model");

// CREATE TRIP
exports.createTrip = async (req, res) => {
  try {
    const { title, description, location, startDate, endDate } = req.body;

    if (!title || !description || !location || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields required" });
    }

    const trip = await Trip.create({
      title,
      description,
      location,
      startDate,
      endDate,
      items: [],
    });

    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL TRIPS
exports.getAllTrip = async (req, res) => {
  try {
    const trips = await Trip.find().populate("items");
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE TRIP
exports.getOneTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate("items");

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE TRIP + ITS ITEMS

exports.deleteTrip = async (req, res) => {
  try {
    const id = req.params.id.trim(); // remove extra spaces
    const deletedTrip = await Trip.findByIdAndDelete(id);

    if (!deletedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TRIP SUMMARY API
exports.getTripSummary = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findById(id).populate("items");

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // counts
    const totalItems = trip.items.length;
    const collectedItems = trip.items.filter((i) => i.isCollected).length;
    const pendingItems = totalItems - collectedItems;

    // progress %
    const progress =
      totalItems === 0 ? 0 : Math.round((collectedItems / totalItems) * 100);

    // duration
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    // status
    const today = new Date();

    let status = "Upcoming";
    if (today >= start && today <= end) status = "Ongoing";
    if (today > end) status = "Completed";

    res.json({
      tripId: trip._id,
      title: trip.title,
      location: trip.location,
      startDate: trip.startDate,
      endDate: trip.endDate,
      totalDays,
      status,
      totalItems,
      collectedItems,
      pendingItems,
      progress,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
