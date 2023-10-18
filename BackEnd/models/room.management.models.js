const mongoose = require("mongoose");
const db = require("../configDB/db");

const roomSchema = new mongoose.Schema({
  floor: String,
  roomNumber: String,
  type: String,
  cost: String,
  quantity: String,
});

const Room_info = mongoose.model("Room_info", roomSchema);

module.exports = Room_info;
