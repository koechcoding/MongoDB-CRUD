const { Schema, model } = require("mongoose")

//New Schema
const userSchema = new Schema({
    title:{
        type: String,
        required: true,
        index: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

const user_table = model('user_table', userSchema);

module.exports = user_table;