const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (res, user) => {
  const token = jwt.sign(user, config.TOKEN_KEY);

  return res.cookie("token", token, {
    secure: false,
    sameSite: "Lax",
    httpOnly: false,
  });
};

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || "";

  try {
    if (!token) {
      return res.status(401).json("Вы должны залогиниться");
    }

    const decrypt = await jwt.verify(token, config.TOKEN_KEY);

    req.user = {
      id: decrypt.id,
    };

    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

const verifyUser = async (req, res, next) => {
  const token = req.cookies.token || "";

  try {
    if (!token) {
      req.user = {
        id: null,
      };

      next();
    }

    const decrypt = await jwt.verify(token, config.TOKEN_KEY);

    req.user = {
      id: decrypt.id,
    };

    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
module.exports.verifyUser = verifyUser;
