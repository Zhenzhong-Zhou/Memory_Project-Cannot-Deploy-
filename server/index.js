import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

app.get("/", (req, res) => {
    res.send("Hello to Memory APP");
});

const PORT = process.env.PORT || 9000;
const CONNECTION_URL = "mongodb+srv://bob:U6HxnPjpy2sYULjF@cluster0-hbynw.mongodb.net/Memory_Project?retryWrites=true&w=majority";

mongoose.connect( CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);