import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';

const app: Application = express();

// use cors
app.use(cors());
app.use(cookieParser());

// use express parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Application routes
// console.log(process.env);

// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);
app.use('/api/v1/', routes);

// Testing routes
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing error logger!')
// })

// global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});

// const academicSemester = {
//   code: '01',
//   year: '2025',
// };

// const testId = async () => {
//   const testId = await generateFacultyId();
//   console.log(testId);
// };
// testId();

export default app;
