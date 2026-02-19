import students from "./utils/studentJSON";
// Get elements
const addStudentBtn = document.querySelector('button');
const modal = document.getElementById('addStudentModal');
const cancelBtn = document.getElementById('cancelBtn');
const form = document.getElementById('addStudentForm');
const tableBody = document.querySelector("#studentTableBody");
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

//set student data in local storage;
const setStudentDetails = () => localStorage.setItem("Students", JSON.stringify(students));

//display student details in table view
function displayStudentDetails() {
  const studentData = JSON.parse(localStorage.getItem("Students"));

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

// Add student details in both table and grid view
function addStudentDetails() {
  // Get form values
  const studentId = parseInt(document.getElementById('studentId').value);
  const studentName = document.getElementById('studentName').value;
  const studentEmail = document.getElementById('studentEmail').value;
  const studentContact = document.getElementById('studentContact').value;
  const studentData = JSON.parse(localStorage.getItem("Students")) || [];
  //check if student id exists in local storage.
  const existingStudent = studentData.find(student => student.studentId === studentId) ? true : false;
  // Create student object if student id is unique
  if (!existingStudent) {
    const newStudent = {
      studentId: studentId,
      studentName: studentName,
      studentEmail: studentEmail,
      studentContact: studentContact
    };
    studentData.push(newStudent);
    localStorage.setItem("Students", JSON.stringify(studentData));
    // Grid view - add new card
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
    //Table view - add new table row
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

//Delete student detail from table view
function deleteStudentDetails(studentId) {
  const studentData = JSON.parse(localStorage.getItem("Students")) || [];
  const updatedData = studentData.filter(student => student.studentId !== studentId);
  localStorage.setItem("Students", JSON.stringify(updatedData));
  // Remove from table
  const rowToDelete = Array.from(tableBody.children).find(row => row.firstElementChild.textContent == studentId);
  if (rowToDelete) {
    tableBody.removeChild(rowToDelete);
  }
  //Remove from grid view as well in case of resize
  deleteStudentGridDetails(studentId);
}

//Delete student detail from grid view
function deleteStudentGridDetails(studentId) {
  const studentData = JSON.parse(localStorage.getItem("Students")) || [];
  const updatedData = studentData.filter(student => student.studentId !== studentId);
  localStorage.setItem("Students", JSON.stringify(updatedData));
  // Remove from grid view
  const cardToDelete = document.querySelector(`.grid-view-container .bg-gray-800[data-student-id="${studentId}"]`);
  if (cardToDelete) {
    cardToDelete.remove();
  }
  //Remove from table view as well in case of resize
  deleteStudentDetails(studentId);
}

//display grid view for mobile and tablet or below 768px
function displayGridView() {
  const studentData = JSON.parse(localStorage.getItem("Students"));
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
//intial load - populate student details in table and grid layout
displayStudentDetails();
displayGridView();

// Add vertical scrollbar dynamically to the table container
document.querySelector('.table-container').style.overflowY = 'scroll'; 