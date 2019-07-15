const mongoose = require('mongoose');
const Schame = mongoose.Schema;
const ChatSchema = new Schame({

    chatId: {
        //chat id is made by adding senderId and recieverId
        //eg:-  senderid__recieverid
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
    recieverId: {
        type: String,
        required: true,
    },
    lastConnection: {
        type: String,
    },
    messages: [{
        message: {
            type: String,
            required: true,
        },
        by: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            default: Date().now
        }
    }]
});

module.exports = Chat = mongoose.model('chat', ChatSchema);