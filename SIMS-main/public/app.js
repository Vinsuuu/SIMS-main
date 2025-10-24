const tableBody = document.getElementById("studentsTableBody");
const form = document.getElementById("studentForm");
const searchInput = document.getElementById("searchInput");
const limitSelect = document.getElementById("limitSelect");
const filterProgram = document.getElementById("filterProgram");
const filterGender = document.getElementById("filterGender");

const programsList = [
    "BACHELOR OF ARTS IN SOCIOLOGY (AB-SOCIO)",
    "BACHELOR OF ELEMENTARY EDUCATION (BEED)",
    "BACHELOR OF SCIENCE IN ACCOUNTANCY (BSA)",
    "BACHELOR OF SCIENCE IN AGRICULTURAL AND BIOSYSTEMS ENGINEERING (BSABE)",
    "BACHELOR OF SCIENCE IN AGRICULTURE (BSA)",
    "BACHELOR OF SCIENCE IN AGRICULTURE MAJOR IN AGRIBUSINESS MANAGEMENT (BSA-AGRI)",
    "BACHELOR OF SCIENCE IN AGRICULTURE MAJOR IN AGRICULTURAL ECONOMICS (BSA-AGECON)",
    "BACHELOR OF SCIENCE IN AGRICULTURE MAJOR IN AGRONOMY (BSA-AGRON)",
    "BACHELOR OF SCIENCE IN AGRICULTURE MAJOR IN ANIMAL SCIENCE (BSA-ANSCI)",
    "BACHELOR OF SCIENCE IN AGRICULTURE MAJOR IN CROP PROTECTION (BSA-CROPPROT)",
    "BACHELOR OF SCIENCE IN AGRICULTURE MAJOR IN HORTICULTURE (BSA-HORTI)",
    "BACHELOR OF SCIENCE IN AGRICULTURE MAJOR IN SOIL SCIENCE (BSA-SOILSCI)",
    "BACHELOR OF SCIENCE IN AGROFORESTRY (BSAF)",
    "BACHELOR OF SCIENCE IN APPLIED MATHEMATICS (BSAM)",
    "BACHELOR OF SCIENCE IN BIOLOGY (BSBIO)",
    "BACHELOR OF SCIENCE IN BIOLOGY MAJOR IN BIODIVERSITY CONSERVATION (BSBIO BIOCON)",
    "BACHELOR OF SCIENCE IN BIOLOGY MAJOR IN ENTOMOLOGY (BSBIO-ENT)",
    "BACHELOR OF SCIENCE IN BIOLOGY MAJOR IN MEDICAL BIOLOGY (BSBIO MEDBIO)",
    "BACHELOR OF SCIENCE IN BIOLOGY MAJOR IN MICROBIOLOGY (BSBIO MICRO)",
    "BACHELOR OF SCIENCE IN BIOLOGY MAJOR IN PLANT BIOLOGY (BSBIO PLANTBIO)",
    "BACHELOR OF SCIENCE IN BUSINESS ADMINISTRATION MAJOR IN FINANCIAL MANAGEMENT (BSBA-FM)",
    "BACHELOR OF SCIENCE IN BUSINESS ADMINISTRATION MAJOR IN HUMAN RESOURCE MANAGEMENT (BSBA-HRM)",
    "BACHELOR OF SCIENCE IN BUSINESS ADMINISTRATION MAJOR IN MARKETING MANAGEMENT (BSBA-MM)",
    "BACHELOR OF SCIENCE IN CHEMISTRY (BSCHEM)",
    "BACHELOR OF SCIENCE IN CIVIL ENGINEERING (BSCE)",
    "BACHELOR OF SCIENCE IN CIVIL ENGINEERING WITH SPECIALIZATION IN STRUCTURAL ENGINEERING (BSCE-SE)",
    "BACHELOR OF SCIENCE IN COMPUTER ENGINEERING (BSCpE)",
    "BACHELOR OF SCIENCE IN COMPUTER SCIENCE (BSCS)",
    "BACHELOR OF SCIENCE IN ELECTRICAL ENGINEERING (BSEE)",
    "BACHELOR OF SCIENCE IN ELECTRONICS ENGINEERING (BSEcE)",
    "BACHELOR OF SCIENCE IN ENTREPRENEURSHIP (BSEntrep)",
    "BACHELOR OF SCIENCE IN ENVIRONMENTAL SCIENCE (BSES)",
    "BACHELOR OF SCIENCE IN FORESTRY (BSF)",
    "BACHELOR OF SCIENCE IN GEODETIC ENGINEERING (BSGE)",
    "BACHELOR OF SCIENCE IN GEOLOGY (BSGeol)",
    "BACHELOR OF SCIENCE IN HOSPITALITY MANAGEMENT (BSHM)",
    "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY MAJOR IN ARCHITECTURAL DRAFTING TECHNOLOGY (BS IndTech ADT)",
    "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY MAJOR IN AUTOMOTIVE TECHNOLOGY (BS IndTech AT)",
    "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY MAJOR IN CIVIL AND CONSTRUCTION TECHNOLOGY (BS IndTech CCT)",
    "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY MAJOR IN ELECTRICAL TECHNOLOGY (BS IndTech ELT)",
    "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY MAJOR IN ELECTRONICS TECHNOLOGY (BS IndTech ELX)",
    "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY MAJOR IN FOOD AND SERVICE MANAGEMENT (BS IndTech FSM)",
    "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY MAJOR IN GARMENTS, FASHION AND DESIGN (BS IndTech GFD)",
    "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY MAJOR IN WELDING AND FABRICATION TECHNOLOGY (BS IndTech WFT)",
    "BACHELOR OF SCIENCE IN INFORMATION SYSTEM (BSIS)",
    "BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY (BSINFOTECH)",
    "BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY (BSIT)",
    "BACHELOR OF SCIENCE IN MANAGEMENT ACCOUNTING (BSMA)",
    "BACHELOR OF SCIENCE IN MARINE BIOLOGY (BS Marine Bio)",
    "BACHELOR OF SCIENCE IN MATHEMATICS (BSMATH)",
    "BACHELOR OF SCIENCE IN MINING ENGINEERING (BSEM)",
    "BACHELOR OF SCIENCE IN OFFICE ADMINISTRATION (BSOA)",
    "BACHELOR OF SCIENCE IN PHYSICS (BS-PHYS)",
    "BACHELOR OF SCIENCE IN PSYCHOLOGY (BS PSYCH)",
    "BACHELOR OF SCIENCE IN SOCIAL WORK (BSSW)",
    "BACHELOR OF SCIENCE IN TOURISM MANAGEMENT (BSTM)",
    "BACHELOR OF SECONDARY EDUCATION MAJOR IN ENGLISH (BSED ENG)",
    "BACHELOR OF SECONDARY EDUCATION MAJOR IN FILIPINO (BSED FIL)",
    "BACHELOR OF SECONDARY EDUCATION MAJOR IN MATHEMATICS (BSED-MATH)",
    "BACHELOR OF SECONDARY EDUCATION MAJOR IN SCIENCE (BSED SCI)",
    "BACHELOR OF TECHNICAL VOCATIONAL TEACHER EDUCATION MAJOR IN ARCHITECTURAL DRAFTING TECHNOLOGY (BTVTEd ADT)",
    "BACHELOR OF TECHNICAL VOCATIONAL TEACHER EDUCATION MAJOR IN AUTOMOTIVE TECHNOLOGY (BTVTEd AT)",
    "BACHELOR OF TECHNICAL VOCATIONAL TEACHER EDUCATION MAJOR IN CIVIL AND CONSTRUCTION TECHNOLOGY (BTVTEd CCT)",
    "BACHELOR OF TECHNICAL VOCATIONAL TEACHER EDUCATION MAJOR IN ELECTRICAL TECHNOLOGY (BTVTEd ELT)",
    "BACHELOR OF TECHNICAL VOCATIONAL TEACHER EDUCATION MAJOR IN ELECTRONICS TECHNOLOGY (BTVTEd ELX)",
    "BACHELOR OF TECHNICAL VOCATIONAL TEACHER EDUCATION MAJOR IN FOOD AND SERVICE MANAGEMENT (BTVTEd FSM)",
    "BACHELOR OF TECHNICAL VOCATIONAL TEACHER EDUCATION MAJOR IN GARMENTS, FASHION AND DESIGN (BTVTEd GFDT)",
    "BACHELOR OF TECHNICAL VOCATIONAL TEACHER EDUCATION MAJOR IN WELDING AND FABRICATION TECHNOLOGY (BTVTEd WFT)",
    "BACHELOR OF TECHNOLOGY AND LIVELIHOOD EDUCATION MAJOR IN HOME ECONOMICS (BTLEd HE)",
    "BACHELOR OF TECHNOLOGY AND LIVELIHOOD EDUCATION MAJOR IN INDUSTRIAL ARTS (BTLEd IA)",
    "TEACHERS CERTIFICATE PROGRAM (TCP)"
];

