import axios from "axios";
import { Student } from "../types/student";

const apiurl = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${apiurl}/students`;

export const fetchStudents = async (page: number, limit: number) => {
  try {
    const { data } = await axios.get(
      `${API_URL}?_page=${page}&_limit=${limit}`
    );
    return {
      data,
      total: 100,
      page,
      limit,
    };
  } catch (error) {
    console.error("Error fetching students:", error);
    return { data: [], total: 0, page, limit }; 
  }
};

export const addStudent = async (student: Omit<Student, "id">) => {
  try {
    const { data } = await axios.post(API_URL, student);
    return data;
  } catch (error) {
    console.error("Error adding student:", error);
  }
};

export const editStudent = async (updatedStudent: Student) => {
  try {
    const { data } = await axios.put(
      `${API_URL}/${updatedStudent.id}`,
      updatedStudent
    );
    return data;
  } catch (error) {
    console.error("Error editing student:", error);
  }
};

export const deleteStudent = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting student:", error);
  }
};

export const getStudentById = async (id: number) => {
  try {
    console.log("Fetching student by ID:", id);
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching student by ID:", error);
  }
};
