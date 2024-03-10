import mongoose from "mongoose"

const replySchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Thread",
    },
    replyto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
    },
  },
  {
    timestamps: true,
  }
)

const Reply = mongoose.model("Reply", replySchema)

export default Reply