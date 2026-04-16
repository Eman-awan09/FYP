// src/controllers/eventController.js
const Event = require("../models/Event");

/**
 * ADMIN
 * POST /api/events
 * Body: { title, date, venue, ticketPrice, description }
 */
const createEvent = async (req, res, next) => {
  try {
    const { title, date, venue, ticketPrice, description } = req.body || {};

    if (!title || !date || !venue) {
      return res
        .status(400)
        .json({ message: "Title, date and venue are required." });
    }

    const event = await Event.create({
      title,
      date: new Date(date),
      venue,
      ticketPrice: ticketPrice || 0,
      description,
    });

    res.status(201).json({ message: "Event created", event });
  } catch (error) {
    next(error);
  }
};

/**
 * ADMIN
 * GET /api/events/admin
 * List all events (including inactive)
 */
const getAllEventsAdmin = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json({ events });
  } catch (error) {
    next(error);
  }
};

/**
 * PUBLIC (Student/Teacher/Admin)
 * GET /api/events
 * List only active upcoming/past events (as needed)
 */
const getPublicEvents = async (req, res, next) => {
  try {
    // For now, just isActive=true; you can also filter by date >= now if required
    const events = await Event.find({ isActive: true }).sort({ date: 1 });
    res.json({ events });
  } catch (error) {
    next(error);
  }
};

/**
 * ADMIN
 * GET /api/events/:id
 */
const getEventByIdAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.json({ event });
  } catch (error) {
    next(error);
  }
};

/**
 * ADMIN
 * PUT /api/events/:id
 * Full update
 */
const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, date, venue, ticketPrice, description, isActive } =
      req.body || {};

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (title !== undefined) event.title = title;
    if (date !== undefined) event.date = new Date(date);
    if (venue !== undefined) event.venue = venue;
    if (ticketPrice !== undefined) event.ticketPrice = ticketPrice;
    if (description !== undefined) event.description = description;
    if (typeof isActive === "boolean") event.isActive = isActive;

    await event.save();

    res.json({ message: "Event updated", event });
  } catch (error) {
    next(error);
  }
};

/**
 * ADMIN
 * DELETE /api/events/:id
 * Hard delete (you can choose to do soft delete by isActive instead)
 */
const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEvent,
  getAllEventsAdmin,
  getPublicEvents,
  getEventByIdAdmin,
  updateEvent,
  deleteEvent,
};