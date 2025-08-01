export const deleteToken = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "node" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
