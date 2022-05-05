import express from 'express';
import nodemailer from 'nodemailer';
import { env } from 'process';

import { prisma } from './prisma';
import HttpStatusCode from './utils/HttpStatusCode';

const app = express();

const PORT = 3001;

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: env.MAILER_USER,
        pass: env.MAILER_PASS
    }
});

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

    await transport.sendMail({
        from: "Feedget <contato@feedget.net",
        to: "Breno <mrodrigues.breno@gmail.com",
        subject: "Dado criado",
        html: [
            `<div>`,
            `<p>Tipo de feedback: ${type}</p>`,
            `<p>Seu comentário: ${comment}</p>`,
            `</div>`
        ].join('\n')
    });
    
    return res.status(HttpStatusCode.CREATED).json(newFeedback);
});