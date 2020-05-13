const express = require("express");

const controller = require("../controllers/auth.controller.js");
const mailer = require("../utils/mailer.js");

const router = express.Router();

router.get("/login", controller.login);

router.post("/login", controller.postLogin, mailer.sendMail);

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

module.exports = router;
