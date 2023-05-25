const express = require("express")
const app = express();
const mongoose = require("mongoose")
const route = require("./routes/route")
const multer = require("multer")
const cors=require("cors")
const dotenv = require("dotenv")
dotenv.config()


app.use(express.json())
app.use(cors());
app.use(multer().any())

mongoose.connect(process.env.DATABASE)

    .then(() => console.log("Mongodb is connected"))
    .catch((err) => console.log(err.message))

app.use('/', route)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
