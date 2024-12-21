const express = require('express');

const router = express.Router();

const controller = require("../../controllers/admin/flightInfo.controller");

// dashboard
router.get("/", controller.index);

// Chi tiết 1 sản phẩm
router.get("/detail/:id", controller.details);
router.patch("/detail/:status/:id", controller.detailsPatch);

// Xoá 1 sản phẩm
router.delete("/delete/:id", controller.deleteItem);

// Sửa 1 sản phẩm
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", controller.editPost);


// Thêm 1 sản phẩm
router.get("/create", controller.create);
router.post("/create", controller.createPost);

module.exports = router;