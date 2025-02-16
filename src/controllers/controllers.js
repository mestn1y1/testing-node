import {
  getAllStudents,
  getStudentByID,
  createStudent,
  deleteStudent,
  updateStudent,
} from '../services/students.js';
import createHttpError from 'http-errors';

export const getStudentsController = async (req, res) => {
  const students = await getAllStudents();
  res.json({
    status: 200,
    message: 'Succesfully find all students',
    data: students,
  });
};

export const getStudentByIDController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentByID(studentId);

  //   if (!student) {
  //     res.status(404).json({
  //       message: 'Not found',
  //     });
  //     return;
  //     };

  // додаємо базову обробку помилки замість res.status(404)

  // if (!student) {
  //   next(new Error('Student not found'));
  //   return;
  // }
  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.json({
    status: 200,
    message: 'Succefully find contact by id',
    data: student,
  });
};

export const createStudentController = async (req, res) => {
  const student = await createStudent(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created student!',
    data: student,
  });
};

export const deleteStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await deleteStudent(studentId);

  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(204).send();
};

export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.body, { upsert: true });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted a student',
    data: result.student,
  });
};

export const patchStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.body);

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a student!',
    data: result.student,
  });
};
