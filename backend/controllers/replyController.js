import Reply from "../models/replyModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const getThreadReplies = asyncHandler(async (req, res) => {
  const replies = await Reply.find({ thread: req.thread._id, replyto: null });
  res.json(replies);
});

const getReplyReplies = asyncHandler(async (req, res) => {
  const replies = await Reply.find({ replyto: req.reply._id });
  res.json(replies);
});
const replies = null;
const CreateReply = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (req.reply){
      replies = req.reply._id;
  }
  if (!content) {
    res.status(400);
    throw new Error("Don't leave any field empty");
  } else {
    const reply = new Reply({
      content,
      user: req.user._id,
      thread: req.thread._id,
      replies: replies
    });
    const generatedReply = await reply.save();
    res.status(201).json(generatedReply);
  }
});

const DeleteReply = asyncHandler(async (req, res) => {
  const reply = await Reply.findById(req.params.id);
  if (reply.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }
  if (reply) {
    await Reply.deleteOne({ _id: reply._id });
    res.json({ message: "Comment deleted" });
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
});

const UpdateReply = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const reply = await Reply.findById(req.params.id);
  if (reply.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (reply) {
    reply.content = content;
    const updatedReply = await reply.save();
    res.json(updatedReply);
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
});

export {
  getThreadReplies,
  getReplyReplies,
  CreateReply,
  DeleteReply,
  UpdateReply,
};
