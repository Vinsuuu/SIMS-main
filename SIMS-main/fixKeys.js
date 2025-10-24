const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'students.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const fixed = data.map((s) => ({
    id: s['Student ID'],
    fullName: s['Full Name'],
    gender: s['Gender'],
    gmail: s['Gmail'],
    program: s['Program'],
    yearLevel: s['Year Level'],
    university: s['University']
}));

fs.writeFileSync(file, JSON.stringify(fixed, null, 2));
console.log('✅ Fixed keys and saved back to students.json');
