require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.argv[2] || process.env.PORT;
const app = express();
app.use(cors());
app.use(express.static('client/pages'));

app.get('/api', (req, res) => {
  console.log(`Damn it is working!`)
})

app.listen(PORT, () => {
  console.log(`⚡️ Server is up and running at ${PORT}`);
});


