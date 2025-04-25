import express from "express";
const router = express.Router();
import Post from "../models/Post.js";

// @route POST /api/posts
// @desc Create a new post
// @access Private
router.post("/", async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith(`https://`) ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: `67fd329b1bf1f252b71482ea`,
    });

    await newPost.save();
    res.json({ success: true, message: "Happy learning", post: newPost });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
