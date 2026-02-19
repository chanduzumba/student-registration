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
export default students;