const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(cors());
app.use(bodyParser.json());

const Chat = require("./models/Chat");
const auth = require("./auth");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/users', require('./routes/users'));
app.use('/rooms', require('./routes/room'));
app.use('/chat', require('./routes/chat'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage: storage }).single("file")

app.post("/chat/uploadFiles", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, url: res.req.file.path });
  })
});


io.on("connection", (socket) => {

  socket.on("Input Message", async (msg) => {
    console.log(msg)
    try {
      let chat = new Chat({ message: msg.message, sender: msg.id, type: msg.type, roomId: msg.room._id })

      chat = await chat.save();

      Chat.findById(chat._id)
        .populate("sender")
        .exec((err, res) => {
          if (err) {
            return io.to(socket.id).emit("Error Message", "Message not sent.Please try again")
          }
          return io.emit("Output Message", res);
        })

    } catch (err) {
      console.log(err);
    }
  })

})

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen(port, () => {
    console.log(`Server Running at ${port}`)
  }))
  .catch(err => console.log(err));