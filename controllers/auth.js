const {response} = require('express')
const Usuario = require('../models/usuario')
const bcrypt=require('bcryptjs')
const login= async (req, res=response)=>{

    const {email, password}=req.body

try {

//Verificar si el mail existe

const usuario= await Usuario.findOne({email})

if(!usuario){
    return res.status(400).json({
        msg:'Usuario o contraseña incorrectos'
    })
}

//Si el usuario está activo
if(!usuario.estado){
    return res.status(400).json({
        msg:'Usuario o contraseña incorrectos - estado: false'
    })
}

//Verificar la contraseña

const validPassword=bcrypt.compareSync(password, usuario.password)
if(!validPassword){
    return res.status(400).json({
        msg:'Usuario o contraseña incorrectos'
    })
}

//Generar el JWT



    res.json({
    
        msg: 'Login OK'
    })
    
} catch (error) {
    console.log(error)
    return res.status(500).json({
        msg:'Hablar con el admin'
    })
}


}


module.exports={
    login
}

