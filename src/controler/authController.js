import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await prisma.user.findUnique({
    where: { Email: email },
  });

  if (userExist) {
    return res
      .status(400)
      .json({ error: "User already exist using this eamil" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      name,
      Email: email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    status: "Success",
    dta: {
      user: {
        id: user.id,
        name: name,
        email: user.Email,
      },
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { Email: email },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalide email or password" });
  }

  const isPasswordIsValid = await bcrypt.compare(password, user.password);
  if (!isPasswordIsValid) {
    return res.status(401).json({ error: "Invalide email or password" });
  }
  res.status(201).json({
    status: "Success",
    dta: {
      user: {
        id: user.id,
        email: user.Email,
      },
    },
  });
};

export { register, login };
