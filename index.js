const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Simple Node Server Running');
});

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: 'Sabana', email: 'sabana@gmail.com' },
  { id: 2, name: 'Sabnoor', email: 'sabnoor@gmail.com' },
  { id: 3, name: 'Sabila', email: 'sabila@gmail.com' },
];

app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/users', (req, res) => {
  console.log('Post API Called');
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  console.log(user);
  res.send(user);
});

app.listen(port, () => {
  console.log(`Simple Node server running on port ${port}`);
});
