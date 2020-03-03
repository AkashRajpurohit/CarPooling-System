module.exports = (message, data = {}, extra = {}) => ({
  success: true,
  ...extra,
  message,
  data
});