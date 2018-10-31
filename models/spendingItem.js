const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spendingItemSchema = new Schema({
    decription: String,
    category: String,
    amount: Number,
    vendorId: String,
    date: Date
});

module.exports = mongoose.model("SpendingItem", spendingItemSchema);