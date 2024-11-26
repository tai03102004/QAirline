const express = require('express');
const multer = require('multer');

const router = express.Router();

// upload()
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares.js");
const validateProduct = require("../../validates/admin/product.validate");

const controller = require("../../controllers/admin/product.controller");

// dashboard
router.get("/", controller.index);

// Chi tiết 1 sản phẩm
router.get("/detail/:id", controller.details);
router.patch("/detail/:status/:id", controller.detailsPatch);

// Xoá 1 sản phẩm
router.delete("/delete/:id", controller.deleteItem);

// Thay đổi trạng thái sản phẩm
router.patch("/change-status/:status/:id", controller.changeStatus); // Cập nhật trạng thái active or inactive

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