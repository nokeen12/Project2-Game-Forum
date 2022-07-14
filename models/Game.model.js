const { Schema, model } = require("mongoose");
const { title } = require("process");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const gameSchema = new Schema(
  {
    title: {
        type: String,
        required: [true, 'Title is required.'],
        unique: true
      },
    titleLink:{
      type: String,
      // required: true,
      unique: true
    },
    developers: {
      type: String, 
      required: true,
    },
    publishers:{
        type: String,
        required: true
    },
    composers:{
        type: String
    },
    genre:{
        type: String,
        required: true
    },
    platforms:{
        type: String,
    },
    description: {
      type: String,
      required: [true, 'Content is required.']
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    }
  },
  {
    //object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

module.exports = model("Game", gameSchema);
