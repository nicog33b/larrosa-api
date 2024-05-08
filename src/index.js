const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');
require('dotenv').config();


//Import of route
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');

//init app
const app = express();
const port = process.env.PORT || 3001;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Rutas
app.use('/api/users', userRoutes); // Usuarios
app.use('/api/orders', orderRoutes); //Ordenes
app.use('/api/products', productRoutes); //Productos

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});