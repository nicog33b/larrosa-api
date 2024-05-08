// En tu archivo de rutas, por ejemplo userRoute.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware'); // Importa el middleware

//auth
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

//user functions
router.post('/change-password' ,verifyToken, userController.updatePassword);


// Aplicar el middleware a las rutas que requieran autenticación
router.get('/:id',userController.getUser);
router.put('/:id', verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);
router.get('/', verifyToken,userController.getAllUsers);

module.exports = router;
