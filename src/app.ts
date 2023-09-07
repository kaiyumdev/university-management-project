import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import routes from './app/routes';
const app: Application = express();

// use cors
app.use(cors());

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

export default app;
