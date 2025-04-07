const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Feedback = require("../model/Feedback"); // Import model Feedback

// Lưu phản hồi
router.post("/save-feedback", async (req, res) => {
  try {
    const { userId, testId, feedback } = req.body;

    // Kiểm tra nếu thiếu dữ liệu
    if (!userId || !testId || !feedback) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết." });
    }

    // Kiểm tra ObjectId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(400).json({ message: "userId hoặc testId không hợp lệ." });
    }

    // Lưu phản hồi
    const newFeedback = new Feedback({ userId, testId, feedback });
    await newFeedback.save();

    res.status(201).json({ message: "Phản hồi đã được lưu thành công.", feedback: newFeedback });
  } catch (error) {
    console.error("Lỗi khi lưu phản hồi:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Lấy danh sách phản hồi
router.get("/get-feedbacks/:testId", async (req, res) => {
  try {
    const { testId } = req.params;

    // Kiểm tra ObjectId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(400).json({ message: "testId không hợp lệ." });
    }

    // Lấy danh sách phản hồi
    const feedbacks = await Feedback.find({ testId }).populate("userId", "fullname"); // Lấy "fullname" từ model "account"

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Lỗi khi lấy phản hồi:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
});


// Lấy tất cả phản hồi
router.get("/get-all-feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("userId", "fullname email");

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Lỗi khi lấy phản hồi:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
});


module.exports = router;