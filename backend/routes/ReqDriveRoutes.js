
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const ReqDriveController = require("../controllers/ReqDriveController.js");


router.post("/", ReqDriveController.createReqDrive);
router.delete("/:id", ReqDriveController.deleteReqDrive);
router.get("/bycompany/", ReqDriveController.getReqDrivebyCompany);
router.get("/mycompany/", userController.getMyCompany);
router.get("/request/", ReqDriveController.getReqDriveByCollege);
router.put("/status/", ReqDriveController.changeReqDriveStatus);
router.put("/addDrive/", ReqDriveController.addScheduledDrive);

module.exports = router;
