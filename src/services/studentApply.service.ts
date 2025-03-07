import { StudentApply } from "@/types/studentApply.type";
import axios from "axios";

const END_POINT = `${process.env.NEXT_PUBLIC_API_URL}/student_apply`;

async function fetchStudentsApply(params: StudentApply): Promise<StudentApply[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const url = `${baseUrl}/api/student_apply`;

    // Construction d'un objet de paramètres de requête
    const queryObject: Record<string, string> = {};
    if (params.status !== undefined) {
      queryObject.status = params.status;
    }

  const response = await axios.get(url, { params: queryObject });
  return response.data;
}

async function fetchStudentApply(id: string): Promise<StudentApply> {
  const response = await axios.get(`${END_POINT}/${id}`);
  return response.data;
}

async function postStudentApply(studentApply: StudentApply): Promise<StudentApply> {
  const response = await axios.post(END_POINT, studentApply);
  return response.data;
}

async function putStudentApply(studentApply: StudentApply): Promise<StudentApply> {
  const response = await axios.put(`${END_POINT}/${studentApply.id}`, studentApply);
  return response.data;
}

async function deleteStudentApply(studentApply: StudentApply): Promise<StudentApply> {
  const response = await axios.delete(`${END_POINT}/${studentApply.id}`);
  return response.data;
}

const StudentApplyService = {
  fetchStudentsApply,
  fetchStudentApply,
  postStudentApply,
  putStudentApply,
  deleteStudentApply,
};

export default StudentApplyService;