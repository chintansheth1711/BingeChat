const router = require("express").Router();
const auth = require("../auth");
const Room = require("../models/room");

router.post('/createRoom', auth, async (req, res) => {
    let { name } = req.body;
    let room = await Room.find({ name });
    if (room.length > 0) {
        return res.json({ success: false, message: "Error! Room already exists" });
    }
    room = new Room({ name });
    try {
        room = await room.save();
    }
    catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Something went wrong" });
    }
    return res.json({
        success: true,
        message: "Success",
        status: 200,
        room
    })
})

router.post("/joinRoom", auth, async (req, res) => {
    let { name } = req.body;
    let room = await Room.find({ name });
    if (room.length == 0) {
        return res.json({ success: false, message: "Error! Room not found" });
    }
    return res.json({
        success: true,
        message: "Success",
        room
    })
})

module.exports = router;