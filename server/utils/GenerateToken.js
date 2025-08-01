import jwt from "jsonwebtoken";

export const generateToken = (req, res) => {
  const token = jwt.sign({ id: req._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "node" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};
