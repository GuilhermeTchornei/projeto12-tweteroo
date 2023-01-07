import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const user = req.body;
    if (!(user.username && user.avatar)) return res.status(400).send("Todos os campos são obrigatórios!");
    users.push(user);
    res.status(201).send('OK');
});

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    if (!(tweet.username && tweet.tweet)) return res.status(400).send("Todos os campos são obrigatórios!");
    if (!users.find(u => u.username === tweet.username)) return res.sendStatus(401);

    const user = users.find(u => u.username === tweet.username);
    tweets.push({ ...tweet, avatar: user.avatar });
    res.status(201).send('OK');
});

app.get("/tweets", (_, res) => {
    res.send(tweets.slice(Math.max(tweets.length - 10, 0)));
})

app.listen(5000, () => console.log('Servidor conectado'));