const User = require('../models/User');

exports.getResume = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ resume: user.resume, selectedTemplate: user.selectedTemplate });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.saveResume = async (req, res) => {
  try {
    const { resume } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: { resume } },
      { new: true, runValidators: false }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ resume: user.resume, selectedTemplate: user.selectedTemplate });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateTemplate = async (req, res) => {
  try {
    const { template } = req.body;
    if (!['modern', 'classic', 'minimal'].includes(template))
      return res.status(400).json({ message: 'Invalid template' });
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: { selectedTemplate: template } },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ selectedTemplate: user.selectedTemplate });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
