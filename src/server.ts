import express from 'express';
import { prisma } from './prisma';
import HttpStatusCode from './utils/HttpStatusCode';

const app = express();

const PORT = 3001;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}.`);
});

app.get('/', (req, res) => {
    return res.send('Hello traveler...')
});

app.get('/feedbacks', (req, res) => {
    return res.send('Welcome to feedback page...');
});

app.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const newFeedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    });
    
    return res.status(HttpStatusCode.CREATED).json(newFeedback);
});