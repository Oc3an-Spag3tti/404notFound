import { Router } from "express";
import { sign } from "jsonwebtoken";
import argon2 from "argon2";
import dotenv from "dotenv";
import User from "../models/userModel";
import { stripe } from "..";

dotenv.config();

const usersRouter = Router();

usersRouter.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "Utilisateur déjà existant" });
      return;
    }
    if (!email || !password) {
      res.status(400).json({ error: "Email et mot de passe requis" });
      return;
    }
    const hashedPassword = await argon2.hash(password);

    const stripeUser = await stripe.customers.create({
      email: email,
      name: name,
    });
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      stripeUser: stripeUser,
    });

    await newUser.save();

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: "JWT secret non défini" });
      return;
    }

    const token = sign(
      { userId: newUser._id, email: newUser.email, isAdmin: false },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Utilisateur créé avec succès", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur lors de l'inscription" });
  }
});

usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: "JWT secret is not defined" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Utilisateur non trouvé" });
      return;
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Mot de passe incorrect" });
      return;
    }

    const token = sign(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin },
      jwtSecret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur lors de la connexion" });
  }
});

export default usersRouter;
