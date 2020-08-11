const mongoose = require('mongoose');
const validatorModule = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Поле должно содержать значение'],
  },
  title: {
    type: String,
    required: [true, 'Поле должно содержать значение'],
  },
  text: {
    type: String,
    required: [true, 'Поле должно содержать значение'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    required: [true, 'Поле должно содержать значение'],
  },
  link: {
    type: String,
    validate: {
      validator: (v) => validatorModule.isURL(v),
      message: (props) => `"${props.value}" некорректный формат ссылки!`,
    },
    required: [true, 'Ссылка на статью обязательна'],
  },
  image: {
    type: String,
    validate: {
      validator: (v) => validatorModule.isURL(v),
      message: (props) => `"${props.value}" некорректный формат ссылки!`,
    },
    required: [true, 'Ссылка на иллюстрацию обязательна'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
