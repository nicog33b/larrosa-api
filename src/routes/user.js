const express = require("express")
const router = express.Router()
const userSchema = require("../models/user")



//register usuario
router.post('/users' , (req,res)=>{
const user = userSchema(req.body);
user.save()
.then((data)=>res.json(data))
.catch((error) => res.json({message: error}));
});

//get all users
router.get('/users' , (req,res)=>{
    userSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error) => res.json({message: error}));
    });
//get usuario>id
    router.get("/users/:id" , (req,res)=>{
       const { id } =  req.params;
        userSchema
        .findById(id)
        .then((data)=>res.json(data))
        .catch((error) => res.json({message: error}));
        });
    
//update usuarios
router.put("/users/:id" , (req,res)=>{
    const { id } =  req.params;
    const {register_user_email,register_user_nombre_completo,register_fecha_nacimiento,register_user_password,telefono,direccion,departamento} = req.body
     userSchema
     .updateOne({_id:id}, { $set: {register_user_email,register_user_nombre_completo,register_fecha_nacimiento,register_user_password,telefono,direccion,departamento}})
     .then((data)=>res.json(data))
     .catch((error) => res.json({message: error}));
     });
//delete usuario
     router.delete("/users/:id" , (req,res)=>{
        const { id } =  req.params; 
         userSchema
         .deleteOne({_id:id})
         .then((data)=>res.json(data))
         .catch((error) => res.json({message: error}));
         });

module.exports = router;