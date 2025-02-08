const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title : {
        type : String
    },
    description : {
        type : String
    },
    stage: {
        type: String,
        default: "incomplete",  // Corrected typo here
        enum: ["completed", "incomplete"],
      }
      
})
module.exports = mongoose.model("todo",todoSchema)