"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./routes/auth/index");
const index_2 = __importDefault(require("./routes/index"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = process.env.PORT || 3001;
// const db_con = process.env.DATABASE_CONNECTION ?? "";
const db_con = "mongodb+srv://nitishsaini:123@cluster0.vz9bafj.mongodb.net/";
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
// Then add your routes
server.use("/auth", index_1.auth);
server.use("/api", index_2.default);
server.get("/", (req, res) => {
    res.status(200).send("server working fine");
});
// Database connection setup
mongoose_1.default.connect(db_con, { maxPoolSize: 100, maxIdleTimeMS: 3000 });
mongoose_1.default.connection.on('error', function (err) {
    console.error("Database connection error", err);
    process.exit(1);
});
// Starting the server
server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});
