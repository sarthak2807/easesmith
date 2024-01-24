const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
var http = require('http');
const secretKey = 'your-secret-key'; 

app.use(bodyParser.json());


const users = [
  { id: 1, username: 'admin', password: 'adminpass', role: 'admin' },
  { id: 2, username: 'user', password: 'userpass', role: 'user' },
];


function authenticateUser(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    req.user = decoded;
    next();
  });
}

function authorizeUser(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden - Insufficient permissions' });
    }

    next();
  };
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, {
    expiresIn: '1h', // Token expiration time
  });

  res.json({ token });
});

app.get('/protected', authenticateUser, authorizeUser(['admin']), (req, res) => {
  res.json({ message: 'Protected resource accessed successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
