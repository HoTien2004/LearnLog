import express from "express";
const router = express.Router();
import verifyToken from "../middleware/auth.js";
import Post from "../models/Post.js";

// @route GET /api/posts
// @desc Get posts
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @route POST /api/posts
// @desc Create a new post
// @access Private
router.post("/", verifyToken, async (req, res) => {
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
      user: req.userId,
    });

    await newPost.save();
    res.json({ success: true, message: "Happy learning", post: newPost });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @route PUT /api/posts
// @desc Update post
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }

  try {
    let updatedPost = {
      title,
      description: description || ``,
      url: (url.startsWith(`https://`) ? url : `https://${url}`) || ``,
      status: status || "TO LEARN",
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    // User not authorized to update post or post not found
    if (!updatedPost) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this post",
      });
    }

    res.json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @route DELETE /api/posts
// @desc Delete post
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    // User not authorized to delete post or post not found
    if (!deletedPost) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this post",
      });
    }

    res.json({ success: true, message: "Deleted successful", post: deletedPost });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
