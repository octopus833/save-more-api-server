const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    name: String
});

module.exports = mongoose.model("Vendor", vendorSchema);