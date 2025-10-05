import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app = express()
const prisma = new PrismaClient() 

app.use(cors())
app.use(express.json())


 
app.get('/', (req, res) => {
  res.send('Hello Weirdo!')

})

app.post('/users', async (req, res) => {
  const { name, email } = req.body      

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    res.status(201).json({
        msg: 'User created successfully',
        user: user
    })

  } catch (error) {
    res.status(500).json({ error: 'Failed to create user.' + error.message })

  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true
        }
    })
    res.json(users)

    } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users.' + error.message })

  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')

})