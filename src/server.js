import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
// import { getAllStudents, getStudentByID } from './services/students.js';
import studentsRouter from './routers/students.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  //Тут в-мо мідлвару для налаштування типу парсингу
  // тайп це типи данних
  // ліміт це ліміт на розмір тіла запиту якщо ліміт перевищенно запит буде відхилено з помилкою
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use(studentsRouter);
  // додаємо маршрути для студентів
  // app.get('/students', async (req, res) => {
  //   const students = await getAllStudents();

  //   res.status(200).json({
  //     data: students,
  //   });
  // });

  // app.get('/students/:studentId', async (req, res, next) => {
  //   const { studentId } = req.params;
  //   const student = await getStudentByID(studentId);

  //   // ВІДПОВІДЬ ЯКЩО СТУДЕНТА НЕ ЗНАЙДЕНО
  //   if (!student) {
  //     res.status(404).json({
  //       message: 'Student not found',
  //     });
  //     return;
  //   }
  //   // Відповідь, якщо контакт знайдено
  //   res.status(200).json({
  //     data: student,
  //   });
  // });

  // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
  // наприклад, у запитах POST або PATCH

  // // Middleware для логування часу запиту
  // app.use((req, res, next) => {
  //   console.log(`Time: ${new Date().toLocaleString()}`);
  //   next();
  // });

  // Якщо робити запит на будьякий маршрут окрім '/' буде NOT FOUND
  // app.use('*', (req, res, next) => {
  //   res.status(404).json({
  //     message: 'Not found',
  //   });
  // });

  // Middleware  для обробких помилок (приймає 4 аргументи)
  // app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     message: 'Sopmething went wrong',
  //     error: err.message,
  //   });
  // });

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Тепер використовуємо кастомні мідлвари
  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
