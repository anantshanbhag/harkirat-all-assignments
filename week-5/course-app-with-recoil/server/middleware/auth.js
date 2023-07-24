import jwt from "jsonwebtoken";

const SECRET_ADMIN = "superS3cr3ta6m1n";
const SECRET_USER = "superS3cr3tus3r";

const generateJwt = (payload, secretKey) =>
  jwt.sign(payload, secretKey, { expiresIn: "1h" });

const authenticateJwt = (secretKey, req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretKey, (err, data) => {
    if (err) {
      return res.sendStatus(403);
    }

    const reqKey = secretKey === SECRET_ADMIN ? "currentAdmin" : "currentUser";
    req[reqKey] = data;
    next();
  });
};

export const generateJwtUser = ({ username }) =>
  generateJwt({ username }, SECRET_USER);
export const generateJwtAdmin = ({ username }) =>
  generateJwt({ username }, SECRET_ADMIN);

export const authenticateUser = (...args) =>
  authenticateJwt(SECRET_USER, ...args);
export const authenticateAdmin = (...args) =>
  authenticateJwt(SECRET_ADMIN, ...args);
