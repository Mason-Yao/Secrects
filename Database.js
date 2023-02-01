mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect("127.0.0.1/27017/posts");
const dailyPostSchema = new mongoose.Schema(
    {
        "title": {
            type: String,
            require: true,
            length: 100
        },
        "date": {
            type: Date,
            require: true,
        },
        "body": {
            type: String
        },
    }
)



