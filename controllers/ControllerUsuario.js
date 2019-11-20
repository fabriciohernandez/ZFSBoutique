var mongoose = require('mongoose');
const User = require("../models/User")

//triggers??????


//INSERT
const insert = (req, res)=>{
<<<<<<< Updated upstream
    
    let usuario = new Usuario(
=======
    let body=req.body;
    console.log(body);


    let usuario = new User(
>>>>>>> Stashed changes
        req.body
    );

    usuario.save((err, nUsuario)=>{
        if(err) return res.status(500).json({
            message: "Something happend try again",
        });

        res.status(200).json({
            message: "Successful",
            usuario: nUsuario
            
        });
    })
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
    User.find((err, usuarios)=>{
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
            res.status(200).json(usuario);
        }else{
            res.status(404).json({
                message: `There is no one with username ${id}`,
            });
        }
    });  
}






module.exports = {
    insert,
    update,
    deleteById,
    getAll,
    getOneById,
}