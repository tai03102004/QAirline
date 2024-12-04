const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer();

const controller = require("../../controllers/admin/account-client.controller.js");


// upload ảnh vào cloudinary
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares.js");

router.get("/", controller.index);

// router.get("/create", controller.create);
// router.post("/create",
//             upload.single("avatar"),
//             uploadCloud.upload,
//             controller.createPost
//         );

// router.get("/edit/:id", controller.edit);
// router.patch("/edit/:id",
//             upload.single("avatar"),
//             uploadCloud.upload,
//             controller.editPatch
//         );

// router.get("/detail", controller.detail);


module.exports = router;