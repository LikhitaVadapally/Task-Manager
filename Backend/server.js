import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import taskRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running'})
})

// Auth route
app.use('/auth', authRoutes);

// Task routes\
app.use('/', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});