import React, { useState, useEffect } from "react";
import { Container, Button, Form, InputGroup } from "react-bootstrap";
import StudentTable from "./components/Student/StudentTable";
import AddStudentForm from "./components/Student/AddStudentForm";
import { Student } from "./types/student";
import {
  fetchStudents,
  addStudent,
  editStudent,
  deleteStudent,
  getStudentById,
} from "./services/studentService";

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [page, setPage] = useState(1);
  const [searchId, setSearchId] = useState<number | null>(null);
  const [showMarks, setShowMarks] = useState(false);
  const studentsPerPage = 10;

  const fetchAllStudents = async () => {
    const data = await fetchStudents(1, 1000);
    setStudents(data.data);
  };

  const fetchStudentById = async (id: number) => {
    const student = await getStudentById(id);
    if (student) {
      const newStudent = {
        id: student.id,
        name: student.name,
        age: student.age,
        email: student.email,
        parent_id: student.parent_id,
        mark: student.Marks[0].mark,
      };
      setStudents([newStudent]); 
      setShowMarks(true); 
    } else {
      setStudents([]); 
    }
  };

  
  const paginateStudents = (page: number) => {
    const startIndex = (page - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    return students.slice(startIndex, endIndex);
  };

  useEffect(() => {
    if (searchId) {
      fetchStudentById(searchId);
    } else {
      fetchAllStudents();
    }
  }, [searchId]);

  const paginatedStudents = paginateStudents(page);

  
  const updateStudent = async (updatedStudent: Student) => {
    await editStudent(updatedStudent); 
    fetchAllStudents(); 
  };


  const addNewStudent = async (student: Student) => {
    const newStudent = await addStudent(student); 
    fetchAllStudents(); 
  };

  
  const removeStudent = async (id: number) => {
    await deleteStudent(id); 
    fetchAllStudents();
  };

  const totalPages = Math.ceil(students.length / studentsPerPage);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Student Management</h1>

      <InputGroup className="mb-3">
        <InputGroup.Text>Search by ID</InputGroup.Text>
        <Form.Control
          type="number"
          value={searchId || ""}
          onChange={(e) =>
            setSearchId(e.target.value ? Number(e.target.value) : null)
          }
          placeholder="Enter student ID"
        />
        <Button
          variant="outline-secondary"
          onClick={() => setSearchId(searchId)} 
        >
          Search
        </Button>
      </InputGroup>

      <Button
        className="mb-3 d-block mx-auto"
        onClick={() => setShowForm(true)}
      >
        {studentToEdit ? "Edit Student" : "Add Student"}
      </Button>

      <StudentTable
        students={paginatedStudents}
        setStudents={setStudents}
        setStudentToEdit={setStudentToEdit}
        setShowForm={setShowForm}
        removeStudent={removeStudent}
        showMarks={showMarks}
      />

      {showForm && (
        <AddStudentForm
          onClose={() => {
            setShowForm(false);
            setStudentToEdit(null);
          }}
          onSave={(student: Student) => {
            if (studentToEdit) {
              updateStudent(student); 
            } else {
              addNewStudent(student);
            }
            setShowForm(false);
          }}
          studentToEdit={studentToEdit}
        />
      )}

      {/* Pagination controls */}
      <div className="d-flex justify-content-between mt-3">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>

        {/* Page numbers */}
        <div className="page-numbers">
          {[...Array(totalPages).keys()].map((_, index) => (
            <Button
              key={index}
              variant="secondary"
              active={page === index + 1}
              onClick={() => setPage(index + 1)}
              className="me-2"
            >
              {index + 1}
            </Button>
          ))}
        </div>

        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default App;
