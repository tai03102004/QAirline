const express = require('express');
const router = express.Router();

const multer = require('multer');

// upload()
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares.js");
const validateProduct = require("../../validates/admin/product.validate");


const controller = require("../../controllers/admin/campaign.controller");

router.get("/", controller.index);

// Xoá 1 sản phẩm
router.delete("/delete/:id", controller.deleteItem);

// Sửa 1 sản phẩm
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", upload.single("thumbnail"), uploadCloud.upload // upload ảnh
    , validateProduct.createPost // validate tiêu đề
    , controller.editPost
);

// Thêm 1 sản phẩm
router.get("/create", controller.create);
router.post("/create", upload.single("thumbnail"), uploadCloud.upload, validateProduct.createPost, controller.createPost);

module.exports = router;