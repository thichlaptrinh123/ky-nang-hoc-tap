const express = require("express");
const router = express.Router();
const { Result } = require("../model/model");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
    try {
        const results = await Result.find().populate("userId").populate("testId");
        res.status(200).json(results);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách kết quả:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
});

router.post("/save-result", async (req, res) => {
    try {
        const { userId, testId, result } = req.body;

        // Kiểm tra nếu thiếu dữ liệu
        if (!userId || !testId || !result) {
            return res.status(400).json({ message: "Thiếu thông tin cần thiết." });
        }

        // Kiểm tra ObjectId hợp lệ
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(testId)) {
            return res.status(400).json({ message: "userId hoặc testId không hợp lệ." });
        }

        // Kiểm tra xem kết quả đã tồn tại chưa
        const existingResult = await Result.findOne({ userId, testId });
        if (existingResult) {
            // Ghi đè kết quả cũ
            existingResult.result = result;
            await existingResult.save();
            return res.status(200).json({
                message: "Cập nhật kết quả thành công.",
                result: existingResult,
            });
        }

        // Nếu chưa tồn tại, tạo kết quả mới
        const newResult = new Result({ userId, testId, result });
        await newResult.save();

        res.status(201).json({
            message: "Lưu kết quả thành công.",
            result: newResult,
        });
    } catch (error) {
        console.error("Lỗi khi lưu kết quả:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
});

router.get("/check-result/:userId/:testId", async (req, res) => {
    try {
        const { userId, testId } = req.params;

        // Kiểm tra ObjectId hợp lệ
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(testId)) {
            return res.status(400).json({ message: "userId hoặc testId không hợp lệ." });
        }

        // Tìm kết quả bài test
        const result = await Result.findOne({ userId, testId });
        if (result) {
            return res.status(200).json({
                message: "Đã hoàn thành bài test.",
                result: result,
            });
        }

        res.status(404).json({ message: "Chưa làm bài test." });
    } catch (error) {
        console.error("Lỗi khi kiểm tra kết quả:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
});

module.exports = router;