import express,{Response,Request} from "express";
import cors from "cors";
import {auth} from "./routes/auth/index"
import routes from "./routes/index"
import 'dotenv/config'
import mongoose from "mongoose";


const PORT = process.env.PORT || 3001;
// const db_con = process.env.DATABASE_CONNECTION ?? "";
const db_con = "mongodb+srv://nitishsaini:123@cluster0.vz9bafj.mongodb.net/";
const server = express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Then add your routes
server.use("/auth", auth);
server.use("/api", routes);

server.get("/", (req, res) => {
    res.status(200).send("server working fine");
});

// Database connection setup
mongoose.connect(db_con, { maxPoolSize: 100, maxIdleTimeMS: 3000 });

mongoose.connection.on('error', function (err) {
    console.error("Database connection error", err);
    process.exit(1);
});

// Starting the server
server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`); 
});