const express = require('express');
const { createuser, getuser, getAll, deleteuser, edituser } = require('../controllers/usersControllers');
const router = express.Router();

router.post('/create',createuser)
router.delete('/user/delete/:id',deleteuser)
router.post('/user/edit/:id',edituser)
router.get('/search/user',getuser)
router.get('/all',getAll)


module.exports = router;