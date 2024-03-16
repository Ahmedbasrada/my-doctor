const express = require('express')
const userController = require('../controllers/userControllers')
const {validate, userValidationResult} = require('../middlewares/validator')
const isLogedIn = require('../middlewares/auth')
const docController = require('../controllers/doctorControllers')
const updateUser = require('../controllers/userControllers')
const deleteUser = require('../controllers/userControllers')




const router = express.Router()

router.get('/', (req, res) => {
    res.json({message: 'أهلا بالعالم'})
})

router.post('/account/signup',userValidationResult(),validate,userController.register)//userValidationResult فيها قوسين لانها راح ترجع المصفوفه بعكس الباقي

router.post('/account/signin',userController.login)
router.get('/account/me',isLogedIn,userController.me)
router.get('/account/profile',isLogedIn,userController.getProfile)
router.put('/account/update',isLogedIn,userController.updateUser)
router.delete('/account/delete', isLogedIn,userController.deleteUser);
router.get('/doctors',isLogedIn,docController.index)







module.exports = router