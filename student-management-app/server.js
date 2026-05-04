
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware - Order matters!
app.use(cors());
app.use(express.json()); // Essential to read the data you send from Angular

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 2. Schema
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String
});
const Student = mongoose.model('Student', studentSchema);

// 3. Routes
app.get('/api/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.post('/api/students', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));




