import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Task Manager API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
