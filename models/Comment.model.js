const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const commentSchema = new Schema(
  {
    _id: ObjectId,
    commenter: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: [true, 'Content is required.']
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    guide: ObjectId,
  },
  {
    //object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

module.exports = model("comment", commentSchema);
