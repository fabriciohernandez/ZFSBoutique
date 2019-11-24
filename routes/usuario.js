var express = require('express');
var router = express.Router();
const ControllerUsuario = require("../controllers/ControllerUsuario");
const auth = require("../middleware/auth");


router.get('/', (req,res) =>{
  res.render('login', { title: 'login' });
});

router.post('/', ControllerUsuario.insert);

router.post('/iniciar', ControllerUsuario.login);

router.get('/yo', auth, async(req, res) => {
  // View logged in user profile
  res.send(req.user)
})

router.post('/salir',auth,async(req,res)=>{
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token != req.token
    })
    await req.user.save()
    res.send()
} catch (error) {
    res.status(500).send(error)
}
})

router.get('/bienvenido',async(req,res)=>{
  res.render('bienvenido');
})

router.delete('/delete', ControllerUsuario.deleteById);

module.exports = router;
