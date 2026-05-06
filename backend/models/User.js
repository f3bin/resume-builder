const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  startDate: String,
  endDate: String,
  description: String,
}, { _id: false });

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  startYear: String,
  endYear: String,
  field: String,
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  selectedTemplate: { type: String, enum: ['modern', 'classic', 'minimal'], default: 'modern' },
  resume: {
    personalInfo: {
      name: { type: String, default: '' },
      title: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
    },
    summary: { type: String, default: '' },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [String],
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
