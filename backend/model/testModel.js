const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    questions: [
      {
        question: { type: String, required: true },  // Câu hỏi
        options: [
          {
            label: { type: String, required: true }, // A hoặc B
            text: { type: String, required: true },  // Nội dung câu trả lời
            value: { type: String, required: true }, // Ví dụ: "E", "I", "S", "N", ...
          },
        ],
      },
    ],
    results: [
      {
        type: { type: String, required: true },         // Ví dụ: INFJ, ESTP,...
        description: { type: String, required: true },  // Mô tả nhóm tính cách
      },
    ],
  }, { timestamps: true });

module.exports = mongoose.model.tests|| mongoose.model ('tests', testSchema)