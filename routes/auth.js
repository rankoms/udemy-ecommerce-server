const express = require("express");
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

const myMiddleware = (req, res, next) => {
    console.log("middleware");
    next();
};

// controller
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

router.get("/testing", myMiddleware, (req, res) => {
    res.json({
        data: "berhasil",
    });
});

module.exports = router;
