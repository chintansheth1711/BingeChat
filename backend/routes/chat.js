const express = require('express');
const router = express.Router();
const Chat = require("../models/Chat");


router.post("/getChats", async (req, res) => {
    let { data } = req.body;
    Chat.find({ roomId: data.roomId }).populate("sender")
        .exec((err, chats) => {
            if (err) return res.json({ success: false, message: "Error" });
            return res.json({ success: true, chats })
        })
});

module.exports = router;