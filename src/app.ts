import express, { Application } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/users.route'
import globalErrorHandler from './middlewares/globalErrorHandler'
const app: Application = express()

// use cors
app.use(cors())

// use express parser
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// Application routes
// console.log(process.env);

app.use('/api/v1/users', userRouter)

// // Testing routes
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error(400, 'Ora Baba Error')
//   // next('Ora Baba Error')
// })

// global error handler
app.use(globalErrorHandler)

export default app
