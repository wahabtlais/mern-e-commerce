import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	const hashedPassword = bcryptjs.hashSync(password, 10);
	const newUser = new User({ username, email, password: hashedPassword });
	try {
		await newUser.save();
		res.status(201).json("User created successfully!");
	} catch (error) {
		next(error);
		console.log(error);
	}
};

export const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const validUser = await User.findOne({ email });
		if (!validUser) return next(errorHandler(404, "User not found!"));
		const validPassword = bcryptjs.compareSync(password, validUser.password);
		if (!validPassword) return next(errorHandler(403, "Invalid Credentials!"));
		const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
		const { password: hashedPassword, ...rest } = validUser._doc;
		const expiryDate = new Date(Date.now() + 86400000); // 1 day
		res
			.cookie("access_token", token, { httpOnly: true, expires: expiryDate })
			.status(200)
			.json(rest);
	} catch (error) {
		next(error);
	}
};
