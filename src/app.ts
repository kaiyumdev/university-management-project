import express, { Application, Request, Response } from 'express'
import usersService from './app/modules/users/users.service'
import cors from 'cors'
import userRouter from './app/modules/users/users.route'
const app: Application = express()

//use cors
app.use(cors())

//use express parser
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', userRouter)

app.get('/', async (req: Request, res: Response) => {
  await usersService.createUser({
    id: '9999',
    password: '1234',
    roll: 'student',
  })
  res.send('Working Successfully!')
})

export default app
