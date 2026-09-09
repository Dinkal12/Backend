const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    shortId : {
        type : String,
        required : true,
        unique : true,
    },
    redirectedUrl : {
        type : String,
        required : true
    },
    totalClicks : {
        type : Number,
        default : 0,
    },
    createdBy : {
        type :mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'user',
    },
    visitedHistory : [{
        timestamp : {type : Number}
    }],
},{timestamps : true});

const URL = mongoose.model('url',userSchema);
module.exports = URL;