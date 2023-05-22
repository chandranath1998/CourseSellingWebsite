const express = require("express")
const app = express();
const mongoose = require("mongoose")
const route = require("./routes/route")
const multer = require("multer")
const cors=require("cors")


app.use(express.json())
app.use(cors());
app.use(multer().any())

mongoose.connect("mongodb+srv://madhusmita_123:5fiVrKsOKBIGJsKe@cluster0.cpbhduk.mongodb.net/collegejankari", { useNewUrlParser: true })

    .then(() => console.log("Mongodb is connected"))
    .catch((err) => console.log(err.message))

app.use('/', route)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
