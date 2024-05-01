const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); //Importamos CORS

require('dotenv').config();

const app = express();
const port = process.env.PORT || 9000;

//Rutas.
const userRoutes = require('./routes/user');

//middleware
app.use(cors()); //Usamos CORS
app.use(express.json());
app.use('/api', userRoutes);



//routes
app.get('/', (req, res) => {
  res.send('<div>API de la pagina web Homeopatia larrosa.</div>');
});

//mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a mongoDB'))
  .catch((error) => console.error(error));

app.listen(port, () => console.log('servidor funcionando. puerto: ', port));