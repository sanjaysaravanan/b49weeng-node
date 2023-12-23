// Json Web Token Utilities
import jwt from "jsonwebtoken";

const generateToken = (payload, expiry = "1h") => {
  const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: expiry,
  });
  return token;
};

const verifyToken = (token) => {};

// generateToken({ name: "Sanjay", role: "developer" });

export { generateToken };
