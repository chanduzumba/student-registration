// Get elements
const addStudentBtn = document.querySelector('button');
const modal = document.getElementById('addStudentModal');
const cancelBtn = document.getElementById('cancelBtn');
const form = document.getElementById('addStudentForm');
// const deleteButtons = document.querySelectorAll('.delete-btn');
// const editButtons = document.querySelectorAll('.edit-btn');
const tableBody = document.querySelector("tbody");
const gridContainer = document.querySelector(".grid-view-container");
// Show modal on button click
addStudentBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

// Hide modal on cancel
cancelBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Hide modal on form submit (for now, just close)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Here you would handle form submission, e.g., add to table
  addStudentDetails();
  modal.classList.add('hidden');
  // Reset form
  form.reset();
});

//Delete student details (doesn't work yet, needs event delegation)
// deleteButtons.forEach(button => {
//   button.onclick((e) => {
//     const studentId = e.target.closest('tr').querySelector('td:nth-child(1)').textContent;
//     deleteStudentDetails(studentId);
//   });
// });

// Add students data to local storage
const students = JSON.parse(localStorage.getItem("Students")) || [
  {
    "studentId": 1001,
    "studentName": "Aarav Sharma",
    "studentEmail": "aarav.sharma@example.com",
    "studentContact": "9876543210"
  },
  {
    "studentId": 1002,
    "studentName": "Diya Patel",
    "studentEmail": "diya.patel@example.com",
    "studentContact": "9123456780"
  },
  {
    "studentId": 1003,
    "studentName": "Rohan Verma",
    "studentEmail": "rohan.verma@example.com",
    "studentContact": "9988776655"
  },
  {
    "studentId": 1004,
    "studentName": "Ananya Singh",
    "studentEmail": "ananya.singh@example.com",
    "studentContact": "9090909090"
  },
  {
    "studentId": 1005,
    "studentName": "Karan Mehta",
    "studentEmail": "karan.mehta@example.com",
    "studentContact": "9812345678"
  },
  {
    "studentId": 1006,
    "studentName": "Ishita Rao",
    "studentEmail": "ishita.rao@example.com",
    "studentContact": "9345678123"
  },
  {
    "studentId": 1007,
    "studentName": "Vikram Desai",
    "studentEmail": "vikram.desai@example.com",
    "studentContact": "9871234560"
  }
];
const setStudentDetails = () => localStorage.setItem("Students", JSON.stringify(students));

function displayStudentDetails() {
  const studentData = JSON.parse(localStorage.getItem("Students"));
  if (tableBody.children.length === 0 && studentData.length)
  studentData.forEach(student => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border border-gray-600 px-4 py-4 text-gray-300">${student.studentId}</td>
      <td class="border border-gray-600 px-4 py-4 text-gray-300">${student.studentName}</td>
      <td class="border border-gray-600 px-4 py-4 text-gray-300">${student.studentEmail}</td>
      <td class="border border-gray-600 px-4 py-4 text-gray-300">${student.studentContact}</td>
      <td class="border border-gray-600 px-4 py-4">
      <div class="flex gap-2">
        <button onclick="editStudentDetails(${student.studentId})" class="edit-btn px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 text-sm font-medium"><i class="fas fa-edit"></i></button>
        <button onclick="deleteStudentDetails(${student.studentId})" class="delete-btn ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 text-sm font-medium"><i class="fas fa-trash"></i></button>
      </div>`
    tableBody.appendChild(row);
    });
}

function addStudentDetails() {
  // Get form values
  const studentId = parseInt(document.getElementById('studentId').value);
  const studentName = document.getElementById('studentName').value;
  const studentEmail = document.getElementById('studentEmail').value;
  const studentContact = document.getElementById('studentContact').value;
  const studentData = JSON.parse(localStorage.getItem("Students")) || [];
  //check if student id exists in local storage.
  const existingStudent = studentData.find(student=>student.studentId === studentId) ? true : false;
  // Create student object if student id is unique
  if(!existingStudent) {
    const newStudent = {
      studentId: studentId,
      studentName: studentName,
      studentEmail: studentEmail,
      studentContact: studentContact
    };
    studentData.push(newStudent);
    localStorage.setItem("Students", JSON.stringify(studentData));
    if (mediaQuery.matches) {
      const card = document.createElement("div");
      card.classList.add("bg-gray-800", "rounded-lg", "shadow-md", "p-4", "mb-4", "text-gray-300");
      card.setAttribute("data-student-id", newStudent.studentId);
      card.innerHTML = `
        <div class="font-semibold">${newStudent.studentName}</div>
        <div>ID: ${newStudent.studentId}</div> 
        <div>Email: ${newStudent.studentEmail}</div>
        <div>Contact: ${newStudent.studentContact}</div>
        <div class="mt-2 flex gap-2">
          <button onclick="editStudentDetails(${newStudent.studentId})" class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 text-sm font-medium"><i class="fas fa-edit"></i></button>
          <button onclick="deleteStudentGridDetails(${newStudent.studentId})" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 text-sm font-medium"><i class="fas fa-trash"></i></button>
        </div>`;
        document.querySelector('.grid-view-container').appendChild(card);
    }else {
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td class="border border-gray-600 px-4 py-4 text-gray-300">${newStudent.studentId}</td>
            <td class="border border-gray-600 px-4 py-4 text-gray-300">${newStudent.studentName}</td>
            <td class="border border-gray-600 px-4 py-4 text-gray-300">${newStudent.studentEmail}</td>
            <td class="border border-gray-600 px-4 py-4 text-gray-300">${newStudent.studentContact}</td>
            <td class="border border-gray-600 px-4 py-4">
              <div class="flex gap-2">
                <button onclick="editStudentDetails(${newStudent.studentId})" class="edit-btn px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 text-sm font-medium"><i class="fas fa-edit"></i></button>
                <button onclick="deleteStudentDetails(${newStudent.studentId})" class="delete-btn ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 text-sm font-medium"><i class="fas fa-trash"></i></button>
              </div>
            </td>
          </tr>`;
          tableBody.appendChild(newRow);
    }
  }
}

