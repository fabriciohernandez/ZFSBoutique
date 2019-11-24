var mongoose = require('mongoose');
var Producto = require("../models/Producto")


//triggers??????


//INSERT
const insert = (req, res)=>{
    let body=req.body;
    console.log(body);


    let producto= new Producto(
        req.body
    );

    producto.save('/add2', (err, nProducto)=>{
        if(err)return res.render('404', { title: '404' });

        return res.render({ message: 'producto añadido!' });
        
    })
}


//UPDATE
const update = (req, res)=>{
    let producto= req.body
   
    if(!producto._id){
        return res.status(400).json({
            message: "Something happend try again",
        }); 
    }

    Producto.update({_id: producto._id}, producto)
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
    let producto = req.body;

    if(!producto._id){
        return res.status(400).json({
            message: "Code needed",
        }); 
    }

    Producto.deleteOne({_id:producto._id})
        .then(deleted=>{
            res.status(200).json({
                message: "Delete product was successful"
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
    Producto.find((err, productos)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to get the products",
        });

        if(productos){
            res.status(200).json(productos);
        }else{
            res.status(404).json({
                message: "There isn't any product",
            });
        }
    });
}


//GET BY ID
const getOneById = (req, res)=>{
    let id = req.params.id; 

    Producto.findById(id, (err, producto)=>{
        if(err) return res.status(500).json({
            message: "Something happend try again",
        });

        if(producto){
            res.status(200).json(producto);
        }else{
            res.status(404).json({
                message: `There is not a prudoct with code ${id}`,
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