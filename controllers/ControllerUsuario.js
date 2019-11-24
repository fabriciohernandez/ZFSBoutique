var Mongoose = require('mongoose');
const Usuario = require("../models/Usuario")
var express = require('express');
//triggers??????


//INSERT
const insert = async (req, res)=>{
    try {
        const usuario = new Usuario(req.body);
        await usuario.save()
        const token = await usuario.generateAuthToken()
        res.render('login', { title: 'login' ,message:'¡Bienvenido! Ahora inicia sesión para empezar a comprar.'});
        //res.status(201).send({usuario,token})
    } catch (error) {
        res.status(400).send(error)
    }
}

const login = async(req, res)=>{
    try {
        const { Correo, Password } = req.body
        const user = await Usuario.findByCredentials(Correo,Password)
        
        if (!user) {
            return res.redirect('/usuario');
        }
        const token = await user.generateAuthToken()
        
        res.setHeader('Authorization','Bearer '+ token); 
        //return res.redirect(301,'/usuario/yo');
        res.render('bienvenido', { message: '¡Hola! ' + user.User_name });
        //res.send({user,token})
        //res.render('bienvenido',{ message: user.User_name });
    } catch (error) {
        console.log(error)
        res.redirect(301,'/usuario');
        
        //res.render('login', { title: 'login' , message: 'Error, Reredivisa el usuario y la contraseña ingresada'});
    }
}
//UPDATE
const update = (req, res)=>{
    let usuario = req.body

    if(!usuario._id){
        return res.status(400).json({
            message: "Something happend try again",
        });
    }

    Usuario.update({_id: usuario._id}, usuario)
        .then(value =>{
            res.status(200).json({
                message: "Update was successful"
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Something happend trying to update "
            });
        })

}

//DELETE BY ID
const deleteById = (req, res)=>{
    let usuario = req.body;

    if(!usuario._id){
        return res.status(400).json({
            message: "Username needed",
        });
    }

    Usuario.deleteOne({_id:usuario._id})
        .then(deleted=>{
            res.status(200).json({
                message: "Delete User was successful"
            });
        })
        .catch(err=>{
            res.status(500).json({
                message: "Something happend try again"
            });
        })
}

//GET ALL
const getAll = (req, res)=>{
    Usuario.find((err, usuarios)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to get the users",
        });

        if(usuarios){
            res.status(200).json(usuarios);
        }else{
            res.status(404).json({
                message: "There isn't any user",
            });
        }
    });
}


//GET BY ID
const getOneById = (req, res)=>{
    let id = req.params.id;

    Usuario.findById(id, (err, usuario)=>{
        if(err) return res.status(500).json({
            message: "Something happend try again",
        });

        if(usuario){
            res.location('/' + inst._id)
        }else{
            res.status(404).json({
                message: `There is no one with username ${id}`,
            });
        }
    });
}






module.exports = {
    insert,
    login,
    update,
    deleteById,
    getAll,
    getOneById,
}
