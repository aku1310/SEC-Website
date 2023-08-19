require("dotenv").configDotenv({
	path: "./.env",
});
require("./config/database").connect();

const express = require("express");
const verifyToken = require("./middleware/authMiddleware");
const app = express();

const { consola } = require("consola");
const { login, signup } = require("./controllers/authController");

const cors = require("cors");

const port = 5000;

app.use(express.json());
app.use(
	cors({
		origin: "*",
	})
);

app.post("/register", signup);
app.post("/login", verifyToken, login);

app.listen(port, () => {
	consola.success(`Server running on port ${port}.`);
});
