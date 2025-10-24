const fs = require('fs');
const path = require('path');

try {
    const csvPath = path.join(__dirname, 'students_data_2.0.csv');

    if (!fs.existsSync(csvPath)) {
        console.error('❌ CSV file not found! Please check the file name and location.');
        process.exit(1);
    }

    const csv = fs.readFileSync(csvPath, 'utf8');
    const lines = csv.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim());

    const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj = {};
        headers.forEach((h, i) => {
            obj[h] = values[i];
        });
        return obj;
    });

    const outputPath = path.join(__dirname, 'students.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log('✅ CSV converted to students.json successfully!');
} catch (err) {
    console.error('❌ Error converting CSV to JSON:', err);
}