function deleteStudentDetails(studentId) {
  const studentData = JSON.parse(localStorage.getItem("Students")) || [];
  const updatedData = studentData.filter(student => student.studentId !== studentId);
  localStorage.setItem("Students", JSON.stringify(updatedData));
  // Remove from table
  const rowToDelete = Array.from(tableBody.children).find(row => row.firstElementChild.textContent == studentId);
  if (rowToDelete) {
    tableBody.removeChild(rowToDelete);
  }
}

function deleteStudentGridDetails(studentId) {
  const studentData = JSON.parse(localStorage.getItem("Students")) || [];
  const updatedData = studentData.filter(student => student.studentId !== studentId);
  localStorage.setItem("Students", JSON.stringify(updatedData));
  // Remove from grid view
  const cardToDelete = document.querySelector(`.grid-view-container .bg-gray-800[data-student-id="${studentId}"]`);
  if (cardToDelete) {
    cardToDelete.remove();
  }
}

//display grid view for mobile devices
function displayGridView() {
  const studentData = JSON.parse(localStorage.getItem("Students"));
  if(gridContainer.children.length === 0 && studentData)
  studentData.forEach(student => {
    const card = document.createElement("div");
    card.classList.add("bg-gray-800", "rounded-lg", "shadow-md", "p-4", "mb-4", "text-gray-300");
    card.setAttribute("data-student-id", student.studentId);
    card.innerHTML = `
      <div class="font-semibold">${student.studentName}</div>
      <div>ID: ${student.studentId}</div>
      <div>Email: ${student.studentEmail}</div>
      <div>Contact: ${student.studentContact}</div>
      <div class="mt-2 flex gap-2">
        <button onclick="editStudentDetails(${student.studentId})" class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 text-sm font-medium"><i class="fas fa-edit"></i></button>
        <button onclick="deleteStudentGridDetails(${student.studentId})" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 text-sm font-medium"><i class="fas fa-trash"></i></button>
      </div>
    `;
    document.querySelector('.grid-view-container').appendChild(card);
  });
}

setStudentDetails();
// displayStudentDetails();
// Check once
const mediaQuery = window.matchMedia('(max-width: 767px)');

function handleMediaChange(e) {
  if (e.matches) {
    // Mobile view - show grid
    displayGridView();
  } else {
     displayStudentDetails();
  }
}

// Check on load
if (mediaQuery.matches) {
  displayGridView();
} else {
  displayStudentDetails();
}

// // Listen for resize
mediaQuery.addListener(handleMediaChange);

// Add vertical scrollbar dynamically to the table container
document.querySelector('.table-container').style.overflowY = 'scroll'; 