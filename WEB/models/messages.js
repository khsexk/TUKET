const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    room:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        required:true
    },
    nick:{
        type:String,
        required:true
    } 
})

const Msg = mongoose.model('msg', msgSchema);
module.exports = Msg;