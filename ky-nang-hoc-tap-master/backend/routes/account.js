const express = require("express");
const router = express.Router();
const { login, register, getAccounts } = require("../controllers/accountCon");

// Endpoint lấy danh sách accounts
router.get("/", getAccounts);

// Endpoint đăng nhập
router.post("/login", login);

// Endpoint đăng ký
router.post("/add", register);

module.exports = router;