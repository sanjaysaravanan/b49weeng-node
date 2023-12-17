// Json Web Token Utilities
import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: "1h",
  });
  return token;
};

const verifyToken = (token) => {};

// generateToken({ name: "Sanjay", role: "developer" });

export { generateToken };
