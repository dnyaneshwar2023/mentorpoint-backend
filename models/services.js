import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema(
  {
    mentor_id: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    mentor_name: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    fee: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["created", "inProgress", "over"],
      default: "created",
    },
    is_deleted: { type: Boolean, trim: true, default: false },
    rating: [String],
    feedback: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("services", servicesSchema);
