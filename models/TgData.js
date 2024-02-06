const mongoose = require("mongoose");

const tgDataSchema = new mongoose.Schema({
  channelId: {
    type: String,
    maxlength: [100],
    required: [true],
  },
  description: {
    type: String,
    maxlength: [2000],
  },
  addDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = mongoose.model("dataList", tgDataSchema);
