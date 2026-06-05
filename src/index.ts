import express from 'express';
import user from './routes/User';




const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/user", user);

// app.use("/user", User);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

