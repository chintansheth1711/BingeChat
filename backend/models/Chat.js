const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    message: {
        type: String
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: "Room"
    },
    time: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
