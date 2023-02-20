const User = require('../models/User');
const express = require('express');
const bcrypt =require('bcrypt')

const jwt = require('jsonwebtoken')
const CONFIG = require('../config/config');

//Username
//Password

// const login=(req,res)=>{
//     let username = req.body.username;
//     let password = req.body.password;

    
//     User.findOne({username})
//     .then(user=>{
//         if(!user)return res.status(404).send({message:'user does not exist '})
//         bcrypt.compare(password, user.password)
//         .then(match=>{
//             // if(match)return res.status(200).send({message:'ACCES'})
//             // return res.status(200).send({message:'INORRECT PASSWORD'})
//             if(match)
//             {
//                 payload={
//                     username:use.username,
//                     email:user.email,
//                     name:user.name
//                 }
//                 jwt.sign(payload,CONFIG.SECRET_TOKEN,function(error,token){
//                     if(error){
//                         res.status(500).send({error})
//                     }
//                     else
//                     {
//                         console.log('iniciado')
//                         res.status(200).send({message:'Acces', token})
//                     }
//                 })
//             }
//             else{

//             }
//         })
//     }).catch(error=>console.log(error))
//     res.status(500).send({error})
// }

// module.exports ={login};
const login=(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username})
        .then(user => {
            if(!user) return res.status(404).send({message: 'EL USUARIO NO EXISTE'});
            bcrypt.compare(password,user.password)
                    .then(match => {
                        if(match){
                            payload = {
                                username: user.username,
                                email: user.email,
                                name: user.name,
                                role: user.role
                            }
                            //Acceso
                            jwt.sign(payload,CONFIG.SECRET_TOKEN,function(error,token){
                                if(error){
                                    res.status(500).send({error});
                                }else{
                                    res.status(200).send({message: 'Acceso',token});
                                }
                            })
                        }else{
                            //No doy Acceso
                            res.status(200).send({message: 'PASSWORD INCORRECTA'});
                        }
                  }).catch(error => {
                    console.log(error);
                    res.status(500).send({error});
                  });
        }).catch(error => {
            console.log(error);
            res.status(500).send({error});
        });
}

module.exports = {login};