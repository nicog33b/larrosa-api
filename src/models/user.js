const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    register_user_email:{
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function(v) {
            // Validar que el correo electrónico tenga un formato válido
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: 'Correo electrónico inválido'
        
      },

    },
    register_user_nombre_completo: {
        type: String,
        required:true
        
      },
      register_fecha_nacimiento: {
        type: Date,
        required:true
      
      },
      register_user_password: {
        type: String,
        required:true
       
      },
    telefono:{
        type:String,

    },
    direccion: {
        type: String,

      },
    departamento: {
      type:String,
    },
});


module.exports = mongoose.model('User' ,userSchema)