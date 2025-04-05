const express = require("express");
const router = express.Router();
const { Post } = require("../model/model");

// API lấy danh sách bài viết
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
});

module.exports = router;