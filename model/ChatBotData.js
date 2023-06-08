const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const chatbotSchema = new Schema({
    content: { type: String, required: true },
    displayType: { type: String, required: true },
    invokeByMsg: { type: Boolean, required: true},
    responseByIds: { type: [ObjectId], required: true},
    responseWithIds: {type: [ObjectId],required: true}
}, {timestamps: true})

const ChatBotData = mongoose.model('chatbotData', chatbotSchema)

module.exports = ChatBotData