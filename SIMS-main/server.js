const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
const dataFile = path.join(__dirname, "students.json");

app.use(express.json());
app.use(express.static("public"));

if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "[]", "utf8");

app.get("/students", (req, res) => {
    try {
        const data = fs.readFileSync(dataFile, "utf8");
        const students = JSON.parse(data || "[]");
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: "Failed to read student data." });
    }
});

app.post("/students", (req, res) => {
    try {
        const data = fs.readFileSync(dataFile, "utf8");
        const students = JSON.parse(data || "[]");
        students.push(req.body);
        fs.writeFileSync(dataFile, JSON.stringify(students, null, 2));
        res.json({ message: "✅ Student added successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to add student." });
    }
});

app.delete("/students/:id", (req, res) => {
    try {
        const id = req.params.id;
        let students = JSON.parse(fs.readFileSync(dataFile, "utf8") || "[]");
        const initialLength = students.length;
        students = students.filter((s) => s.id !== id && s["Student ID"] !== id);
        if (students.length === initialLength) {
            return res.status(404).json({ error: "Student not found" });
        }
        fs.writeFileSync(dataFile, JSON.stringify(students, null, 2));
        res.json({ message: "🗑️ Student deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete student." });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
