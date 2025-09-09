import mongoose, { Schema } from "mongoose";

const bulletinSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    subHeading: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
    imageUrl:{
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Bulletin = mongoose.model("Bulletin", bulletinSchema);

export default Bulletin;
