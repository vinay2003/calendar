const XLSX = require('xlsx');
const fs = require('fs');

try {
    const workbook = XLSX.readFile('/Users/vinaysharma/Desktop/Calender/2026-calendar.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert to JSON to see content structure
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    console.log("Sheet Name:", sheetName);
    console.log("Dimensions:", sheet['!ref']);
    console.log("First 10 rows:");
    console.log(JSON.stringify(data.slice(0, 10), null, 2));
} catch (e) {
    console.error("Error reading file:", e);
}
