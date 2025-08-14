const mongoose = require('mongoose');

const InterfaceLogSchema = new mongoose.Schema({
  interfaceName: { type: String, required: true },
  integrationKey: { type: String, required: true },
  status: {
    type: String,
    enum: ['Success', 'Failure', 'Warning'],
    required: true
  },
  message: String,
  createdAt: { type: Date, default: Date.now }
});

InterfaceLogSchema.index({ createdAt: 1 });

module.exports = mongoose.model('InterfaceLog', InterfaceLogSchema);
