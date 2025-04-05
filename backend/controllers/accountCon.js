// filepath: c:\Users\Minh Nhat\Documents\KNLV\backend\controllers\accountCon.js
const { account } = require("../model/model");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await account.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại!" });
    }

    const isPasswordValid = user.password === password; // Thay bằng mã hóa nếu cần
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mật khẩu không đúng!" });
    }

    res.status(200).json({ message: "Đăng nhập thành công!", user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error });
  }
};

exports.register = async (req, res) => {
  const { fullname, phone, email, password } = req.body;

  try {
    // Kiểm tra nếu email đã tồn tại
    const existingEmail = await account.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email đã tồn tại!" });
    }

    // Kiểm tra nếu số điện thoại đã tồn tại
    const existingPhone = await account.findOne({ phone });
    if (existingPhone) {
      console.log("Số điện thoại đã tồn tại, nhưng vẫn tiếp tục đăng ký.");
    }

    // Tạo người dùng mới
    const newUser = new account({ fullname, phone, email, password });
    await newUser.save();
    res.status(201).json({ message: "Đăng ký thành công!", user: newUser });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error); // Ghi log lỗi chi tiết
    res.status(500).json({ message: "Lỗi server!", error });
  }
};

exports.getAccounts = async (req, res) => {
  try {
    const accounts = await account.find(); // Lấy tất cả tài khoản từ MongoDB
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error });
  }
};