import jwt from "jsonwebtoken";
import TryCatch from "../utils/TryCatch.js";

const userAuth = TryCatch(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.staus(404).json({
      success: false,
      message: "Not Authorized. Login again",
    });
  }

  const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

  if (tokenDecode.id) {
    req.userId = tokenDecode.id;
  } else {
    return res.status(400).json({
      success: false,
      message: "Not Authorized. Login again",
    });
  }
  next();
});

export default userAuth;
