import express from 'express';

const app = express();

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}.`);
});

app.get('/', (req, res) => {
    return res.send('Hello traveler...')
})

app.get('/feedbacks', (req, res) => {
    return res.send('Welcome to feedback page...');
})