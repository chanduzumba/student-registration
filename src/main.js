// Get students data to local storage
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
// Get elements
const addStudentBtn = document.querySelector('button');
const modal = document.getElementById('addStudentModal');
const form = document.getElementById('addStudentForm');
const tableBody = document.querySelector("#studentTableBody");
const tableContainer = document.querySelector('.table-container');

// Show modal on button click
addStudentBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

// Hide modal on form submit 
form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent form from submitting and refreshing the page
  // Check if it's an update or add operation based on the submit button text
  if(form.querySelector('button[type="submit"]').textContent === "Update") {
    updateStudentDetails(parseInt(e.target.studentId.value));
  } else addStudentDetails(); // Add new student details
  modal.classList.add('hidden'); // Hide modal after submission
  // Reset form
  form.reset();
});

//set student data in local storage;
const setStudentDetails = () => {
  localStorage.setItem("Students", JSON.stringify(students));
  checkStudentRecords();
}

// Check if there are student records in local storage and display appropriate message
function checkStudentRecords() {
  const studentData = JSON.parse(localStorage.getItem("Students")) || [];
  if(studentData.length > 0) {
    document.getElementById('noStudentRecords').classList.add('hidden');
    tableContainer.classList.remove('md:hidden');
  } else {
    document.getElementById('noStudentRecords').classList.remove('hidden');
    tableContainer.classList.add('md:hidden');
  }
}

//display student details in table view
function displayStudentDetails() {
  const studentData = JSON.parse(localStorage.getItem("Students"));
// add table rows dynamically based on student data in local storage along with edit and delete buttons for each student record
// Edit button will open the modal with existing student details populated for editing and updating the details in local storage, table view and grid view
// Delete button will remove the student record from local storage, table view and grid view
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

//display grid view for mobile and tablet or below 768px
function displayGridView() {
  const studentData = JSON.parse(localStorage.getItem("Students"));
  // Add student cards dynamically based on student data in local storage along with edit and delete buttons for each student record
  // Edit button will open the modal with existing student details populated for editing and updating the details in local storage, table view and grid view
  // Delete button will remove the student record from local storage, table view and grid view
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

// Add student details in both table and grid view
function addStudentDetails() {
  // Show modal for adding new student details
  modal.querySelector('h3').textContent = "Add New Student";
  modal.querySelector('button[type="submit"]').textContent = "Add Student";
  form.studentId.disabled = false; // Enable student ID input for adding new student
  form.studentId.classList.remove('opacity-40'); // Allow editing of student ID for new student
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
    // Show success message after adding student details
    showToast("Student details added successfully!");
  } else {
    // Show error message if student ID already exists in local storage
    showToast("Student ID already exists. Please enter a unique Student ID.");
  }
  checkStudentRecords();
}

function updateStudentDetails(studentId) {
  // Get form values
  const studentName = document.getElementById('studentName').value;
  const studentEmail = document.getElementById('studentEmail').value;
  const studentContact = document.getElementById('studentContact').value;
  const studentData = JSON.parse(localStorage.getItem("Students")) || [];
  // Find the index of the student to update in local storage and update the details
  const studentIndexToEdit = studentData.findIndex(student => student.studentId === studentId);
  if(studentIndexToEdit !== -1) {
    studentData[studentIndexToEdit].studentName = studentName;
    studentData[studentIndexToEdit].studentEmail = studentEmail;
    studentData[studentIndexToEdit].studentContact = studentContact;
  }
  localStorage.setItem("Students", JSON.stringify(studentData));
  // Update table view
  const rowToUpdate = Array.from(tableBody.children).find(row => row.firstElementChild.textContent == studentId);
  if (rowToUpdate) {
    rowToUpdate.children[1].textContent = studentName;
    rowToUpdate.children[2].textContent = studentEmail;
    rowToUpdate.children[3].textContent = studentContact;
  }
  // Update grid view
  const cardToUpdate = document.querySelector(`.grid-view-container .bg-gray-800[data-student-id="${studentId}"]`);
  if (cardToUpdate) {
    cardToUpdate.innerHTML = `
        <div class="font-semibold">${studentName}</div>
        <div>ID: ${studentId}</div> 
        <div>Email: ${studentEmail}</div>
        <div>Contact: ${studentContact}</div>
        <div class="mt-2 flex gap-2">
          <button onclick="editStudentDetails(${studentId})" class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 text-sm font-medium"><i class="fas fa-edit"></i></button>
          <button onclick="deleteStudentGridDetails(${studentId})" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 text-sm font-medium"><i class="fas fa-trash"></i></button>
        </div>`;
  }
  // Show success message after updating student details
  showToast("Student details updated successfully!");
} 

// Edit student details
function editStudentDetails(studentId) {
  // Show modal for editing
  modal.querySelector('h3').textContent = "Edit Student Details";
  modal.querySelector('button[type="submit"]').textContent = "Update";
  form.studentId.disabled = true; // Disable student ID input for editing existing student details
  form.studentId.classList.add('opacity-40'); // Disable editing of student ID
  modal.classList.remove('hidden');
  const studentData = JSON.parse(localStorage.getItem("Students")) || [];
  // Find the student to edit in local storage and populate the form with existing details
  const studentToEdit = studentData.find(student => student.studentId === studentId);
  if (studentToEdit) {
    //Populate form with existing student details to edit
    form.studentId.value = studentToEdit.studentId;
    form.studentName.value = studentToEdit.studentName;
    form.studentEmail.value = studentToEdit.studentEmail;
    form.studentContact.value = studentToEdit.studentContact;
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
    //Remove from grid view as well in case of resize
    deleteStudentGridDetails(studentId);
    // Show success message after deleting student details
    showToast("Student details deleted successfully!");
  }
  checkStudentRecords();
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
    //Remove from table view as well in case of resize
    deleteStudentDetails(studentId);
  }
}

//show toaster message for successful addition, updation and deletion of student details
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
  document.body.appendChild(toast);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000);
}

// Initial setup - load student details from local storage and display in table and grid view
setStudentDetails();
//intial load - populate student details in table and grid layout
displayStudentDetails();
displayGridView();

// Add vertical scrollbar dynamically to the table container
tableContainer.style.overflowY = 'scroll'; 