const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors
const accountRoutes = require("./routes/account");
const testRoutes = require("./routes/test");
const { Post } = require("./model/model"); // Import model Post
require('./model/testModel');

dotenv.config();

const app = express();
app.use(express.json());

// Cấu hình CORS
app.use(cors({
  origin: "http://127.0.0.1:5500", // Cho phép frontend truy cập
  methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức được phép
  credentials: true, // Nếu cần gửi cookie
}));

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Kết nối thành công đến MongoDB");

    // Kiểm tra và thêm bài viết mẫu nếu collection posts trống
    const postCount = await Post.countDocuments();
    if (postCount === 0) {
      await Post.insertMany([
        {
          title: "Bài viết đầu tiên",
          image: "../img/post1.jpg",
          content: "Đây là nội dung của bài viết đầu tiên.",
          author: "Admin",
        },
        {
          title: "Bài viết thứ hai",
          image: "../img/post2.jpg",
          content: "Đây là nội dung của bài viết thứ hai.",
          author: "Admin",
        },
      ]);
      console.log("Đã thêm bài viết mẫu vào collection posts.");
    }
  })
  .catch((error) => console.error("Lỗi kết nối MongoDB:", error));

// Định nghĩa router cho tài khoản
app.use("/v1/account", accountRoutes);

// Định nghĩa router cho bài test
app.use("/v1/test", testRoutes);

const resultRoutes = require("./routes/results"); // Import route results

// Định nghĩa router cho kết quả
app.use("/v1/results", resultRoutes);

const feedbackRoutes = require("./routes/feedbacks");
app.use("/v1/feedbacks", feedbackRoutes);

// API lấy danh sách bài viết
app.get("/v1/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// API lấy chi tiết bài viết
app.get("/v1/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Khởi động server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});