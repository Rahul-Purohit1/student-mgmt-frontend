import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { Student } from "../../types/student";

interface AddStudentFormProps {
  onClose: () => void;
  onSave: (student: Student) => void;
  studentToEdit: Student | null;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({
  onClose,
  onSave,
  studentToEdit,
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">(18);
  const [email, setEmail] = useState("");
  const [mark, setMarks] = useState<number | "">(0);
  const [parentId, setParentId] = useState<number | "">("");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name);
      setAge(studentToEdit.age);
      setEmail(studentToEdit.email);
    }
  }, [studentToEdit]);

  const handleSave = () => {
    if (
      !name ||
      age === "" ||
      !email ||
      (!studentToEdit && (mark === "" || parentId === ""))
    ) {
      setError("All fields are required.");
      return;
    }

    const student: Student = {
      id: studentToEdit ? studentToEdit.id : Date.now(),
      name,
      age: Number(age),
      email,
      mark: studentToEdit ? studentToEdit.mark : Number(mark),
      parent_id: studentToEdit ? studentToEdit.parent_id : Number(parentId), 
    };
    onSave(student);
    onClose();
  };

  const isFormValid =
    name &&
    age !== "" &&
    email &&
    (studentToEdit || (mark !== "" && parentId !== ""));

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {studentToEdit ? "Edit Student" : "Add Student"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              required
            />
          </Form.Group>
          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              value={age || ""}
              onChange={(e) => {
                const value = e.target.value;
                setAge(value === "" ? "" : Number(value));
                setError(null);
              }}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              required
            />
          </Form.Group>
          {!studentToEdit && (
            <>
              <Form.Group controlId="mark">
                <Form.Label>Marks</Form.Label>
                <Form.Control
                  type="number"
                  value={mark || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setMarks(value === "" ? "" : Number(value));
                    setError(null);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group controlId="parentId">
                <Form.Label>Parent ID</Form.Label>
                <Form.Control
                  type="number"
                  value={parentId || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setParentId(value === "" ? "" : Number(value));
                    setError(null);
                  }}
                  required
                />
              </Form.Group>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!isFormValid}
        >
          {studentToEdit ? "Update" : "Save"} Student
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddStudentForm;
