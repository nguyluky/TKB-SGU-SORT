const express = require('express');

const apiController = require('../controllers/api.controller');

// NOTE: xong
// NOTE: chua check
var router = express.Router();


router.get('/dshocphan', apiController.getDsHocPhan)
router.get('/get_user_info', apiController.getUserInfo)
router.get('/ds_khoa', apiController.getDsKhoa)
router.get('/ds_lop', apiController.getDsLop)

// TODO chang post to get
router.get('/check_email', apiController.checkEmailAlreadyExists)
router.get('/check_user_name', apiController.checkUserNameAlreadyExists)

/*
 _____ _  ______  
|_   _| |/ / __ ) 
  | | | ' /|  _ \ 
  | | | . \| |_) |
  |_| |_|\_\____/ 
*/

router.get('/tkbs', apiController.getDsTkb)
router.post('/tkb', apiController.createTkb)
router.put('/tkb', apiController.updateTkb)
router.get('/tkb', apiController.getTkb)
// router.delete


module.exports = router;