import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth'
import resumeRouter from './routes/resume'
import templateRouter from './routes/template'
import aiRouter from './routes/ai'
import adminRouter from './routes/admin'
import userRouter from './routes/user'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/resume', resumeRouter)
app.use('/api/template', templateRouter)
app.use('/api/ai', aiRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`)
}) 