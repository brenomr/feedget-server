import express from 'express';

import { routes } from './routes';

const app = express();

const PORT = 3001;

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}.`);
});
