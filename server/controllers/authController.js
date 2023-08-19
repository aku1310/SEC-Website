const { consola } = require("consola");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!(email && password)) {
			return res.status(400).json({
				ok: false,
				msg: "All inputs are required.",
			});
		}

		const user = User.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{ expiresIn: "24h" }
			);
			user.token = token;
		}

		await user.save();

		return res.status(200).json({
			ok: true,
			msg: user,
		});
	} catch (error) {
		consola.error(err);
	}
};

exports.signup = async (req, res) => {
	try {
		const { first_name, last_name, email, password } = req.body;
		if (!(email && password && first_name && last_name))
			return res.status(400).send({ err: "All inputs are required." });

		const oldUser = await User.findOne({ email });

		if (oldUser)
			return res
				.status(409)
				.send({ err: "User already exists. Please login." });

		let encryptedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			first_name,
			last_name,
			email: email.toLowerCase(),
			password: encryptedPassword,
		});

		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.TOKEN_KEY,
			{ expiresIn: "24h" }
		);

		user.token = token;

		return res.status(201).send({ msg: user });
	} catch (err) {
		consola.error(err.message);
	}
};
