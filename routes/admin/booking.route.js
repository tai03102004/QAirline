const express = require('express');
const multer = require('multer');

const router = express.Router();

// upload()
// const upload = multer();
// const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares.js");

const controller = require("../../controllers/admin/booking.controller");

// dashboard
router.get("/", controller.index);

// Xoá 1 sản phẩm
router.delete("/delete/:id", controller.deleteItem);


// Sửa 1 sản phẩm
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", controller.editPost);


// Chi tiết 1 sản phẩm
router.get("/detail/:id", controller.details);
router.patch("/detail/:status/:id", controller.detailsPatch);

module.exports = router