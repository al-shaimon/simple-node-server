const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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



const uri = "mongodb+srv://dbUser1:OQqiPEuSAGZv94KW@cluster0.zeydczn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("simpleNode").collection("users");
  // perform actions on the collection object
  console.log('database connected')
  client.close();
});


app.get('/users', (req, res) => {
  if (req.query.name) {
    // filter users by query
    const search = req.query.name;
    const filtered = users.filter((usr) => usr.name.toLocaleLowerCase().indexOf(search) >= 0);
    res.send(filtered);
  } else {
    res.send(users);
  }
  console.log(req.query);
});

app.post('/users', (req, res) => {
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  console.log(user);
  res.send(user);
});

app.listen(port, () => {
  console.log(`Simple Node server running on port ${port}`);
});
