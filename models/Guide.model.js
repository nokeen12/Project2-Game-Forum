const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const guideSchema = new Schema(
  {
    creator: {
      type: String,
      trim: true, //gets rid of space 
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required.'],
    },
    body: {
      type: String,
      required: [true, 'Content is required.']
    },
    gameTitle: {
      type: String,
      required: [true, 'Game is required']
    },
    rating: {
      type: Number,
      required: true,
      default: 0
  },
    comments: {
      type: Array
    }
  },
  {
    //object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

module.exports = model("Guide", guideSchema);
