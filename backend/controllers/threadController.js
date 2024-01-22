import Thread from "../models/threadModel.js"
import asyncHandler from "../middleware/asyncHandler.js";

const getThreads = asyncHandler(async (req, res) => {
  const threads = await Thread.find({ user: req.user._id })
  res.json(threads)
})

const getAllThreads = asyncHandler(async (req, res) => {
  var date = new Date().getDate();
  var month = new Date().getMonth();
  var year = new Date().getFullYear();
  var halfyearly = new Date(year, month - 6, date);
  const finaldump = await Thread.find({ createdAt: { $gte: halfyearly } }).limit(50).sort({ createdAt: -1 });
  res.json(finaldump)
})

const getThreadById = asyncHandler(async (req, res) => {
  const thread = await Thread.findById(req.params.id)
  if (thread) {
    res.status(200).json(thread)
  } else {
    res.status(404).json({ message: "Thread not found" })
  }
})

const CreateThread = asyncHandler(async (req, res) => {
  const { title, content } = req.body
  if (!title || !content) {
    res.status(400);
    throw new Error("Don't leave any field empty")
  } else {
    const thread = new Thread({ user: req.user._id, title, content })
    const createdThread = await thread.save()
    res.status(201).json(createdThread)
  }
})

const DeleteThread = asyncHandler(async (req, res) => {
  const thread = await Thread.findById(req.params.id)
  if (thread.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error("You can't perform this action")
  }
  if (thread) {
    await Thread.deleteOne({ _id: thread._id })
    res.json({ message: "Thread deleted" })
  } else {
    res.status(404)
    throw new Error("Thread not found")
  }
})

const UpdateThread = asyncHandler(async (req, res) => {
  const { title, content } = req.body
  const thread = await Thread.findById(req.params.id)
  if (thread.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error("You can't perform this action")
  }

  if (thread) {
    thread.title = title
    thread.content = content
    const updatedThread = await thread.save()
    res.json(updatedThread)
  } else {
    res.status(404)
    throw new Error("Thread not found")
  }
})

export { getThreadById, getThreads, CreateThread, DeleteThread, UpdateThread, getAllThreads }
