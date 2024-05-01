const express = require("express")
const router = express.Router()
const productSchema = require("../models/product")


//register usuario
router.post('/products' , (req,res)=>{
const product = productSchema(req.body);
user.save()
.then((data)=>res.json(data))
.catch((error) => res.json({message: error}));
});

//get all users
router.get('/products' , (req,res)=>{
    productSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error) => res.json({message: error}));
    });
//get usuario>id
    router.get("/products/:id" , (req,res)=>{
       const { id } =  req.params;
        productSchema
        .findById(id)
        .then((data)=>res.json(data))
        .catch((error) => res.json({message: error}));
        });
    
//update usuarios
router.put("/products/:id" , (req,res)=>{
    const { id } =  req.params;
    const {userId,email,nombreCompleto,fechaNacimiento,pass1,pass2,telefono,direccion} = req.body
     productScheman
     .updateOne({_id:id}, { $set: {userId,email,nombreCompleto,fechaNacimiento,pass1,pass2,telefono,direccion}})
     .then((data)=>res.json(data))
     .catch((error) => res.json({message: error}));
     });
//delete usuario
     router.delete("/products/:id" , (req,res)=>{
        const { id } =  req.params; 
         productSchema
         .deleteOne({_id:id})
         .then((data)=>res.json(data))
         .catch((error) => res.json({message: error}));
         });

module.exports = router;