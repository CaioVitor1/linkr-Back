import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authRepository } from "../repository/authRepository.js";

dotenv.config();

export async function signUp(req, res) {
  const { name, email, password, image } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = bcrypt.hashSync(password, salt);

    //Search User
    const { rows: userExists } = await authRepository.searchUser(email);
    if (userExists.length !== 0) {
      return res.sendStatus(409);
    }

    //Create User
    await authRepository.createUser(name, email, passwordHash, image);

    res.status(201).send("User created!");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
