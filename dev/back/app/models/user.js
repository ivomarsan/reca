const mongoose = require('mongoose');

module.exports = () => {

  const schema = mongoose.Schema(
    { user: String
    , pass: String
    , isAdm: Boolean
    , created_at: { type: Date, default: Date.now, index: true }
  });
  schema.index({ status: 1 })


  return mongoose.model('User', schema);
};
