import React from "react";
import { Table, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Student } from "../../types/student";

interface StudentTableProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  setStudentToEdit: React.Dispatch<React.SetStateAction<Student | null>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  removeStudent: (id: number) => void;
  showMarks: boolean;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  setStudentToEdit,
  setShowForm,
  removeStudent,
  showMarks,
}) => {
  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      removeStudent(id);
      Swal.fire("Deleted!", "The student record has been deleted.", "success");
    }
  };

  const handleEdit = (student: Student) => {
    setStudentToEdit(student);
    setShowForm(true);
  };

  console.log(students);
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Parent Id</th>
          {showMarks && <th>Mark</th>}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.age}</td>
            <td>{student.email}</td>
            <td>{student.parent_id}</td>
            {showMarks && <td>{student?.mark}</td>}
            <td>
              <Button
                variant="warning"
                className="me-2"
                onClick={() => handleEdit(student)}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(student.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StudentTable;
