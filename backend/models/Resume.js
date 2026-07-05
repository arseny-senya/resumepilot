import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "Untitled Resume",
      trim: true,
    },

    template: {
      type: String,
      default: "modern",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    isPro: {
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true },
);

export default mongoose.model("Resume", resumeSchema);
