const { verify } = require("jsonwebtoken");

const jsonSecret = require("../config/jsonSecret");

module.exports = async (req, res, next) => {
  const token = req.cookies["authToken"];

  if (!token) {
    return res.status(401).send({
      message: "You must be logged in to use this service.",
    });
  }

  try {
    const decoded = verify(token, jsonSecret.secret);

    req.userId = decoded.userId;

    return next();
  } catch (error) {
    console.error("Token verification failed:", error.stack);
    return res
      .status(403)
      .send({ message: "Invalid or expired access token." });
  }
};
