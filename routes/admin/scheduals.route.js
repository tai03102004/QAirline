const express = require('express');
const router = express.Router();

const multer = require('multer');

const controller = require("../../controllers/admin/schedual.controller");

router.get("/", controller.index);
router.get("/detail/:id", controller.detail);

// Thêm 1 sản phẩm
router.get("/create", controller.create);
router.post("/create", controller.createPost);

// Sửa 1 chuyến bay
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", controller.editPost);

module.exports = router;