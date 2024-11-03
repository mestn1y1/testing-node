import { Router } from 'express';
import {
  getStudentByIDController,
  getStudentsController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/controllers.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middlewares/isValid.js';

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController));

router.get(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(getStudentByIDController),
);

router.post(
  '/students',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.delete(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(deleteStudentController),
);

router.put(
  '/students/:studentId',
  isValidId,
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/students/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
