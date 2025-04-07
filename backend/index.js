const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors
const accountRoutes = require("./routes/account");
const testRoutes = require("./routes/test");
const { Post } = require("./model/model"); // Import model Post
require('./model/testModel');



dotenv.config();

const allowedOrigins = [
  "https://tracnghiemtinhcach.online",
  "https://lively-froyo-728981.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Kết nối MongoDB
mongoose
  .connect("mongodb+srv://root:Ab123123@cluster0.kvcmndo.mongodb.net/Phong2DB?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Kết nối thành công đến MongoDB");
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
