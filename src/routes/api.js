const express = require('express');

const apiController = require('../controllers/api.controller');

// NOTE: xong
// NOTE: chua check
var router = express.Router();


router.get('/dshocphan', apiController.getDsHocPhan)
router.get('/ds_khoa', apiController.getDsKhoa)
router.get('/ds_lop', apiController.getDsLop)

// TODO chang post to get
router.post('/check_email', apiController.checkEmailAlreadyExists)
router.post('/check_user_name', apiController.checkUserNameAlreadyExists)


router.get('/get_user_info', apiController.getUserInfo)

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
router.get('/get_invite_link', apiController.getInviteLink)
// TODO: delete tkb


module.exports = router;