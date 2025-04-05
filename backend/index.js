const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors
const accountRoutes = require("./routes/account");

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
  .then(() => console.log("Kết nối thành công đến MongoDB"))
  .catch((error) => console.error("Lỗi kết nối MongoDB:", error));

// Định nghĩa router
app.use("/v1/account", accountRoutes);

// Khởi động server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});