const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const bcrypt = require("bcrypt");

const auth = require("../auth");

router.post("/register", async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (user)
        return res.json({
            success: false,
            message: "Email ID already exists"
        });
    user = new User(req.body);
    try {
        await user.save();
    }
    catch (err) {
        console.log(err);
        return res.json({ success: false, msg: "Server Error" })
    }
    return res.json({
        success: true,
        user
    })
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email })
    if (!user)
        return res.json({
            success: false,
            message: "Email not found"
        });

    bcrypt.compare(password, user.password, (err, check) => {
        if (err) console.log(err);
        if (!check)
            return res.json({ success: false, message: "Wrong password" });
        user.generateToken((err, user) => {
            if (err) return res.json(err);
            res.json({
                success: true,
                user
            });
        });
    });
});

router.get("/auth", auth, (req, res) => {
    let { _id, fname, lname, email, image } = req.user;
    return res.json({
        _id,
        email,
        fname,
        lname,
        image,
        isAuth: true
    });
});


router.get("/logout", auth, async (req, res) => {
    let user;
    try {
        user = await User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" });
    }
    catch (err) {
        console.log(err);
        return res.json({ success: false, err });
    }

    return res.json({
        success: true,
        user
    });
});

module.exports = router;