function populatePrograms() {
    const programSelect = document.getElementById("program");
    programsList.forEach((p) => {
        const opt1 = document.createElement("option");
        opt1.value = p;
        opt1.textContent = p;
        programSelect.appendChild(opt1);

        const opt2 = opt1.cloneNode(true);
        filterProgram.appendChild(opt2);
    });
}
populatePrograms();

async function loadStudents() {
    try {
        const res = await fetch("/students");
        const students = await res.json();

        const normalized = students.map((s) => ({
            id: s.id || s["Student ID"],
            fullName: s.fullName || s["Full Name"],
            gender: s.gender || s["Gender"],
            gmail: s.gmail || s["Gmail"],
            program: s.program || s["Program"],
            yearLevel: s.yearLevel || s["Year Level"],
            university: s.university || s["University"],
        }));

        const searchTerm = searchInput.value.toLowerCase();
        const selectedProgram = filterProgram.value;
        const selectedGender = filterGender.value;

        const filtered = normalized.filter((s) => {
            const matchesName = s.fullName?.toLowerCase().includes(searchTerm);
            const matchesProgram = !selectedProgram || s.program === selectedProgram;
            const matchesGender = !selectedGender || s.gender === selectedGender;
            return matchesName && matchesProgram && matchesGender;
        });

        const limit = parseInt(limitSelect.value);
        const limited = filtered.slice(0, limit);

        tableBody.innerHTML = "";

        if (limited.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="9" class="text-center py-4 text-gray-500">No students found</td></tr>`;
            return;
        }

        limited.forEach((s) => {
            const tr = document.createElement("tr");
            tr.classList.add("hover:bg-blue-50");
            tr.innerHTML = `
        <td class="border px-2 py-1">${s.id}</td>
        <td class="border px-2 py-1">${s.fullName}</td>
        <td class="border px-2 py-1">${s.gender}</td>
        <td class="border px-2 py-1">${s.gmail}</td>
        <td class="border px-2 py-1">${s.program}</td>
        <td class="border px-2 py-1">${s.yearLevel}</td>
        <td class="border px-2 py-1">${s.university}</td>
        <td class="border px-2 py-1 text-center">
          <button class="delete-btn bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded" data-id="${s.id}">Delete</button>
        </td>`;
            tableBody.appendChild(tr);
        });
    } catch (err) {
        console.error("Error loading students:", err);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = form.studentID.value.trim();
    const fullName = form.fullName.value.trim();
    const gender = form.gender.value.trim();
    const gmail = form.gmail.value.trim();
    const program = form.program.value.trim();
    const yearLevel = form.yearLevel.value.trim();
    const university = form.university.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const yearRegex = /^\d+$/;

    if (!id || !fullName || !gender || !gmail || !program || !yearLevel || !university) {
        alert("⚠️ Please fill in all fields.");
        return;
    }
    if (!emailRegex.test(gmail)) {
        alert("⚠️ Invalid email address.");
        return;
    }
    if (!yearRegex.test(yearLevel) || yearLevel < 1 || yearLevel > 5) {
        alert("⚠️ Year Level must be between 1 and 5.");
        return;
    }
    if (!["male", "female"].includes(gender.toLowerCase())) {
        alert("⚠️ Gender must be Male or Female.");
        return;
    }

    const student = { id, fullName, gender, gmail, program, yearLevel, university };

    try {
        const res = await fetch("/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student),
        });
        const data = await res.json();
        alert(data.message);
        form.reset();
        loadStudents();
    } catch (err) {
        console.error("Error adding student:", err);
    }
});

tableBody.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        if (confirm(`Delete student ${id}?`)) {
            const res = await fetch(`/students/${id}`, { method: "DELETE" });
            if (res.ok) loadStudents();
        }
    }
});

searchInput.addEventListener("input", loadStudents);
filterProgram.addEventListener("change", loadStudents);
filterGender.addEventListener("change", loadStudents);
limitSelect.addEventListener("change", loadStudents);

loadStudents();
