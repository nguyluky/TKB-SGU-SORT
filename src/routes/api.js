const express = require("express");

const apiController = require("../controllers/api.controller");

// NOTE: xong
// NOTE: chua check
var router = express.Router();

router.get("/dshocphan", apiController.getDsHocPhan);
router.get("/dskhoa", apiController.getDsKhoa);
router.get("/dslop", apiController.getDsLop);

// TODO chang post to get
router.post("/check_email", apiController.checkEmailAlreadyExists);
router.post("/check_user_name", apiController.checkUserNameAlreadyExists);

router.get("/userinfo", apiController.getUserInfo);
router.get("/tkbs", apiController.getDsTkb);
router.post("/tkb", apiController.createTkb);
router.put("/tkb", apiController.updateTkb);
router.get("/tkb", apiController.getTkb);
router.get("/getinvitelink", apiController.getInviteLink);

// router.get("/token", apiController.getToken)
// router.post("/token", apiController.setToken)

module.exports = router;
