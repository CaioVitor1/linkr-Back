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

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const { rows: userExists } = await authRepository.searchUser(email);

    if (
      userExists.length === 0 ||
      !bcrypt.compareSync(password, userExists[0].password)
    ) {
      return res.status(401).send("Incorrect email or passwords!");
    }

    const token = jwt.sign(
      {
        id: userExists[0].id,
        name: userExists[0].name,
        image: userExists[0].image,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).send({ userId: userExists[0].id, token });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
