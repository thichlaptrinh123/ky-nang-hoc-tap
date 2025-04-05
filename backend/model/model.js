const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userData = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  desc: {
    type: String,
  },
  link: {
    type: String,
  },
  background: {
    type: String,
  },
  createUser: {
    type: String,
  },
  theme: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theme",
    },
  ],
});
const accountData = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    default: "Người dùng", // Giá trị mặc định
  },
  phone: {
    type: String,
    required: true,
    minlength: 6,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Kiểm tra định dạng email
      },
      message: (props) => `${props.value} không phải là email hợp lệ!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

// Schema cho collection posts
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      trim: true, // Loại bỏ khoảng trắng thừa
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);



userData.plugin(mongoosePaginate);
const Post = mongoose.model("Post", postSchema);
const account = mongoose.model("account", accountData);

module.exports = { account, Post };
